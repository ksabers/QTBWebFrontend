import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'min2hhmm'
})
export class Min2hhmmPipe implements PipeTransform {

  transform(minuti: number): string {
    let ore = Math.trunc(minuti / 60);
    let resto = minuti % 60;
    if (resto == 0) {
      return ore.toString();
    }
    else {
      return ore + ':' + Math.abs(resto);
    }
  }
}
