import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './../http.service/http.service';
import { Persona } from 'src/app/viewmodels/persona';

@Injectable({
  providedIn: 'root'
})
export class PersoneService extends HttpService<Persona>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/persone';
  }
}
