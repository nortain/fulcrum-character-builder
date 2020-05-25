import { Character } from './character';
import {RaceType} from "./race/race-type.enum";
import {AttributeStrength} from "../attribute/attribute-enums/attribute-strength.enum";
import {ArmorType} from "../armor/armor-type.enum";
import {Armor} from "../armor/armor";
import {STARTING_INITIATIVE, STARTING_MOVEMENT} from "../constants/constants";
import {ThemeStrength} from "../theme-points/theme-strength.enum";
import {Weapon} from "../weapon/weapon";
import {WeaponClass} from "../weapon/weapon-class.enum";
import {WeaponCategory} from "../weapon/weapon-category.enum";
import {AttributeName} from "../attribute/attribute-enums/attribute-name.enum";

describe('Character', () => {
  let bob: Character;

  beforeEach(() => {
    bob = new Character("Bob", RaceType.HighOrc);
  });

  it('should create an instance', () => {
    expect(new Character("Bob", RaceType.HighOrc)).toBeTruthy();
  });

  it('should be able to get default movement of 6', function () {
    expect(bob.getSpeed()).toEqual(STARTING_MOVEMENT);
  });

  it('should recognize that a characters movement is increased if they have epic agility', function () {
      bob.attributes.Agility.strength = AttributeStrength.Epic;
      expect(bob.getSpeed()).toEqual(7);
  });

  it('should reduce a characters speed when they are wearing really heavy ass armor', () => {
    bob.physicalDefense.armor = new Armor(ArmorType.HeavyArmor, "Platemail");
    expect(bob.getSpeed()).toEqual(5);
  });

  it('should be able to get the starting initiative for a character', () => {
    expect(bob.getInitiative()).toEqual(5);
  });

  it('should be get modified initiative when attributes are modified', () => {
    bob.attributes.Quickness.strength = AttributeStrength.Heroic;
    expect(bob.getInitiative()).toEqual(5, "heroic qu gives init 5");
    bob.attributes.Quickness.strength = AttributeStrength.Champion;
    expect(bob.getInitiative()).toEqual(8, "champion qu gives init 8");
    bob.attributes.Quickness.strength = AttributeStrength.Epic;
    expect(bob.getInitiative()).toEqual(9, "epic qu gives init 9");
    bob.attributes.Quickness.strength = AttributeStrength.Legendary;
    expect(bob.getInitiative()).toEqual(10, "legendary qu gives init 10");
    bob.attributes.Intuition.strength = AttributeStrength.Champion;
    expect(bob.getInitiative()).toEqual(14);
  });

  it('should get modified initiative as a result of having theme points in stealth', function () {
    bob.themePoints.stealth.setStrength(ThemeStrength.Minor);
    expect(bob.getInitiative()).toEqual(7);
    bob.themePoints.stealth.setStrength(ThemeStrength.Greater);
    expect(bob.getInitiative()).toEqual(11);
  });

  it('should be able to get primary damage of a character', function () {
    bob.attributes.Brawn.strength = AttributeStrength.Normal;
    expect(bob.getWeaponDamage(0)).toBe("2d6+3", "unarmed weapon");
    bob.attributes.Brawn.strength = AttributeStrength.Champion;
    expect(bob.getWeaponDamage(0)).toBe("2d6+7", "unarmed with some brawn");
  });

  it('should be able to assign attribute points to a character and follow valid attribute point logic', function () {
    bob.assignAttributePoint(AttributeStrength.Heroic, AttributeName.Agility);
    expect(bob.attributes.Agility.strength).toEqual(AttributeStrength.Heroic);
    expect(bob.availableAttributePoints).toEqual(3);
  });

  it('should be able to prevent negative attribute assignment', function () {
    bob.assignAttributePoint(AttributeStrength.Normal, AttributeName.Brawn);
    expect(bob.attributes.Brawn.strength).toEqual(AttributeStrength.Heroic);
    expect(bob.availableAttributePoints).toEqual(4);
  });

  it('should be able to prevent a character from assigning more attribute points than they have available', function () {
    bob.assignAttributePoint(AttributeStrength.Legendary, AttributeName.Agility);
    bob.assignAttributePoint(AttributeStrength.Champion, AttributeName.Vitality);
    expect(bob.availableAttributePoints).toEqual(0);
    expect(bob.attributes.Vitality.strength).toEqual(AttributeStrength.Normal);
  });

  it('should be able to see attribute bonus based off of selected race of character', function () {
    expect(bob.raceType).toBe(RaceType.HighOrc);
    expect(bob.attributes.Brawn.strength).toBe(AttributeStrength.Heroic);
  });

  it('should be able to assign an attribute', function () {
    bob.assignAttributePoint(AttributeStrength.Heroic, AttributeName.SelfDiscipline);
    expect(bob.attributes[AttributeName.SelfDiscipline].strength).toEqual(AttributeStrength.Heroic);
    expect(bob.availableAttributePoints).toEqual(3);
  });

  it('should allow humans to assign 6 available points', () => {
    const moe = new Character("Moe", RaceType.Human);
    expect(moe.availableAttributePoints).toEqual(6);
    moe.assignAttributePoint(AttributeStrength.Epic, AttributeName.Brawn);
    moe.assignAttributePoint(AttributeStrength.Legendary, AttributeName.Agility);
    expect(moe.availableAttributePoints).toEqual(3);
    moe.assignAttributePoint(AttributeStrength.Epic, AttributeName.Agility);
    expect(moe.availableAttributePoints).toEqual(0);
  });





});
