import {RaceType} from "./race-type.enum";
import {VisionType} from "./vision-type.enum";
import {MagicDefenseType} from "../magic-defense/magic-defense-type.enum";
import {NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS} from "../../constants/constants";
import {RacialSubType} from "./racial-sub-type.enum";
import {ThemeType} from "../../theme-points/theme-type.enum";
import {AttributeName} from "../../attribute/attribute-enums/attribute-name.enum";
import {RaceFactoryService} from "./race-factory.service";
import {TestBed} from "@angular/core/testing";
import {Level} from "../level.enum";
import {RaceModel} from "./race-model";

describe('Race', () => {
  let elf: RaceModel, human: RaceModel, dwarf: RaceModel, prim: RaceModel, fey: RaceModel,
    halfling: RaceModel, orc: RaceModel, elder: RaceModel;
  let service: RaceFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaceFactoryService]
    });
    service = TestBed.inject<RaceFactoryService>(RaceFactoryService);
    elf = service.getNewRace(RaceType.Altwani, Level.One);
    human = service.getNewRace(RaceType.Human, Level.One);
    dwarf = service.getNewRace(RaceType.Burman, Level.One);
    prim = service.getNewRace(RaceType.Primental, Level.One);
    fey = service.getNewRace(RaceType.Feydra, Level.One);
    halfling = service.getNewRace(RaceType.Halfling, Level.One);
    orc = service.getNewRace(RaceType.HighOrc, Level.One);
    elder = service.getNewRace(RaceType.Elder, Level.One);
  });

  it('should create an instance of race', () => {
    expect(orc).toBeTruthy();
  });

  it('should be able to create a level 4 burman who has a recovery bonus of 2', () => {
    const burman = service.getNewRace(RaceType.Burman, 4);
    expect(burman.recoveryBonus).toEqual(2);
    expect(human.recoveryBonus).toEqual(0);
  });

  it('should be able to create a a few different characters with different vision types', () => {
    expect(human.vision).toBe(VisionType.Normal);
    expect(elf.vision).toBe(VisionType.Low);
    expect(dwarf.vision).toBe(VisionType.Low);
  });

  it('should be able to figure out what a race\s magicical defensive bonus is', () => {
    expect(fey.magicDefenseBonus).toBe(MagicDefenseType.Reflex);
    expect(halfling.magicDefenseBonus).toBe(MagicDefenseType.Fortitude);
    expect(dwarf.magicDefenseBonus).toBe(MagicDefenseType.Will);
  });

  it('should be able to determine what a race\'s starting attribute points are', () => {
    expect(human.availableAttributePoints).toEqual(6);
    expect(elder.availableAttributePoints).toEqual(NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS);
    expect(halfling.availableAttributePoints).toEqual(NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS);
    expect(orc.availableAttributePoints).toEqual(NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS);

  });

  it('should be able to determine what the bonus power points are', () => {
    expect(human.powerPointBonus).toEqual(1);
    expect(dwarf.powerPointBonus).toEqual(0);
    expect(fey.powerPointBonus).toEqual(0);
  });

  it('should be able to get skill point bonus', () => {
    expect(human.skillPointBonus).toEqual(1);
    expect(orc.skillPointBonus).toEqual(0);
    expect(elf.skillPointBonus).toEqual(0);
  });

  it('should be able to determine if a race has racial restrictions', () => {
    expect(halfling.racialRestriction).toBe("Can't use two handed melee weapons");
    expect(elder.racialRestriction).toBe("");
    expect(prim.racialRestriction).toBe("");
  });

  it('should be able to get formatted text for a dwarf\'s virile recovery', () => {
    expect(service.formatText(dwarf, dwarf.passiveBonuses[0].value)).toBe("Increase your recovery value by 1");
  });

  it('should be able to get a dwarf\'s tough as nails bonus in a formatted version for at level 5', () => {
    const burman = service.getNewRace(RaceType.Burman, 5);
    expect(service.formatText(burman, burman.activeBonuses[0].value)).toContain("minor action you gain 4 temporary hit points and");
  });

  it(' should be able to format text of the elder\'s active bonus resistance of the ancients', () => {
    expect(service.formatText(elder, elder.activeBonuses[0].value)).toBe("As a minor action you can remove all decaying effects on you and reduce your ongoing by 3");
  });

  it('should be able to format text when the bonus is a string', () => {
    expect(service.formatText(fey, fey.activeBonuses[0].value)).toBe("As a minor action you gain advantage to the first roll of an attack or spell cast this turn.  You also increase the damage inflicted to all targets by 1 extra damage die.");
  });

  it('should be able to format text for an air primental\'s elemental resistance', () => {
    prim = service.getNewRace(RaceType.Primental, Level.One, RacialSubType.Air);
    expect(service.formatText(prim, prim.passiveBonuses[0].value)).toBe("You gain 2 resistance to the Lightning keyword and 1 to all other magic damage keywords");
  });

  it('should be able to format test for a fire primental\'s active elemental release', () => {
    prim = service.getNewRace(RaceType.Primental, Level.One, RacialSubType.Fire);
    expect(service.formatText(prim, prim.activeBonuses[0].value)).toBe("As a minor action any successful attacks gain the heat keyword and do an additional 1d6+2 heat damage (roll once).");
  });

  it('should be able to format the text for the earth elementals active elemental power', () => {
    prim = service.getNewRace(RaceType.Primental, Level.Six, RacialSubType.Earth);
    expect(service.formatText(prim, prim.activeBonuses[0].value)).toBe("As a minor action strike the ground with tremendous force.  All adjacent enemies that are one size larger or less are knocked prone and any knockdown resistant creatures must make a DC 17 saving throw to avoid the effect.");
  });

  it('should be able to format text for the water elementals passive power', function () {
    prim = service.getNewRace(RaceType.Primental, Level.Three, RacialSubType.Water);
    expect(service.formatText(prim, prim.activeBonuses[0].value)).toBe("As a swift action you ignore all difficult terrain and your movement does not provoke opportunity attacks until the end of your turn.");
  });

  it('should be able to format text for the human active power', function () {
    human = service.getNewRace(RaceType.Human, 7);
    expect(service.formatText(human, human.activeBonuses[0].name)).toBe("Oh the Humanity");
    expect(service.formatText(human, human.activeBonuses[0].value)).toBe("As a minor action you can gain a +3 to hit with all attacks and any critical rolls gain 1 additional die until the end of your turn.");
  });

  it('should be able to get the talent bonus for a given race', function () {
    expect(human.talentBonus[0]).toBe(ThemeType.General);
    expect(elf.talentBonus[0]).toBe(ThemeType.Stealth);
    expect(elder.talentBonus.length).toBe(1);
    expect(orc.talentBonus[0]).toBe(ThemeType.Combat);
    expect(prim.talentBonus[0]).toBe(ThemeType.Magic);
  });

  it('should be able to determine the starting attributes for a given race', function () {
    expect(dwarf.startingAttributes).toContain(AttributeName.Vitality);
    expect(dwarf.startingAttributes).toContain(AttributeName.Reasoning);
    expect(dwarf.startingAttributes).toContain(AttributeName.Brawn);
    expect(dwarf.availableAttributePoints).toBe(4);
    expect(human.startingAttributes.length).toEqual(0);
    expect(human.availableAttributePoints).toBe(6);
  });

  it('should have optionalStartingAttributes', () => {
    expect(fey.optionalStartingAttributes.length).toEqual(2);
    expect(fey.selectedOptionalStartingAttribute).toBeFalsy();
    service.selectOptionalStartingAttribute(fey, AttributeName.Reasoning);
    expect(fey.selectedOptionalStartingAttribute).toEqual(AttributeName.Reasoning);
    service.selectOptionalStartingAttribute(fey, AttributeName.Brawn);
    expect(fey.selectedOptionalStartingAttribute).toBeFalsy();
    service.selectOptionalStartingAttribute(fey, null);
    expect(fey.selectedOptionalStartingAttribute).toBeFalsy();

  });
});
