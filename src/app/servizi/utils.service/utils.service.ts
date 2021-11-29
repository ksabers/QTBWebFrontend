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
}
