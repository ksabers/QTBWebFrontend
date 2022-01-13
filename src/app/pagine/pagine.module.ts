import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { PersoneComponent } from './persone/persone.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VoliComponent } from './voli/voli.component';
import { AereiComponent } from './aerei/aerei.component';
import { AeroportiComponent } from './aeroporti/aeroporti.component';
import { ManutenzioniComponent } from './manutenzioni/manutenzioni.component';
import { ScadenzeComponent } from './scadenze/scadenze.component';

import { PersoneDettaglioComponent } from './persone/persone-dettaglio/persone-dettaglio.component';
import { VoliDettaglioComponent } from './/voli/voli-dettaglio/voli-dettaglio.component';
import { AeroportiDettaglioComponent } from './aeroporti/aeroporti-dettaglio/aeroporti-dettaglio.component';
import { ManutenzioniDettaglioComponent } from './manutenzioni/manutenzioni-dettaglio/manutenzioni-dettaglio.component';

import { VoliAddComponent } from './voli/voli-add/voli-add.component';
import { AeroportiAddComponent } from './aeroporti/aeroporti-add/aeroporti-add.component';
import { PersoneAddComponent } from './persone/persone-add/persone-add.component';
import { AereiAddComponent } from './aerei/aerei-add/aerei-add.component';
import { ManutenzioniAddComponent } from './manutenzioni/manutenzioni-add/manutenzioni-add.component';
import { Min2hhmmPipe } from '../shared/min2hhmm.pipe/min2hhmm.pipe';
import { ScadenzeAddComponent } from './scadenze/scadenze-add/scadenze-add.component';

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
    ManutenzioniDettaglioComponent,
    AeroportiAddComponent,
    PersoneAddComponent,
    AereiAddComponent,
    ManutenzioniAddComponent,
    ScadenzeAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LeafletModule
  ],
  exports: [
    LeafletModule,
    DashboardComponent,
    PersoneComponent,
    VoliComponent,
    VoliAddComponent,
    AeroportiAddComponent,
    AereiComponent,
    AeroportiComponent,
    PersoneDettaglioComponent,
    VoliDettaglioComponent,
    AeroportiDettaglioComponent,
    ManutenzioniComponent,
    ScadenzeComponent,
    ManutenzioniDettaglioComponent,
    PersoneAddComponent,
    AereiAddComponent,
    ManutenzioniAddComponent,
    ScadenzeAddComponent
  ],
  providers: [Min2hhmmPipe]
})
export class PagineModule { }
