import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';

import { Persona } from './../../viewmodels/persone/persona';
import { ScadenzeAereo } from '../../viewmodels/scadenze/scadenzeAereo';
import { ScadenzaAereo } from './../..//viewmodels/scadenze/scadenzaAereo';
import { ScadenzeService } from './../../servizi/scadenze/scadenze.service';
import { Scadenza } from './../../viewmodels/scadenze/scadenza';
import { PersoneService } from 'src/app/servizi/persone/persone.service';
import { AuthenticationService } from './../../auth/auth.service';
import { ScadenzaPersona } from './../../viewmodels/scadenze/scadenzaPersona';
import { UtilsService } from './../../servizi/utils/utils.service';
import { Min2hhmmPipe } from 'src/app/shared/min2hhmm.pipe/min2hhmm.pipe';

@Component({
  selector: 'app-scadenze',
  templateUrl: './scadenze.component.html',
  styleUrls: ['./scadenze.component.scss']
})
export class ScadenzeComponent implements OnInit {

  loading = true;
  datasourcePersone = new MatTableDataSource<ScadenzaPersona>();
  datasourceAerei = new MatTableDataSource<ScadenzaAereo>();
  valoriTabellaScadenzePersone: ScadenzaPersona[] = [];
  valoriTabellaScadenzeAerei: ScadenzaAereo[] = [];
  listaScadenze: Scadenza[];
  listaPersone: Persona[];
  personaSelezionata: number;
  columnsToDisplayFull = ['nome', 'tipo', 'data', 'ore', 'range', 'dettagli'];
  columnsToDisplayLean = ['tipo', 'data', 'ore', 'range', 'dettagli'];
  columnsToDisplay = this.columnsToDisplayLean;
  columnsToDisplayAerei = ['marche', 'modello', 'tipo', 'data', 'ore', 'range', 'dettagli'];

  // ATTENZIONE: paginator e sort devono essere fatti come proprietà (con il set)
  // altrimenti non funzionano!
  
  @ViewChild(MatPaginator) set matPaginatorPersone(paginatorPersone: MatPaginator) {
    if (!this.datasourcePersone.paginator) {
        this.datasourcePersone.paginator = paginatorPersone;
    }
  }
  @ViewChild(MatPaginator) set matPaginatorAerei(paginatorAerei: MatPaginator) {
    if (!this.datasourcePersone.paginator) {
        this.datasourcePersone.paginator = paginatorAerei;
    }
  }

  @ViewChild(MatSort) set matSortPersone(sortPersone: MatSort) {
    if (!this.datasourcePersone.sort) {
        this.datasourcePersone.sort = sortPersone;
    }
  }
  @ViewChild(MatSort) set matSortAerei(sortAerei: MatSort) {
    if (!this.datasourceAerei.sort) {
        this.datasourceAerei.sort = sortAerei;
    }
  }

  constructor(private auth: AuthenticationService,
              private scadenzeAPI: ScadenzeService,
              private personeAPI: PersoneService,
              private utils: UtilsService,
              private pipe: Min2hhmmPipe,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.scadenzeAPI.getList().subscribe(data => {
      this.listaScadenze = data;
      this.personeAPI.getList().subscribe(data => {
        this.listaPersone = data;
        this.personaSelezionata = this.auth.currentUserValue.persona;
        this.aggiornaTabelle();
        this.datasourcePersone.data = this.valoriTabellaScadenzePersone;
        this.loading = false;
      });
    });
  }

