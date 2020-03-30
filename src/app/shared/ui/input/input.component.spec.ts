import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {InputComponent} from './input.component';
import {By} from "@angular/platform-browser";
import {SharedModule} from "../../shared.module";
import {nextTick} from "q";

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to input data into the input', () => {
    spyOn(component.outGoingModel, "emit");
    const input = fixture.debugElement.query(By.css("input")).nativeElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe("");
    input.value = "Hello World";
    input.dispatchEvent(new Event("input"));
    expect(component.inputModel).toBe("Hello World");
    expect(component.outGoingModel.emit).toHaveBeenCalledWith("Hello World");
  });

  it('should be able start out with values placed in it', fakeAsync(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.inputModel = "bob";
    fixture.nativeElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    nextTick(() => {
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css("input")).nativeElement;
      expect(input.value).toBe("bob");
    });

  }));
});
