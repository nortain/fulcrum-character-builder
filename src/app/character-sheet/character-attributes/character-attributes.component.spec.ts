import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterAttributesComponent} from './character-attributes.component';
import {SharedModule} from "../../shared/shared.module";
import {DropdownComponent} from "../../shared/ui/dropdown/dropdown.component";
import {By} from "@angular/platform-browser";
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {AttributeService} from "../../shared/attribute/attribute.service";

describe('CharacterAttributesComponent', () => {
  let component: CharacterAttributesComponent;
  let fixture: ComponentFixture<CharacterAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CharacterAttributesComponent],
      providers: [
        NgbDropdownConfig, AttributeService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a total of 8 dropdown components', function () {
    const count = fixture.debugElement.queryAll(By.directive(DropdownComponent));
    expect(count.length).toEqual(8);
  });
});
