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

  it('should reduce a characters movement when they are wearing really heavy ass armor', () => {
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
    characterFactoryService.assignAttributeStrength(bob, AttributeName.Quickness, AttributeStrength.Champion);
    expect(characterFactoryService.getInitiative(bob)).toEqual(10, "champion qu gives init 10");
    characterFactoryService.assignAttributeStrength(bob, AttributeName.Intuition, AttributeStrength.Champion);
    expect(characterFactoryService.getInitiative(bob)).toEqual(14, "champion qu & intu gives init 14");
  });

  it('should be able to get primary damage of a character', function () {
    const result = characterFactoryService.getWeaponDamage(bob, 0);
    expect(result).toBe("1d6+2");
    characterFactoryService.assignAttributeStrength(bob, AttributeName.Brawn, AttributeStrength.Normal);
    expect(characterFactoryService.getWeaponDamage(bob, 0)).toBe("1d6+2", "Brawn is still heroic because bob is a High Orc!");
    characterFactoryService.assignAttributeStrength(bob, AttributeName.Brawn, AttributeStrength.Champion);
    expect(characterFactoryService.getWeaponDamage(bob, 0)).toBe("1d6+3", "unarmed with some brawn");
  });

  it('should be able to assign attribute points to a character and follow valid attribute point logic', function () {
    characterFactoryService.assignAttributeStrength(bob, AttributeName.Agility, AttributeStrength.Heroic);
    expect(bob.attributes.get(AttributeName.Agility).attributeStrength).toEqual(AttributeStrength.Heroic);
    expect(bob.race.availableAttributePoints).toEqual(3);
  });

  it('should be able to prevent negative attribute assignment', function () {
    characterFactoryService.assignAttributeStrength(bob, AttributeName.Brawn, AttributeStrength.Normal);
    expect(bob.attributes.get(AttributeName.Brawn).attributeStrength).toEqual(AttributeStrength.Heroic);
    expect(bob.race.availableAttributePoints).toEqual(4);
  });

  it('should be able to prevent a character from assigning more attribute points than they have available', function () {
    characterFactoryService.assignAttributeStrength(bob, AttributeName.Agility, AttributeStrength.Legendary);
    characterFactoryService.assignAttributeStrength(bob, AttributeName.Vitality, AttributeStrength.Champion);
    expect(bob.race.availableAttributePoints).toEqual(0);
    expect(bob.attributes.get(AttributeName.Vitality).attributeStrength).toEqual(AttributeStrength.Normal);
  });

  it('should be able to see attribute bonus based off of selected race of character', function () {
    expect(bob.race.raceType).toBe(RaceType.HighOrc);
    expect(bob.attributes.get(AttributeName.Brawn).attributeStrength).toBe(AttributeStrength.Heroic);
  });

  it('should be able to character hit points', function () {
    let hp = characterFactoryService.getHitPoints(bob);
    expect(hp).toEqual(23);
    characterFactoryService.assignAttributeStrength(bob, AttributeName.Vitality, AttributeStrength.Heroic);
    hp = characterFactoryService.getHitPoints(bob);
    expect(hp).toEqual(27);
    expect(bob.race.availableAttributePoints).toEqual(3);
    characterFactoryService.assignCharacterLevel(bob, Level.Three);
    hp = characterFactoryService.getHitPoints(bob);
    expect(hp).toEqual(38);
    // TODO include something for talents
  });

  it('should allow humans to assign 6 available points', () => {
    const moe = characterFactoryService.getNewCharacter("Moe", RaceType.Human);
    expect(moe.race.availableAttributePoints).toEqual(6);
    characterFactoryService.assignAttributeStrength(moe, AttributeName.Brawn, AttributeStrength.Epic);
    characterFactoryService.assignAttributeStrength(moe, AttributeName.Agility, AttributeStrength.Legendary);
    expect(moe.race.availableAttributePoints).toEqual(3);
    characterFactoryService.assignAttributeStrength(moe, AttributeName.Agility, AttributeStrength.Epic);
    expect(moe.race.availableAttributePoints).toEqual(0);
  });

  // TODO include more test

  it('should be able to get a characters starting temporary hit points', () => {

  });

  it('should be able to get a characters active bonuses', () => {

  });

  it('should be able to get a characters passive bonuses', () => {

  });

  it('should be able to get recovery points', () => {

  });

  it('should be able to get startingDamageResist', () => {

  });

  it('should be able to get power points', () => {

  });

  it('should be able to get lasting damage resist', () => {

  });

  it('should be able to get critical Resist', () => {

  });

  it('should be able to get features', () => {

  });

  it('should be able to get mana', () => {

  });

  it('should be able to abilities', () => {

  });

  it('should be able to get passives', () => {

  });

  it('should be able to get powers', () => {

  });

  it('should be able to skills', () => {

  });

  it('should be able to get talents', () => {

  });

  it('should be able get magic defenses', () => {

  });

  it('should be able to get what attack types are active defense', () => {

  });

  it('should be able to get what kind of attacks are passive defense', () => {

  });

  it('should be able to equip a shield and make ranged defense be active', () => {

  });

  it('should be able to set a weapon to main hand', () => {

  });



});
