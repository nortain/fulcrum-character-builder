import {SpellKeywords} from "../../spells/spell-keywords.enum";
import {AttributeStrength} from "../../attribute/attribute-strength.enum";
import {AttributeType} from "../../attribute/attribute-type.enum";
import {AttributeName} from "../../attribute/attribute-name.enum";
import {WeaponCategory} from "../../weapon/weapon-category.enum";

export class PresenceAttributePicks {
  requiredHybridAttributeStrength: Array<{
    category: WeaponCategory,
    attributeStrength: AttributeStrength, attributeName: AttributeName,
    numberOfPicks: number;
  }>;
  selections: {
    forcedMovement: { maxPicks: number, movementBonus: number };
    friendlyMovement: { maxPicks: number, movementBonus: number };
    bonusToHitWithEnvironmentAttacks: {
      maxPicks: number, bonusToHit: number, keyword: SpellKeywords
    };
    convertAttackDamageIntoGlobal: { maxPicks: number, minBonus: number, maxBonus: number };
    bonusToGlobalDamageAndPenaltyToCrit: { maxPicks: number, pickValue: number, minBonus: number, maxBonus: number };
  };
}

export class ReasoningAttributePicks {
  requiredHybridAttributeStrength: Array<{
    category: WeaponCategory,
    attributeStrength: AttributeStrength, attributeName: AttributeName,
    numberOfPicks: number;
  }>;
  selections: {
    bonusToCrit: { minBonus: number, maxBonus: number };
    bonusToEmpowered: { minBonus: number, maxBonus: number };
    bonusToEmpoweredAndCrit: {
      minBonusToCrit: number, maxBonusToCrit: number, minEmpoweredBonus: number, maxEmpoweredBonus: number
    };
  };
}

export class BrawnAttributePicks {
  requiredHybridAttributeStrength: Array<{
    category: WeaponCategory,
    attributeStrength: AttributeStrength, attributeName: AttributeName,
    numberOfPicks: number;
  }>;
  selections: {
    bonusToCriticalAndAggressivePress: { minBonus: number, maxBonus: number, pressText: string };
    bonusToEmpoweredAndAggressivePress: {
      pickValue: number, minBonus: number, maxBonus: number, pressText: string
    };
    bonusToEmpowered: { pickValue: number, minBonus: number, maxBonus: number };
    bonusToProtectorAura: { minBonus: number, maxBonus: number };
    bonusToEmpoweredAndCrit: {
      minEmpoweredBonus: number, minBonusToCrit: number, maxEmpoweredBonus: number, maxBonusToCrit: number
    };
  };

}

export class AgilityAttributePicks {
  requiredHybridAttributeStrength: Array<{
    category: WeaponCategory,
    attributeStrength: AttributeStrength, attributeName: AttributeName,
    numberOfPicks: number;
  }>;
  selections: {
    bonusToCrit: { minBonus: number, maxBonus: number };
    bonusToSpeedAndCrit: { maxPicks: number, bonusToSpeed: number, minBonusToCrit: number, maxBonusToCrit: number };
    bonusToDualist: { minBonus: number, maxBonus: number };
    bonusToFindWeakness: { minBonus: number, maxBonus: number };
  };
}


