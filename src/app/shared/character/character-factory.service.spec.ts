import {RaceType} from "./race/race-type.enum";
import {AttributeStrength} from "../attribute/attribute-enums/attribute-strength.enum";
import {ArmorType} from "../armor/armor-type.enum";
import {Armor} from "../armor/armor";
import {STARTING_MOVEMENT} from "../constants/constants";
import {CharacterFactoryService} from "./character-factory.service";
import {TestBed} from "@angular/core/testing";
import {CharacterModel} from "./character-model";
import {AttributeFactoryService} from "../attribute/attribute-factory.service";
import {AttributeService} from "../attribute/attribute.service";
import {AttributeFactoryServiceStub, CharacterFactoryServiceStub} from "../constants/testing-stub-classes";
import {RaceFactoryService} from "./race/race-factory.service";

// TODO when character factory service is done
describe('Character', () => {
  let characterFactoryService: CharacterFactoryService;
  let raceService: RaceFactoryService;
  let attributeService: AttributeFactoryService;
  let bob: CharacterModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacterFactoryService, {
          provide: AttributeFactoryService, useClass: AttributeFactoryServiceStub
        }, {
          provide: RaceFactoryService, useClass: RaceFactoryService
        }]
    });
    characterFactoryService = TestBed.inject<CharacterFactoryService>(CharacterFactoryService);
    raceService = TestBed.inject<RaceFactoryService>(RaceFactoryService);
    attributeService = TestBed.inject<AttributeFactoryService>(AttributeFactoryService);
    bob = characterFactoryService.getNewCharacter("Bob", RaceType.HighOrc);
  });

  it('should create an instance', () => {
    expect(bob).toBeTruthy();
  });

  it('should be able to get default movement of 6', function () {
    expect(characterFactoryService.getSpeed(bob)).toEqual(STARTING_MOVEMENT);
  });

  // it('should recognize that a characters movement is increased if they have epic agility', function () {
  //   bob.attributes.["Agility"].strength = AttributeStrength.Epic;
  //
  //   expect(characterFactoryService.getSpeed(bob)).toEqual(7);
  // });

  // it('should reduce a characters speed when they are wearing really heavy ass armor', () => {
  //   characterFactoryService.physicalDefense.armor = new Armor(ArmorType.HeavyArmor, "Platemail");
  //   expect(characterFactoryService.getSpeed()).toEqual(5);
  // });
  //
  // it('should be able to get the starting initiative for a character', () => {
  //   expect(characterFactoryService.getInitiative()).toEqual(5);
  // });
  //
  // it('should be get modified initiative when attributes are modified', () => {
  //   bob.attributes.Quickness.strength = AttributeStrength.Heroic;
  //   expect(bob.getInitiative()).toEqual(5, "heroic qu gives init 5");
  //   bob.attributes.Quickness.strength = AttributeStrength.Champion;
  //   expect(bob.getInitiative()).toEqual(8, "champion qu gives init 8");
  //   bob.attributes.Quickness.strength = AttributeStrength.Epic;
  //   expect(bob.getInitiative()).toEqual(9, "epic qu gives init 9");
  //   bob.attributes.Quickness.strength = AttributeStrength.Legendary;
  //   expect(bob.getInitiative()).toEqual(10, "legendary qu gives init 10");
  //   bob.attributes.Intuition.strength = AttributeStrength.Champion;
  //   expect(bob.getInitiative()).toEqual(14);
  // });
  //
  // it('should get modified initiative as a result of having theme points in stealth', function () {
  //   bob.themePoints.stealth.setStrength(ThemeStrength.Minor);
  //   expect(bob.getInitiative()).toEqual(7);
  //   bob.themePoints.stealth.setStrength(ThemeStrength.Greater);
  //   expect(bob.getInitiative()).toEqual(11);
  // });
  //
  // it('should be able to get primary damage of a character', function () {
  //   bob.attributes.Brawn.strength = AttributeStrength.Normal;
  //   expect(bob.getWeaponDamage(0)).toBe("2d6+3", "unarmed weapon");
  //   bob.attributes.Brawn.strength = AttributeStrength.Champion;
  //   expect(bob.getWeaponDamage(0)).toBe("2d6+7", "unarmed with some brawn");
  // });
  //
  // it('should be able to assign attribute points to a character and follow valid attribute point logic', function () {
  //   bob.assignAttributeStrength(AttributeStrength.Heroic, AttributeName.Agility);
  //   expect(bob.attributes.Agility.strength).toEqual(AttributeStrength.Heroic);
  //   expect(bob.availableAttributePoints).toEqual(3);
  // });
  //
  // it('should be able to prevent negative attribute assignment', function () {
  //   bob.assignAttributeStrength(AttributeStrength.Normal, AttributeName.Brawn);
  //   expect(bob.attributes.Brawn.strength).toEqual(AttributeStrength.Heroic);
  //   expect(bob.availableAttributePoints).toEqual(4);
  // });
  //
  // it('should be able to prevent a character from assigning more attribute points than they have available', function () {
  //   bob.assignAttributeStrength(AttributeStrength.Legendary, AttributeName.Agility);
  //   bob.assignAttributeStrength(AttributeStrength.Champion, AttributeName.Vitality);
  //   expect(bob.availableAttributePoints).toEqual(0);
  //   expect(bob.attributes.Vitality.strength).toEqual(AttributeStrength.Normal);
  // });
  //
  // it('should be able to see attribute bonus based off of selected race of character', function () {
  //   expect(bob.raceType).toBe(RaceType.HighOrc);
  //   expect(bob.attributes.Brawn.strength).toBe(AttributeStrength.Heroic);
  // });
  //
  // it('should be able to assign an attribute', function () {
  //   bob.assignAttributeStrength(AttributeStrength.Heroic, AttributeName.SelfDiscipline);
  //   expect(bob.attributes[AttributeName.SelfDiscipline].strength).toEqual(AttributeStrength.Heroic);
  //   expect(bob.availableAttributePoints).toEqual(3);
  // });
  //
  // it('should allow humans to assign 6 available points', () => {
  //   const moe = new CharacterFactoryService("Moe", RaceType.Human);
  //   expect(moe.availableAttributePoints).toEqual(6);
  //   moe.assignAttributeStrength(AttributeStrength.Epic, AttributeName.Brawn);
  //   moe.assignAttributeStrength(AttributeStrength.Legendary, AttributeName.Agility);
  //   expect(moe.availableAttributePoints).toEqual(3);
  //   moe.assignAttributeStrength(AttributeStrength.Epic, AttributeName.Agility);
  //   expect(moe.availableAttributePoints).toEqual(0);
  // });


});
