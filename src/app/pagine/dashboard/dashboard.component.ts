import { Component, OnInit } from '@angular/core';
import { DashboardOreDiVoloPerPilotaService, DashboardOreDiVoloPerAereoService } from '../../servizi/dashboard.service/dashboard.service';
import { OreDiVoloPerAereo } from 'src/app/viewmodels/dashboard/oreDiVoloPerAereo';
import { OreDiVoloPerPilota } from 'src/app/viewmodels/dashboard/oreDiVoloPerPilota';

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
   * Prende un qualunque array con valori da graficare, trova il massimo "value"
   * e restituisce il primo mumero superiore divisibile per 500
   * (es. 2003 => 2500, 2705 => 3000)
   *
   * @private
   * @param {*} valori
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
      this.valoriOrePerPilota = data;
      this.valoreMassimo1 = this.arrotonda(data, 1000);
      this.loading1 = false;
    });

    this.serv2.getList().subscribe(data => {
      this.valoriOrePerAereo = data;
      this.valoreMassimo2 = this.arrotonda(data, 100);
      this.loading2 = false;
    });
  }
}
