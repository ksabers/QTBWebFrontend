import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './../http/http.service';
import { TipoVolo } from '../../viewmodels/voli/tipo-volo';

@Injectable({
  providedIn: 'root'
})
export class TipiVoliService extends HttpService<TipoVolo>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/voli/tipi';
  }
}
