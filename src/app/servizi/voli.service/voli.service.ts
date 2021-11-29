import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './../http.service/http.service';
import { Volo } from './../../viewmodels/voli/volo';

@Injectable({
  providedIn: 'root'
})
export class VoliService extends HttpService<Volo>{

  /**
   * Creates an instance of VoliService.
   * @param {*} override
   * @param {HttpClient} httpClient
   * @memberof VoliService
   */
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   /**
    * 
    * @return {*}  {string}
    * @memberof VoliService
    */
   getResourceUrl(): string {
    return '/api/voli';
  }
}
