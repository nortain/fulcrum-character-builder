import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'fulcrum-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() labelName: string;
  @Input() fixedWidth: number;
  @Input() newLineLabelName = false;
  @Input() isInvalid = false;
  @Input() required = false;
  @Input() inputType = "text";
  @Input() inputModel: string;
  @Output() outGoingModel: EventEmitter<string>;

  constructor() {
    this.outGoingModel = new EventEmitter<string>();
  }

  changeModel(input: string) {
    if (input && input !== this.inputModel) {
      this.inputModel = input;
      this.outGoingModel.emit(input);
    }
  }

}
