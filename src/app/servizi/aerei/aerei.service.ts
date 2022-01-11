import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../http/http.service';
import { Aereo } from '../../viewmodels/aerei/aereo';

@Injectable({
  providedIn: 'root'
})
export class AereiService extends HttpService<Aereo>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/aerei';
  }
}
