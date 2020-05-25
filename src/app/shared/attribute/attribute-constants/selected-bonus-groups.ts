
import {AttributeStrength} from "../attribute-enums/attribute-strength.enum";
import {AttributeName} from "../attribute-enums/attribute-name.enum";
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

export class GlobalDamageAndPenaltyToCritical {
  bonusToGlobal: ValueRange;
  bonusToCritical: ValueRange;
  maxPicks: number;
  pickValue: number;
}

export class GlobalDamageAndPenaltyToAttack {
  bonusToGlobal: ValueRange;
  bonusToAttack: ValueRange;
  maxPicks: number;
  pickValue: number;
}

export class NonScalingAttributeBonus {
  bonusTo: number;
  maxPicks: number;
  pickValue: number;
}

export class PresenceSelections {
  forcedMovement: NonScalingAttributeBonus;
  friendlyMovement: NonScalingAttributeBonus;
  bonusToHitWithEnvironmentAttacks: NonScalingAttributeBonus;
  convertAttackDamageIntoGlobal: GlobalDamageAndPenaltyToAttack;
  bonusToGlobalDamageAndPenaltyToCritical: GlobalDamageAndPenaltyToCritical;
}

export class ReasoningSelections {
  bonusToCritical: AttributeBonus;
  bonusToEmpowered: AttributeBonus;
  bonusToEmpoweredAndCritical: CriticalAndEmpoweredBonus;
}

export class BrawnSelections {
  bonusToCriticalAndAggressivePress: { criticalBonus: ValueRange, pressText: string, pickValue: number };
  bonusToEmpoweredAndAggressivePress: { empoweredBonus: ValueRange, pressText: string, pickValue: number };
  bonusToEmpowered: AttributeBonus;
  bonusToProtectorAura: AttributeBonus;
  bonusToEmpoweredAndCritical: CriticalAndEmpoweredBonus;
}

export class AgilitySelections {
  bonusToCritical: AttributeBonus;
  bonusToSpeedAndCritical: { maxPicks: number, bonusToSpeed: number, bonusToCritical: ValueRange };
  bonusToDualist: AttributeBonus;
  bonusToFindWeakness: AttributeBonus;
}


export class PresenceAttributePicks {
  requiredHybridAttributeStrength: Array<{
    category: WeaponCategory,
    attributeStrength: AttributeStrength, attributeName: AttributeName,
    numberOfPicks: number;
  }>;
  selections: PresenceSelections;
}

export class ReasoningAttributePicks {
  requiredHybridAttributeStrength: Array<{
    category: WeaponCategory,
    attributeStrength: AttributeStrength, attributeName: AttributeName,
    numberOfPicks: number;
  }>;
  selections: ReasoningSelections;
}

export class BrawnAttributePicks {
  requiredHybridAttributeStrength: Array<{
    category: WeaponCategory,
    attributeStrength: AttributeStrength, attributeName: AttributeName,
    numberOfPicks: number;
  }>;
  selections: BrawnSelections;
}

export class AgilityAttributePicks {
  requiredHybridAttributeStrength: Array<{
    category: WeaponCategory,
    attributeStrength: AttributeStrength,
    attributeName: AttributeName,
    numberOfPicks: number;
  }>;
  selections: AgilitySelections;
}


