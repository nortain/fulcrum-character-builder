import {TestBed} from '@angular/core/testing';
import {AttributeFactoryService} from "./attribute-factory.service";
import {AttributeName} from "./attribute-enums/attribute-name.enum";
import {AttributeStrength} from "./attribute-enums/attribute-strength.enum";
import {AttributeModel} from "./attribute-model";
import {WeaponCategory} from "../weapon/weapon-category.enum";
import {Level} from "../character/level.enum";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";
import {AgilitySelections, AttributeBonusAlias, AttributeSelectionWithPicks, BrawnSelections, PresenceSelections, ReasoningSelections} from "./attribute-constants/selected-bonus-groups";
import {ArmorType} from "../armor/armor-type.enum";
import {INITIATIVE_TEXT, PRESS_TEXT} from "./attribute-constants/attribute-constants";


describe('AttributeFactoryService', () => {
  let service: AttributeFactoryService;
  let bra: AttributeModel, vit: AttributeModel, rea: AttributeModel, sd: AttributeModel, int: AttributeModel, attribute: AttributeModel, qu: AttributeModel, agi: AttributeModel, pre: AttributeModel;
  let attributeMap: Map<AttributeName, AttributeModel>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttributeFactoryService]
    });

    service = TestBed.inject<AttributeFactoryService>(AttributeFactoryService);
    attribute = makeAttribute(AttributeName.Brawn);
    bra = makeAttribute(AttributeName.Brawn);
    vit = makeAttribute(AttributeName.Vitality);
    rea = makeAttribute(AttributeName.Reasoning);
    sd = makeAttribute(AttributeName.SelfDiscipline);
    int = makeAttribute(AttributeName.Intuition);
    qu = makeAttribute(AttributeName.Quickness);
    agi = makeAttribute(AttributeName.Agility);
    pre = makeAttribute(AttributeName.Presence);
    attributeMap = service.initializeAllAttributes();
  });


  it('should make the attribute class', () => {
    expect(bra).toBeDefined();
  });

  it('should return an empty object', () => {
    const item = service.getNewAttribute(null);
    expect(item).toBeTruthy();
    expect(item.attributeStrength).toBeFalsy();
    expect(item.attributeName).toBeFalsy();
  });

  it('attribute can have a name', () => {
    expect(bra.attributeName).toEqual(AttributeName.Brawn);
  });

  it('should have strength 0 by default', () => {
    const testAttribute = service.getNewAttribute(AttributeName.Presence);
    expect(testAttribute.attributeStrength).toEqual(AttributeStrength.Normal);
  });

  it('should confirm that certain attributes give a skill bonus while others do not', () => {
    expect(service.getSkillBonus(bra, AttributeName.Brawn)).toEqual(5);
    expect(service.getSkillBonus(qu, AttributeName.Quickness)).toEqual(0);
    expect(service.getSkillBonus(bra, AttributeName.Agility)).toEqual(0);
    expect(service.getSkillBonus(int, AttributeName.Reasoning)).toEqual(5);
    expect(service.getSkillBonus(int, AttributeName.Vitality)).toEqual(0);
  });

  it('should change skill bonus as strength changes', () => {
    expect(service.getSkillBonus(agi, AttributeName.Agility)).toEqual(5);
    agi.attributeStrength = AttributeStrength.Champion;
    expect(service.getSkillBonus(agi, AttributeName.Agility)).toEqual(3);
  });

  it('should be able to determine if an attribute is defensive', () => {
    expect(service.getMagicDefense(bra, MagicDefenseType.Fortitude)).toEqual(0);
    expect(service.getMagicDefense(vit, MagicDefenseType.Fortitude)).toEqual(5);
    expect(service.getMagicDefense(agi, MagicDefenseType.Reflex)).toEqual(0);
  });

  it('should provide magic defense only for the type of md it gives', () => {
    expect(service.getMagicDefense(qu, MagicDefenseType.Reflex)).toEqual(5);
    expect(service.getMagicDefense(qu, MagicDefenseType.Will)).toEqual(0);
  });

  it('should determine that intution gives defense to all kinds of magic', () => {
    expect(service.getMagicDefense(int, MagicDefenseType.Reflex)).toEqual(3);
    expect(service.getMagicDefense(int, MagicDefenseType.Fortitude)).toEqual(3);
    expect(service.getMagicDefense(int, MagicDefenseType.Will)).toEqual(3);
  });

  it('should show that magic defense changes based on strength', () => {
    expect(service.getMagicDefense(int, MagicDefenseType.Reflex)).toEqual(3);
    int.attributeStrength = AttributeStrength.Heroic;
    expect(service.getMagicDefense(int, MagicDefenseType.Reflex)).toEqual(1);
  });

  it('should be able to get damage for legendary brawn', () => {
    bra.attributeStrength = AttributeStrength.Legendary;
    expect(service.getAttackDamageBonus(bra, WeaponCategory.Heavy, Level.One).modifierOfDice.value()).toEqual(5);
    expect(service.getAttackDamageBonus(bra, WeaponCategory.Heavy, Level.Ten).modifierOfDice.value()).toEqual(13);
  });

  it('should be able to get balanced damage for champion brawn', () => {
    bra.attributeStrength = AttributeStrength.Champion;
    expect(service.getAttackDamageBonus(bra, WeaponCategory.Balanced, Level.One).modifierOfDice.value()).toEqual(3);
    expect(service.getAttackDamageBonus(bra, WeaponCategory.Balanced, Level.Ten).modifierOfDice.value()).toEqual(8);
  });

  it('should be able to get damage for epic presence', () => {
    pre.attributeStrength = AttributeStrength.Epic;
    expect(service.getAttackDamageBonus(pre, WeaponCategory.Presence, Level.Three).modifierOfDice.value()).toEqual(5);
    expect(service.getAttackDamageBonus(pre, WeaponCategory.Hybrid, Level.Six).printRoll()).toEqual("6");
  });

  it('should be able to get damage for legendary presence with a chosen penalty to attack damage', () => {
    pre.chosenBonusPicks = [{convertAttackDamageIntoGlobal: pre.selectableBonusPicks.typeOfPick[4].selections["convertAttackDamageIntoGlobal"]} as PresenceSelections];
    expect(service.getAttackDamageBonus(pre, WeaponCategory.Presence, Level.One).printRoll()).toEqual("3");
    expect(service.getAttackDamageBonus(pre, WeaponCategory.Presence, Level.Ten).modifierOfDice.value()).toEqual(7);
  });


  it('should show that a defensive stat does not get a damage bonus', () => {
    Object.keys(WeaponCategory).map(key => {
      expect(service.getAttackDamageBonus(vit, WeaponCategory[key], Level.Six).modifierOfDice.value()).toEqual(0);
    });
  });


  it('should show bonus critical possible brawn Selections', () => {
    expect(service.getCriticalBonus(bra, Level.One)).toEqual(0);
    bra.chosenBonusPicks = [{bonusToCriticalAndEmpowered: bra.selectableBonusPicks.typeOfPick[4].selections["bonusToCriticalAndEmpowered"]} as BrawnSelections];
    expect(service.getCriticalBonus(bra, Level.One)).toEqual(1);
    expect(service.getCriticalBonus(bra, Level.Seven)).toEqual(2);
    bra.chosenBonusPicks.push({bonusToCriticalAndAggressivePress: bra.selectableBonusPicks.typeOfPick[2].selections["bonusToCriticalAndAggressivePress"]} as BrawnSelections);
    expect(service.getCriticalBonus(bra, Level.One)).toEqual(2);
  });

  it('should show a bonus of 0 for attributes that do not offer crit bonuses', () => {
    expect(service.getCriticalBonus(vit, Level.Three)).toEqual(0);
    expect(service.getCriticalBonus(sd, Level.Three)).toEqual(0);
    expect(service.getCriticalBonus(qu, Level.Three)).toEqual(0);
    expect(service.getCriticalBonus(int, Level.Three)).toEqual(0);

  });

  it('should show critical bonus for possible AgilitySelections', () => {
    expect(service.getCriticalBonus(agi, Level.One)).toEqual(0);
    agi.chosenBonusPicks = [{bonusToCritical: agi.selectableBonusPicks.typeOfPick[4].selections["bonusToCritical"]} as AgilitySelections];
    expect(service.getCriticalBonus(agi, Level.One)).toEqual(3);
    expect(service.getCriticalBonus(agi, Level.Nine)).toEqual(7);
    agi.chosenBonusPicks.push({bonusToSpeedAndCritical: agi.selectableBonusPicks.typeOfPick[4].selections["bonusToSpeedAndCritical"]} as AgilitySelections);
    expect(service.getCriticalBonus(agi, Level.One)).toEqual(4);
  });

  it('should show critical bonus or lack thereof for possible PresenceSelections', () => {
    expect(service.getCriticalBonus(pre, Level.One)).toEqual(0);
    pre.chosenBonusPicks = [{bonusToGlobalDamageAndPenaltyToCritical: pre.selectableBonusPicks.typeOfPick[4].selections["bonusToGlobalDamageAndPenaltyToCritical"]} as PresenceSelections];
    expect(service.getCriticalBonus(pre, Level.One)).toEqual(-1);
    expect(service.getCriticalBonus(pre, Level.Ten)).toEqual(-3);
  });

  it('should be able to show selected critical bonuses for possible ReasoningSelections', () => {
    rea = makeAttribute(AttributeName.Reasoning);
    expect(service.getCriticalBonus(rea, Level.One)).toEqual(0);
    rea.chosenBonusPicks = [{bonusToCritical: rea.selectableBonusPicks.typeOfPick[4].selections["bonusToCritical"]} as ReasoningSelections];
    expect(service.getCriticalBonus(rea, Level.One)).toEqual(3);
    expect(service.getCriticalBonus(rea, Level.Ten)).toEqual(8);
    rea.chosenBonusPicks.push({bonusToCriticalAndEmpowered: rea.selectableBonusPicks.typeOfPick[3].selections["bonusToCriticalAndEmpowered"]} as ReasoningSelections);
    expect(service.getCriticalBonus(rea, Level.One)).toEqual(4);
    expect(service.getCriticalBonus(rea, Level.Ten)).toEqual(11);
  });

  it('should show critical bonuses for basecrit from hybrid builds but not from non-hybrids', () => {
    pre = makeAttribute(AttributeName.Presence);
    expect(service.getCriticalBonus(pre, Level.One, WeaponCategory.Hybrid)).toEqual(0);
    pre.attributeStrength = AttributeStrength.Epic;
    expect(service.getCriticalBonus(pre, Level.One, WeaponCategory.Hybrid)).toEqual(1);
    rea = makeAttribute(AttributeName.Reasoning);
    expect(service.getCriticalBonus(rea, Level.One, WeaponCategory.Hybrid)).toEqual(0);
    rea.attributeStrength = AttributeStrength.Epic;
    expect(service.getCriticalBonus(rea, Level.One, WeaponCategory.Hybrid)).toEqual(1);
  });

  it('should be able to show how many bonus hit points it gives', () => {
    expect(service.getHitPointBonus(vit, Level.One)).toEqual(14);
    expect(service.getHitPointBonus(vit, Level.Ten)).toEqual(35);
    expect(service.getHitPointBonus(qu, Level.One)).toEqual(0);
    expect(service.getHitPointBonus(agi, Level.One)).toEqual(0);
    expect(service.getHitPointBonus(vit, Level.Six)).toEqual(26);
    vit.attributeStrength = AttributeStrength.Champion;
    expect(service.getHitPointBonus(vit, Level.One)).toEqual(8);
  });

  it('should be able to show how many bonus thp an attribute has', () => {
    expect(service.getStartingTemporaryHitPoints(sd, Level.One)).toEqual(7);
    expect(service.getStartingTemporaryHitPoints(sd, Level.Ten)).toEqual(18);
    expect(service.getStartingTemporaryHitPoints(bra, Level.One)).toEqual(0);
    expect(service.getStartingTemporaryHitPoints(int, Level.One)).toEqual(0);
    sd.attributeStrength = AttributeStrength.Epic;
    expect(service.getStartingTemporaryHitPoints(sd, Level.One)).toEqual(5);
  });


  it('should be able to get bonus recoveries', () => {
    expect(service.getBonusRecoveryPoints(vit)).toEqual(1);
    vit.attributeStrength = AttributeStrength.Champion;
    expect(service.getBonusRecoveryPoints(vit)).toEqual(0);
    expect(service.getBonusRecoveryPoints(agi)).toEqual(0);
  });

  it('should be able to get bonus initiative', () => {
    expect(service.getInitiativeBonus(qu)).toEqual(16);
    qu.attributeStrength = AttributeStrength.Heroic;
    expect(service.getInitiativeBonus(qu)).toEqual(5);
    expect(service.getInitiativeBonus(vit)).toEqual(0);
    expect(service.getInitiativeBonus(int)).toEqual(8);
  });

  it('should be able to get speed bonus', () => {
    expect(service.getSpeedBonus(agi)).toEqual(0);
    agi.chosenBonusPicks = [{bonusToSpeedAndCritical: agi.selectableBonusPicks.typeOfPick[4].selections["bonusToSpeedAndCritical"]} as AgilitySelections];
    expect(service.getSpeedBonus(agi)).toEqual(1);
    agi.chosenBonusPicks.push({bonusToSpeedAndCritical: agi.selectableBonusPicks.typeOfPick[4].selections["bonusToSpeedAndCritical"]} as AgilitySelections);
    expect(service.getSpeedBonus(agi)).toEqual(2);
    expect(service.getSpeedBonus(bra)).toEqual(0);

  });

  it('should be able to get power point bonus', () => {
    expect(service.getPowerPointBonus(rea)).toEqual(0);
    expect(service.getPowerPointBonus(sd)).toEqual(7);
    sd.attributeStrength = AttributeStrength.Champion;
    expect(service.getPowerPointBonus(sd)).toEqual(4);

  });

  it('should be able to get armor bonus', () => {
    expect(service.getArmorBonus(qu, ArmorType.LightArmor)).toEqual(0);
    expect(service.getArmorBonus(sd, ArmorType.CasterArmor)).toEqual(1);
    sd.attributeStrength = AttributeStrength.Champion;
    expect(service.getArmorBonus(sd, ArmorType.CasterArmor)).toEqual(0);
    expect(service.getArmorBonus(int, ArmorType.LightArmor)).toEqual(1);
    expect(service.getArmorBonus(int, ArmorType.MediumArmor)).toEqual(1);
    expect(service.getArmorBonus(int, ArmorType.None)).toEqual(1);
    int.attributeStrength = AttributeStrength.Champion;
    expect(service.getArmorBonus(int, ArmorType.MediumArmor)).toEqual(0);
  });

  it('should be able to get trained skill bonus', () => {
    expect(service.getTrainedSkillsBonus(bra)).toEqual(0);
    expect(service.getTrainedSkillsBonus(qu)).toEqual(2);
    expect(service.getTrainedSkillsBonus(vit)).toEqual(2);
    expect(service.getTrainedSkillsBonus(sd)).toEqual(2);
    sd.attributeStrength = AttributeStrength.Champion;
    expect(service.getTrainedSkillsBonus(sd)).toEqual(1);
    qu.attributeStrength = AttributeStrength.Epic;
    expect(service.getTrainedSkillsBonus(qu)).toEqual(1);
    vit.attributeStrength = AttributeStrength.Heroic;
    expect(service.getTrainedSkillsBonus(vit)).toEqual(0);
  });

  it('should be able to get a bonus to dodge', () => {
    expect(service.getDodgeBonus(sd, Level.One)).toEqual(0);
    expect(service.getDodgeBonus(int, Level.One)).toEqual(7);
    int.attributeStrength = AttributeStrength.Champion;
    expect(service.getDodgeBonus(int, Level.One)).toEqual(4);
    expect(service.getDodgeBonus(int, Level.Seven)).toEqual(8);
  });

  it('should be able to get first turn damage resist', () => {
    expect(service.getFirstTurnDamageResist(qu, Level.One)).toEqual(7);
    expect(service.getFirstTurnDamageResist(qu, Level.Ten)).toEqual(18);
    qu.attributeStrength = AttributeStrength.Champion;
    expect(service.getFirstTurnDamageResist(qu, Level.One)).toEqual(4);
    expect(service.getFirstTurnDamageResist(sd, Level.Ten)).toEqual(0);
  });

  it('should be able to get special text', () => {
    expect(service.getSpecialText(qu)).toBe(INITIATIVE_TEXT);
    bra.chosenBonusPicks = [{bonusToCriticalAndAggressivePress: bra.selectableBonusPicks.typeOfPick[2].selections["bonusToCriticalAndAggressivePress"]} as BrawnSelections];
    expect(service.getSpecialText(bra)).toBe(PRESS_TEXT);
    qu.attributeStrength = AttributeStrength.Epic;
    expect(service.getSpecialText(qu)).toBe(INITIATIVE_TEXT);
    qu.attributeStrength = AttributeStrength.Champion;
    expect(service.getSpecialText(qu)).toBe("");
    expect(service.getSpecialText(agi)).toBe("");
  });

  it('should be able to get special text for epic brawn', () => {
    bra.attributeStrength = AttributeStrength.Epic;
    const newMap = service.initializeAllAttributes();
    newMap.set(AttributeName.Brawn, bra);
    const selection = service.presentChoices(AttributeName.Brawn, newMap, WeaponCategory.Heavy);
    const type = "bonusToEmpoweredAndAggressivePress" as keyof AttributeBonusAlias;
    service.selectBonus(newMap, selection, type);
    expect(service.getSpecialText(bra)).toBe(PRESS_TEXT);
  });

  it('should be able to initalize all attributes', () => {
    const newMap = service.initializeAllAttributes();
    expect(newMap.get(AttributeName.Brawn).attributeName).toEqual(AttributeName.Brawn);
    expect(newMap.get(AttributeName.Vitality).attributeName).toEqual(AttributeName.Vitality);
    expect(newMap.get(AttributeName.Agility).attributeName).toEqual(AttributeName.Agility);
    expect(newMap.get(AttributeName.Quickness).attributeName).toEqual(AttributeName.Quickness);
    expect(newMap.get(AttributeName.Reasoning).attributeName).toEqual(AttributeName.Reasoning);
    expect(newMap.get(AttributeName.Presence).attributeName).toEqual(AttributeName.Presence);
    expect(newMap.get(AttributeName.SelfDiscipline).attributeName).toEqual(AttributeName.SelfDiscipline);
    expect(newMap.get(AttributeName.Intuition).attributeName).toEqual(AttributeName.Intuition);
  });

  it('should be able to get initalized attributes by name', () => {
    const newMap = service.initializeAllAttributes();
    const testAttribute = newMap.get(AttributeName.Vitality);
    expect(testAttribute.attributeName).toEqual(AttributeName.Vitality);
  });

  it('should be able to determine if requiredAttributeIsStrongEnough', () => {
    bra.attributeStrength = AttributeStrength.Heroic;
    agi.attributeStrength = AttributeStrength.Champion;
    attributeMap.set(AttributeName.Brawn, bra);
    const result = service.isRequiredAttributeStrongEnough(
      agi.selectableBonusPicks.typeOfPick[agi.attributeStrength].requiredHybridAttributeStrength[0],
      attributeMap,
      WeaponCategory.Balanced);
    expect(result).toBeTruthy();
  });

  it('should be able to determine if required attribute is strong enough when there is no required attribute', () => {
    attributeMap.set(AttributeName.Agility, agi);
    const result = service.isRequiredAttributeStrongEnough(
      agi.selectableBonusPicks.typeOfPick[agi.attributeStrength].requiredHybridAttributeStrength[0],
      attributeMap,
      WeaponCategory.Agile);
    expect(result).toBeTruthy();
  });

  it('should be able to match to the first matching required strength when multiples exist', () => {
    rea.attributeStrength = AttributeStrength.Epic;
    let result = service.isRequiredAttributeStrongEnough(
      rea.selectableBonusPicks.typeOfPick[rea.attributeStrength].requiredHybridAttributeStrength[0],
      attributeMap,
      WeaponCategory.Hybrid);
    expect(result).toBeFalsy();

    result = service.isRequiredAttributeStrongEnough(
      rea.selectableBonusPicks.typeOfPick[rea.attributeStrength].requiredHybridAttributeStrength[1],
      attributeMap,
      WeaponCategory.Hybrid);
    expect(result).toBeTruthy();

    attributeMap.set(AttributeName.Presence, pre);
    result = service.isRequiredAttributeStrongEnough(
      rea.selectableBonusPicks.typeOfPick[rea.attributeStrength].requiredHybridAttributeStrength[0],
      attributeMap,
      WeaponCategory.Hybrid);
    expect(result).toBeTruthy();
  });

  it('should be able to present choices for presence if legendary strength', () => {
    attributeMap.set(AttributeName.Presence, pre);
    const selection = service.presentChoices(AttributeName.Presence, attributeMap, WeaponCategory.Presence);
    expect(selection.numberOfPicks).toEqual(6);
    expect(selection.selections["forcedMovement"].bonusTo).toEqual(1);
  });

  it('should find the first present choice for champ/hero pre/rea', () => {
    pre.attributeStrength = AttributeStrength.Champion;
    rea.attributeStrength = AttributeStrength.Heroic;
    attributeMap.set(AttributeName.Presence, pre);
    attributeMap.set(AttributeName.Reasoning, rea);
    let selection = service.presentChoices(AttributeName.Presence, attributeMap, WeaponCategory.Hybrid);
    expect(selection.numberOfPicks).toEqual(2);
    expect(selection.selections["forcedMovement"].maxPicks).toEqual(2);

    rea.attributeStrength = AttributeStrength.Champion;
    attributeMap.set(AttributeName.Reasoning, rea);
    selection = service.presentChoices(AttributeName.Presence, attributeMap, WeaponCategory.Hybrid);
    expect(selection.numberOfPicks).toEqual(3);
  });

  it('should be able to select a bonus', () => {
    const newMap = service.initializeAllAttributes();
    newMap.set(AttributeName.Reasoning, rea);
    const selection = makeAttributeSelection(rea);
    const type = "bonusToCritical" as keyof AttributeBonusAlias;
    const result = service.selectBonus(newMap, selection, type);
    expect(result).toBeTruthy();
    const reasoning = newMap.get(AttributeName.Reasoning);
    expect(reasoning.chosenBonusPicks.length).toEqual(1);
    expect((reasoning.chosenBonusPicks[0] as ReasoningSelections).bonusToCritical).toBeTruthy();
    expect((reasoning.chosenBonusPicks[0] as ReasoningSelections).bonusToCriticalAndEmpowered).toBeFalsy();
    expect((reasoning.chosenBonusPicks[0] as ReasoningSelections).bonusToEmpowered).toBeFalsy();
  });

  it('should be able to determine if a bonus has Used its maximum number of picks yet', () => {
    const newMap = service.initializeAllAttributes();
    newMap.set(AttributeName.Presence, pre);
    const selection = makeAttributeSelection(pre);
    let type = "bonusToGlobalDamageAndPenaltyToCritical" as keyof AttributeBonusAlias;
    let result = service.selectBonus(newMap, selection, type);
    expect(result).toBeTruthy();
    result = service.selectBonus(newMap, selection, type);
    expect(result).toBeFalsy();
    type = "forcedMovement" as keyof AttributeBonusAlias;
    result = service.selectBonus(newMap, selection, type);
    expect(result).toBeTruthy();
    type = "convertAttackDamageIntoGlobal" as keyof AttributeBonusAlias;
    service.selectBonus(newMap, selection, type);
    service.selectBonus(newMap, selection, type);
    result = service.selectBonus(newMap, selection, type);
    expect(result).toBeTruthy();
    result = service.selectBonus(newMap, selection, type);
    expect(result).toBeFalsy();
    pre = newMap.get(AttributeName.Presence);
    expect(pre.chosenBonusPicks.length).toEqual(5);
    expect(pre.chosenBonusPicks.find(item => item["bonusToGlobalDamageAndPenaltyToCritical"])).toBeTruthy();
    expect(pre.chosenBonusPicks.find(item => item["friendlyMovement"])).toBeFalsy();
    expect(pre.chosenBonusPicks.find(item => item["forcedMovement"])).toBeTruthy();
    expect(pre.chosenBonusPicks.find(item => item["convertAttackDamageIntoGlobal"])).toBeTruthy();
  });

  it('should be able to get how many bonusAttributePoints have been spent per attribute', () => {
    let result = service.getNumberOfBonusAttributePointsSpent(bra);
    expect(result).toEqual(0);
    const newMap = service.initializeAllAttributes();
    newMap.set(AttributeName.Brawn, bra);
    const selection = makeAttributeSelection(bra);
    const type = "bonusToEmpoweredAndAggressivePress" as keyof AttributeBonusAlias;
    service.selectBonus(newMap, selection, type);
    result = service.getNumberOfBonusAttributePointsSpent(newMap.get(AttributeName.Brawn));
    expect(result).toEqual(2);
    result = service.getNumberOfBonusAttributePointsSpent(bra);
    expect(result).toEqual(2);
  });

  it('should be able to ', () => {

  });


  /**
   * HELPER function that makes a legendary attribute given an attribute name
   * @param name
   */
  function makeAttribute(name?: AttributeName): AttributeModel {
    if (!name) {
      name = AttributeName.Brawn;
    }
    return service.getNewAttribute(name, AttributeStrength.Legendary);
  }

  /*Dumb helper function*/
  function makeAttributeSelection(attType: AttributeModel): AttributeSelectionWithPicks {
    const legendaryAttributeChoice = attType.selectableBonusPicks.typeOfPick[attType.attributeStrength];
    const name = attType.attributeName.toString() + "Selection";
    const selection: AttributeSelectionWithPicks = {
      selections: legendaryAttributeChoice.selections,
      numberOfPicks: legendaryAttributeChoice.requiredHybridAttributeStrength[0].numberOfPicks
    };
    return selection;
  }
});
