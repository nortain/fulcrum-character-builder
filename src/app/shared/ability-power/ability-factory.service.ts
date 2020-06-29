import {Injectable} from '@angular/core';
import {AbilityName, AbilityType} from "./ability-type.enum";
import {AbilityModel, IAbilityRequirement} from "./ability-model";
import {Level} from "../character/level.enum";
import {AttributeFactoryService} from "../attribute/attribute-factory.service";
import {AbilityBonus} from "./ability-bonus.enum";
import {ValueRange} from "../attribute/attribute-constants/attribute-constants";
import {getTalentObject} from "./talent/talent-constants";
import {ActionType} from "../action/action-type.enum";
import {AttributeModel} from "../attribute/attribute-model";

@Injectable({
  providedIn: 'root'
})
export class AbilityFactoryService {

  constructor(private attributeFactoryService: AttributeFactoryService) {
  }

  /**
   * Factory constructor to make/fetch new abilities given a name and type.
   * @param abilityName
   * @param abilityType
   */
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

  canAbilityBeSelected(abilityToBeSelected: AbilityModel, currentAbilities: Array<AbilityModel>, attributes?: Array<AttributeModel>): boolean {
    let canBePicked = this.hasAbilityAlreadyBeenSelected(abilityToBeSelected, currentAbilities);
    if (canBePicked && abilityToBeSelected.abilityRequirement) {
      for (const requirement of abilityToBeSelected.abilityRequirement) {
        currentAbilities
          .find(abilities => {
            if (abilities && abilities.abilityRequirement) {
              abilities.abilityRequirement
                .find(abilityRequirement => {
                  if (abilityRequirement.requirementType === requirement.requirementType) {
                    canBePicked = canBePicked && !!requirement.requirementValue;
                  }
                });
            }
          });
      }
    }
    return canBePicked;
  }

  private hasAbilityAlreadyBeenSelected(abilityToBeSelected: AbilityModel, currentAbilities: Array<AbilityModel>): boolean {
    const canBePicked = !currentAbilities // has the ability already been assigned
      .find((name) => {
        return name.abilityName === abilityToBeSelected.abilityName
          || name.abilityName === abilityToBeSelected.activeAbility
          || name.activeAbility === abilityToBeSelected.abilityName
          || name.activeAbility === abilityToBeSelected.activeAbility;
      });
    return canBePicked;
  }

  /**
   * Accessor to get an array of costs that can be paid by ANY requirement to obtain the given ability
   * @param ability
   */
  getCostForAbility(ability: AbilityModel): Array<IAbilityRequirement> {
    return ability.abilityCost;
  }

  /**
   * Accessor to get an array of requirements that must ALL be satisfied to be able to
   * @param ability
   */
  getRequirementForAbility(ability: AbilityModel): Array<IAbilityRequirement> {
    return ability.abilityRequirement;
  }

  /**
   * Used to determine if a given ability model has an active ability it can activate.  This is most commonly the case with greater passive talents that also give a lesser active power.  The greater talent would be passed in along with the ability type talent and from their, if an active ability property exists on the talent then a new ability of type AbilityType will be returned.  This is assumed to be used by the application to get active talents without necessarily having to store them as complete talents else where.  The same may be true for other abilities.
   * @param ability
   * @param abilityType
   */
  getActiveAbility(ability: AbilityModel, abilityType: AbilityType) {
    if (ability.activeAbility) {
      return this.getNewAbility(ability.activeAbility, abilityType);
    }
  }


