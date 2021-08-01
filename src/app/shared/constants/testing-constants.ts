import {DropdownValueObject} from "../ui/dropdown/dropdown-value-object";
import {RaceType} from "../character/race/race-type.enum";
import {ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {PhysicalDefenseFactoryService} from "../character/physical-defense/physical-defense-factory.service";
import {ThemePointsContainer} from "../theme-points/theme-points-container";
import {ThemeStrength} from "../theme-points/theme-strength.enum";
import {Subtheme} from "../theme-points/subthemes/subtheme";
import {CasterType, SubthemeType} from "../theme-points/subthemes/subtheme-types.enum";
import {SpellType} from "../spells/enums/spell-type.enum";
import {SpellKeywords} from "../spells/spell-keywords.enum";
import {SpellDamageKeyword} from "../spells/enums/spell-damage-keyword.enum";
import {AreaOfEffect} from "../area-of-effect/area-of-effect";
import {Spell, SpellEffectType} from "../spells/spell";
import {ActionType} from "../action/action-type.enum";
import {DurationType} from "../duration/duration-type.enum";
import {Dice} from "../character/dice/dice";
import {DiceSize} from "../character/dice/dice-size.enum";
import {Minion} from "../minion/minion";
import {SpellChart} from "../spells/spell-chart";
import {AreaOfEffectTypes} from "../area-of-effect/area-of-effect-types.enum";
import {LevelRange} from "../spells/enums/level-range.enum";
import {AllDefenseType} from "../character/physical-defense/physical-defense-type.enum";
import {NgbDropdownMenu} from "@ng-bootstrap/ng-bootstrap";
import {CharacterModel} from "../character/character-model";
import {DefenseModel} from "../character/physical-defense/defense-model";
import {SpellName} from "../spells/enums/spell-name.enum";

export function mockDropdownData() {
  return [
    {value: 3, label: "bob"},
    {value: 5, label: "moe"},
    {value: -1, label: "tom"}
  ] as DropdownValueObject[];
}


export function mockCharacter(name = "Bob", raceType = RaceType.Altwani) {
  const character = new CharacterModel();
  return character;
}

export function mockSubtheme(subthemeType?: SubthemeType, str?: ThemeStrength): Subtheme {
  if (!subthemeType) {
    subthemeType = SubthemeType.Duelist;
  }
  str = !!str ? str : ThemeStrength.None;
  const sub = new Subtheme(subthemeType, str);
  return sub;
}

export function mockDefense() {
  return new DefenseModel();
}

export function mockKnack() {
  return {
    name: "Riposte",
    text: "You get shanked",
    subthemeName: "Riposte"
  };
}

export function mockThemePoints() {
  return new ThemePointsContainer(ThemeStrength.Minor, ThemeStrength.Minor, ThemeStrength.Minor, ThemeStrength.Minor);
}

/**This helper function for testing.
 It will click on a dropdown button matching the selector string and then choose the xth dropdown menu item.
 If the xth item doesn't exist an error is thrown.
 This will also update UI after the button click has been performed.*/
export function actionClickDropdownItemX(fixture: ComponentFixture<any>, selector: string, x = 0) {
  const dropdown = fixture.debugElement.query(By.css(selector));
  const dropdownBtn = dropdown.query(By.css("button")).nativeElement;
  dropdownBtn.click();
  const menuItem = dropdown.query(By.directive(NgbDropdownMenu)).queryAll(By.css("button.dropdown-item"));
  menuItem[x].nativeElement.click();
  fixture.detectChanges();
}

/**
 * This helper function will return the currently selected value fo the given fixture and dropdown selector
 * @param {ComponentFixture<any>} fixture
 * @param {string} selector
 */
export function actionGetDropdownValue(fixture: ComponentFixture<any>, selector: string) {
  const dropdown = fixture.debugElement.query(By.css(selector));
  const dropdownBtn = dropdown.query(By.css("button")).nativeElement;
  return dropdownBtn.innerText.trim();
}

export function mockAreaOfEffect(): AreaOfEffect {
  return {
    numberOfTargets: 2,
    range: 10,
    type: AreaOfEffectTypes.Zone

  } as AreaOfEffect;
}

export function mockSpellChart(): SpellChart {
  return {
    rowName: "Damage",
    levelRange: LevelRange.FIFTHTEEN,
    minValue: 12.11,
    maxValue: 38.33
  } as SpellChart;
}

export function mockSpell(): Spell {
  return {
    name: SpellName.Fireball,
    sphereName: CasterType.Archmage,
    defenseType: [AllDefenseType.Active, AllDefenseType.Passive],
    spellType: SpellType.DirectAttack,
    spellKeywords: [SpellKeywords.Manipulate],
    damageKeyword: SpellDamageKeyword.Wild,
    areaOfEffect: mockAreaOfEffect(),
    castAction: ActionType.Standard,
    duration: [DurationType.Immediate, DurationType.Encounter],
    critRoll: new Dice(1, DiceSize.d6, 1),
    special: [
      "This can only be cast once per encounter"
    ],
    minion: new Minion(),
    spellEffectText: [
      {
        type: SpellEffectType.SpellEffect,
        text: "You spit on the ground."
      }, {
        type: SpellEffectType.OnHit,
        text: "You launch a big ass ball of fiery death towards your enemies."
      }, {
        type: SpellEffectType.Bounce,
        text: "When you kill someone with this attack you can bounce it."
      }, {
        type: SpellEffectType.OnMiss,
        text: "Even if you miss you rock their face in."
      }, {
        type: SpellEffectType.AfterEffect,
        text: "This bitch keeps going like the energizer bunny."
      }

    ],
    spellChart: [
      mockSpellChart(),
      mockSpellChart()
    ]
  } as Spell;
}


