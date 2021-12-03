import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';

import { PersoneComponent } from './persone/persone.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VoliComponent } from './voli/voli.component';
import { AereiComponent } from './aerei/aerei.component';
import { AeroportiComponent } from './aeroporti/aeroporti.component';

import { ManutenzioniComponent } from './manutenzioni/manutenzioni.component';
import { ScadenzeComponent } from './scadenze/scadenze.component';
import { VoliAddComponent } from './voli/voli-add/voli-add.component';

import { PersoneDettaglioComponent } from './persone/persone-dettaglio/persone-dettaglio.component';
import { VoliDettaglioComponent } from './/voli/voli-dettaglio/voli-dettaglio.component';
import { AeroportiDettaglioComponent } from './aeroporti/aeroporti-dettaglio/aeroporti-dettaglio.component';
import { ManutenzioniDettaglioComponent } from './manutenzioni/manutenzioni-dettaglio/manutenzioni-dettaglio.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PersoneComponent,
    VoliComponent,
    AereiComponent,
    AeroportiComponent,
    PersoneDettaglioComponent,
    VoliDettaglioComponent,
    ManutenzioniComponent,
    ScadenzeComponent,
    VoliAddComponent,
    AeroportiDettaglioComponent,
    ManutenzioniDettaglioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    DashboardComponent,
    PersoneComponent,
    VoliComponent,
    VoliAddComponent,
    AereiComponent,
    AeroportiComponent,
    PersoneDettaglioComponent,
    VoliDettaglioComponent,
    AeroportiDettaglioComponent,
    ManutenzioniComponent,
    ScadenzeComponent,
    ManutenzioniDettaglioComponent
  ]
})
export class PagineModule { }
