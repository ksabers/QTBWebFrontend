import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { latLng, LatLngBounds, latLngBounds, tileLayer, Map, marker, Marker, icon, MapOptions, point} from 'leaflet';

import { environment } from './../../../../environments/environment';
import { Volo } from './../../../viewmodels/voli/volo';
import { UtilsService } from './../../../servizi/utils.service/utils.service';

@Component({
  selector: 'app-voli-dettaglio',
  templateUrl: './voli-dettaglio.component.html',
  styleUrls: ['./voli-dettaglio.component.scss']
})
export class VoliDettaglioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public volo: Volo,
              private utils: UtilsService) { }

  private map: Map;
  options: MapOptions;
  layers: Marker[];
  margini: LatLngBounds;

  iconaAeroportoDecollo = {
    icon: icon({
       iconSize: [48, 48],
       iconAnchor: [10, 41],
       popupAnchor: [2, -40],
      iconUrl: './../../../../assets/markers/airplane_green.png',
      shadowUrl: './../../../../assets/markers/marker-shadow.png'
    })
  };

  iconaAeroportoAtterraggio = {
    icon: icon({
       iconSize: [48, 48],
       iconAnchor: [10, 41],
       popupAnchor: [2, -40],
      iconUrl: './../../../../assets/markers/airplane_red.png',
      shadowUrl: './../../../../assets/markers/marker-shadow.png'
    })
  };

  testoTooltipDecollo = `
  <b>${this.volo.aeroportoInizio}</b>
  <br>
  ${this.volo.coordinateInizio}
  `;

  testoTooltipAtterraggio = `
  <b>${this.volo.aeroportoFine}</b>
  <br>
  ${this.volo.coordinateFine}
  `;

    /**
   * Funzione necessaria perché la mappa è all'interno di una tab. Ogni volta che si cambia tab
   * viene chiamata "invalidateSize" perché vengano ricalcolate le dimensioni.
   * Senza questa chiamata la mappa viene caricata solo parzialmente.
   * Dopo l'invalidateSize vengono fissati i margini per mostrare aeroporto di decollo e di atterraggio
   *
   * @memberof AeroportiDettaglioComponent
   */
     refresh() {
      this.map.invalidateSize();
      this.map.fitBounds(this.margini);
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

  inizializzaMappa(): void {
    const latitudineDecollo = this.utils.DMS2DD(this.volo.coordinateInizio.split('-')[0].trim());
    const longitudineDecollo = this.utils.DMS2DD(this.volo.coordinateInizio.split('-')[1].trim());
    const latitudineAtterraggio = this.utils.DMS2DD(this.volo.coordinateFine.split('-')[0].trim());
    const longitudineAtterraggio = this.utils.DMS2DD(this.volo.coordinateFine.split('-')[1].trim());

    this.options = {
      layers: [
        tileLayer(environment.mappa.tileLayer, 
        { 
          maxZoom: 18, 
          attribution: environment.mappa.attribuzione
        })
      ],
      zoom: 15,
      center: latLng(latitudineDecollo, longitudineDecollo)
    };

    this.margini = latLngBounds(latLng(latitudineDecollo, longitudineDecollo), latLng(latitudineAtterraggio, longitudineAtterraggio));

    this.layers= [
      marker([latitudineDecollo, longitudineDecollo], this.iconaAeroportoDecollo).bindTooltip(this.testoTooltipDecollo),
      marker([latitudineAtterraggio, longitudineAtterraggio], this.iconaAeroportoAtterraggio).bindTooltip(this.testoTooltipAtterraggio)
    ];
  }

  pesoCarburante(): number {
    return ((this.volo.carburanteInizialeSx + this.volo.carburanteInizialeDx) * environment.densitaCarburante) || null;
  }

  pesoTotale(): number {
    return ((this.volo.pesoVuoto + 
            this.volo.pesoOccupanti + 
            this.volo.bagaglio + 
            this.pesoCarburante()) || null);
  }

  ngOnInit(): void {
    if ((this.volo.coordinateInizio != '') && (this.volo.coordinateFine != '')) {
      this.inizializzaMappa();
    }
  }
}
