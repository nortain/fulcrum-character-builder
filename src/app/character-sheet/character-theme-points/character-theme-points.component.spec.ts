import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterThemePointsComponent} from './character-theme-points.component';
import {By} from "@angular/platform-browser";

import {SharedModule} from "../../shared/shared.module";
import {NgbDropdownConfig, NgbDropdownMenu} from "@ng-bootstrap/ng-bootstrap";
import {actionClickDropdownItemX} from "../../shared/constants/testing-constants";

describe('CharacterThemePointsComponent', () => {
  let component: CharacterThemePointsComponent;
  let fixture: ComponentFixture<CharacterThemePointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CharacterThemePointsComponent],
      providers: [NgbDropdownConfig]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterThemePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 drop down menus', () => {
    const count = fixture.debugElement.queryAll(By.directive(NgbDropdownMenu)).length;
    expect(count).toEqual(4);
  });

  it('should display how many theme points you have remaining', () => {
    const remaining = fixture.debugElement.query(By.css("#themePointsRemaining")).nativeElement;
    expect(remaining.innerText).toContain("4 of 4");
    const combat = fixture.debugElement.query(By.css("#combat"));
    const combatBtn = combat.query(By.css("button")).nativeElement;
    combatBtn.click();
    const menuItem = combat.query(By.directive(NgbDropdownMenu)).queryAll(By.css("button.dropdown-item"));
    menuItem[1].nativeElement.click(); // this should be value of 1
    fixture.detectChanges();
    expect(remaining.innerText).toContain("3 of 4");
  });

  it('should be able to reduce available theme points when selecting a value and return them when decreasing that value', () => {
    const remaining = fixture.debugElement.query(By.css("#themePointsRemaining")).nativeElement;
    actionClickDropdownItemX(fixture, "#combat", 3);
    expect(remaining.innerText).toContain("1 of 4");
    actionClickDropdownItemX(fixture, "#combat", 2);
    expect(remaining.innerText).toContain("2 of 4");
  });

  it('should be able to reduce available theme points cumulatively from multiple theme categories', () => {
    const remaining = fixture.debugElement.query(By.css("#themePointsRemaining")).nativeElement;
    actionClickDropdownItemX(fixture, "#stealth", 2);
    expect(remaining.innerText).toContain("2 of 4");
    actionClickDropdownItemX(fixture, "#magic", 2);
    expect(remaining.innerText).toContain("0 of 4");
  });

  it('should be able to reduce available theme points from each theme category', () => {
    const remaining = fixture.debugElement.query(By.css("#themePointsRemaining")).nativeElement;
    actionClickDropdownItemX(fixture, "#combat", 1);
    actionClickDropdownItemX(fixture, "#stealth", 1);
    actionClickDropdownItemX(fixture, "#magic", 1);
    actionClickDropdownItemX(fixture, "#general", 1);
    expect(remaining.innerText).toContain("0 of 4");

  });

  it('should not be able to reduce the available theme points value to a negitive value', () => {
    const remaining = fixture.debugElement.query(By.css("#themePointsRemaining")).nativeElement;
    actionClickDropdownItemX(fixture, "#combat", 3);
    try {
      actionClickDropdownItemX(fixture, "#stealth", 2);
      expect(true).toBeFalsy();
    } catch (err) {
      expect(remaining.innerText).not.toContain("-1 of 4");
      expect(remaining.innerText).toContain("1 of 4");
    }

  });
});
