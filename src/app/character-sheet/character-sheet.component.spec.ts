import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSheetComponent} from './character-sheet.component';
import {SharedModule} from "../shared/shared.module";
import {NgbDropdown, NgbDropdownConfig, NgbDropdownMenu, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {actionClickDropdownItemX, mockCharacter} from "../shared/constants/testing-constants";
import {RaceType} from "../shared/character/race/race-type.enum";
import {Level} from "../shared/character/level.enum";
import {By} from "@angular/platform-browser";


import {RacialSubType} from "../shared/character/race/racial-sub-type.enum";
import {CharacterSheetModule} from "./character-sheet.module";
import {ThemeStrength} from "../shared/theme-points/theme-strength.enum";
import {AttributeStrength} from "../shared/attribute/attribute-strength.enum";
import {ArmorType} from "../shared/armor/armor-type.enum";
import {Armor} from "../shared/armor/armor";
import {ThemePointsContainer} from "../shared/theme-points/theme-points-container";


describe('CharacterSheetComponent', () => {
  let component: CharacterSheetComponent;
  let fixture: ComponentFixture<CharacterSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NgbModule, CharacterSheetModule],
      declarations: [],
      providers: [NgbDropdownConfig, NgbModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to reload a character', () => {
    component.character.name = "Bob";
    expect(component.character).toEqual(mockCharacter());
    component.reloadCharacter("raceType", RaceType.Burman);
    component.reloadCharacter("level", Level.Two);
    expect(component.character).not.toEqual(mockCharacter());
    expect(component.character.name).toBe("Bob");
    expect(component.character.raceType).toEqual(RaceType.Burman);
    expect(component.character.level).toEqual(2);
  });

  it('should be able to set character name via the input component', function () {
    expect(component.character.name).toBe("");
    const nameInput = fixture.debugElement.query(By.css("input#NameId")).nativeElement;
    nameInput.value = "Bob";
    nameInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.character.name).toBe("Bob");
  });

  it('should be able to reload a new character when modifying the race dropdown', () => {
    const raceDD = fixture.debugElement.query(By.css("#characterRace"));
    const raceDDButton = raceDD.query(By.directive(NgbDropdown)).query(By.css("button")).nativeElement;
    raceDDButton.click();
    fixture.detectChanges();
    const raceDDItem = raceDD.query(By.directive(NgbDropdownMenu)).queryAll(By.css("button.dropdown-item"));
    expect(raceDDItem.length).toBe(8);
    raceDDItem[2].nativeElement.click();
    fixture.detectChanges();
    expect(component.character.raceType).toBe(RaceType.Elder);
  });

  it('should be able to reload a new character when modifying the level dropdown', () => {
    const levelDD = fixture.debugElement.query(By.css("#characterLevel"));
    const levelDDButton = levelDD.query(By.directive(NgbDropdown)).query(By.css("button")).nativeElement;
    levelDDButton.click();
    fixture.detectChanges();
    const levelDDItem = levelDD.query(By.directive(NgbDropdownMenu)).queryAll(By.css("button.dropdown-item"));
    expect(levelDDItem.length).toBe(10);
    levelDDItem[2].nativeElement.click();
    fixture.detectChanges();
    expect(component.character.level).toBe(3);
  });

  it('should be able to update the theme points in the UI and see those changes reflected in the character data model', () => {
    actionClickDropdownItemX(fixture, "#combat", 1);
    expect(component.character.themePoints.combat.getStrength()).toBe(1);
  });

  it('should be able to select a racial subtype when choosing a primental', function () {
    actionClickDropdownItemX(fixture, "#characterRace", 7);
    actionClickDropdownItemX(fixture, "#characterSubRace", 1);
    const subType = component.character.racialSubType;
    expect(RacialSubType[subType]).toEqual(RacialSubType.Air);
  });

  it('should set sub race to null if the race does not have a subrace', function () {
    actionClickDropdownItemX(fixture, "#characterRace", 7);
    actionClickDropdownItemX(fixture, "#characterSubRace", 1);
    actionClickDropdownItemX(fixture, "#characterRace", 5);
    expect(component.character.racialSubType).toBeNull();
  });

  it('should be able to get hit points for a character', () => {
    expect(component.getHitPointsValue()).toEqual(40);
  });

  it('should be able to get hit points for a character with ranks in theme points', () => {
    component.character.themePoints.combat.setStrength(ThemeStrength.Lesser);
    expect(component.getHitPointsValue()).toEqual(44);
    component.character.themePoints.stealth.setStrength(ThemeStrength.Minor);
    expect(component.getHitPointsValue()).toEqual(45);
  });

  it('should be able to get hit points when a character has ranks in attributes', () => {
    component.character.attributes.Vitality.strength = AttributeStrength.Champion;
    expect(component.getHitPointsValue()).toEqual(48);
    component.character.attributes.Vitality.strength = AttributeStrength.Legendary;
    expect(component.getHitPointsValue()).toEqual(52);
    component.character.attributes.SelfDiscipline.strength = AttributeStrength.Heroic;
    expect(component.getHitPointsValue()).toEqual(53);
    component.character.attributes.SelfDiscipline.strength = AttributeStrength.Epic;
    expect(component.getHitPointsValue()).toEqual(56);
    component.character.attributes.Quickness.strength = AttributeStrength.Legendary;
    expect(component.getHitPointsValue()).toEqual(61);

  });

  it('should be able to get hit points when characters gain levels', () => {
    component.character.level = Level.Three;
    expect(component.getHitPointsValue()).toEqual(56);
    component.character.level = Level.Seven;
    expect(component.getHitPointsValue()).toEqual(88);
    component.character.level = Level.Ten;
    expect(component.getHitPointsValue()).toEqual(112
    );
  });

  it('should be able to get hit points when a character has theme points and levels', () => {
    component.character.themePoints.combat.setStrength(ThemeStrength.Lesser);
    component.character.level = Level.Four;
    expect(component.getHitPointsValue()).toEqual(71);
    component.character.themePoints.stealth.setStrength(ThemeStrength.Lesser);
    expect(component.getHitPointsValue()).toEqual(74);
    component.character.level = Level.Six;
    expect(component.getHitPointsValue()).toEqual(93);
  });

  it('should be able to get hit points when a character has theme points, levels and attributes', () => {
    component.character.level = Level.Two;
    component.character.themePoints.combat.setStrength(ThemeStrength.Lesser);
    component.character.themePoints.stealth.setStrength(ThemeStrength.Minor);
    component.character.attributes.Quickness.strength = AttributeStrength.Heroic;
    component.character.attributes.SelfDiscipline.strength = AttributeStrength.Heroic;
    component.character.attributes.Vitality.strength = AttributeStrength.Heroic;
    expect(component.getHitPointsValue()).toEqual(63);
  });

  it('should be able to get recoveries for a character', () => {
    expect(component.getRecoveries()).toEqual(6);
    component.character.attributes.Vitality.strength = AttributeStrength.Epic;
    expect(component.getRecoveries()).toEqual(7);
  });

  it('should be able to get out of combat recovery value', () => {
    expect(component.getOutofCombatRecoveryValue()).toEqual(18);
    component.character.themePoints.combat.setStrength(ThemeStrength.Minor);
    component.character.themePoints.stealth.setStrength(ThemeStrength.Minor);
    expect(component.getOutofCombatRecoveryValue()).toEqual(19);
    component.character.attributes.Vitality.strength = AttributeStrength.Heroic;
    component.character.attributes.Quickness.strength = AttributeStrength.Heroic;
    component.character.attributes.SelfDiscipline.strength = AttributeStrength.Heroic;
    expect(component.getOutofCombatRecoveryValue()).toEqual(22);
    component.startReloadWithRace(RaceType.Burman);
    expect(component.getOutofCombatRecoveryValue()).toEqual(23);
    component.character.themePoints.general.setStrength(ThemeStrength.Minor);
    expect(component.getOutofCombatRecoveryValue()).toEqual(24);
  });

  it('should be able to get recovery value', () => {
    expect(component.getRecoveryValue()).toEqual(10);
    component.character.themePoints.combat.setStrength(ThemeStrength.Minor);
    component.character.themePoints.stealth.setStrength(ThemeStrength.Minor);
    expect(component.getRecoveryValue()).toEqual(10);
    component.character.attributes.Vitality.strength = AttributeStrength.Heroic;
    component.character.attributes.Quickness.strength = AttributeStrength.Heroic;
    component.character.attributes.SelfDiscipline.strength = AttributeStrength.Heroic;
    expect(component.getRecoveryValue()).toEqual(12);
    component.startReloadWithRace(RaceType.Burman);
    expect(component.getRecoveryValue()).toEqual(13);
    component.character.themePoints.general.setStrength(ThemeStrength.Minor);
    expect(component.getRecoveryValue()).toEqual(13);
  });

  it('should be able to get power points of a character with attributes and a general theme point', () => {
    expect(component.getPowerPoints()).toEqual(2);
    component.character.attributes.SelfDiscipline.strength = AttributeStrength.Heroic;
    expect(component.getPowerPoints()).toEqual(4);
    component.character.attributes.Reasoning.strength = AttributeStrength.Epic;

    expect(component.getPowerPoints()).toEqual(5);
    component.character.attributes.Presence.strength = AttributeStrength.Legendary;
    expect(component.getPowerPoints()).toEqual(6);
    component.character.attributes.SelfDiscipline.strength = AttributeStrength.Legendary;
    expect(component.getPowerPoints()).toEqual(8);
    component.character.themePoints.general.setStrength(ThemeStrength.Minor);
    expect(component.getPowerPoints()).toEqual(9);
    component.startReloadWithRace(RaceType.Human);
    expect(component.getPowerPoints()).toEqual(10);
    component.character.level = Level.Four;
    expect(component.getPowerPoints()).toEqual(11);
  });

  it('should be able to get adrenaline points', () => {
    expect(component.getAdrenalinePoints()).toEqual(3);
    component.character.themePoints.magic.setStrength(ThemeStrength.Lesser);
    expect(component.getAdrenalinePoints()).toEqual(2);
    component.character.themePoints.general.setStrength(ThemeStrength.Minor);
    expect(component.getAdrenalinePoints()).toEqual(1);
    component.character.themePoints.magic.setStrength(ThemeStrength.Minor);
    expect(component.getAdrenalinePoints()).toEqual(2);
    component.character.themePoints.magic.setStrength(ThemeStrength.Greater);
    expect(component.getAdrenalinePoints()).toEqual(0);

  });

  it('should get a characters critical reduction', () => {
    expect(component.getCriticalReductionValue()).toEqual(0);
    component.character.physicalDefense.equipArmor(new Armor(ArmorType.LightArmor));
    expect(component.getCriticalReductionValue()).toEqual(1);
    component.character.physicalDefense.equipArmor(new Armor(ArmorType.MediumArmor));
    expect(component.getCriticalReductionValue()).toEqual(2);
    component.character.physicalDefense.equipArmor(new Armor(ArmorType.HeavyArmor));
    expect(component.getCriticalReductionValue()).toEqual(3);
  });

  it('should be able to get magic resistance of a character', () => {
    expect(component.getPrimaryMagicResistanceValue()).toEqual(0);
    component.character.racialSubType = RacialSubType.Air;
    component.startReloadWithRace(RaceType.Primental);
    expect(component.getPrimaryMagicResistanceValue()).toEqual(3);
  });

  it('should only load new subthemes if subthemePoints were changed', () => {
    expect(component.character.subthemes.getAvailableSubthemePoints("combat")).toEqual(0);
    const original = component.character.subthemes;
    component.updateThemePoints(new ThemePointsContainer(ThemeStrength.Lesser, ThemeStrength.Minor));
    expect(component.character.subthemes).not.toEqual(original);
    expect(component.character.subthemes.getAvailableSubthemePoints("combat")).toEqual(2);
    const old = component.character.subthemes;
    component.startReloadWithRace(RaceType.Human);
    expect(component.character.subthemes).toEqual(old);
  });

  it('should show a button for subtheme points if at least one of magic, combat or stealth theme points are selected', () => {
    component.updateThemePoints(new ThemePointsContainer(0, 0, 0, 1));
    fixture.detectChanges();
    let subthemeBtn = fixture.debugElement.queryAll(By.css("#subthemesBtn"));
    expect(subthemeBtn.length).toEqual(0, "With no subthemes button should be hidden");
    actionClickDropdownItemX(fixture, "#combat", 2);
    subthemeBtn = fixture.debugElement.queryAll(By.css("#subthemesBtn"));
    expect(subthemeBtn.length).toEqual(1, "button should be visiable now");
  });

});
