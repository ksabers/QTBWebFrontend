import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { UIModule } from './UI/ui.module';
import { PagineModule } from './pagine/pagine.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorIntlService } from './servizi/paginator.international/paginator.international.service';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { environment } from './../environments/environment'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    UIModule,
    PagineModule,
    AuthModule
  ],
  providers: [
    Title,
    {
      provide: MatPaginatorIntl,
      useFactory: (translate) => {
        const service = new PaginatorIntlService();
        service.injectTranslateService(translate);
        return service;
      },
      deps: [TranslateService]
    },
    { provide: MAT_DATE_LOCALE,
      useValue: environment.linguaggi[0].codice }  // questo serve per impostare la lingua dei datepicker
  ],
  exports: [TranslateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
