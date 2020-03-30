import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'corps-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent implements OnInit {
  @Input() confirmText = "Yes";
  @Input() cancelText = "No";
  @Input() headerText = "Warning Unsaved Changes";
  @Input() bodyText: string[];

  constructor(private activeModal: NgbActiveModal) {

  }

  ngOnInit() {

  }

  submit(value: boolean) {
    this.activeModal.close(value);
  }

  cancel() {
    this.activeModal.dismiss("User canceled the confirmation modal");
  }

}
