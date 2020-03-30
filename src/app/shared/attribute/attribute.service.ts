import {Injectable} from '@angular/core';
import {DropdownValueObject} from "../ui/dropdown/dropdown-value-object";
import {Level} from "../character/level.enum";
import {ThemeStrength} from "../theme-points/theme-strength.enum";

@Injectable()
export class AttributeService {

  constructor() {
  }

  /**
   * As the name implies this takes in an enum and turns it into an array of strings.
   * @param enumeration to be converted
   * @param {boolean} isStringBased if the enum is a string based array or not
   * @returns {string[]} the array of string values of the enum
   */
  getEnumAsArrayOfStrings(enumeration, isStringBased = false): string[] {
    let names;
    if (!isStringBased) {
      names = Object.keys(enumeration).filter((keys) => {
        return !(parseInt(keys, 10) >= 0);
      });
    } else {
      names = Object.values(enumeration).filter((values: string) => {
        return !(parseInt(values, 10) >= 0);
      });
    }
    return names;
  }

  /**Takes in an enumeration and uses the keys and values to insert them into a dropdown value object. i.e. {label: "Normal" value: 0}.
  If the isAttribute boolean is set to true then the label is appended wrapped in parenthesis like {label: "Normal (0), value: 0}"*/
  getArrayOfDropdownValueObjectsFromEnum(enumeration, isAttribute = false): DropdownValueObject[] {
    const results: DropdownValueObject[] = [];
    const names = this.getEnumAsArrayOfStrings(enumeration);
    for (const name of names) {
      if (!isAttribute) {
        results.push({value: enumeration[name], label: name});
      } else {
        const attributeName = name + " (" + enumeration[name] + ")";
        results.push({value: enumeration[name], label: attributeName});
      }
    }
    return results;
  }

  /**
   * takes in an array and returns an array of dropdown objects with whatever is in the incoming array.
   * @param {any[]} array
   * @returns {DropdownValueObject[]}
   */
  buildArrayAsDropdownArray(array: any[]) {
    const results: DropdownValueObject[] = [];
    for (const a of array) {
      results.push({value: a, label: a});
    }
    return results;
  }

  getLevelAsArray(): Array<Level> {
    return [Level.One, Level.Two, Level.Three, Level.Four, Level.Five, Level.Six, Level.Seven, Level.Eight, Level.Nine, Level.Ten];
  }

  getThemePointStrength(isGeneral: boolean, totalThemePointAssigned: number): Array<ThemeStrength> {
    let resultArray = [];
    if (totalThemePointAssigned > 4) {
      totalThemePointAssigned = 4;
    }
    if (isGeneral) {
      totalThemePointAssigned = totalThemePointAssigned;
      resultArray = [ThemeStrength.None, ThemeStrength.Minor];
    } else {
      resultArray = [ThemeStrength.None, ThemeStrength.Minor, ThemeStrength.Lesser, ThemeStrength.Greater];
    }
    while (5 - totalThemePointAssigned < resultArray.length) {
      resultArray.pop();
    }
    return resultArray;

  }

}
