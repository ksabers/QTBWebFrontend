import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './../http.service/http.service';
import { Scadenza } from 'src/app/viewmodels/scadenza';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScadenzePersoneService extends HttpService<Scadenza>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/scadenze/persone/' + environment.giorniScadenze.toString();
  }
}
