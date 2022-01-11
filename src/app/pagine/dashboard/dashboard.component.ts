import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { DashboardOreDiVoloPerPilotaService, DashboardOreDiVoloPerAereoService } from '../../servizi/dashboard/dashboard.service';
import { OreDiVoloPerAereo } from './../../viewmodels/dashboard/oreDiVoloPerAereo';
import { OreDiVoloPerPilota } from './../../viewmodels/dashboard/oreDiVoloPerPilota';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  valoriOrePerPilota: OreDiVoloPerPilota[];
  valoreMassimo1: number;
  valoriOrePerAereo: OreDiVoloPerAereo[];
  valoreMassimo2: number;
  massimiPiloti = environment.dashboardPiloti;
  massimiAerei = environment.dashboardAerei;

  loading1 = true;
  loading2 = true;

  constructor(private serv1: DashboardOreDiVoloPerPilotaService,
              private serv2: DashboardOreDiVoloPerAereoService) {}


  /**
   *   * Prende un qualunque array con valori da graficare, trova il massimo "value"
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

  ngOnInit(): void {
    this.serv1.getList().subscribe(data => {

      // prendo i primi "n" piloti in base al parametro in enivironment
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
  }
}
