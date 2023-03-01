import { Component,  Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import { environment } from './../../../../environments/environment';
import { Aeroporto } from '../../../viewmodels/aeroporti/aeroporto';
import { UtilsService } from '../../../servizi/utils/utils.service';

import { latLng, tileLayer, Map, marker, Marker, icon, MapOptions } from 'leaflet';

@Component({
  selector: 'app-aeroporti-dettaglio',
  templateUrl: './aeroporti-dettaglio.component.html',
  styleUrls: ['./aeroporti-dettaglio.component.scss']
})
export class AeroportiDettaglioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public aeroporto: Aeroporto,
              private utils: UtilsService) { }

  private map: Map;
  options: MapOptions;
  layers: Marker[];

  iconaAeroporto = {
    icon: icon({
       iconSize: [48, 48],
       iconAnchor: [10, 41],
       popupAnchor: [2, -40],
      iconUrl: './../../../../assets/markers/airplane_blue.png',
      shadowUrl: './../../../../assets/markers/marker-shadow.png'
    })
  };

  testoTooltip = `
  <b>${this.aeroporto.denominazione? this.aeroporto.denominazione : this.aeroporto.nome}</b>
  <br>
  ${this.aeroporto.coordinate}
  `;

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

  inizializzaMappa(): void {
    const latitudine = this.utils.DMS2DD(this.aeroporto.coordinate.split('-')[0].trim());
    const longitudine = this.utils.DMS2DD(this.aeroporto.coordinate.split('-')[1].trim());
    this.options = {
      layers: [
        tileLayer(environment.mappa.tileLayer, 
        { 
          maxZoom: 18, 
          attribution: environment.mappa.attribuzione
        })
      ],
      zoom: 15,
      center: latLng(latitudine, longitudine)
    };
    this.layers = [marker([latitudine, longitudine], this.iconaAeroporto).bindTooltip(this.testoTooltip)]
  }

  copiaTesto(testo: string): void {
    navigator.clipboard.writeText(testo);
  }

  ngOnInit(): void {
    if (this.aeroporto.coordinate != '') {
      this.inizializzaMappa();
    }
  }
}
