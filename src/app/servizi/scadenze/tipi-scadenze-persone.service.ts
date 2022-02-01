import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../http/http.service';
import { TipoScadenzaPersona } from 'src/app/viewmodels/scadenze/tipo-scadenza-persona';

@Injectable({
  providedIn: 'root'
})
export class TipiScadenzePersoneService extends HttpService<TipoScadenzaPersona>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/scadenzepersone/tipi';
  }
}
