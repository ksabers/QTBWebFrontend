import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'min2hhmm'
})
export class Min2hhmmPipe implements PipeTransform {

  transform(minuti: number): string {
    return Math.trunc(minuti / 60) + ':' + (minuti % 60);
  }
}
