import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './../http.service/http.service';
import { Aeroporto } from './../../viewmodels/aeroporto';

@Injectable({
  providedIn: 'root'
})
export class AeroportiService extends HttpService<Aeroporto>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/aeroporti';
  }
}