  /**
   * Takes in a given ability by abilityBonus and then an array of ability models.  There is also an optional level passed in which can impact scaling for certain talents that don't scale linearly. This will go through all the mechanical bonuses of the abilities and see if any match the given ability.  If so either return that ability bonus or return a number representing the bonus given to the ability.  For example if you wanted to see if a character has a talent that makes their Missile defense use their active defense then passing in the AbilityBonus that represents that compare all the talents and if a hit is found, a bonus value would be returned.  In the case of something like bonus to healing, a specific number that is applied to healing, like 2, would be returned.
   * @param givenAbility
   * @param abilities
   * @param level
   */
  getBonusForAbility(givenAbility: AbilityBonus, abilities: Array<AbilityModel>, level: Level = Level.Ten): AbilityBonus | number {
    let resultingBonusValue = 0;
    for (const ability of abilities) {
      for (const bonus of ability.mechanicalBonus) {
        if (givenAbility === bonus.abilityType) {
          if (this.isValueRange(bonus.value)) {
            if (ability.abilityType === AbilityType.Talent && ability.abilityAction === ActionType.Passive) {
              resultingBonusValue += this.extractNumberFromValueRangeForPassiveTalents(bonus.value, level, bonus.adjustLevel);
            } else {
              resultingBonusValue += this.attributeFactoryService.extractNumberFromValueRange(bonus.value, level, bonus.dieSize, bonus.adjustLevel);
            }
          } else {
            return bonus.value;
          }
        }
      }
    }
    return resultingBonusValue;
  }


  extractNumberFromValueRangeForPassiveTalents(bonus: ValueRange, level: Level, adjustLevel?: Level): number {
    const delta = (bonus.maxBonus - bonus.minBonus);
    const numberOfLevelsToGain = 10;
    const valueArray: Array<number> = [];
    for (let i = 0; i < numberOfLevelsToGain; i++) {
      valueArray[i] = bonus.minBonus;
      if (adjustLevel && i + 1 >= adjustLevel) {
        valueArray[i] = bonus.maxBonus;
      } else {
        switch (delta) {
          case 1:
            valueArray[i] += i >= 5 ? 1 : 0;
            break;
          case 2:
            valueArray[i] += i >= 3 ? 1 : 0;
            valueArray[i] += i >= 7 ? 1 : 0;
            break;
          case 3:
            valueArray[i] += i >= 3 ? 1 : 0;
            valueArray[i] += i >= 5 ? 1 : 0;
            valueArray[i] += i >= 7 ? 1 : 0;
            break;
          case 4:
            valueArray[i] += i >= 1 ? 1 : 0;
            valueArray[i] += i >= 3 ? 1 : 0;
            valueArray[i] += i >= 5 ? 1 : 0;
            valueArray[i] += i >= 7 ? 1 : 0;
            break;
          default:
          // do nothing setting min bonus is enough
        }
      }
    }
    return valueArray[level - 1];
  }


  /**
   * Someday this may do something awesome, for now it's just an accessor
   * @param ability
   */
  printOutFullDescription(ability: AbilityModel): string {
    return ability.abilityDescription.fullDescription;
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
          let numberValue;
          if (ability.abilityType === AbilityType.Talent && ability.abilityAction === ActionType.Passive) {
            numberValue = this.extractNumberFromValueRangeForPassiveTalents(mechanic.value, level, mechanic.adjustLevel);
          } else {
            numberValue = this.attributeFactoryService.extractNumberFromValueRange(mechanic.value, level, mechanic.dieSize, mechanic.adjustLevel);
          }
          description = description.replace("$" + mechanic.abilityType, numberValue).toString();
        }
      }
    }
    return description;
  }

  /**
   * Give a bonus value of type value range or ability bonus figure out if it's a value range.  If so, return true otherwise return false.
   * @param bonusValue
   */
  isValueRange(bonusValue: ValueRange | AbilityBonus): bonusValue is ValueRange {
    return (bonusValue as ValueRange).minBonus !== undefined;
  }

  /**
   * looks at an ability model and tries to determine if the brief description has text that can potentally be replaced by mechanical bonuses.  It does this simply by checking for the existance of mechanical bonuses in the model and if there is a brief description written.
   * @param ability
   */
  hasReplacementValuesForBriefDescription(ability: AbilityModel): boolean {
    return ability.mechanicalBonus && ability.mechanicalBonus.length > 0 && !!ability.abilityDescription.briefDescription;
  }
}
