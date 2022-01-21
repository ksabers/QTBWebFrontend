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

  /**
   * Trasforma una coordinata espressa in gradi/minuti/secondi
   * in una coordinata decimale (formato di Leaflet)
   *
   * @param {string} coordinata
   * @return {*}  {number}
   * @memberof UtilsService
   */
  DMS2DD(coordinata: string): number {
    const posGradi = coordinata.indexOf('°');
    const posPrimi = coordinata.indexOf('′');
    const posSecondi = coordinata.indexOf('″');
    const gradi = parseFloat(coordinata.slice(0, posGradi));
    const primi = parseFloat(coordinata.slice(posGradi + 1, posPrimi));
    const secondi = parseFloat(coordinata.slice(posPrimi + 1, posSecondi).replace(',', '.'));  // nel caso i decimali avessero la virgola invece del punto

    const decimale = gradi + (primi / 60) + (secondi / 3600);

    // Per Leaflet le coordinate nord e est sono positive, quelle sud e ovest sono negative
    if ((coordinata.indexOf('E') != -1) || (coordinata.indexOf('N') != -1)) {
      return decimale;
    }
    else {
      return -decimale;
    }
  }

  coordinate(gradiLat: string, minutiLat: string, secondiLat: string, nordSud: string,
             gradiLong: string, minutiLong: string, secondiLong: string, estOvest: string): string {

      if (gradiLat && minutiLat && secondiLat && gradiLong && minutiLong && secondiLong) {
        return gradiLat + '° ' + minutiLat + '′ ' + secondiLat + '″ ' + nordSud + ' - ' + 
               gradiLong + '° ' + minutiLong + '′ ' + secondiLong + '″ ' + estOvest
      } else {
        return null;
      }

  }

  /**
   * Ritorna la differenza in giorni tra due date
   *
   * @param {Date} dataInizio
   * @param {Date} dataFine
   * @return {*}  {number}
   * @memberof UtilsService
   */
  dateDiff(dataMaggiore: Date, dataMinore: Date): number {
    return Math.ceil((dataMaggiore.getTime() - dataMinore.getTime()) / (1000 * 3600 * 24))
  }

  sommaGiorni(giorni : number): Date {
    var dataFutura = new Date();
    dataFutura.setDate(dataFutura.getDate() + giorni);
    return dataFutura;
  }
}
