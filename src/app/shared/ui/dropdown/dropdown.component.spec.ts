import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import {mockDropdownData} from "../../constants/testing-constants";
import {By} from "@angular/platform-browser";

import {NgbDropdownConfig, NgbDropdownMenu, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbDropdownModule],
      declarations: [ DropdownComponent ],
      providers: [NgbDropdownConfig]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.values = mockDropdownData();
    component.labelName = "Bobs test";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to take in set of values', () => {
    spyOn(component.valueChange, "emit");
    const dd = fixture.debugElement.query(By.css("button"));
    expect(dd.nativeElement).toBeTruthy();
    dd.nativeElement.click();
    fixture.detectChanges();
    const menu = fixture.debugElement.query(By.directive(NgbDropdownMenu));
    expect(menu.nativeElement && menu.nativeElement.children[0]).toBeTruthy();
    menu.nativeElement.children[2].click();
    fixture.detectChanges();
    expect(component.valueChange.emit).toHaveBeenCalledWith(component.values[2]);

  });

  it('should be able to have a label', () => {
    const label = fixture.debugElement.query(By.css("label")).nativeElement;
    expect(label).toBeTruthy();
    expect(label.innerText).toBe("Bobs test");
  });

  it('should be able to get the selected value', () => {
    const selectedValue = component.selectedValue;
    expect(selectedValue).toEqual(mockDropdownData()[0]);
  });

  it('should be able to pre load a value', () => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.values = mockDropdownData();
    component.value = mockDropdownData()[1];
    fixture.detectChanges();
    expect(component.selectedValue).toEqual(mockDropdownData()[1]);
    const dd = fixture.debugElement.query(By.css("button"));
    expect(dd.nativeElement.innerText.trim()).toBe(mockDropdownData()[1].label);
  });

  it('should not have a br element in it', () => {
    const newLine = fixture.debugElement.query(By.css("br"));
    expect(newLine).toBeNull();
  });

  it('should be able to put label on a new line', () => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.values = mockDropdownData();
    component.labelName = "Bobs test";
    component.newLineLabelName = true;
    fixture.detectChanges();
    const newLine = fixture.debugElement.query(By.css(".newLineForLabel"));
    expect(newLine.nativeElement).toBeTruthy();
  });

  it('should be able to have a default value of select when asked', function () {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.values = mockDropdownData();
    component.defaultSelect = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css("button")).nativeElement;
    expect(btn.innerText.trim()).toBe("<Select>");
  });

  it('it should have a way to be mark itself in an error state', function () {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.values = mockDropdownData();
    component.isInvalid = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css("button")).nativeElement;
    expect(btn.classList).toContain("btn-outline-danger");
    const message = fixture.debugElement.query(By.css("div.errorMessage")).nativeElement;
    expect(message).toBeTruthy();
    component.isInvalid = false;
    btn.click();
    fixture.detectChanges();
    expect(btn.classList).not.toContain("btn-outline-danger");

  });

  it('should be able to have a fixed width when one is given', () => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.values = mockDropdownData();
    component.fixedWidth = 200;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css("button.btn-outline-primary")).nativeElement;
    expect(btn.clientWidth).toBeGreaterThan(190); // about 4 px gets shaved off in padding
  });
});
