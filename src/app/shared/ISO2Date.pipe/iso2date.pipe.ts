import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ISO2Date'
})
export class ISO2DatePipe implements PipeTransform {

  transform(dataISO: string): string {
    return new Date(dataISO).toLocaleDateString();
  }
}
