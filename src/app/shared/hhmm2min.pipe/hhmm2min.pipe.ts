import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hhmm2min'
})
export class Hhmm2minPipe implements PipeTransform {

  transform(ore: number, minuti: number): number {
    return ore * 60 + minuti;
  }
}
