import {AbilityName, AbilityType} from "./ability-type.enum";
import {ValueRange} from "../attribute/attribute-constants/attribute-constants";
import {AbilityBonus} from "./ability-bonus.enum";
import {DiceSize} from "../character/dice/dice-size.enum";
import {ActionType} from "../action/action-type.enum";
import {LevelRange} from "../spells/enums/level-range.enum";
import {Level} from "../character/level.enum";
import {TalentName} from "./talent/talent-name.enum";

export class AbilityModel {
  abilityName: AbilityName;
  abilityType: AbilityType;
  abilityAction: ActionType;
  pickNumber = 0; // used to determine how many sub talents can be choose
  innerSelectedAbilities = new Array<AbilityName>();
  abilityCost: Array<IAbilityRequirement>; // This list multiple costs, but only one needs to be paid, no costs are present then the talent cannot be selected
  associatedAbilities: Array<AbilityName>;
  abilityDescription: IDescription;
  mechanicalBonus: Array<IAbilityBonus>;
  abilityRequirement: Array<IAbilityRequirement>; // This lists all requirements that must be met to get the ability
}

/**
 * Full descriptions would include all text that an abilty offers while a brief description is something that would go on a particular character sheet and are level dependent for values that
 * scale.  brief descriptions will also include inner picks if any are present
 */
export interface IDescription {
  fullDescription: string;
  briefDescription: string;
}

export interface IAbilityBonus {
  abilityBonus: AbilityBonus;
  abilityType: AbilityType;
  value: ValueRange | AbilityBonus;
  dieSize?: DiceSize;
  adjustLevel?: Level;
}

export interface ICanBeSelected {
  isSelectable: boolean;
  reasonItCannotBeSelected?: string;
}

/**
 * Expresses a requirement that is necessary to obtain this ability.  In a key value pair.  A requirement identifier which is a AbilityBonus enum to specify what specific thing is required and then a requirementValue which is how much of said bonus is needed.
 */
export interface IAbilityRequirement {
  requirementType: AbilityName;
  requirementValue: number | boolean;
}
