import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../http/http.service';
import { Scadenza } from '../../viewmodels/scadenze/scadenza';

@Injectable({
  providedIn: 'root'
})
export class ScadenzeService extends HttpService<Scadenza>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/scadenze/persone';
  }
}
