import {AbilityType} from "./ability-type.enum";
import {ValueRange} from "../attribute/attribute-constants/attribute-constants";
import {AbilityBonus} from "./ability-bonus.enum";
import {DiceSize} from "../character/dice/dice-size.enum";

export class AbilityModel {
  abilityType: AbilityType;
  abilityName: string;
  abilityDescription: IDescription;
  mechanicalBonus: Array<IAbilityBonus>;
  abilityRequirement: Array<IAbilityRequirement>;
}

/**
 * Full descriptions would include all text that an abilty offers while a brief description is something that would go on a particular character sheet and are level dependent for values that
 * scale
 */
export interface IDescription {
  fullDescription: string;
  briefDescription: string;
}

export interface IAbilityBonus {
  bonusType: AbilityBonus;
  value: ValueRange;
  dieSize?: DiceSize;
}

/**
 * Expresses a requirement that is necessary to obtain this abilty
 */
export interface IAbilityRequirement {
  bonusType: AbilityBonus;
}
