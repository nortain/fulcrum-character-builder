import {Injectable} from '@angular/core';
import {AbilityName, AbilityType} from "./ability-type.enum";
import {AbilityModel, IAbilityBonus, IAbilityRequirement, IDescription} from "./ability-model";
import {Level} from "../character/level.enum";
import {AttributeFactoryService} from "../attribute/attribute-factory.service";
import {ActionType} from "../action/action-type.enum";
import {AbilityBonus} from "./ability-bonus.enum";
import {ValueRange} from "../attribute/attribute-constants/attribute-constants";
import {getTalentObject} from "./talent/talent-constants";

@Injectable({
  providedIn: 'root'
})
export class AbilityFactoryService {

  constructor(private attributeFactoryService: AttributeFactoryService) {
  }

  getNewAbility(abilityName: AbilityName, abilityType: AbilityType): AbilityModel {
    let model: AbilityModel;
    switch (abilityType) {
      case AbilityType.Talent: {
        model = {
          ...new AbilityModel(),
          ...getTalentObject()[abilityName]
        };
        break;
      }
    }


    return model;
  }

  getBonusForAbility(givenAbility: AbilityBonus, abilities: Array<AbilityModel>, level: Level = Level.Ten): AbilityBonus | number {
    for (const ability of abilities) {
      for (const bonus of ability.mechanicalBonus) {
        if (givenAbility === bonus.abilityType) {
          if (this.isValueRange(bonus.value)) {
            return this.attributeFactoryService.extractNumberFromValueRange(bonus.value, level, bonus.dieSize, bonus.adjustLevel);
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

  getActiveAbility(ability: AbilityModel, abilityType: AbilityType) {
    if (ability.activeAbility) {
      return this.getNewAbility(ability.activeAbility, abilityType);
    }
  }

  /**
   * Given an ability and level write out a brief description that could go on a character sheet and use level to adjust for values that are scaling.
   * @param ability
   * @param level
   */
  printOutBriefDescription(ability: AbilityModel, level: Level = Level.Ten): string {
    let description = ability.abilityDescription.briefDescription;
    if (this.hasReplacementValuesForBriefDescription(ability)) {
      for (const mechanic of ability.mechanicalBonus) {
        if (this.isValueRange(mechanic.value)) {
          description = description.replace("$" + mechanic.abilityType, this.attributeFactoryService.extractNumberFromValueRange(mechanic.value, level, mechanic.dieSize, mechanic.adjustLevel).toString());
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
