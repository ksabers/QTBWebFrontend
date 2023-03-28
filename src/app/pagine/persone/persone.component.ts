import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from 'src/app/viewmodels/persone/persona';
import { PersoneDettaglioComponent } from './persone-dettaglio/persone-dettaglio.component';
import { PersoneService } from '../../servizi/persone/persone.service';

@Component({
  selector: 'app-persone',
  templateUrl: './persone.component.html',
  styleUrls: ['./persone.component.scss']
})
export class PersoneComponent implements OnInit  {

  loading = true;
  datasource = new MatTableDataSource<Persona>();
  valoriTabella: Persona[];
  filtroPilotiValore: string;

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

  columnsToDisplay = ['nome', 'cognome', 'pilota', 'email', 'dettagli'];

  constructor(private personeAPI: PersoneService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.personeAPI.getList().subscribe(data => {
      this.datasource.data = data;
      this.valoriTabella = data;
      this.loading = false;
      this.filtroPilotiValore = 'tutti';
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  onChange($event: { value: string; }): void {
    this.filtroPilotiValore = $event.value;
    switch (this.filtroPilotiValore) {
      case 'tutti':
        this.datasource.data = this.valoriTabella;
        break;
      case 'piloti':
        this.datasource.data = this.valoriTabella.filter(persona => persona.pilota);
        break;
      case 'nonpiloti':
        this.datasource.data = this.valoriTabella.filter(persona => !persona.pilota);
        break;
      default:
        break;
    }
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  apriDettagli(persona: Persona): void {
    const dialogRef = this.dialog.open(PersoneDettaglioComponent, {data: persona});
  }
}
