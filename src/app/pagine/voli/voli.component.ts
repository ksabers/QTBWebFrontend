import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Volo } from 'src/app/viewmodels/voli/volo';
//import { PersoneDettaglioComponent } from './persone-dettaglio/persone-dettaglio.component';
import { VoliService } from '../../servizi/voli.service/voli.service';

@Component({
  selector: 'app-voli',
  templateUrl: './voli.component.html',
  styleUrls: ['./voli.component.scss']
})
export class VoliComponent implements OnInit {

  loading = true;
  datasource = new MatTableDataSource<Volo>();
  valoriTabella: Volo[];

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

  columnsToDisplay = ['aereo', 'pilota', 'passeggero', 'data', 'durata', 'decollo', 'atterraggio', 'dettagli'];

  constructor(private voliAPI: VoliService,
              private dialog: MatDialog) { }


  ngOnInit(): void {
    this.voliAPI.getList().subscribe(data => {
      this.datasource.data = data;
      this.valoriTabella = data;
      this.loading = false;
    });

    // trucco per far funzionare il sorting quando le colonne si chiamano in modo diverso
    // dalle proprietà che devono essere ordinate
    this.datasource.sortingDataAccessor = (volo, parametro) => {
      switch (parametro) {
        case 'aereo':           // questo è il nome della colonna (il matColumnDef)
          return volo.marche;   // questa è la proprietà sulla quale fare l'ordinamento      
          break;
        case 'pilota':
          return volo.cognomePilota;
          break;
        case 'passeggero':
          return volo.cognomePasseggero;
          break;
        case 'data':
          return volo.oraFine;
        case 'decollo':
          return volo.aeroportoInizio;
          break;
        case 'atterraggio':
          return volo.aeroportoFine;
          break;
        default:
          return volo[parametro];
          break;
      }
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  apriDettagli(volo: Volo): void {
  }

}
