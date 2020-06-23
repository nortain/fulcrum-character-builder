import {TestBed} from '@angular/core/testing';

import {AbilityFactoryService} from './ability-factory.service';

import {AbilityBonus} from "./ability-bonus.enum";
import {AbilityModel} from "./ability-model";
import {Level} from "../character/level.enum";
import {PhysicalDefenseFactoryService} from "../character/physical-defense/physical-defense-factory.service";

import {TalentName} from "./talent/talent-name.enum";
import {AbilityType} from "./ability-type.enum";
import {AttributeFactoryService} from "../attribute/attribute-factory.service";

describe('AbilityFactoryService', () => {
  let service: AbilityFactoryService;
  let defenseService: PhysicalDefenseFactoryService;
  let attributeService: AttributeFactoryService;
  let simpleTalent: AbilityModel, complexTalent: AbilityModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbilityFactoryService);
    attributeService = TestBed.inject(AttributeFactoryService);
    defenseService = TestBed.inject(PhysicalDefenseFactoryService);
    simpleTalent = getSimpleTalent();
    complexTalent = getComplexTalent();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to create an ability', () => {
    expect(simpleTalent).toBeTruthy();
  });

  it('should be able to print out a value with level range based values', () => {
    expect(service.printOutFullDescription(simpleTalent)).toEqual(simpleTalent.abilityDescription.fullDescription);
    let result = service.printOutBriefDescription(simpleTalent, Level.Five);
    expect(result).toBe("Increase the amount of Healing granted by actions with the healing keyword by 1.");
    result = service.printOutBriefDescription(simpleTalent, Level.Six);
    expect(result).toBe("Increase the amount of Healing granted by actions with the healing keyword by 2.");
  });

  it('should be able to print out the test for a complex talent', () => {
    let result = service.printOutBriefDescription(complexTalent, Level.Five);
    expect(result).toBe("Your Missile Defense becomes your Active Defense. Increase your critical resistance by 1.  Gain the ability Deflection");
    result = service.printOutBriefDescription(complexTalent, Level.Six);
    expect(result).toBe("Your Missile Defense becomes your Active Defense. Increase your critical resistance by 2.  Gain the ability Deflection");
  });

  it('should be able to print out the active ability of a complex talent', () => {
    let result = service.printOutBriefDescription(service.getActiveAbility(complexTalent, AbilityType.Talent), Level.Five);
    expect(result).toBe("Reduce the damage of an attack against AD by 5.  If the attack is a burst or range attack the reduction becomes  7");
    result = service.printOutBriefDescription(service.getActiveAbility(complexTalent, AbilityType.Talent), Level.Six);
    expect(result).toBe("Reduce the damage of an attack against AD by 6.  If the attack is a burst or range attack the reduction becomes  8");
  });


  it('should be get a talent that allows your MD to become your AD', () => {
      const result = service.getBonusForAbility(AbilityBonus.MissileDefense, [simpleTalent, complexTalent]);
      expect(result).toBe(AbilityBonus.ActiveDefense);
  });

  it('should be able to determine if a talent gives a bonus to critical resistance based on level', () => {
    let result = service.getBonusForAbility(AbilityBonus.CriticalResist, [complexTalent], Level.Five);
    expect(result).toBe(1);
    result = service.getBonusForAbility(AbilityBonus.CriticalResist, [complexTalent], Level.Six);
    expect(result).toBe(2);
  });

  it('should be able to display a talent using a non-standard scale', () => {
    const talent = service.getNewAbility(TalentName.EmpoweredStrikes, AbilityType.Talent);
    let result = service.printOutBriefDescription(talent, Level.One);
    expect(result).toBe("Gain a +2 to empowered attacks but you have a -1 to critical strikes.");
    result = service.printOutBriefDescription(talent, Level.Two);
    expect(result).toBe("Gain a +2 to empowered attacks but you have a 0 to critical strikes.");
    result = service.printOutBriefDescription(talent, Level.Six);
    expect(result).toBe("Gain a +3 to empowered attacks but you have a 0 to critical strikes.");
  });

  it('should be able to get a penalty from a talent using a non-standard scale', () => {
    const talent = service.getNewAbility(TalentName.EmpoweredStrikes, AbilityType.Talent);
    let result = service.getBonusForAbility(AbilityBonus.CriticalStrike, [talent], Level.One);
    expect(result).toBe(-1);
    result = service.getBonusForAbility(AbilityBonus.CriticalStrike, [talent], Level.Two);
    expect(result).toBe(0);
  });

  it('should be able to print a brief description of a non-scaling talent', () => {
    const talent = service.getNewAbility(TalentName.AcceleratedReflexes, AbilityType.Talent);
    const result = service.printOutBriefDescription(talent);
    expect(result).toBe("Gain a +3 to Initiative.");
    const value = service.getBonusForAbility(AbilityBonus.Initiative, [talent]);
    expect(value).toEqual(3);
  });

  it('should be able to print and get values a talent that gives bonus to forced movement', () => {

  });

  it('should be able to assign a talent maybe?', () => {

  });

  it('should be able to get all requirements of a particular talent', () => {

  });

  it('should have certain talents as not being selectable such as sub talents that belong to greater talents that cannot be chosen individually', () => {

  });

  it('should be able to choose sub-options of a greater talent like charge mastery', () => {

  });

  it('should have some way to prevent the same talents from being selected/assigned', () => {

  });

  it('should have some way to prevent related mutually exclusive talents from being selected', () => {

  });

  /**Stupid Helper functions**/

  function getSimpleTalent(): AbilityModel {
    return service.getNewAbility(TalentName.HealingSpecialization, AbilityType.Talent);
  }

  function getComplexTalent(): AbilityModel {
    return service.getNewAbility(TalentName.MissileParry, AbilityType.Talent);
  }
});
