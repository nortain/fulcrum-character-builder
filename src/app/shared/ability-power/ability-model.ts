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
  fullDescriptionAbilityType: AbilityType; // for full description without replacement test, print non-talent types
  briefDescriptionAbilityType: AbilityType;
  pickNumber = 0; // used to determine how many sub talents can be chosen.  If 0 then no choices exist
  innerSelectedAbilities = new Array<AbilityName>(); // A saved state of an ability.  This holds the name of any chosen abilities with regards to the pickNumber.  For example if pickNumber is 2, then innerSelectedAbilities should be between 0 and 2 in length to indicate which abilities have been chosen for this ability
  abilityCost: Array<IAbilityRequirement>; // This list multiple costs, but only one needs to be paid, no costs are present then the talent cannot be selected
  associatedAbilities: Array<AbilityName>; // other abilities that you might get when getting this ability
  abilityDescription: IDescription; // text description of what the ability does
  mechanicalBonus: Array<IAbilityBonus>; // bonuses provided by the ability that need to be tracked
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

/**
 * This interace will track ability bonuses granted by abilities.  The abilityBonus is the name of the bonus being provide while ability type narrows down what type of ability it is.  The value can be a value range for scaling and non-scaling numerical bonuses while the ability bonus can be used to confirm or convert an existing ability bonus.  For example if an ability makes MD count as AD then the ability bonus would be MissileDefense while the value would be ActiveDefense.
 *
 * abilityQualifiers are a collection of requirements where they can restrict or prevent the ability from actually giving its intended bonus.
 *
 * dieSize is optional for use when scaling values might need a die value.
 *
 * Level is also optional but is used for scaling value ranges.  If nothing is provided this assumes level 10 but any scaling values can pass in the actual level of the bonus they'd like to get.
 */
export interface IAbilityBonus {
  abilityBonus: AbilityBonus;
  abilityType: AbilityType;
  value: ValueRange | AbilityBonus;
  abilityQualifier: Array<IAbilityRequirement>;
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
  requirementAbilityName: AbilityName;
  requirementType: AbilityType;
  requirementValue: number | boolean;
}
