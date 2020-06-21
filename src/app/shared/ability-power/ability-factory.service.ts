import {Injectable} from '@angular/core';
import {AbilityType} from "./ability-type.enum";
import {AbilityModel, IAbilityBonus, IAbilityRequirement, IDescription} from "./ability-model";
import {Level} from "../character/level.enum";
import {AttributeFactoryService} from "../attribute/attribute-factory.service";

@Injectable({
  providedIn: 'root'
})
export class AbilityFactoryService {

  constructor(private attributeFactoryService: AttributeFactoryService) {
  }

  getNewAbility(abilityName: string, abilityType: AbilityType, abilityDescription?: IDescription, mechanicalBonus?: Array<IAbilityBonus>, abilityRequirement?: Array<IAbilityRequirement>): AbilityModel {
    const model = {
      ...new AbilityModel(),
      abilityName: abilityName,
      abilityType: abilityType,
      abilityDescription: abilityDescription,
      mechanicalBonus: mechanicalBonus ? mechanicalBonus : new Array<IAbilityBonus>(),
      abilityRequirement: abilityRequirement ? abilityRequirement : new Array<IAbilityRequirement>()
    };
    return model;
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
        description = description.replace("$" + mechanic.bonusType, this.attributeFactoryService.extractNumberFromValueRange(mechanic.value, level, mechanic.dieSize).toString());
      }
    }
    return description;
  }


  hasReplacementValuesForBriefDescription(ability: AbilityModel): boolean {
    return ability.mechanicalBonus && ability.mechanicalBonus.length > 0 && !!ability.abilityDescription.briefDescription;
  }
}
