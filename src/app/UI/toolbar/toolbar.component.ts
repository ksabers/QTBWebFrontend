import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

import { UtilsService } from './../../servizi/utils/utils.service';
import { environment } from './../../../environments/environment';
import { AuthenticationService } from './../../auth/auth.service';
import { ScadenzePersoneService } from 'src/app/servizi/scadenze/scadenze-persone.service';
import { ScadenzeAereiService } from 'src/app/servizi/scadenze/scadenze-aerei.service';
import { ProfiloComponent } from '../profilo/profilo.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public lingua: string;
  public nomeLingua: string;
  public notifiche = 0;
  public scadenzePersonaFlat: {
    id: number,
    tipo: string,
    data: Date,
    minuti: number,
    scaduta: boolean
  }[] = [];
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
    scaduta: boolean
  }[] = [];
  public linguaggi = environment.linguaggi;
  public nomeCognomeUtente: string;
  public loading = true;

  constructor(private translate: TranslateService,
              private auth: AuthenticationService,
              private scadenzePersoneAPI: ScadenzePersoneService,
              private scadenzeAereiAPI: ScadenzeAereiService,
              private dialog: MatDialog,
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
    this.scadenzePersoneAPI.getList('/persona/' + (this.auth.currentUserValue.persona).toString()).subscribe(data => {
      
      // recupera le scadenze della persona, ma non ancora filtrate per data o per ore di volo
      data.forEach(scadenza => {
        this.scadenzePersonaFlat.push({
          id: scadenza.id,
          tipo: scadenza.tipoScadenza,
          data: scadenza.data,
          minuti: scadenza.minuti,
          scaduta: (
                      (scadenza.data != null)
                      &&
                      (this.utils.dateDiff(new Date(scadenza.data), new Date()) <= 0)
/*                    ||
                      (scadenza.minuti != null)
                      &&
                      (data.minutiVoloDaPilota != null)
                      &&
                      (scadenza.minuti - (data.minutiPregressi + data.minutiVoloDaPilota) <= 0) */
                   ) 
        })
      });
 
      // recupera le scadenze degli aerei, ma non ancora filtrate per data o per ore di volo
/*       data.scadenzeAerei.forEach(scadenzaEsterna => {
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
            scaduta: (
              (
                (scadenzaInterna.data != null)
                &&
                (this.utils.dateDiff(new Date(scadenzaInterna.data), new Date()) <= environment.giorniScadenze)
              )
              ||
              (
                (scadenzaInterna.minuti != null)
                &&
                (scadenzaInterna.minuti - (scadenzaEsterna.minutiPregressi + scadenzaEsterna.minutiVolo) <= 0)
              )
            )
          })          
        });
      }); */

      // filtriamo le scadenze della persona in modo da includere solo quelle veramente in scadenza
      // (in base alla data e/o alle ore di volo e tenendo conto dell'intervallo settato in environment)
/*       this.scadenzePersonaFlat = 
      this.scadenzePersonaFlat.filter(scadenza =>
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
        ); */

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

      this.notifiche = this.scadenzePersonaFlat.length + this.scadenzeAereiFlat.length;
      this.loading = false;
    });
  }

  apri_profilo(): void {
    const dialogRef = this.dialog.open(ProfiloComponent);
  }

  logout(): void {
    this.auth.logout();
  }
}
