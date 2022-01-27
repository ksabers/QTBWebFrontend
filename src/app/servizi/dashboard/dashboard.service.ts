import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../http/http.service';
import { OreDiVoloPerPilota } from '../../viewmodels/dashboard/oreDiVoloPerPilota';
import { OreDiVoloPerAereo } from '../../viewmodels/dashboard/oreDiVoloPerAereo';
import { CarburanteAnnualeJSON } from './../../viewmodels/dashboard/carburanteAnnualeJSON';

@Injectable({
  providedIn: 'root'
})
export class DashboardOreDiVoloPerPilotaService extends HttpService<OreDiVoloPerPilota>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/dashboard/oredivolopiloti';
  }
}

@Injectable({
  providedIn: 'root'
})
export class DashboardOreDiVoloPerAereoService extends HttpService<OreDiVoloPerAereo>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/dashboard/oredivoloaerei';
  }
}

@Injectable({
  providedIn: 'root'
})
export class DashboardCarburanteAnnualePerAereoService extends HttpService<CarburanteAnnualeJSON> {
  
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
   }

   getResourceUrl(): string {
    return '/api/dashboard/carburanteannuale';
  }
}

