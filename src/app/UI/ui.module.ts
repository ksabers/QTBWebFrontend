import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';

import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from '../UI/login/login.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { InfoComponent } from './info/info.component';
import { ConfermaComponent } from './conferma/conferma.component';

@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    ToolbarComponent,
    LoginComponent,
    ProfiloComponent,
    InfoComponent,
    ConfermaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    MainComponent,
    SidebarComponent,
    ToolbarComponent,
    LoginComponent,
    ProfiloComponent,
    InfoComponent,
    ConfermaComponent
  ]
})
export class UIModule { }
