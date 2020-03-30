import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'castleCase'
})
export class CastleCasePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value) {
      let newString = value.replace(/[A-Z]/g, (x) => {
        return " " + x.toUpperCase();
      });
      newString = newString.trim();
      newString = newString.charAt(0).toUpperCase() + newString.slice(1, newString.length);
      return newString;
    }
    return value;
  }

}
