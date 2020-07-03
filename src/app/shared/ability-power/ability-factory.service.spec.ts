import {TestBed} from '@angular/core/testing';

import {AbilityFactoryService} from './ability-factory.service';

import {AbilityBonus} from "./ability-bonus.enum";
import {AbilityModel, IAbilityRequirement} from "./ability-model";
import {Level} from "../character/level.enum";
import {PhysicalDefenseFactoryService} from "../character/physical-defense/physical-defense-factory.service";

import {TalentName} from "./talent/talent-name.enum";
import {AbilityType} from "./ability-type.enum";
import {AttributeFactoryService} from "../attribute/attribute-factory.service";
import {AttributeStrength} from "../attribute/attribute-enums/attribute-strength.enum";
import {ValueRange} from "../attribute/attribute-constants/attribute-constants";

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
    expect(result).toBe("Gain the following:\nYour Missile Defense becomes your Active Defense. Increase your critical resistance by 1. Gain the ability Deflection\n" +
      "Deflection: (Ability) Free. Reduce the damage of an attack against AD by 5. If the attack is a burst or range attack the reduction becomes 7");
    result = service.printOutBriefDescription(complexTalent, Level.Six);
    expect(result).toBe("Gain the following:\nYour Missile Defense becomes your Active Defense. Increase your critical resistance by 2. Gain the ability Deflection\n" +
      "Deflection: (Ability) Free. Reduce the damage of an attack against AD by 6. If the attack is a burst or range attack the reduction becomes 8");
  });

  it('should be able to print out the active ability of a complex talent', () => {
    let result = service.printOutBriefDescription(service.getAssociatedAbilities(complexTalent, AbilityType.Talent)[0], Level.Five);
    expect(result).toBe("Reduce the damage of an attack against AD by 5. If the attack is a burst or range attack the reduction becomes 7");
    result = service.printOutBriefDescription(service.getAssociatedAbilities(complexTalent, AbilityType.Talent)[0], Level.Six);
    expect(result).toBe("Reduce the damage of an attack against AD by 6. If the attack is a burst or range attack the reduction becomes 8");
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
    const talent = service.getNewAbility(TalentName.ImprovedController, AbilityType.Talent);
    const result = service.printOutBriefDescription(talent);
    expect(result).toBe("Any spell or ability with the Forced Movement keyword has its push, pull, teleport and slide effects increased by 1.  Gain a +1 bonus to critical strikes.");
    const value = service.getBonusForAbility(AbilityBonus.ForcedMovement, [talent]);
    expect(value).toEqual(1);
  });

  it('should be able to get a cumulative value for abilities that given bonuses to the same thing', () => {
    const talentArray: Array<AbilityModel> = new Array<AbilityModel>();
    talentArray.push(service.getNewAbility(TalentName.EmpoweredStrikes, AbilityType.Talent));
    talentArray.push(service.getNewAbility(TalentName.ImprovedController, AbilityType.Talent));
    let bonus = service.getBonusForAbility(AbilityBonus.CriticalStrike, talentArray, Level.One);
    expect(bonus).toEqual(0);
    bonus = service.getBonusForAbility(AbilityBonus.CriticalStrike, talentArray, Level.Two);
    expect(bonus).toEqual(1);
  });

  it('should be able to get all requirements of a particular talent', () => {
    const requirements: Array<IAbilityRequirement> = service.getRequirementForAbility(complexTalent);
    expect(requirements
      .find(
        (requirement) => requirement.requirementType === AbilityBonus.Agility)
    ).toBeTruthy();

    expect(requirements.find(requirement => requirement.requirementValue === AttributeStrength.Heroic)).toBeTruthy();

  });

  it('should be able to scale talents so that they level on even levels only.  I.e. 3 level increases would occur at levels 4, 6, 8 when there are 3.  2,4,6,8 with 5.', () => {
    const range1: ValueRange = {minBonus: 1, maxBonus: 2};

    expect(service.extractNumberFromValueRangeForPassiveTalents(range1, Level.Five)).toEqual(1);
    expect(service.extractNumberFromValueRangeForPassiveTalents(range1, Level.Six)).toEqual(2);

  });

  it('should be able to scale talents with an increase of 2', () => {
    const range2: ValueRange = {minBonus: 1, maxBonus: 3};
    expect(service.extractNumberFromValueRangeForPassiveTalents(range2, Level.Three)).toEqual(1);
    expect(service.extractNumberFromValueRangeForPassiveTalents(range2, Level.Four)).toEqual(2);
    expect(service.extractNumberFromValueRangeForPassiveTalents(range2, Level.Eight)).toEqual(3);
  });

  it('should be able to scale talents with an increase of 3', () => {
    const range3: ValueRange = {minBonus: 1, maxBonus: 4};
    expect(service.extractNumberFromValueRangeForPassiveTalents(range3, Level.Three)).toEqual(1);
    expect(service.extractNumberFromValueRangeForPassiveTalents(range3, Level.Four)).toEqual(2);
    expect(service.extractNumberFromValueRangeForPassiveTalents(range3, Level.Six)).toEqual(3);
    expect(service.extractNumberFromValueRangeForPassiveTalents(range3, Level.Eight)).toEqual(4);
  });

  it('should be able to scale talents with an increase of 4', () => {
    const range4: ValueRange = {minBonus: 1, maxBonus: 5};
    expect(service.extractNumberFromValueRangeForPassiveTalents(range4, Level.One)).toEqual(1);
    expect(service.extractNumberFromValueRangeForPassiveTalents(range4, Level.Two)).toEqual(2);
    expect(service.extractNumberFromValueRangeForPassiveTalents(range4, Level.Four)).toEqual(3);
    expect(service.extractNumberFromValueRangeForPassiveTalents(range4, Level.Six)).toEqual(4);
    expect(service.extractNumberFromValueRangeForPassiveTalents(range4, Level.Eight)).toEqual(5);
  });

  it('should have certain talents as not being selectable such as sub talents that belong to greater talents that cannot be chosen individually', () => {
    const talent = service.getNewAbility(TalentName.AdvancedWeaponTrainingRanged, AbilityType.Talent);
    const pickedAbilities = [talent];
    const newTalent = service.getNewAbility(TalentName.EmpoweredStrikes, AbilityType.Talent);
    let result = service.canAbilityBeSelected(talent, pickedAbilities);
    expect(result).toBeFalsy();
    result = service.canAbilityBeSelected(newTalent, pickedAbilities);
    expect(result).toBeTruthy();
  });

  it('should not be able to choose two advanced weapon trainings', () => {
    const talent = service.getNewAbility(TalentName.AdvancedWeaponTrainingRanged, AbilityType.Talent);
    const talent2 = service.getNewAbility(TalentName.AdvancedWeaponTrainingTwoWeaponFighting, AbilityType.Talent);
    const result = service.canAbilityBeSelected(talent2, [talent]);
    expect(result).toBeFalsy();
  });

  it('should not be able to select a greater talent and then choose its less power', () => {
    const talent = service.getNewAbility(TalentName.AdvancedWeaponTrainingRanged, AbilityType.Talent);
    const talent2 = service.getNewAbility(TalentName.SureShot, AbilityType.Talent);
    const talent3 = service.getNewAbility(TalentName.FollowUpAttack, AbilityType.Talent);
    let result = service.canAbilityBeSelected(talent, [talent2]);
    expect(result).toBeFalsy();
    result = service.canAbilityBeSelected(talent, [talent3]);
    expect(result).toBeTruthy();
  });

  it('should not be able to choose a lesser power and then choose that powers greater talent', () => {
    const talent = service.getNewAbility(TalentName.AdvancedWeaponTrainingRanged, AbilityType.Talent);
    const talent2 = service.getNewAbility(TalentName.SureShot, AbilityType.Talent);
    const result = service.canAbilityBeSelected(talent2, [talent]);
    expect(result).toBeFalsy();
  });

  it('should be able to fully print out a brief description of a complex talent', () => {
    const result = service.printOutBriefDescription(complexTalent, Level.One);
    expect(result).toBe("Gain the following:\n" +
      "Your Missile Defense becomes your Active Defense. Increase your critical resistance by 1. Gain the ability Deflection\n" +
      "Deflection: (Ability) Free. Reduce the damage of an attack against AD by 4. If the attack is a burst or range attack the reduction becomes 5");
  });

  it('should be able to print out a full description of something crazy like charge mastery', () => {
    const talent = service.getNewAbility(TalentName.ChargeMastery, AbilityType.Talent);
    expect(service.printOutFullDescription(talent)).toBe("Gain the following benefits while charging:\n" +
      "Measured Charge: You do not grant combat superiority from charging.\n" +
      "Defensive Charge: You gain -2 DC against any attacks you incur while charging.\n" +
      "Accurate Charge: Gain a +2 bonus to hit when charging (+1 after negating the -1).\n" +
      "Accelerated Charge: Increase your speed by 1 when performing a charge.\n" +
      "Savage Charge: Gain a +2 attack damage bonus when charging.  Increase this damage by 1 and levels 4 and 8.");
  });

  //TODO this needs to change, rather than actually putting in the lesser picks, we need to alter the copy of the chargemasteryLesser talent so it only appears to be associated with those picked talents
  it('should be able to choose sub-options of a lesser version of greater talent like charge mastery', () => {
    const lesserCharge = service.getNewAbility(TalentName.ChargeMasteryLesser, AbilityType.Talent);
    const abilities: Array<AbilityModel> = service.selectAbility(lesserCharge, [], [TalentName.MeasuredCharge, TalentName.SavageCharge]);
    expect(abilities.length).toEqual(2);
    expect(abilities.find((ability) => ability.abilityName === TalentName.SavageCharge)).toBeTruthy();
    expect(abilities.find((ability) => ability.abilityName === TalentName.MeasuredCharge)).toBeTruthy();
  });

  it('should print out only the picked information for a talent where there exists a pick value.', () => {

  });

  it('should throw an error if try to selected a pick talent without the right number of current abilities', () => {
    const lesserCharge = service.getNewAbility(TalentName.ChargeMasteryLesser, AbilityType.Talent);
    expect(function () {
      service.selectAbility(lesserCharge, [], [TalentName.MeasuredCharge]);
    }).toThrowError("You must have 2 inner selection choices but only 1 was given.");


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
