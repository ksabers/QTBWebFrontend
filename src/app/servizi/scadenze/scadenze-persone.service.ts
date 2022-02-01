import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../http/http.service';
import { ScadenzaPersona } from 'src/app/viewmodels/scadenze/scadenza-persona';

@Injectable({
  providedIn: 'root'
})
export class ScadenzePersoneService extends HttpService<ScadenzaPersona>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/scadenzepersone';
  }
}
