import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { DashboardOreDiVoloPerPilotaService, 
         DashboardOreDiVoloPerAereoService,
         DashboardCarburanteAnnualePerAereoService } from '../../servizi/dashboard/dashboard.service';
import { OreDiVoloPerAereo } from './../../viewmodels/dashboard/oreDiVoloPerAereo';
import { OreDiVoloPerPilota } from './../../viewmodels/dashboard/oreDiVoloPerPilota';
import { CarburanteAnnualeJSON } from './../../viewmodels/dashboard/carburanteAnnualeJSON';
import { CarburanteAnnualePerAereo, SerieInterna } from './../../viewmodels/dashboard/carburanteAnnualePerAereo';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  valoriOrePerPilota: OreDiVoloPerPilota[];
  valoreMassimo1: number;  // fondoscala del grafico
  massimiPiloti = environment.dashboardPiloti; // numero massimo di piloti da mostrare

  valoriOrePerAereo: OreDiVoloPerAereo[];
  valoreMassimo2: number;  // fondoscala del grafico
  massimiAerei = environment.dashboardAerei;  // numero massimo di aerei da mostrare

  JSONDatiCarburante: CarburanteAnnualeJSON[] = [];
  valoriConsumiCarburante: CarburanteAnnualePerAereo[] = [];

  loading1 = true;
  loading2 = true;
  loading3 = true;

  constructor(private translate: TranslateService,
              private serv1: DashboardOreDiVoloPerPilotaService,
              private serv2: DashboardOreDiVoloPerAereoService,
              private serv3: DashboardCarburanteAnnualePerAereoService) {}


  /**
   * Prende un qualunque array con valori da graficare, trova il massimo "value"
   * e restituisce il primo mumero superiore divisibile per 500 o 50 a seconda
   * che incremento sia 1000 0 100
   * (es. 2003 => 2500, 2705 => 3000 se incremento è 1000)
   * (es. 160 => 200, 125 => 150 se incremento è 100)
   *
   * @private
   * @param {*} valori
   * @param {number} incremento
   * @return {*}  {number}
   * @memberof DashboardComponent
   */
  private arrotonda(valori: any, incremento: number): number {
    const massimo = Math.max.apply(Math, valori.map(function(o) { return o.value; }));
    const valorePiuAlto = Math.ceil(massimo/incremento)*incremento;
    if ((valorePiuAlto - massimo > (incremento/2))) {
      return valorePiuAlto - (incremento/2);
    }
    else {
      return valorePiuAlto;
    }
  }

  /**
   * Funzione "finta" che restituisce semplicemente il valore passato.
   * Serve come trucco per togliere i puntini dai numeri mostrati nei grafici
   *
   * @param {*} data
   * @return {*}  
   * @memberof DashboardComponent
   */
  formattaValore(data){
    return data;
  }


  /**
   * Funzione che esegue il raggruppamento dei dati di consumo mese per mese
   * E' necessaria perché EF Core dalla 5 in poi non supporta più certe GroupBy
   * nelle espressioni LINQ, quindi non si può fare il raggruppamento lato server
   *
   * @param {CarburanteAnnualeJSON[]} datiJSON
   * @return {*}  {CarburanteAnnualePerAereo[]}
   * @memberof DashboardComponent
   */
  raggruppaDatiCarburante(datiJSON: CarburanteAnnualeJSON[]): CarburanteAnnualePerAereo[] {

    const oggi = new Date();  // data odierna
    const annoAttuale = oggi.getFullYear(); // anno attuale a 4 cifre
    const meseAttuale = oggi.getMonth();  // mese attuale da 0 (gen) a 11 (dic)
    let annoInizio : number;
    let meseInizio: number;
    let arrayConsumi: CarburanteAnnualePerAereo[] = [];
    const lingua = this.translate.currentLang;

    if (meseAttuale > 4) {                // da giugno in poi...
      annoInizio = annoAttuale;     // ...se vado indietro 6 mesi l'anno resta lo stesso...
      meseInizio = meseAttuale - 5; //  ...e il mese si calcola per sottrazione
    } else {                              // invece prima di giugno...
      annoInizio = annoAttuale - 1; // ...l'anno è quello precedente...
      meseInizio = meseAttuale + 7; // ...e il mese si calcola per somma
    }

    let arrayNomiMesi = [];  // questo serve per la legenda in modo da scrivere i nomi dei mesi e non solo il numero

    for (let index = 0; index < 6; index++) {
      arrayNomiMesi.push(
        {
          anno: new Date(annoInizio, meseInizio + index, 1).getFullYear(),
          mese: new Date(annoInizio, meseInizio + index, 1).getMonth(),
          nome: new Date(annoInizio, meseInizio + index, 1).toLocaleDateString(lingua, { month: 'long' })
        })
    }

    datiJSON.forEach(aereo => {  // per ciascun aereo restituito...

      let serieMensile : SerieInterna[] = [];
      for (let index = 0; index < 6; index++) {  // ...per ciascuno dei sei mesi precedenti fino all'attuale...

        let consumoMensile = 0;
        
        // questa filter e la foreach in pratica fanno la .GroupBy che non riusciamo a fare lato server

        let voliNelMese = aereo.voli.filter(volo =>  // filtra solo i voli svolti nel mese considerato
          (new Date(volo.data).getFullYear()) === arrayNomiMesi[index].anno &&
          (new Date(volo.data).getMonth()) === arrayNomiMesi[index].mese
        );

        voliNelMese.forEach(volo => {  // somma i consumi di carburante del mese considerato
          consumoMensile = consumoMensile + volo.consumo;
        })
        
        // inserisce i dati mensili nell'array del mese considerato
        serieMensile.push({name: arrayNomiMesi[index].nome + ' ' + arrayNomiMesi[index].anno, value: consumoMensile});
      }

      arrayConsumi.push({
        name : aereo.marche,
        series: serieMensile
      });
    })
  
    return arrayConsumi;
  }

  ngOnInit(): void {

    // questa purtroppo è necessaria perché dobbiamo ri-tradurre i nomi dei mesi nel grafico
    // quando cambiamo lingua
    this.translate.onLangChange.subscribe(() => {
      this.valoriConsumiCarburante = this.raggruppaDatiCarburante(this.JSONDatiCarburante);
    });

    this.serv1.getList().subscribe(data => {

      // prendo i primi "n" piloti in base al parametro in environment
      this.valoriOrePerPilota = data.slice(0, this.massimiPiloti);

      // calcolo il fondoscala del grafico
      this.valoreMassimo1 = this.arrotonda(this.valoriOrePerPilota, 1000);

      this.loading1 = false;
    });

    this.serv2.getList().subscribe(data => {

      // prendo i primi "n" aerei in base al parametro in environment
      this.valoriOrePerAereo = data.slice(0, this.massimiAerei);

      // calcolo il fondoscala del grafico
      this.valoreMassimo2 = this.arrotonda(this.valoriOrePerAereo, 100);

      this.loading2 = false;
    });


    this.serv3.getList().subscribe(data => {

      this.JSONDatiCarburante = data;

      // il calcolo è fatto in una funzione a parte perché lo dobbiamo rifare se si cambia la lingua
      // (ma almeno così la chiamata al server si fa una volta sola)
      this.valoriConsumiCarburante = this.raggruppaDatiCarburante(this.JSONDatiCarburante);
      this.loading3 = false;
    });
  }
}
