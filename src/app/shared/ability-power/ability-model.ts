import {AbilityType} from "./ability-type.enum";
import {ValueRange} from "../attribute/attribute-constants/attribute-constants";
import {AbilityBonus} from "./ability-bonus.enum";
import {DiceSize} from "../character/dice/dice-size.enum";
import {ActionType} from "../action/action-type.enum";

export class AbilityModel {
  abilityName: string;
  abilityType: AbilityType;
  abilityAction: ActionType;
  abilityCost: Array<IAbilityRequirement>; // This list multiple costs, but only one needs to be paid
  activeAbility: AbilityModel;
  abilityDescription: IDescription;
  mechanicalBonus: Array<IAbilityBonus>;
  abilityRequirement: Array<IAbilityRequirement>; // This lists all requirements that must be met to get the ability
}

/**
 * Full descriptions would include all text that an abilty offers while a brief description is something that would go on a particular character sheet and are level dependent for values that
 * scale
 */  // TODO look at possibly dropping this to just being a string and use some kind of global replacement to hide full description text
export interface IDescription {
  fullDescription: string;
  briefDescription: string;
}

export interface IAbilityBonus {
  abilityType: AbilityBonus;
  value: ValueRange | AbilityBonus;
  dieSize?: DiceSize;
}

/**
 * Expresses a requirement that is necessary to obtain this ability.  In a key value pair.  A requirement identifier which is a AbilityBonus enum to specify what specific thing is required and then a requirementValue which is how much of said bonus is needed.
 */
export interface IAbilityRequirement {
  requirementType: AbilityBonus;
  requirementValue: number | boolean;
}
