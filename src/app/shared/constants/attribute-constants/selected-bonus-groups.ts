import {SpellKeywords} from "../../spells/spell-keywords.enum";
import {AttributeStrength} from "../../attribute/attribute-strength.enum";
import {AttributeType} from "../../attribute/attribute-type.enum";
import {AttributeName} from "../../attribute/attribute-name.enum";
import {WeaponCategory} from "../../weapon/weapon-category.enum";
import {ValueRange} from "./attribute-constants";


export class CriticalAndEmpoweredBonus {
  bonusToCritical: ValueRange;
  bonusToEmpowered: ValueRange;
  maxPicks: number;
  pickValue: number;
}

export class AttributeBonus {
  bonusTo: ValueRange;
  maxPicks: number;
  pickValue: number;
}


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
    convertAttackDamageIntoGlobal: AttributeBonus;
    bonusToGlobalDamageAndPenaltyToCritical: AttributeBonus;
  };
}

export class ReasoningAttributePicks {
  requiredHybridAttributeStrength: Array<{
    category: WeaponCategory,
    attributeStrength: AttributeStrength, attributeName: AttributeName,
    numberOfPicks: number;
  }>;
  selections: {
    bonusToCritical: ValueRange;
    bonusToEmpowered: ValueRange;
    bonusToEmpoweredAndCritical: CriticalAndEmpoweredBonus;
  };
}

export class BrawnAttributePicks {
  requiredHybridAttributeStrength: Array<{
    category: WeaponCategory,
    attributeStrength: AttributeStrength, attributeName: AttributeName,
    numberOfPicks: number;
  }>;
  selections: {
    bonusToCriticalAndAggressivePress: { criticalBonus: ValueRange, maxPicks: number, pressText: string };
    bonusToEmpoweredAndAggressivePress: {
      empoweredBonus: ValueRange,
      maxPicks: number,
      pressText: string,
      pickValue: number
    };
    bonusToEmpowered: AttributeBonus;
    bonusToProtectorAura: ValueRange;
    bonusToEmpoweredAndCritical: CriticalAndEmpoweredBonus;
  };

}

export class AgilityAttributePicks {
  requiredHybridAttributeStrength: Array<{
    category: WeaponCategory,
    attributeStrength: AttributeStrength,
    attributeName: AttributeName,
    numberOfPicks: number;
  }>;
  selections: {
    bonusToCritical: ValueRange;
    bonusToSpeedAndCritical: { maxPicks: number, bonusToSpeed: number, bonusToCritical: ValueRange};
    bonusToDualist: ValueRange;
    bonusToFindWeakness: ValueRange;
  };
}


