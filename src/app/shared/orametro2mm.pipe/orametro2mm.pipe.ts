import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orametro2mm'
})
export class Orametro2mmPipe implements PipeTransform {

  transform(orametro: number): number {
    return orametro % 60;
  }
}
