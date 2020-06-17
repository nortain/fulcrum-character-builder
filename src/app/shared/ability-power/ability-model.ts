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

export interface IDescription {
  fullDescription: string;
  briefDescription: string;
}

export interface IAbilityBonus {
  bonusType: AbilityBonus;
  value: ValueRange;
  dieSize?: DiceSize;
}

export interface IAbilityRequirement {
  bonusType: AbilityBonus;
}
