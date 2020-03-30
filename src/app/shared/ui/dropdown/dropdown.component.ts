import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {DropdownValueObject} from "./dropdown-value-object";

@Component({
  selector: 'fulcrum-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements OnInit {
  @Input() labelName = ""; // label name or none at all
  @Input() newLineLabelName = false; // do we want the label on a new line
  @Input() values: DropdownValueObject[]; // array of possible values
  @Input() value: DropdownValueObject; // pre selected value on load
  @Input() defaultSelect = false; // should there be a select option
  @Input() isInvalid = false;
  @Input() fixedWidth: number;
  @Output() valueChange: EventEmitter<DropdownValueObject>; // emits state on change
  @Output() selectedValue: any; // change to dropdown value object


  constructor() {
    this.valueChange = new EventEmitter<DropdownValueObject>();
  }

  ngOnInit() {
    if (this.values && this.defaultSelect && this.values[0].value !== "<Select>") {
      this.values.unshift(new DropdownValueObject("<Select>"));
    }
    if (this.value) {
      this.selectedValue = this.value;
    } else if (this.values) {
      this.selectedValue = this.values[0];
    } else {
      throw new Error("Dropdown list cannot be empty");
    }
  }

  selectDropdown(value) {
    this.selectedValue = value;
    this.valueChange.emit(value);
  }

}
