import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './../http/http.service';
import { Manutenzione } from 'src/app/viewmodels/manutenzioni/manutenzione';

@Injectable({
  providedIn: 'root'
})
export class ManutenzioniService extends HttpService<Manutenzione>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/manutenzioni';
  }
}
