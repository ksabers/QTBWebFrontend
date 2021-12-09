import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { latLng, tileLayer, Map, marker, Marker, icon, MapOptions } from 'leaflet';

import { Volo } from './../../../viewmodels/voli/volo';

@Component({
  selector: 'app-voli-dettaglio',
  templateUrl: './voli-dettaglio.component.html',
  styleUrls: ['./voli-dettaglio.component.scss']
})
export class VoliDettaglioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public volo: Volo) { }

  private map: Map;
  options: MapOptions;
  layers: Marker[];

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

  ngOnInit(): void {
  }

}
