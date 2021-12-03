import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Aeroporto } from 'src/app/viewmodels/aeroporto';
import { AeroportiService } from '../../servizi/aeroporti.service/aeroporti.service';
import { AeroportiDettaglioComponent } from './aeroporti-dettaglio/aeroporti-dettaglio.component';

@Component({
  selector: 'app-aeroporti',
  templateUrl: './aeroporti.component.html',
  styleUrls: ['./aeroporti.component.scss']
})
export class AeroportiComponent implements OnInit {

  loading = true;
  datasource = new MatTableDataSource<Aeroporto>();
  valoriTabella: Aeroporto[];

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

  columnsToDisplay = ['nome', 'identificativo', 'coordinate', 'dettagli'];

  constructor(private aeroportiAPI: AeroportiService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.aeroportiAPI.getList().subscribe(data => {
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

  apriDettagli(aeroporto: Aeroporto): void {
    const dialogRef = this.dialog.open(AeroportiDettaglioComponent, {data: aeroporto});
  }
}
