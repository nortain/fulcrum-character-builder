import {RaceType} from "./race/race-type.enum";
import {AttributeStrength} from "../attribute/attribute-enums/attribute-strength.enum";
import {STARTING_MOVEMENT} from "../constants/constants";
import {CharacterFactoryService} from "./character-factory.service";
import {TestBed} from "@angular/core/testing";
import {CharacterModel} from "./character-model";
import {AttributeFactoryService} from "../attribute/attribute-factory.service";
import {AttributeFactoryServiceStub} from "../constants/testing-stub-classes";
import {RaceFactoryService} from "./race/race-factory.service";
import {AttributeName} from "../attribute/attribute-enums/attribute-name.enum";
import {AgilitySelections, AttributeSelectionsAlias} from "../attribute/attribute-constants/selected-bonus-groups";
import {ArmorType} from "../armor/armor-type.enum";
import {Armor} from "../armor/armor";
import {ThemeType} from "../theme-points/theme-type.enum";
import {ThemeStrength} from "../theme-points/theme-strength.enum";
import {Level} from "./level.enum";

// TODO when character factory service is done
describe('Character Service Factory', () => {
  let characterFactoryService: CharacterFactoryService;
  let raceService: RaceFactoryService;
  let attributeService: AttributeFactoryService;
  let bob: CharacterModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacterFactoryService,
        AttributeFactoryServiceStub,
        RaceFactoryService
      ]
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

  it('should be able to present attribute selections for a character even if there are no selections', () => {
    const result = characterFactoryService.presentAttributeSelections(bob, AttributeName.Agility);
    expect(result).toBeTruthy();
    expect(result.numberOfPicks).toEqual(0);
    expect(result.selections).toBeFalsy();
  });

  it('should present selections for a character when there are selections', () => {
    characterFactoryService.assignAttributeStrength(bob, AttributeName.Agility, AttributeStrength.Legendary);
    const selection = characterFactoryService.presentAttributeSelections(bob, AttributeName.Agility);
    expect(selection.numberOfPicks).toEqual(3);
    const choices = selection.selections as AgilitySelections;
    expect(choices.bonusToCritical).toBeTruthy();
    expect(choices.bonusToSpeedAndCritical).toBeTruthy();
    expect(choices.bonusToDualist).toBeTruthy();
    expect(choices.bonusToFindWeakness).toBeTruthy();
    expect(choices.bonusToFindWeakness.bonusTo.maxBonus).toEqual(5);
  });

  it('should recognize that a characters movement is increased if they have epic agility', function () {
    characterFactoryService.assignAttributeStrength(bob, AttributeName.Agility, AttributeStrength.Epic);
    const selection = characterFactoryService.presentAttributeSelections(bob, AttributeName.Agility);
    const type = "bonusToSpeedAndCritical" as keyof AttributeSelectionsAlias;
    characterFactoryService.selectAttributeBonus(bob, selection, type);
    expect(characterFactoryService.getSpeed(bob)).toEqual(7);
  });

  it('should be able to assign a new armor type to a character', () => {
    characterFactoryService.assignArmor(bob, new Armor(ArmorType.HeavyArmor, "Demonic Plate"));
    expect(bob.physicalDefense.armor.name).toEqual("Demonic Plate");
    expect(bob.physicalDefense.armor.getActiveDefense()).toEqual(14);
  });

  it('should reduce a characters speed when they are wearing really heavy ass armor', () => {
    characterFactoryService.assignArmor(bob, new Armor(ArmorType.HeavyArmor, "Demonic Plate"));
    expect(characterFactoryService.getSpeed(bob)).toEqual(5);
  });


  it('should be able to get the starting initiative for a character', () => {
    expect(characterFactoryService.getInitiative(bob)).toEqual(5);
    characterFactoryService.assignThemePoint(bob, ThemeType.Stealth, ThemeStrength.Lesser);
    expect(characterFactoryService.getInitiative(bob)).toEqual(9);
    characterFactoryService.assignAttributeStrength(bob, AttributeName.Quickness, AttributeStrength.Heroic);
    expect(characterFactoryService.getInitiative(bob)).toEqual(9);
    characterFactoryService.assignAttributeStrength(bob, AttributeName.Intuition, AttributeStrength.Heroic);
    expect(characterFactoryService.getInitiative(bob)).toEqual(11);
    characterFactoryService.assignCharacterRace(bob, raceService.getNewRace(RaceType.Human, Level.One));
    expect(characterFactoryService.getInitiative(bob)).toEqual(4);
    // TODO add test for talents
  });

  // TODO WORKING HERE
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
