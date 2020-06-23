import {AttributeStrength} from "../attribute-enums/attribute-strength.enum";
import {AttributeName} from "../attribute-enums/attribute-name.enum";
import {WeaponCategory} from "../../weapon/weapon-category.enum";
import {ValueRange} from "./attribute-constants";

export enum SelectionNames {
  PresenceSelections = "PresenceSelections",
  ReasoningSelections = "ReasoningSelections",
  BrawnSelections = "BrawnSelections",
  AgilitySelections = "AgilitySelections",
}

export type AttributeSelectionsAlias = PresenceSelections | AgilitySelections | ReasoningSelections | BrawnSelections;

export type AttributePicksAlias = PresenceAttributePicks | BrawnAttributePicks | AgilityAttributePicks | ReasoningAttributePicks;

export type AttributeBonusAlias = CriticalAndEmpoweredBonus | AttributeBonus | GlobalDamageAndPenaltyToAttack | GlobalDamageAndPenaltyToCritical | NonScalingAttributeBonus | AttributeBonusWithText | AttributeBonusWithSpeed | SelectionNames;

/**
 * A holder for one of the attributeSelection alias along with a total number of available picks that can be made.  This class is essentally holding what possible selections are available to a player and how many picks they have to allocate to those selections.
 */
export class AttributeSelectionWithPicks {
  selections: AttributeSelectionsAlias;
  numberOfPicks = 0;
}

export class AttributePick {
  category: WeaponCategory;
  attributeStrength: AttributeStrength;
  attributeName: AttributeName;
  numberOfPicks: number;
}

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

export class AttributeBonusWithText {
  criticalBonus: ValueRange;
  empoweredBonus: ValueRange;
  pressText: string;
  pickValue: number;
  maxPicks: 1;
}

export class AttributeBonusWithSpeed {
  bonusToSpeed: number;
  bonusToCritical: ValueRange;
  maxPicks: number;
  pickValue: number;
}

export class PresenceSelections {
  name: SelectionNames = SelectionNames.PresenceSelections;
  forcedMovement: NonScalingAttributeBonus;
  friendlyMovement: NonScalingAttributeBonus;
  bonusToHitWithEnvironmentAttacks: NonScalingAttributeBonus;
  convertAttackDamageIntoGlobal: GlobalDamageAndPenaltyToAttack;
  bonusToGlobalDamageAndPenaltyToCritical: GlobalDamageAndPenaltyToCritical;
}

export class ReasoningSelections {
  name: SelectionNames = SelectionNames.ReasoningSelections;
  bonusToCritical: AttributeBonus;
  bonusToEmpowered: AttributeBonus;
  bonusToCriticalAndEmpowered: CriticalAndEmpoweredBonus;
}

export class BrawnSelections {
  name: SelectionNames = SelectionNames.BrawnSelections;
  bonusToCriticalAndAggressivePress: AttributeBonusWithText;
  bonusToEmpoweredAndAggressivePress: AttributeBonusWithText;
  bonusToEmpowered: AttributeBonus;
  bonusToProtectorAura: AttributeBonus;
  bonusToCriticalAndEmpowered: CriticalAndEmpoweredBonus;
}

export class AgilitySelections {
  name: SelectionNames = SelectionNames.AgilitySelections;
  bonusToCritical: AttributeBonus;
  bonusToSpeedAndCritical: AttributeBonusWithSpeed;
  bonusToDualist: AttributeBonus;
  bonusToFindWeakness: AttributeBonus;
}


export class PresenceAttributePicks {
  requiredHybridAttributeStrength: Array<AttributePick> = new Array<AttributePick>();
  selections: PresenceSelections = new PresenceSelections();
}

export class ReasoningAttributePicks {
  requiredHybridAttributeStrength: Array<AttributePick> = new Array<AttributePick>();
  selections: ReasoningSelections = new ReasoningSelections();
}

export class BrawnAttributePicks {
  requiredHybridAttributeStrength: Array<AttributePick> = new Array<AttributePick>();
  selections: BrawnSelections = new BrawnSelections();
}

export class AgilityAttributePicks {
  requiredHybridAttributeStrength: Array<AttributePick> = new Array<AttributePick>();
  selections: AgilitySelections = new AgilitySelections();
}


