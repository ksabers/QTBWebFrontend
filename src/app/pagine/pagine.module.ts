import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';

import { PersoneComponent } from './persone/persone.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VoliComponent } from './voli/voli.component';
import { AereiComponent } from './aerei/aerei.component';
import { AeroportiComponent } from './aeroporti/aeroporti.component';
import { PersoneDettaglioComponent } from './persone/persone-dettaglio/persone-dettaglio.component';
import { ManutenzioniComponent } from './manutenzioni/manutenzioni.component';
import { ScadenzeComponent } from './scadenze/scadenze.component';
import { VoliAddComponent } from './voli/voli-add/voli-add.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PersoneComponent,
    VoliComponent,
    AereiComponent,
    AeroportiComponent,
    PersoneDettaglioComponent,
    ManutenzioniComponent,
    ScadenzeComponent,
    VoliAddComponent
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
    ManutenzioniComponent,
    ScadenzeComponent
  ]
})
export class PagineModule { }
