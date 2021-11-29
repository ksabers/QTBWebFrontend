import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orametro2hh'
})
export class Orametro2hhPipe implements PipeTransform {

  transform(orametro: number): number {
    return Math.floor(orametro / 60);
  }
}
