import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../http/http.service';
import { TipoScadenzaAereo } from 'src/app/viewmodels/scadenze/tipo-scadenza-aereo';

@Injectable({
  providedIn: 'root'
})
export class TipiScadenzeAereiService extends HttpService<TipoScadenzaAereo>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/scadenzeaerei/tipi';
  }
}
