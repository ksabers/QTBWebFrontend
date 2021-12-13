import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guard/auth.guard';

import { DashboardComponent } from './pagine/dashboard/dashboard.component';
import { PersoneComponent } from './pagine/persone/persone.component';
import { VoliComponent } from './pagine/voli/voli.component';
import { VoliAddComponent } from './pagine/voli/voli-add/voli-add.component';
import { AereiComponent } from './pagine/aerei/aerei.component';
import { AeroportiComponent } from './pagine/aeroporti/aeroporti.component';
import { ManutenzioniComponent } from './pagine/manutenzioni/manutenzioni.component';
import { ScadenzeComponent } from './pagine/scadenze/scadenze.component';
import { IntestazioneComponent } from './print/intestazione/intestazione.component';
import { QtbSingoloComponent } from './print/qtb-singolo/qtb-singolo.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  { path: 'print',
  outlet: 'print',
  component: IntestazioneComponent,
  children: [
    { path: 'qtb', component: QtbSingoloComponent }
  ]
},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'persone',
    component: PersoneComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'voli',
    component: VoliComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'voli-add',
    component: VoliAddComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'aerei',
    component: AereiComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'aeroporti',
    component: AeroportiComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'manutenzioni',
    component: ManutenzioniComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'scadenze',
    component: ScadenzeComponent,
    canActivate: [AuthGuard]
  },

    // otherwise redirect to home
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