  /**
   * Aggiorna i datasource delle.
   * Se viene passato l'id di una persona, filtra solo le sue scadenze.
   * Altrimenti estrae e rende "flat" le scadenze personali di tutti.
   * Poi aggiorna il datasource per ricaricare la tabella e se necessario
   * mette o toglie la colonna della persona
   * Fa lo stesso con il datasource delle scadenze degli aerei
   *
   * @param {number} personaSelezionata
   * @memberof ScadenzeComponent
   */
  aggiornaTabelle(): void {
    this.valoriTabellaScadenzePersone = [];
    this.valoriTabellaScadenzeAerei = [];
    if (this.personaSelezionata != -1) {
      let scadenzaPersona = this.listaScadenze.find(persona => persona.persona == this.personaSelezionata);
      scadenzaPersona.scadenzePersona.forEach(scadenza => {
        this.valoriTabellaScadenzePersone.push({
          idPersona: scadenzaPersona.persona,
          nomePersona: scadenzaPersona.nome,
          cognomePersona: scadenzaPersona.cognome,
          scadenza: scadenza
        });
      });
      scadenzaPersona.scadenzeAerei.forEach(scadenza => {
        scadenza.scadenzeAereo.forEach(generica => {
          this.valoriTabellaScadenzeAerei.push({
            aereo: scadenza.aereo,
            modello: scadenza.modello,
            marche: scadenza.marche,
            minutiPregressi: scadenza.minutiPregressi,
            minutiVolo: scadenza.minutiVolo,
            scadenzeAereo: generica
          })
        })
      })
      this.columnsToDisplay = this.columnsToDisplayLean;
    }
    else {
      this.listaScadenze.forEach(scadenza => {
        scadenza.scadenzePersona.forEach(generica => {
          this.valoriTabellaScadenzePersone.push({
            idPersona: scadenza.persona,
            nomePersona: scadenza.nome,
            cognomePersona: scadenza.cognome,
            scadenza: generica
          })
        });
        scadenza.scadenzeAerei.forEach(scadenza => {
          scadenza.scadenzeAereo.forEach(generica => {
            this.valoriTabellaScadenzeAerei.push({
              aereo: scadenza.aereo,
              modello: scadenza.modello,
              marche: scadenza.marche,
              minutiPregressi: scadenza.minutiPregressi,
              minutiVolo: scadenza.minutiVolo,
              scadenzeAereo: generica
            })
          })
        })
      });
      this.columnsToDisplay = this.columnsToDisplayFull;
    }
    this.datasourcePersone.data = this.valoriTabellaScadenzePersone;
    this.datasourceAerei.data = this.valoriTabellaScadenzeAerei;
  }
  
  applyFilterPersona(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasourcePersone.filter = filterValue.trim().toLowerCase();

    if (this.datasourcePersone.paginator) {
      this.datasourcePersone.paginator.firstPage();
    }
  }

  apriDettagliPersona(scadenza: ScadenzaPersona): void {
    //const dialogRef = this.dialog.open(PersoneDettaglioComponent, {data: persona});
  }

  calcolo_range(scadenza: ScadenzaPersona): string {

    let personaAttuale = this.listaPersone.find(persona => persona.id == scadenza.idPersona);
    let rangeDataScadenza = null;
    let rangeMinutiDiVolo = null;
    let rangeDataScadenzaStringa = null;
    let rangeMinutiDiVoloStringa = null;

    if (scadenza.scadenza.data) {
      rangeDataScadenza = this.utils.dateDiff(new Date(scadenza.scadenza.data), new Date());
    }

    if (scadenza.scadenza.minuti && personaAttuale.minutiVoloDaPilota) {
      rangeMinutiDiVolo = scadenza.scadenza.minuti - (personaAttuale.minutiPregressi + personaAttuale.minutiVoloDaPilota);
    }
    
    if (rangeDataScadenza) {
      rangeDataScadenzaStringa = rangeDataScadenza.toString() + ' ' + this.translate.instant('scadenze.giorni');
    }
    else {
      rangeDataScadenzaStringa = '';
    }

    if (rangeMinutiDiVolo) {
      rangeMinutiDiVoloStringa = (rangeDataScadenza ? ' / ': '') +  
      this.pipe.transform(rangeMinutiDiVolo) + ' ' + 
      this.translate.instant('scadenze.ore_di_volo').toLowerCase();
    }
    else {
      rangeMinutiDiVoloStringa = '';
    }

    return rangeDataScadenzaStringa + rangeMinutiDiVoloStringa;
  }

  calcolo_range_aerei(scadenza: ScadenzaAereo): string {

    let rangeDataScadenza = null;
    let rangeMinutiDiVolo = null;
    let rangeDataScadenzaStringa = null;
    let rangeMinutiDiVoloStringa = null;

    if (scadenza.scadenzeAereo.data) {
      rangeDataScadenza = this.utils.dateDiff(new Date(scadenza.scadenzeAereo.data), new Date());
    }

    if (scadenza.scadenzeAereo.minuti) {
      rangeMinutiDiVolo = scadenza.scadenzeAereo.minuti - (scadenza.minutiPregressi + scadenza.minutiVolo);
    }
    
    if (rangeDataScadenza) {
      rangeDataScadenzaStringa = rangeDataScadenza.toString() + ' ' + this.translate.instant('scadenze.giorni');
    }
    else {
      rangeDataScadenzaStringa = '';
    }

    if (rangeMinutiDiVolo) {
      rangeMinutiDiVoloStringa = (rangeDataScadenza ? ' / ': '') +  
      this.pipe.transform(rangeMinutiDiVolo) + ' ' + 
      this.translate.instant('scadenze.ore_di_volo').toLowerCase();
    }
    else {
      rangeMinutiDiVoloStringa = '';
    }

    return rangeDataScadenzaStringa + rangeMinutiDiVoloStringa;
  }

}
