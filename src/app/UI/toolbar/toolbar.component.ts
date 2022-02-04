import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

import { UtilsService } from './../../servizi/utils/utils.service';
import { environment } from './../../../environments/environment';
import { AuthenticationService } from './../../auth/auth.service';
import { ScadenzePersoneService } from 'src/app/servizi/scadenze/scadenze-persone.service';
import { ScadenzeAereiService } from 'src/app/servizi/scadenze/scadenze-aerei.service';
import { ProfiloComponent } from '../profilo/profilo.component';
import { ScadenzaPersona } from 'src/app/viewmodels/scadenze/scadenza-persona';
import { ScadenzaAereo } from 'src/app/viewmodels/scadenze/scadenza-aereo';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public lingua: string;
  public nomeLingua: string;
  public notifiche = 0;

   // queste sono le scadenze grezze che arrivano dal database
  scadenzePersona: ScadenzaPersona[];
  scadenzeAerei: ScadenzaAereo[];
  
  // queste invece sono le scadenze filtrate che verranno mostrate nella popup
  public scadenzePersonaFlat: {
    scadenza: ScadenzaPersona,
    scaduta: boolean
  }[] = [];
  public scadenzeAereiFlat: {
    scadenza: ScadenzaAereo,
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
      this.scadenzePersona = data;
      this.scadenzeAereiAPI.getList('/persona/'+ (this.auth.currentUserValue.persona).toString()).subscribe(data => {
        this.scadenzeAerei = data;
        this.filtraScadenzePersona();
        this.filtraScadenzeAerei();
        this.notifiche = this.scadenzePersonaFlat.length + this.scadenzeAereiFlat.length;
        this.loading = false;
      })
    });
  }

  filtraScadenzePersona(): void {
    let utenteCollegato = this.auth.currentUserValue;
    this.scadenzePersona.forEach(scadenza => {  // per ciascuna scadenza...
      if 
      (
        (
          (scadenza.data != null)  // se la scadenza è espressa come data...
          &&  // ...ed è minore dell'intervallo impostato in environment
          (this.utils.dateDiff(new Date(scadenza.data), new Date()) <= environment.giorniScadenze)
        )
        ||  // oppure...
        (
          (scadenza.minuti != null)  // ...se la scadenza è espressa in minuti...
          &&  // ...e l'utente collegato è un pilota...
          (utenteCollegato.minutiVoloDaPilota != null)
          && // ... e l'intervallo è minore di quanto impostato in environment...
          (scadenza.minuti - (utenteCollegato.minutiPregressi + utenteCollegato.minutiVoloDaPilota) <= (environment.oreScadenze * 60))
        )
      )
      {  // ...allora inserisci la scadenza nell'elenco da visualizzare
        this.scadenzePersonaFlat.push({
          scadenza: scadenza,
          scaduta:  // verifica se è scaduta o no, in modo da visualizzarla in rosso
            (
              (  // sarà true, cioè scaduta se ha una data...
                (scadenza.data != null)
                && // ... e questa data è precedente a oggi...
                (this.utils.dateDiff(new Date(scadenza.data), new Date()) <= 0)
              )
              || // ... oppure...
              (  // ...se ha dei minuti di volo...
                (scadenza.minuti != null)
                &&  // ...e l'utente collegato è un pilota...
                (utenteCollegato.minutiVoloDaPilota != null)
                && // ...e i minuti sono minori dei minuti di volo del pilota
                (scadenza.minuti - (utenteCollegato.minutiPregressi + utenteCollegato.minutiVoloDaPilota) <= 0)
              )
            )
        })
      }
    })
  }

  filtraScadenzeAerei(): void {
    let utenteCollegato = this.auth.currentUserValue;
    this.scadenzeAerei.forEach(scadenza => {
      if
      (
        (
          (scadenza.data != null)
          &&
          (this.utils.dateDiff(new Date(scadenza.data), new Date()) <= environment.giorniScadenze)
        )
        ||
        (
          (
            (scadenza.minuti != null)
            &&
            (scadenza.minuti - (scadenza.minutiPregressi + scadenza.minutiVolo) <= (environment.oreScadenze * 60))
          )
        )
      )
      {
        this.scadenzeAereiFlat.push({
          scadenza: scadenza,
          scaduta: 
          (
            (
              (scadenza.data != null)
              &&
              (this.utils.dateDiff(new Date(scadenza.data), new Date()) <= environment.giorniScadenze)
            )
            ||
            (
              (scadenza.minuti != null)
              &&
              (scadenza.minuti - (utenteCollegato.minutiPregressi + utenteCollegato.minutiVoloDaPilota) <= 0)
            )
          )
        })
      }
    })
  }

  apri_profilo(): void {
    const dialogRef = this.dialog.open(ProfiloComponent);
  }

  logout(): void {
    this.auth.logout();
  }
}
