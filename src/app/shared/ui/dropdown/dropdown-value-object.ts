export class DropdownValueObject {
  value: any;
  label: any;

  constructor(value: any, label?: any | null) {
    this.value = value;
    this.label = label ? label : value;
  }
}
