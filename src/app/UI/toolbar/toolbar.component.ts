import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from 'src/app/servizi/utils/utils.service';
import { ScadenzaGenerica } from 'src/app/viewmodels/scadenze/scadenzaGenerica';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from './../../auth/auth.service';
import { ScadenzeService } from './../../servizi/scadenze/scadenze.service';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public lingua: string;
  public nomeLingua: string;
  public notifiche = 0;
  public scadenzePersona: ScadenzaGenerica[];
  public scadenzeAereiFlat: {
    id: number,
    aereo: number,
    modello: string,
    marche: string,
    tipo: string,
    data: Date,
    minutiVolo: number,
    minutiPregressi: number,
    minutiScadenza: number,
    note: string
  }[] = [];
  public linguaggi = environment.linguaggi;
  public nomeCognomeUtente: string;
  public loading = true;

  constructor(private translate: TranslateService,
              private auth: AuthenticationService,
              private scadenzeAPI: ScadenzeService,
              private utils: UtilsService) {
    this.lingua = this.translate.currentLang;
    this.nomeLingua = environment.linguaggi.find(lingua => lingua.codice == this.translate.currentLang).nome;
  }

  usaLingua(codiceLingua: string): void {
    this.translate.use(codiceLingua);
    this.lingua = codiceLingua;
    this.nomeLingua = environment.linguaggi.find(lingua => lingua.codice == codiceLingua).nome;
  }

  ngOnInit(): void {
    this.nomeCognomeUtente = this.auth.currentUserValue.nome + ' ' + this.auth.currentUserValue.cognome;
    this.scadenzeAPI.get(this.auth.currentUserValue.persona).subscribe(data => {
      
      // recupera le scadenze della persona, ma non ancora filtrate per data o per ore di volo
      this.scadenzePersona = data.scadenzePersona;
      
      // recupera le scadenze degli aerei, ma non ancora filtrate per data o per ore di volo
      data.scadenzeAerei.forEach(scadenzaEsterna => {
        scadenzaEsterna.scadenzeAereo.forEach(scadenzaInterna => {
          this.scadenzeAereiFlat.push({
                                        id: scadenzaInterna.id,
                                        aereo: scadenzaEsterna.aereo,
                                        modello: scadenzaEsterna.modello,
                                        marche: scadenzaEsterna.marche,
                                        tipo: scadenzaInterna.tipo,
                                        data: scadenzaInterna.data,
                                        minutiPregressi: scadenzaEsterna.minutiPregressi,
                                        minutiVolo: scadenzaEsterna.minutiVolo,
                                        minutiScadenza: scadenzaInterna.minuti,
                                        note: scadenzaInterna.note
                                      })          
        });
      });

      // filtriamo le scadenze della persona in modo da includere solo quelle veramente in scadenza
      // (in base alla data e/o alle ore di volo e tenendo conto dell'intervallo settato in environment)
      this.scadenzePersona = 
      this.scadenzePersona.filter(scadenza =>
        (
          (scadenza.data != null)
          &&
          (this.utils.dateDiff(new Date(scadenza.data), new Date()) <= environment.giorniScadenze)
        )
        ||
        (
          (scadenza.minuti != null)
          &&
          (data.minutiVoloDaPilota != null)
          &&
          (scadenza.minuti - (data.minutiPregressi + data.minutiVoloDaPilota) <= (environment.oreScadenze * 60))
        )
        );

        // filtriamo allo stesso modo le scadenze degli aerei in modo da includere solo quelle
        // veramente in scadenza (in base alla data e/o alle ore di volo e tenendo conto dell'intervallo
        // settato in environment)

        this.scadenzeAereiFlat =
        this.scadenzeAereiFlat.filter(scadenza =>
          (
            (scadenza.data != null)
            &&
            (this.utils.dateDiff(new Date(scadenza.data), new Date()) <= environment.giorniScadenze)
          )
          ||
          (
            (scadenza.minutiScadenza != null)
            &&
            (scadenza.minutiScadenza - (scadenza.minutiPregressi + scadenza.minutiVolo) <= (environment.oreScadenze * 60))
          )
          );

      this.notifiche = this.scadenzePersona.length + this.scadenzeAereiFlat.length;
      this.loading = false;
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
