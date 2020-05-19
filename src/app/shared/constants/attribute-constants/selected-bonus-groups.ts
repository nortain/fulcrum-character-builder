import {SpellKeywords} from "../../spells/spell-keywords.enum";
import {AttributeStrength} from "../../attribute/attribute-strength.enum";
import {AttributeType} from "../../attribute/attribute-type.enum";

export class PresenceAttributePicks {
  requiredHybridAttributeStrength: { attributeStrength: AttributeStrength, attributeType: AttributeType };
  forcedMovement: { maxPicks: number, movementBonus: number };
  friendlyMovement: { maxPicks: number, movementBonus: number };
  bonusToHitWithEnvironmentAttacks: {
    maxPicks: number, minDamage: number, maxDamage: number, keyword: SpellKeywords
  };
  convertAttackDamageIntoGlobal: { maxPicks: number, minDamage: number, maxDamage: number };
  BonusToGlobalDamageAndPenaltyToCrit: { maxPicks: number, pickValue: number, minDamage: number, maxDamage: number };

}

export class ReasoningAttributePicks {
  requiredHybridAttributeStrength: { attributeStrength: AttributeStrength, attributeType: AttributeType };
  critBonus: { minBonus: number, maxBonus: number };
  empoweredBonus: { minBonus: number, maxBonus: number };
  empoweredAndCritBonus: {
    minCritBonus: number, maxCritBonus: number, minEmpoweredBonus: number, maxEmpoweredBonus: number
  };
}

export class BrawnAttributePicks {
  requiredHybridAttributeStrength: { attributeStrength: AttributeStrength, attributeType: AttributeType };
  criticalBonusAndAggressivePress: { minBonus: number, maxBonus: number, pressText: string };
  bonusToEmpoweredAndAggressivePress: {
    pickValue: number, minBonus: number, maxBonus: number, pressText: string
  };
  bonusToEmpowered: { pickValue: number, minDamage: number, maxDamage: number };
  bonusToProtectorAura: { minDamage: number, maxDamage: number };
  bonusToEmpoweredAndCrit: {
    minEmpoweredDamage: number, minCritBonus: number, maxEmpoweredDamage: number, maxCritBonus: number
  };
}

export class AgilityAttributePicks {
  requiredHybridAttributeStrength: { attributeStrength: AttributeStrength, attributeType: AttributeType };
  critBonus: { minBonus: number, maxBonus: number };
  bonusToSpeedAndCrit: { maxPicks: number, bonusToSpeed: number, minBonusToCrit: number, maxBonusToCrit: number };
  bonusToDualist: { minBonus: number, maxBonus: number };
  bonusToFindWeakness: { minBonus: number, maxBonus: number };
}


