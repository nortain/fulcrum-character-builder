import {Precision} from "./precision.enum";
import {FieldMap} from "./field-map";
import {FieldType} from "./field-type.enum";


export class Field {

  precision = Precision.None;
  // objects that hold dynamic values
  replaceVal: FieldMap = {} as FieldMap;
  preMultiply: FieldMap = {} as FieldMap;
  addVal: FieldMap = {} as FieldMap;
  postMultiply: FieldMap = {} as FieldMap;

  constructor(private baseValue, private defaultValue?) {

  }

  /**This function is the money shot of what makes this class useful and important.
  Calling value will return a return value that is equal to the base value.
  If replaceVal, pre/postMultiply or addVal a property that matches the passed in filter
  OR
  no filter is passed in and a parameter lives on any of the replaceVal, pre/postMultiply, addVal objects then those operations will be carried out.
    See the spec file for examples
  */
  value(filter?: any, precision?: Precision): any {
    let returnValue = this.baseValue;
    for (const rep of Object.keys(this.replaceVal)) {
      if (!filter || rep === filter) {
        returnValue = this.replaceVal[rep];
      }
    }
    for (const pm of Object.keys(this.preMultiply)) {
      if (!filter || pm === filter) {
        returnValue = Number(returnValue) * Number(this.preMultiply[pm]);
      }
    }
    for (const a of Object.keys(this.addVal)) {
      if (!filter || a === filter) {
        returnValue = Number(returnValue) + Number(this.addVal[a]);
      }
    }
    for (const m of Object.keys(this.postMultiply)) {
      if (!filter || m === filter) {
        returnValue = Number(returnValue) * Number(this.postMultiply[m]);
      }
    }
    if (!precision) {
      precision = this.precision;
    }

    if (!returnValue && returnValue !== 0) {
      return this.defaultValue;
    } else if (typeof returnValue === "number") {
      return this.round(returnValue, precision);
    } else {
      return returnValue;
    }

  }

  /*
  * isDifferentFrom will use the incoming filter to determine if the baseValue exists and if so, if rounding the base is NOT equal
  * to the value(filter).  Or in otherwords  if there is a basevalue and given a filter that value basevalue is different, then return TRUE.
  * In all other cases return false.
  * */
  isDifferentFrom(filter: any): boolean {
    return this.baseValue && this.round(this.baseValue, this.precision) !== this.value(filter);
  }

  /**Rounding function that is using a preset of determined precision values based off of the enum by the same name.*/
  round(value: any, precision: Precision = Precision.None): any {
    if (typeof value === "number") {
      return Math.floor(precision * value) / precision;
    } else {
      return value;
    }
  }

  clearField(property: FieldType) {
    if (this[property]) {
      this[property] = {} as FieldMap;
    }
  }

  clearAll() {
    for (const type of Object.keys(FieldType)) {
      this.clearField(type as FieldType);
    }
  }
}

