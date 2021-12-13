import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Aereo } from '../../viewmodels/aerei/aereo';
import { AereiService } from './../../servizi/aerei.service/aerei.service';
import {ViewEncapsulation} from '@angular/core';
import { AereiDettaglioComponent } from './aerei-dettaglio/aerei-dettaglio.component';

@Component({
  selector: 'app-aerei',
  templateUrl: './aerei.component.html',
  styleUrls: ['./aerei.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AereiComponent implements OnInit  {

  loading = true;
  datasource = new MatTableDataSource<Aereo>();
  valoriTabella: Aereo[];

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

  columnsToDisplay = ['costruttore', 'modello', 'marche', 'dettagli'];

  constructor(private aereiAPI: AereiService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.aereiAPI.getList().subscribe(data => {
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

  apriDettagli(aereo: Aereo): void {
    const dialogRef = this.dialog.open(AereiDettaglioComponent, {data: aereo});
  }
}
