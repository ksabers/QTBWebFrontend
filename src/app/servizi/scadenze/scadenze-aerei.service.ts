import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../http/http.service';
import { ScadenzaAereo } from 'src/app/viewmodels/scadenze/scadenza-aereo';

@Injectable({
  providedIn: 'root'
})
export class ScadenzeAereiService extends HttpService<ScadenzaAereo>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/scadenzeaerei';
  }
}
