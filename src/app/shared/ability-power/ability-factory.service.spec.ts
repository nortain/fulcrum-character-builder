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
import {AttributeName} from "../attribute/attribute-enums/attribute-name.enum";
import {PowerPointName} from "./power-point/power-point-name.enum";

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
    expect(service.printOutFullDescription(simpleTalent)).toEqual("Healing Specialization: Increase the amount of Healing granted by actions with the healing keyword by 1. Increase by 1 at level 6.");
    let result = service.printOutBriefDescription(simpleTalent, Level.Five);
    expect(result).toBe("Healing Specialization: Increase the amount of Healing granted by actions with the healing keyword by 1.");
    result = service.printOutBriefDescription(simpleTalent, Level.Six);
    expect(result).toBe("Healing Specialization: Increase the amount of Healing granted by actions with the healing keyword by 2.");
  });

  it('should be able to print out the test for a complex talent', () => {
    let result = service.printOutBriefDescription(complexTalent, Level.Five);
    expect(result).toBe("Missile Parry: Gain the following:\nYour Missile Defense becomes your Active Defense. Increase your critical resistance by 1. Gain the ability Deflection\n" +
      "Deflection: (Ability) Free. Reduce the damage of an attack against AD by 5. If the attack is a burst or range attack the reduction becomes 7");
    result = service.printOutBriefDescription(complexTalent, Level.Six);
    expect(result).toBe("Missile Parry: Gain the following:\nYour Missile Defense becomes your Active Defense. Increase your critical resistance by 2. Gain the ability Deflection\n" +
      "Deflection: (Ability) Free. Reduce the damage of an attack against AD by 6. If the attack is a burst or range attack the reduction becomes 8");
  });

  it('should be able to print out the active ability of a complex talent', () => {
    let result = service.printOutBriefDescription(service.getAssociatedAbilities(complexTalent, AbilityType.Talent)[0], Level.Five);
    expect(result).toBe("Deflection: (Ability) Free. Reduce the damage of an attack against AD by 5. If the attack is a burst or range attack the reduction becomes 7");
    result = service.printOutBriefDescription(service.getAssociatedAbilities(complexTalent, AbilityType.Talent)[0], Level.Six);
    expect(result).toBe("Deflection: (Ability) Free. Reduce the damage of an attack against AD by 6. If the attack is a burst or range attack the reduction becomes 8");
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
    expect(result).toBe("Empowered Strikes: Gain a +2 to empowered attacks but you have a -1 to critical strikes.");
    result = service.printOutBriefDescription(talent, Level.Two);
    expect(result).toBe("Empowered Strikes: Gain a +2 to empowered attacks but you have a 0 to critical strikes.");
    result = service.printOutBriefDescription(talent, Level.Six);
    expect(result).toBe("Empowered Strikes: Gain a +3 to empowered attacks but you have a 0 to critical strikes.");
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
    expect(result).toBe("Accelerated Reflexes: Gain a +3 to Initiative.");
    const value = service.getBonusForAbility(AbilityBonus.Initiative, [talent]);
    expect(value).toEqual(3);
  });

  it('should be able to print and get values a talent that gives bonus to forced movement', () => {
    const talent = service.getNewAbility(TalentName.ImprovedController, AbilityType.Talent);
    const result = service.printOutBriefDescription(talent);
    expect(result).toBe("Improved Controller: Any spell or ability with the Forced Movement keyword has its push, pull, teleport and slide effects increased by 1. Gain a +1 bonus to critical strikes.");
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
        (requirement) => requirement.requirementAbilityName === AttributeName.Agility)
    ).toBeTruthy();

    expect(requirements.find(requirement => requirement.requirementValue === AttributeStrength.Heroic)).toBeTruthy();

  });

  it('should be able to scale talents so that they level on even levels only. I.e. 3 level increases would occur at levels 4, 6, 8 when there are 3. 2,4,6,8 with 5.', () => {
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
    expect(result.isSelectable).toBeFalsy();
    result = service.canAbilityBeSelected(newTalent, pickedAbilities);
    expect(result.isSelectable).toBeTruthy();
  });

  it('should not be able to choose two advanced weapon trainings', () => {
    const talent = service.getNewAbility(TalentName.AdvancedWeaponTrainingRanged, AbilityType.Talent);
    const talent2 = service.getNewAbility(TalentName.AdvancedWeaponTrainingTwoWeaponFighting, AbilityType.Talent);
    const result = service.canAbilityBeSelected(talent2, [talent]);
    expect(result.isSelectable).toBeFalsy();
  });

  it('should not be able to select a greater talent and then choose its less power or any of AWT power', () => {
    const talent = service.getNewAbility(TalentName.AdvancedWeaponTrainingRanged, AbilityType.Talent);
    const talent2 = service.getNewAbility(TalentName.SureShot, AbilityType.Talent);
    const talent3 = service.getNewAbility(TalentName.FollowUpAttack, AbilityType.Talent);
    let result = service.canAbilityBeSelected(talent, [talent2]);
    expect(result.isSelectable).toBeFalsy();
    result = service.canAbilityBeSelected(talent, [talent3]);
    expect(result.isSelectable).toBeFalsy();
  });

  it('should not be able to choose a lesser power and then choose that powers greater talent', () => {
    const talent = service.getNewAbility(TalentName.AdvancedWeaponTrainingRanged, AbilityType.Talent);
    const talent2 = service.getNewAbility(TalentName.SureShot, AbilityType.Talent);
    const result = service.canAbilityBeSelected(talent2, [talent]);
    expect(result.isSelectable).toBeFalsy();
  });

  it('should be able to fully print out a brief description of a complex talent', () => {
    const result = service.printOutBriefDescription(complexTalent, Level.One);
    expect(result).toBe("Missile Parry: Gain the following:\n" +
      "Your Missile Defense becomes your Active Defense. Increase your critical resistance by 1. Gain the ability Deflection\n" +
      "Deflection: (Ability) Free. Reduce the damage of an attack against AD by 4. If the attack is a burst or range attack the reduction becomes 5");
  });

  it('should be able to print out a full description of something crazy like charge mastery', () => {
    const talent = service.getNewAbility(TalentName.ChargeMastery, AbilityType.Talent);
    expect(service.printOutFullDescription(talent)).toBe("Charge Mastery: Gain the following benefits while charging:\n" +
      "Measured Charge: You do not grant combat superiority from charging.\n" +
      "Defensive Charge: You gain -2 DC against any attacks you incur while charging.\n" +
      "Accurate Charge: Gain a +2 bonus to hit when charging (+1 after negating the -1).\n" +
      "Accelerated Charge: Increase your speed by 1 when performing a charge.\n" +
      "Savage Charge: Gain a +2 attack damage bonus when charging. Increase this damage by 1 and levels 4 and 8.");
  });

  it('should be able to choose sub-options of a lesser version of greater talent like charge mastery', () => {
    const lesserCharge = service.getNewAbility(TalentName.ChargeMasteryLesser, AbilityType.Talent);
    const abilities: Array<AbilityModel> = service.selectAbility(lesserCharge, [], null, Level.One, [TalentName.MeasuredCharge, TalentName.SavageCharge]);
    expect(abilities.length).toEqual(1);
    expect(abilities.find((ability) => ability.abilityName === TalentName.ChargeMasteryLesser)).toBeTruthy();
    expect(abilities[0].innerSelectedAbilities.find((name) => name === TalentName.SavageCharge)).toBeTruthy();
    expect(abilities[0].innerSelectedAbilities.find((name) => name === TalentName.MeasuredCharge)).toBeTruthy();
  });

  it('should prevent you from choosing charge mastery if you already have lesser charge mastery', () => {
    const cm = service.getNewAbility(TalentName.ChargeMastery, AbilityType.Talent);
    const cml = service.getNewAbility(TalentName.ChargeMasteryLesser, AbilityType.Talent);
    const result = service.canAbilityBeSelected(cm, [cml]);
    expect(result.isSelectable).toBeFalsy();
  });

  it('should prevent you from choosing lesser charge mastery if you already have charge mastery', () => {
    const cm = service.getNewAbility(TalentName.ChargeMastery, AbilityType.Talent);
    const cml = service.getNewAbility(TalentName.ChargeMasteryLesser, AbilityType.Talent);
    const result = service.canAbilityBeSelected(cml, [cm]);
    expect(result.isSelectable).toBeFalsy();
  });

  it('brief information should print out only the picked information for a talent where there exists a pick value.', () => {
    const cml = service.getNewAbility(TalentName.ChargeMasteryLesser, AbilityType.Talent, [TalentName.MeasuredCharge, TalentName.DefensiveCharge]);
    const msg = service.printOutBriefDescription(cml);
    expect(msg).toBe("Charge Mastery Lesser: Gain the following benefits\n" +
      "Measured Charge: You do not grant combat superiority from charging.\n" +
      "Defensive Charge: You gain -2 DC against any attacks you incur while charging.");
  });

  it('should throw an error if try to selected a pick talent without the right number of current abilities', () => {
    const lesserCharge = service.getNewAbility(TalentName.ChargeMasteryLesser, AbilityType.Talent);
    expect(function () {
      service.selectAbility(lesserCharge, [], null, Level.One, [TalentName.MeasuredCharge]);
    }).toThrowError("You must have 2 inner selection choices but only 1 was given.");
  });

  it('should have some way to prevent the same talents from being selected/assigned', () => {
    let currentAbilities = new Array<AbilityModel>();
    let result = service.canAbilityBeSelected(simpleTalent, currentAbilities);
    expect(result).toBeTruthy();
    currentAbilities = service.selectAbility(simpleTalent, currentAbilities);
    result = service.canAbilityBeSelected(simpleTalent, currentAbilities);
    expect(result.isSelectable).toBeFalsy();

  });

  it('should prevent you from selecting a talent if you do not meet the attribute requirement', () => {
    expect(function () {
      const result = service.selectAbility(complexTalent, []);
    }).toThrowError("The talent: Missile Parry is an invalid selection because you require at least Heroic Agility");
  });

  it('should only get mechanical bonuses for passive talents because active talents are only active while active', () => {
    const talent = service.getNewAbility(TalentName.BoilingRage, AbilityType.Talent);
    const result = service.getBonusForAbility(AbilityBonus.GlobalDamage, [talent], Level.One);
    expect(result).toEqual(0);
  });

  it('should be able to adjust briefDescriptions that are affected by other spell keywords such as friendly movement', () => {
    const talent = service.getNewAbility(TalentName.MasterTactician, AbilityType.Talent);
    const selectedTalent = service.getNewAbility(TalentName.FriendlyController, AbilityType.Talent);
    let currentAbilities = [];
    let result = service.printOutBriefDescription(talent, Level.One, currentAbilities);
    const attribute = attributeService.getNewAttribute(AttributeName.Reasoning, AttributeStrength.Heroic);
    expect(result).toBe(
      "Master Tactician: (Power) Minor. Slide up to 3 allies within 10 squares of you 4 squares each.");

    currentAbilities = [...service.selectAbility(selectedTalent, currentAbilities, [attribute])];
    result = service.printOutBriefDescription(talent, Level.One, currentAbilities);
    expect(result).toBe(
      "Master Tactician: (Power) Minor. Slide up to 3 allies within 10 squares of you 5 squares each.");
  });

  it('should print out Knights move as a full description correctly', () => {
    const talent = service.getNewAbility(TalentName.KnightsMove, AbilityType.Talent);
    const text = service.printOutFullDescription(talent);
    expect(text).toBe("<i>You require at least Champion Reasoning.</i>\n" +
      "Knights Move: (Feature) Move. Two allies within 7 squares are able to tactically move 2 squares.");
  });

  it('should print out full description of a talent like Lightning Strike', () => {
    const talent = service.getNewAbility(TalentName.LightningStrike, AbilityType.Talent);
    const text = service.printOutFullDescription(talent);
    expect(text).toBe("<i>You require at least Heroic Agility.</i>\n" +
      "Lightning Strike: (Power) Minor. You may make a -2 DC attack with a +2 to hit.");
  });

  it('should print out brief description of a talent like lightning strike', () => {
    const talent = service.getNewAbility(TalentName.LightningStrike, AbilityType.Talent);
    const text = service.printOutBriefDescription(talent);
    expect(text).toBe("Lightning Strike: (Power) Minor. You may make a -2 DC attack with a +2 to hit.");
  });

  it('should be able to print out the brief description of Commanding Strike', () => {
    const talent = service.getNewAbility(TalentName.CommandingStrike, AbilityType.Talent);
    const text = service.printOutBriefDescription(talent);
    expect(text).toBe("Commanding Strike: (Power) Standard. Two allies within 10 squares are able to make a basic attack with a +1 to hit.");
  });

  it('should need an ability to generate thp to be able to select bolster', () => {
    const talent = service.getNewAbility(TalentName.Bolster, AbilityType.Talent);
    expect(function () {
      service.selectAbility(talent, []);
    }).toThrowError("The talent: Bolster is an invalid selection because you do not have the Power To Generate Temporary Hit Points.");
  });

  it('should be able to select bolster if you an ability that can generate thp', () => {
    const talent = service.getNewAbility(TalentName.Bolster, AbilityType.Talent);
    const requiredTalent = service.getNewAbility(TalentName.ArmorUp, AbilityType.Talent);
    let currentAbilities = [requiredTalent];
    currentAbilities = service.selectAbility(talent, currentAbilities);
    expect(currentAbilities.length).toEqual(2);
  });

  it('should be able to select bolster when you have a talent that is associated with the ability to generate thp', () => {
    const talent = service.getNewAbility(TalentName.Bolster, AbilityType.Talent);
    const requiredTalent = service.getNewAbility(TalentName.GreaterJuggernaut, AbilityType.Talent);
    let currentAbilities = [requiredTalent];
    currentAbilities = service.selectAbility(talent, currentAbilities);
    expect(currentAbilities.length).toEqual(2);
  });

  it('should be able to print out greater juggernaut correctly', () => {
    const talent = service.getNewAbility(TalentName.GreaterJuggernaut, AbilityType.Talent);
    let text = service.printOutBriefDescription(talent, Level.Three);
    expect(text).toBe("Greater Juggernaut: Increase the damage resistance of Juggernaut by 1 and gain the Armor Up feature.\n" +
      "Armor Up: (Feature) Move. You gain 3 THP.");
    text = service.printOutBriefDescription(talent, Level.Four);
    expect(text).toContain("4 THP.");
    text = service.printOutBriefDescription(talent, Level.Six);
    expect(text).toContain("5 THP.");
    text = service.printOutBriefDescription(talent, Level.Eight);
    expect(text).toContain("6 THP.");
  });

  it('should not be able to select greater juggernaut without 1 rank juggernaut', () => {
    const talent = service.getNewAbility(TalentName.GreaterJuggernaut, AbilityType.Talent);
    expect(function () {
      service.selectAbility(talent, []);
    })
      .toThrowError("The talent: Greater Juggernaut is an invalid selection because you require at least 1 rank in the Subtheme Juggernaut.");
  });

  it('should not be able to select Rending Strikes because it has no ability cost', () => {
    const talent = service.getNewAbility(TalentName.RendingStrikes, AbilityType.Talent);
    expect(function () {
      service.selectAbility(talent, []);
    }).toThrowError("The talent: Rending Strikes is an invalid selection because it does not have a cost. This can only be selected as part of a larger talent.");
  });

  it('should be able to get any qualifiers for a bonus', () => {
    const talent = service.getNewAbility(TalentName.GreaterJuggernaut, AbilityType.Talent);
    expect(service.getAbilityQualifiers(talent).length).toEqual(0);
    const otherTalent = service.getNewAbility(TalentName.ArmorOfTheScoundrel, AbilityType.Talent);
    const result = service.getAbilityQualifiers(otherTalent, AbilityBonus.ActiveDefense);
    expect(result.length).toEqual(1);
    expect(result[0].abilityQualifier.find(qualifier => qualifier.requirementAbilityName === AbilityBonus.NonStacking)).toBeTruthy();
  });

  it('should be able to show that a character is trained in heavy armors', () => {
    const talent = service.getNewAbility(TalentName.AdvancedArmorTraining, AbilityType.Talent);
    const result = service.getBonusForAbility(AbilityBonus.HeavyArmorTraining, [talent]);
    expect(result).toBe(AbilityBonus.HeavyArmorTraining);
  });

  it('should be able briefly print out masterful strikes', () => {
    const talent = service.getNewAbility(TalentName.WeaponMastery, AbilityType.Talent);
    const text = service.printOutBriefDescription(talent);
    expect(text).toBe("Weapon Mastery: Gain 1 to your attack damage bonus and gain the Masterful Strikes Feature.\n" +
      "Masterful Strikes: (Feature) Move. Gain a +7 to your attack damage bonus to all attacks until the end of your turn.");
  });

  it('should be able fully print out masterful strikes', () => {
    const talent = service.getNewAbility(TalentName.WeaponMastery, AbilityType.Talent);
    const text = service.printOutFullDescription(talent);
    expect(text).toBe("<i>You require at least 2 ranks in the Weapon Specialization subtheme.</i>\n" +
      "Weapon Mastery: Gain 1 to your attack damage bonus and gain the Masterful Strikes Feature.\n" +
      "Masterful Strikes: (Feature) Move. Gain a +3 to your attack damage bonus to all attacks until the end of your turn. Increase this bonus by 1 at levels 2, 4, 6 and 8.");
  });

  it('should be able to use talent passive/feature level scaling with protection mastery\'s taunt', () => {
    const talent = service.getNewAbility(TalentName.Taunt, AbilityType.Talent);
    const scalingText = service.printOutBriefDescription(talent, Level.Five);
    expect(scalingText).toBe("Taunt: (Feature) Move. You may pull an enemy within 2 squares of you 1 square. Increase the damage of your Protector Aura by 10 until SoNT.");
  });

  it('should require the rage powerpoint feature in order to select the enrage talent', () => {
    const talent = service.getNewAbility(TalentName.Enrage, AbilityType.Talent);
    expect(function () {
      service.selectAbility(talent, []);
    }).toThrowError("The talent: Enrage is an invalid selection because you do not have the Power Point Feature Rage.");
    const ragePP = service.getNewAbility(PowerPointName.Rage, AbilityType.PowerPointFeature);
    const result = service.selectAbility(talent, [ragePP]);
    expect(result.length).toEqual(2);
    expect(result.find(value => value.abilityName === AbilityBonus.Rage)).toBeTruthy();
  });

  it('should be able to correctly display ignore pain power point feature with bonuses from multiple talents that increase thp', () => {
    const ppFeature = service.getNewAbility(PowerPointName.IgnorePain, AbilityType.PowerPointFeature);
    let briefText = service.printOutBriefDescription(ppFeature, Level.One);
    const abilities = [service.getNewAbility(TalentName.FortificationSpecialization, AbilityType.Talent)];
    expect(briefText).toBe("Ignore Pain: (Power Point Feature) Minor. Gain 3 temporary hit points and increase your damage resistance until the start of your next turn by 1.");
    briefText = service.printOutBriefDescription(ppFeature, Level.One, abilities);
    expect(briefText).toBe("Ignore Pain: (Power Point Feature) Minor. Gain 4 temporary hit points and increase your damage resistance until the start of your next turn by 1.");
    abilities.push(service.getNewAbility(TalentName.Stoicism, AbilityType.Talent));
    briefText = service.printOutBriefDescription(ppFeature, Level.One, abilities);
    expect(briefText).toBe("Ignore Pain: (Power Point Feature) Minor. Gain 5 temporary hit points and increase your damage resistance until the start of your next turn by 1.");
  });

  it('should determine if an ability can be selected based on level', () => {
    const talent = service.getNewAbility(TalentName.ReinforcedProtector, AbilityType.Talent);
    const requiredTalent = service.getNewAbility(TalentName.ImprovedProtector, AbilityType.Talent);
    const iCanBeSelected = service.canAbilityBeSelected(talent, [requiredTalent], [], Level.Nine);
    expect(iCanBeSelected.isSelectable).toBeFalsy();
    expect(iCanBeSelected.reasonItCannotBeSelected).toBe("you require at least character level 10 to select this.");
  });

  it('should require that you are level 10 to get reinforced protector in addition to having improved protector', () => {
    const talent = service.getNewAbility(TalentName.ReinforcedProtector, AbilityType.Talent);
    const requiredTalent = service.getNewAbility(TalentName.ImprovedProtector, AbilityType.Talent);
    expect(function () {
      service.selectAbility(talent, [requiredTalent], [], Level.Nine);
    }).toThrowError("The talent: Reinforced Protector is an invalid selection because you require at least character level 10 to select this.");
  });

  it('should be able to select reinforced protector when you met all of the requirements', () => {
    const talent = service.getNewAbility(TalentName.ReinforcedProtector, AbilityType.Talent);
    const requiredTalent = service.getNewAbility(TalentName.ImprovedProtector, AbilityType.Talent);
    const result = service.selectAbility(talent, [requiredTalent], [], Level.Ten);
    expect(result.length).toEqual(2);
    expect(result.find(ability => ability.abilityName === TalentName.ReinforcedProtector)).toBeTruthy();
  });

  it('should be able to print out Evasion talents correctly and give bonus to dodge but treat the secondary effect like a non-passive effect', () => {
    const talent = service.getNewAbility(TalentName.JustAFleshWound, AbilityType.Talent);
    expect(service.printOutBriefDescription(talent, Level.One)).toBe("Just A Flesh Wound: Increase the damage reduction of your evasion powers and abilities by 2. The turn after making a dodge you may use your Rapid Recovery feature as a minor action OR heal for 2 as a swift action.");
    expect(service.getBonusForAbility(AbilityBonus.Dodge, [talent])).toEqual(4); // gives a bonus to dodge
    expect(service.getBonusForAbility(AbilityBonus.Healing, [talent])).toBeFalsy(); // the bonus from healing does not give bonuses to other healing keywords
  });

  it('should print out dead eye correctly so each value looks correct', () => {
    const talent = service.getNewAbility(TalentName.DeadEye, AbilityType.Talent);
    const text = service.printOutBriefDescription(talent);
    expect(text).toBe("Dead Eye: Increases the range of all missile weapons by 5/5/5.");
  });

  it('should print out dead eye correctly so each value looks correct', () => {
    const talent = service.getNewAbility(TalentName.ItsAllInTheWrist, AbilityType.Talent);
    const text = service.printOutBriefDescription(talent);
    expect(text).toBe("Its All In The Wrist: Increases the range of all thrown missile weapons by 2/2/2.");
  });

  it('should print out Evasive Fire correctly', () => {
    const talent = service.getNewAbility(TalentName.EvasiveFire, AbilityType.Talent);
    const text = service.printOutBriefDescription(talent);
    expect(text).toBe("Evasive Fire: (Power) Standard. You are able to resolve a ranged attack as if it were a melee 1 attack (targets AD, doesn't provoke OAs). This attack gets a +3 to hit. After this attack resolves you may tactically move 2 squares.");
  });

  it('should print out Turn the Tables correctly', () => {
    const talent = service.getNewAbility(TalentName.TurnTheTables, AbilityType.Talent);
    const text = service.printOutBriefDescription(talent);
    expect(text).toBe("Turn The Tables: (Feature) Move. All enemies flanking you grant you combat superiority 3 and count as isolated until the end of your turn.");
  });

  it('should print out perfect defense correctly', () => {
    const talent = service.getNewAbility(TalentName.PerfectDefense, AbilityType.Talent);
    const text = service.printOutBriefDescription(talent);
    expect(text).toBe("Perfect Defense: Gain 2 to your passive defense (cannot exceed AD -1).\n" +
      "Perfect Dodge: (Ability) Free. Once per combat you can reduce the damage and ongoing applied by an attack by 4.");
  });

  it('should be able to see that chi defense has an ability that can be used', () => {
    const chi = service.getNewAbility(TalentName.AdvancedWeaponTrainingInnerFocus, AbilityType.Talent);
    const arrayOfAbilities = service.getAssociatedAbilities(chi, AbilityType.Power);
    expect(arrayOfAbilities).not.toBeNull();
    expect(arrayOfAbilities.length).toBeGreaterThan(0);
  });

  it('should be able to see that perfect defense is associated with perfect dodge', () => {
    const defense = service.getNewAbility(TalentName.PerfectDefense, AbilityType.Talent);
    const arrayOfAbilities = service.getAssociatedAbilities(defense, AbilityType.Ability);
    expect(arrayOfAbilities.length).toEqual(1);
  });

  it('should see that you cannot select perfect dodge by itself', () => {
    const dodge = service.getNewAbility(TalentName.PerfectDodge, AbilityType.Talent);
    expect(service.canAbilityBeSelected(dodge, [], null, Level.One).isSelectable).toBeFalsy();


  });

  /**Stupid Helper functions**/

  function getSimpleTalent(): AbilityModel {
    return service.getNewAbility(TalentName.HealingSpecialization, AbilityType.Talent);
  }

  function getComplexTalent(): AbilityModel {
    return service.getNewAbility(TalentName.MissileParry, AbilityType.Talent);
  }
});
