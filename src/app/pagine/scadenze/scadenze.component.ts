import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';

import { PersoneService } from 'src/app/servizi/persone/persone.service';
import { Persona } from './../../viewmodels/persone/persona';

import { ScadenzePersoneService } from 'src/app/servizi/scadenze/scadenze-persone.service';
import { ScadenzeAereiService } from 'src/app/servizi/scadenze/scadenze-aerei.service';
import { ScadenzaPersona } from '../../viewmodels/scadenze/scadenza-persona';
import { ScadenzaAereo } from '../../viewmodels/scadenze/scadenza-aereo';


import { AuthenticationService } from './../../auth/auth.service';

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
  listaScadenzePersone: ScadenzaPersona[];
  listaScadenzeAerei: ScadenzaAereo[];
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
              private scadenzePersoneAPI: ScadenzePersoneService,
              private scadenzeAereiAPI: ScadenzeAereiService,
              private personeAPI: PersoneService,
              private utils: UtilsService,
              private pipe: Min2hhmmPipe,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.scadenzePersoneAPI.getList().subscribe(data => {
      this.listaScadenzePersone = data;
      this.scadenzeAereiAPI.getList().subscribe(data => {
        this.listaScadenzeAerei = data;
        this.personeAPI.getList().subscribe(data => {
          this.listaPersone = data;
          this.personaSelezionata = this.auth.currentUserValue.persona;
          this.aggiornaTabelle();
          //this.datasourcePersone.data = this.valoriTabellaScadenzePersone;
          this.loading = false;
        });
      })
    });
  }

  /**
   * Aggiorna i datasource delle persone.
   * Se viene passato l'id di una persona, filtra solo le sue scadenze
   * Se necessario mette o toglie la colonna della persona
   * Fa lo stesso con il datasource delle scadenze degli aerei
   *
   * @param {number} personaSelezionata
   * @memberof ScadenzeComponent
   */
  aggiornaTabelle(): void {
    this.valoriTabellaScadenzePersone = [];
    this.valoriTabellaScadenzeAerei = [];
    if (this.personaSelezionata != -1) {

      let personaSelezionata = this.listaPersone.find(persona => persona.id == this.personaSelezionata);
      let aereiPosseduti = personaSelezionata.aereiPosseduti.map(aereo => aereo.id);

      this.datasourcePersone.data = this.listaScadenzePersone.filter(scadenza => scadenza.persona == this.personaSelezionata);
      this.datasourceAerei.data = this.listaScadenzeAerei.filter(scadenza => aereiPosseduti.includes(scadenza.aereo))
      this.columnsToDisplay = this.columnsToDisplayLean;
    }
    else {

      this.datasourcePersone.data = this.listaScadenzePersone;
      this.datasourceAerei.data = this.listaScadenzeAerei;
      this.columnsToDisplay = this.columnsToDisplayFull;
    }
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

    let personaAttuale = this.listaPersone.find(persona => persona.id == scadenza.persona);
    let rangeDataScadenza = null;
    let rangeMinutiDiVolo = null;
    let rangeDataScadenzaStringa = null;
    let rangeMinutiDiVoloStringa = null;

    if (scadenza.data) {
      rangeDataScadenza = this.utils.dateDiff(new Date(scadenza.data), new Date());
    }

    if (scadenza.minuti && personaAttuale.minutiVoloDaPilota) {
      rangeMinutiDiVolo = scadenza.minuti - (personaAttuale.minutiPregressi + personaAttuale.minutiVoloDaPilota);
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

    if (scadenza.data) {
      rangeDataScadenza = this.utils.dateDiff(new Date(scadenza.data), new Date());
    }

    if (scadenza.minuti) {
      rangeMinutiDiVolo = scadenza.minuti - (scadenza.minutiPregressi + scadenza.minutiVolo);
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
