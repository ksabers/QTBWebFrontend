import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { VoliService } from '../../servizi/voli/voli.service';
import { Manutenzione } from 'src/app/viewmodels/manutenzioni/manutenzione';
import { ManutenzioniService } from '../../servizi/manutenzioni/manutenzioni.service';
import { ManutenzioniDettaglioComponent } from './manutenzioni-dettaglio/manutenzioni-dettaglio.component';
import { VoliDettaglioComponent } from '../voli/voli-dettaglio/voli-dettaglio.component';

@Component({
  selector: 'app-manutenzioni',
  templateUrl: './manutenzioni.component.html',
  styleUrls: ['./manutenzioni.component.scss']
})
export class ManutenzioniComponent implements OnInit {

  loading = true;
  datasource = new MatTableDataSource<Manutenzione>();
  valoriTabella: Manutenzione[];

  // ATTENZIONE: paginator e sort devono essere fatti come proprietà (con il set)
  // altrimenti non funzionano!
  
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    if (!this.datasource.paginator) {
        this.datasource.paginator = paginator;
    }
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.datasource.sort) {
        this.datasource.sort = sort;
    }
  }

  columnsToDisplay = ['data', 'aereo', 'descrizione', 'tipo', 'ordinaria', 'persona', 'volo', 'dettagli'];

  constructor(private manutenzioniAPI: ManutenzioniService,
              private voliAPI: VoliService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.manutenzioniAPI.getList().subscribe(data => {
      this.datasource.data = data;
      this.valoriTabella = data;
      this.loading = false;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  apriDettagli(manutenzione: Manutenzione): void {
    const dialogRef = this.dialog.open(ManutenzioniDettaglioComponent, {data: manutenzione});
  }

  apriDettagliVolo(idVolo: number): void {
    this.voliAPI.get(idVolo).subscribe(data => {
      const dialogRef = this.dialog.open(VoliDettaglioComponent, {data: data});
    })
  }
}
