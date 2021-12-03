import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aeroporto } from 'src/app/viewmodels/aeroporto';

@Component({
  selector: 'app-aeroporti-dettaglio',
  templateUrl: './aeroporti-dettaglio.component.html',
  styleUrls: ['./aeroporti-dettaglio.component.scss']
})
export class AeroportiDettaglioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public aeroporto: Aeroporto) { }

  ngOnInit(): void {
  }

}
