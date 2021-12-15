import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './../http.service/http.service';
import { TipoAeroporto } from './../../viewmodels/tipi-aeroporti/tipo-aeroporto';

@Injectable({
  providedIn: 'root'
})
export class TipiAeroportiService extends HttpService<TipoAeroporto>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/tipiaeroporti';
  }
}
