import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './../http/http.service';
import { TipoScadenzaAereo } from '../../viewmodels/tipi-scadenze-aerei/tipo-scadenza-aereo';

@Injectable({
  providedIn: 'root'
})
export class TipiScadenzeAereiService extends HttpService<TipoScadenzaAereo>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/tipiscadenzeaerei';
  }
}
