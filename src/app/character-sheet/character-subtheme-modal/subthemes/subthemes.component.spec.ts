import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SubthemeComponent} from './subtheme.component';
import {SharedModule} from "../../../shared/shared.module";
import {NgbActiveModal, NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {SubthemeType} from "../../../shared/theme-points/subthemes/subtheme-types.enum";
import {ThemeStrength} from "../../../shared/theme-points/theme-strength.enum";
import {Subtheme} from "../../../shared/theme-points/subthemes/subtheme";
import {DropdownValueObject} from "../../../shared/ui/dropdown/dropdown-value-object";
import {SUBTHEME_BONUS} from "../../../shared/constants/constants";
import {actionClickDropdownItemX} from "../../../shared/constants/testing-constants";

describe('SubthemeComponent', () => {
  let component: SubthemeComponent;
  let fixture: ComponentFixture<SubthemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [SubthemeComponent],
      providers: [NgbActiveModal, NgbDropdownConfig]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubthemeComponent);
    component = fixture.componentInstance;
    component.subtheme = new Subtheme(SubthemeType.WeaponSpecialization, ThemeStrength.None);
    component.assignedSubthemePoints = 0;
    component.subthemePointCap = 3;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get a dropdownValueObject[]', () => {
    let result = component.getDropdownValues();
    expect(result.length).toEqual(4);
    component.assignedSubthemePoints = 3;
    component.subtheme = new Subtheme(SubthemeType.Protector, ThemeStrength.Lesser);
    result = component.getDropdownValues();
    expect(result.length).toEqual(3);
    component.assignedSubthemePoints = 4;
    component.subtheme = new Subtheme(SubthemeType.Evasion, ThemeStrength.None);
    result = component.getDropdownValues();
    expect(result.length).toEqual(1);
    component.subtheme = new Subtheme(SubthemeType.Evasion, ThemeStrength.Minor);
    result = component.getDropdownValues();
    expect(result.length).toEqual(2);
  });

  it('should be able to load the selected dropdown value', () => {
    const ddo = new DropdownValueObject(0);
    expect(component.loadSelectedDropdownValue()).toEqual(ddo);
    const otherDd = new DropdownValueObject(2);
    component.subtheme = new Subtheme(SubthemeType.Protector, ThemeStrength.Lesser);
    expect(component.loadSelectedDropdownValue()).toEqual(otherDd);
  });

  it('should be able to reloadSubtheme and get the correct assignedSubtheme points', () => {
    component.subtheme = new Subtheme(SubthemeType.WeaponSpecialization, ThemeStrength.Lesser);
    component.assignedSubthemePoints = 2;
    component.reloadSubtheme(new DropdownValueObject(ThemeStrength.Greater));
    expect(component.subtheme.themeStrength).toEqual(ThemeStrength.Greater);

  });

  it('should be able to get the total subtheme points', () => {
    expect(component.totalAssignableSubthemePoints()).toEqual(1, "start out with 3 possible");
    component.reloadSubtheme(new DropdownValueObject(ThemeStrength.Lesser));
    expect(component.totalAssignableSubthemePoints()).toEqual(1, "assigning 2 doesn't change that");
    component.assignedSubthemePoints = 2;
    expect(component.totalAssignableSubthemePoints()).toEqual(1, "assigned 2 just means that the 2 assigned belong to this.");
    component.assignedSubthemePoints = 4;
    expect(component.totalAssignableSubthemePoints()).toEqual(2);
  });

  it('more testing involving the ability to get the total number of assignable subthemePoints', () => {
    component.subthemePointCap = 2;
    expect(component.totalAssignableSubthemePoints()).toEqual(2);
  });

  it('should be able to determine remaining subtheme points to assign', () => {
    expect(component.getRemainingSubthemePointsToAssign()).toEqual(3);
    component.reloadSubtheme(new DropdownValueObject(2));
    expect(component.getRemainingSubthemePointsToAssign()).toEqual(1);
    component.assignedSubthemePoints = 4;
    expect(component.getRemainingSubthemePointsToAssign()).toEqual(0);
  });

  it('should be able to get table data', () => {
    expect(component.getTableData()).toEqual(
      [SUBTHEME_BONUS["WeaponSpecialization"]["1"],
        SUBTHEME_BONUS["WeaponSpecialization"]["2"],
        SUBTHEME_BONUS["WeaponSpecialization"]["3"]
      ]);
    component.subtheme = new Subtheme(SubthemeType.Protector, ThemeStrength.None);
    fixture.detectChanges();
    expect(component.getTableData()).toEqual(
      [
        {
          Thorns: SUBTHEME_BONUS["Protector"]["1"]["Thorns"],
          ProtectorAura: SUBTHEME_BONUS["Protector"]["1"]["ProtectorAura"],
          RecoveryValueBonus: SUBTHEME_BONUS["Protector"]["1"]["RecoveryValueBonus"]
        },
        {
          Thorns: SUBTHEME_BONUS["Protector"]["2"]["Thorns"],
          ProtectorAura: SUBTHEME_BONUS["Protector"]["2"]["ProtectorAura"],
          RecoveryValueBonus: SUBTHEME_BONUS["Protector"]["2"]["RecoveryValueBonus"]
        }
      ]
    );
    component.subtheme = new Subtheme(SubthemeType.FindWeakness, ThemeStrength.None);
    fixture.detectChanges();
    expect(component.getTableData()).toEqual(
      [
        {
          Agile: SUBTHEME_BONUS["FindWeakness"]["1"]["Agile"],
          Balanced: SUBTHEME_BONUS["FindWeakness"]["1"]["Balanced"]
        },
        {
          Agile: SUBTHEME_BONUS["FindWeakness"]["2"]["Agile"],
          Balanced: SUBTHEME_BONUS["FindWeakness"]["2"]["Balanced"]
        },
        {
          Agile: SUBTHEME_BONUS["FindWeakness"]["3"]["Agile"],
          Balanced: SUBTHEME_BONUS["FindWeakness"]["3"]["Balanced"]
        }
      ],
      [

      ]
    );
  });

  it('should be able to get row header', () => {
    expect(component.getRowHeader(SUBTHEME_BONUS["Protector"]["1"]).length).toEqual(3);
  });

  it('should be able to get row data', () => {
    expect(component.getRowData(SUBTHEME_BONUS["Protector"]["1"], "Thorns").length).toEqual(10);
  });

  it('should update the subtheme when a new strength is selected', () => {
    actionClickDropdownItemX(fixture, "#subthemeDropdown", 1); // should equate to  1
    expect(component.subtheme.themeStrength).toEqual(1);

    expect(component.getRemainingSubthemePointsToAssign()).toEqual(2);
    expect(component.totalAssignableSubthemePointsForUI()).toEqual(3);

  });

  it('should be able to get the maximum number of themepoints that can be assigned', () => {

  });

  it('should be able to limit subtheme points based of simliar subthemes being assigned values', () => {
    component.subtheme = new Subtheme(SubthemeType.Duelist, ThemeStrength.Minor);
    component.assignedSubthemePoints = 4;
    component.subthemePointCap = 1;
    const result = component.totalAssignableSubthemePoints();
    const uiResult = component.totalAssignableSubthemePointsForUI();
    expect(result).toEqual(3);
    expect(uiResult).toEqual(1);
  });

  it('should limit max number of subtheme points to be equal to that of theme points', () => {
    const initalResult = component.totalAssignableSubthemePoints();
    expect(initalResult).toEqual(1);
    component.subtheme = new Subtheme(SubthemeType.Evasion, ThemeStrength.None);
    component.subthemePointCap = 2;
    const list = component.totalAssignableSubthemePoints();
    expect(list).toEqual(3);
  });

  it('should repsect subtheme points assigned to subthemes of the same theme type', () => {
    component.subthemePointCap = 1;
    component.subtheme = new Subtheme(SubthemeType.Duelist, ThemeStrength.Minor);
    component.assignedSubthemePoints = 3;
    const result = component.totalAssignableSubthemePoints();
    expect(result).toEqual(3);
  });
});
