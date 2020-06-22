import {Injectable} from '@angular/core';
import {AbilityType} from "./ability-type.enum";
import {AbilityModel, IAbilityBonus, IAbilityRequirement, IDescription} from "./ability-model";
import {Level} from "../character/level.enum";
import {AttributeFactoryService} from "../attribute/attribute-factory.service";
import {ActionType} from "../action/action-type.enum";
import {AbilityBonus} from "./ability-bonus.enum";
import {ValueRange} from "../attribute/attribute-constants/attribute-constants";

@Injectable({
  providedIn: 'root'
})
export class AbilityFactoryService {

  constructor(private attributeFactoryService: AttributeFactoryService) {
  }

  getNewAbility(
    abilityName: string,
    abilityType: AbilityType,
    abilityAction?: ActionType,
    abilityCost?: Array<IAbilityRequirement>,
    abilityDescription?: IDescription,
    mechanicalBonus?: Array<IAbilityBonus>,
    abilityRequirement?: Array<IAbilityRequirement>,
    activeAbility?: AbilityModel): AbilityModel {
    const model = {
      ...new AbilityModel(),
      abilityName: abilityName,
      abilityType: abilityType,
      abilityAction: abilityAction ? abilityAction : ActionType.Passive,
      abilityCost: abilityCost ? abilityCost : [] as Array<IAbilityRequirement>,
      abilityDescription: abilityDescription,
      mechanicalBonus: mechanicalBonus ? mechanicalBonus : new Array<IAbilityBonus>(),
      abilityRequirement: abilityRequirement ? abilityRequirement : new Array<IAbilityRequirement>(),
      activeAbility: activeAbility ? {...new AbilityModel(), ...activeAbility} : {} as AbilityModel
    } as AbilityModel;
    return model;
  }

  getBonusForAbility(givenAbility: AbilityBonus, abilities: Array<AbilityModel>, level?: Level): AbilityBonus | number {
    for (const ability of abilities) {
      for (const bonus of ability.mechanicalBonus) {
        if (givenAbility === bonus.abilityType) {
          if (this.isValueRange(bonus.value)) {
            return this.attributeFactoryService.extractNumberFromValueRange(bonus.value, level, bonus.dieSize);
          } else {
            return bonus.value;
          }
        }
      }
    }
    return 0;
  }


  printOutFullDescription(ability: AbilityModel): string {
    return ability.abilityDescription.fullDescription;
  }

  /**
   * Given an ability and level write out a brief description that could go on a character sheet and use level to adjust for values that are scaling.
   * @param ability
   * @param level
   */
  printOutBriefDescription(ability: AbilityModel, level: Level): string {
    let description = ability.abilityDescription.briefDescription;
    if (this.hasReplacementValuesForBriefDescription(ability)) {
      for (const mechanic of ability.mechanicalBonus) {
        if (this.isValueRange(mechanic.value)) {
          description = description.replace("$" + mechanic.abilityType, this.attributeFactoryService.extractNumberFromValueRange(mechanic.value, level, mechanic.dieSize).toString());
        }
      }
    }
    return description;
  }

  isValueRange(bonusValue: ValueRange | AbilityBonus): bonusValue is ValueRange {
    return (bonusValue as ValueRange).minBonus !== undefined;
  }


  hasReplacementValuesForBriefDescription(ability: AbilityModel): boolean {
    return ability.mechanicalBonus && ability.mechanicalBonus.length > 0 && !!ability.abilityDescription.briefDescription;
  }
}
