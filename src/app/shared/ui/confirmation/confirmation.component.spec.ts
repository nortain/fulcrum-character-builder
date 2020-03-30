import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { ConfirmationComponent } from './confirmation.component';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {By} from "@angular/platform-browser";

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;
  let modal: NgbActiveModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationComponent ],
      providers: [NgbActiveModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    component.headerText = "Question of the day";
    component.bodyText = ["Would you like to die today?"];
    component.cancelText = "No";
    component.confirmText = "Yes";
    fixture.detectChanges();
  });

  beforeEach(inject([NgbActiveModal], (svc: NgbActiveModal) => {
    modal = svc;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should return true if the user clicks confirm', () => {
    spyOn(modal, "close");
    const confirm = fixture.debugElement.query(By.css("#confirmBtn"));
    confirm.nativeElement.click();
    fixture.detectChanges();
    expect(modal.close).toHaveBeenCalledWith(true);
  });

  it('should return false if the user clicks cancel', () => {
    spyOn(modal, "close");
    const confirm = fixture.debugElement.query(By.css("#cancelBtn"));
    confirm.nativeElement.click();
    fixture.detectChanges();
    expect(modal.close).toHaveBeenCalledWith(false);
  });
});
