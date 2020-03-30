import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'subthemes'
})
export class SubthemePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value) {
      const resultArray = value.replace(/[A-Z]/g, " $&");
      return resultArray.trim();
    } else {
      return value;
    }

  }

}
