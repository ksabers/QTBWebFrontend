import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  addZero(i: any) {
    if (i < 10) {i = "0" + i}
    return i;
  }

  LocalDateTime(): string {
    const adesso = new Date();
    return adesso.getFullYear() + '-' + this.addZero(adesso.getMonth() + 1) + '-' 
           + this.addZero(adesso.getDate()) + 'T' + this.addZero(adesso.getHours()) 
           + ':' + this.addZero(adesso.getMinutes()); 
  }

  DMS2DD(coordinata: string): number {
    const posGradi = coordinata.indexOf('°');
    const posPrimi = coordinata.indexOf('′');
    const posSecondi = coordinata.indexOf('″');
    const gradi = parseFloat(coordinata.slice(0, posGradi));
    const primi = parseFloat(coordinata.slice(posGradi + 1, posPrimi));
    const secondi = parseFloat(coordinata.slice(posPrimi + 1, posSecondi));

    const decimale = gradi + (primi / 60) + (secondi / 3600);

    if ((coordinata.indexOf('E') != -1) || (coordinata.indexOf('N') != -1)) {
      return decimale;
    }
    else {
      return -decimale;
    }
  }
}
