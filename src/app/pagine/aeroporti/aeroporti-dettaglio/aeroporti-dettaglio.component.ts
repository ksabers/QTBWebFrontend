import { Component,  Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Aeroporto } from './../../../viewmodels/aeroporto';
import { UtilsService } from './../../../servizi/utils.service/utils.service';

import { latLng, tileLayer, Map } from 'leaflet';

@Component({
  selector: 'app-aeroporti-dettaglio',
  templateUrl: './aeroporti-dettaglio.component.html',
  styleUrls: ['./aeroporti-dettaglio.component.scss']
})
export class AeroportiDettaglioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public aeroporto: Aeroporto,
              private utils: UtilsService) { }

  private map: Map;
  latitudineString: string;
  longitudineString: string;
  options: Object;

  /**
   * Funzione chiamata quando la mappa è pronta. Serve per farsi restituire l'istanza
   * della mappa stessa (che viene usata poi nel refresh)
   *
   * @param {Map} map
   * @memberof AeroportiDettaglioComponent
   */
  onMapReady(map: Map) {
    this.map = map;
  }

  /**
   * Funzione necessaria perché la mappa è all'interno di una tab. Ogni volta che si cambia tab
   * viene chiamata "invalidateSize" perché vengano ricalcolate le dimensioni.
   * Senza questa chiamata la mappa viene caricata solo parzialmente
   *
   * @memberof AeroportiDettaglioComponent
   */
  refresh() {
    this.map.invalidateSize();
  }

  ngOnInit(): void {
    if (this.aeroporto.coordinate != '') {
      this.latitudineString = this.aeroporto.coordinate.split('-')[0].trim();
      this.longitudineString = this.aeroporto.coordinate.split('-')[1].trim();
      this.options = {
        layers: [
          tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
          { 
            maxZoom: 18, 
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
          })
        ],
        zoom: 15,
        center: latLng(this.utils.DMS2DD(this.latitudineString), this.utils.DMS2DD(this.longitudineString))
      }; 
    }
  }
}
