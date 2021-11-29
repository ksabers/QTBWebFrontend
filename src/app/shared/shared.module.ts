import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SpinnerComponent } from './spinner.component/spinner.component';
import { Min2hhmmPipe } from './min2hhmm.pipe/min2hhmm.pipe';
import { Hhmm2minPipe } from './hhmm2min.pipe/hhmm2min.pipe';
import { ISO2DatePipe } from './ISO2Date.pipe/iso2date.pipe';
import { Orametro2hhPipe } from './orametro2hh.pipe/orametro2hh.pipe';
import { Orametro2mmPipe } from './orametro2mm.pipe/orametro2mm.pipe';

@NgModule({
  declarations: [
    SpinnerComponent,
    Min2hhmmPipe,
    Hhmm2minPipe,
    ISO2DatePipe,
    Orametro2hhPipe,
    Orametro2mmPipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  exports: [
    TranslateModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxChartsModule,
    SpinnerComponent,
    Min2hhmmPipe,
    Hhmm2minPipe,
    ISO2DatePipe,
    Orametro2hhPipe,
    Orametro2mmPipe
  ],
  providers: [
  ]
})
export class SharedModule { }
