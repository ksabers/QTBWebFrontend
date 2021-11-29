import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { DashboardOreDiVoloPerPilotaService, DashboardOreDiVoloPerAereoService } from '../../servizi/dashboard.service/dashboard.service';
import { OreDiVoloPerAereo } from './../../viewmodels/dashboard/oreDiVoloPerAereo';
import { OreDiVoloPerPilota } from './../../viewmodels/dashboard/oreDiVoloPerPilota';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  valoriOrePerPilota: OreDiVoloPerPilota[];
  valoreMassimo1: number;
  valoriOrePerAereo: OreDiVoloPerAereo[];
  valoreMassimo2: number;

  loading1 = true;
  loading2 = true;

  constructor(private serv1: DashboardOreDiVoloPerPilotaService,
              private serv2: DashboardOreDiVoloPerAereoService) {}


  /**
   *   * Prende un qualunque array con valori da graficare, trova il massimo "value"
   * e restituisce il primo mumero superiore divisibile per 500 o 50 a seconda
   * che incremento sia 1000 0 100
   * (es. 2003 => 2500, 2705 => 3000 se incremento è 1000)
   * (es. 160 => 200, 125 => 150 se incremento è 100)
   *
   * @private
   * @param {*} valori
   * @param {number} incremento
   * @return {*}  {number}
   * @memberof DashboardComponent
   */
  private arrotonda(valori: any, incremento: number): number {
    const massimo = Math.max.apply(Math, valori.map(function(o) { return o.value; }));
    const valorePiuAlto = Math.ceil(massimo/incremento)*incremento;
    if ((valorePiuAlto - massimo > (incremento/2))) {
      return valorePiuAlto - (incremento/2);
    }
    else {
      return valorePiuAlto;
    }
  }

  ngOnInit(): void {
    this.serv1.getList().subscribe(data => {
      this.valoriOrePerPilota = data.slice(0, environment.dashboardPiloti);
      this.valoreMassimo1 = this.arrotonda(this.valoriOrePerPilota, 1000);
      this.loading1 = false;
    });

    this.serv2.getList().subscribe(data => {
      this.valoriOrePerAereo = data.slice(0, environment.dashboardAerei);
      this.valoreMassimo2 = this.arrotonda(this.valoriOrePerAereo, 100);
      this.loading2 = false;
    });
  }
}
