import { Component,  Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aeroporto } from 'src/app/viewmodels/aeroporto';

import { latLng, tileLayer, Map } from 'leaflet';

@Component({
  selector: 'app-aeroporti-dettaglio',
  templateUrl: './aeroporti-dettaglio.component.html',
  styleUrls: ['./aeroporti-dettaglio.component.scss']
})
export class AeroportiDettaglioComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public aeroporto: Aeroporto) { }

  private map: Map;

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };


  onMapReady(map: Map) {
    this.map = map;
  }

  refresh() {
    this.map.invalidateSize();
  }

  ngOnInit(): void {
  }

}
