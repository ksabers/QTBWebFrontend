import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './../http/http.service';
import { TipoManutenzione } from '../../viewmodels/tipi-manutenzioni/tipo-manutenzione';

@Injectable({
  providedIn: 'root'
})
export class TipiManutenzioniService extends HttpService<TipoManutenzione>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/tipimanutenzioni';
  }
}
