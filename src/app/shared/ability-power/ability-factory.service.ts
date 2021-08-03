import {Injectable} from '@angular/core';
import {AbilityName, AbilityType} from "./ability-type.enum";
import {AbilityModel, IAbilityBonus, IAbilityRequirement, ICanBeSelected} from "./ability-model";
import {Level} from "../character/level.enum";
import {AttributeFactoryService} from "../attribute/attribute-factory.service";
import {AbilityBonus} from "./ability-bonus.enum";
import {ValueRange} from "../attribute/attribute-constants/attribute-constants";
import {getTalentObject} from "./talent/talent-constants";
import {ActionType} from "../action/action-type.enum";
import {AttributeModel} from "../attribute/attribute-model";
import {CastleCasePipe} from "../pipes/castle-case.pipe";
import {AttributeStrength} from "../attribute/attribute-enums/attribute-strength.enum";
import {AttributeName} from "../attribute/attribute-enums/attribute-name.enum";
import {getPowerPointObject} from "./power-point/power-point-constants";
import {SpellName} from "../spells/enums/spell-name.enum";
import {getSpellObject} from "../constants/spells/spell-constants";

@Injectable({
  providedIn: 'root'
})
export class AbilityFactoryService {
  castleCasePipe: CastleCasePipe;

  constructor(private attributeFactoryService: AttributeFactoryService) {
    this.castleCasePipe = new CastleCasePipe();
  }

  /**
   * Factory constructor to make/fetch new abilities given a name and type.  InnerSelections is as optional parameter for when fetching a talent that is in a non-new/altered state.  This would be the case when dealing with a talent that has a pickNumber greater than 0.  The pickNumber is how many possible picks from associated abilities the current ability can select.  These selected abilities are stored in the innerSelectedAbilities array.  This will always be an empty array in any ability coming from the getNewAbility constructor.  However if we are wanted to fetch an altered ability then those alterations will be passed in the innerSelections array.
   * @param abilityName
   * @param abilityType
   * @param innerSelections
   */
  getNewAbility(abilityName: AbilityName, abilityType: AbilityType, innerSelections = new Array<AbilityName>()): AbilityModel {
    let model: AbilityModel;
    switch (abilityType) {
      case AbilityType.Talent: {
        model = {
          ...new AbilityModel(),
          ...getTalentObject()[abilityName],
          innerSelectedAbilities: innerSelections
        };
        break;
      }
      case AbilityType.PowerPointFeature: {
        model = {
          ...new AbilityModel(),
          ...getPowerPointObject()[abilityName],
          innerSelectedAbilities: innerSelections
        };
        break;
      }
      case AbilityType.Spell: {
        model = {
          ...new AbilityModel(),
          ...this.getSpellAsAbility(abilityName as SpellName)
        };
        break;
      }
      default:
        throw new Error("An unknown ability type was encountered when trying to get newAbility, ability was: " + abilityType);
        break;
    }
    return model as AbilityModel;
  }

  /**
   * This method is how a character can select an ability
   * @param abilityToBeSelected
   * @param currentAbilities
   * @param attributes
   * @param level
   * @param innerSelections
   */
  selectAbility<K extends keyof AbilityType>(abilityToBeSelected: AbilityModel, currentAbilities: Array<AbilityModel>, attributes = new Array<AttributeModel>(), level = Level.One, innerSelections = new Array<AbilityName>()): Array<AbilityModel> {
    let newAbilities = [...currentAbilities];
    if (abilityToBeSelected.pickNumber > 0) {
      if (abilityToBeSelected.pickNumber !== innerSelections.length) {
        const choiceOrChoices = abilityToBeSelected.pickNumber === 1 ? "choice" : "choices";
        const wasOrWere = innerSelections.length === 1 ? " was given." : " were given.";
        throw new Error("You must have " + abilityToBeSelected.pickNumber + " inner selection " + choiceOrChoices + " but only " + innerSelections.length + wasOrWere);
      } else {
        innerSelections.forEach((selection: AbilityName) => {
          if (!abilityToBeSelected.associatedAbilities.includes(selection)) {
            throw new Error("An invalid selection: " + selection + " was passed in.  Valid choices are only among: " + abilityToBeSelected.associatedAbilities.toString());
          }
        });
        newAbilities = [...newAbilities, this.getNewAbility(abilityToBeSelected.abilityName, abilityToBeSelected.abilityType, innerSelections)];
      }
    } else { // pick number is 0
      const canBeSelected = this.canAbilityBeSelected(abilityToBeSelected, currentAbilities, attributes, level);
      if (canBeSelected.isSelectable) {
        newAbilities = [...newAbilities, this.getNewAbility(abilityToBeSelected.abilityName, abilityToBeSelected.abilityType)];
      } else {
        throw new Error("The " + abilityToBeSelected.abilityType.toLocaleLowerCase() + ": " + this.castleCasePipe.transform(abilityToBeSelected.abilityName) + " is an invalid selection because " + canBeSelected.reasonItCannotBeSelected);
      }
    }
    return newAbilities;
  }

  /**
   * Given an ability to be selected, all current abilities and all attributes, determine if the ability is allowed to be selected.
   * This doesn't consider cost of the talent that a character might have, this is simply comparing data to see if the ability is eligible to be selected.
   * This also looks at level to ensure that level requirement is met if an ability requires such
   * If so, return true otherwise return false.
   * @param abilityToBeSelected
   * @param currentAbilities
   * @param attributes
   * @param level
   */
  canAbilityBeSelected(abilityToBeSelected: AbilityModel, currentAbilities: Array<AbilityModel>, attributes = new Array<AttributeModel>(), level = Level.One): ICanBeSelected {
    let reasonItCannotBeSelected = "";
    let canBePicked = this.hasAbilityNotBeenSelected(abilityToBeSelected, currentAbilities);
    let hasNecessaryAttributesResult: ICanBeSelected;
    const alternateRequirementMap = new Map<string, boolean>();
    const abilityHasACost = abilityToBeSelected.abilityCost && abilityToBeSelected.abilityCost.length > 0;
    if (!abilityHasACost) {
      reasonItCannotBeSelected = "it does not have a cost. This can only be selected as part of a larger " + abilityToBeSelected.abilityType.toLocaleLowerCase() + ".";
    }
    canBePicked = canBePicked && abilityHasACost;
    if (canBePicked && abilityToBeSelected.abilityRequirement) {
      for (const requirement of abilityToBeSelected.abilityRequirement) {
        let requirementMet = false; // Assume any requirement is false until we find an ability that meets it.
        currentAbilities
          .find(abilities => {
            if (abilities && abilities.abilityRequirement) {
              const result = this.findMatchingRequirement(abilities.abilityRequirement, requirement, canBePicked, reasonItCannotBeSelected);
              requirementMet = result.isSelectable;
              reasonItCannotBeSelected = result.reasonItCannotBeSelected;
            }
            if (!requirementMet && abilities && abilities.mechanicalBonus) {
              const result = this.findMatchingRequirement(abilities.mechanicalBonus, requirement, canBePicked, reasonItCannotBeSelected);
              requirementMet = result.isSelectable;
              reasonItCannotBeSelected = result.reasonItCannotBeSelected;
            }
            if (!requirementMet && abilities && abilities.associatedAbilities) {
              for (const nameOfAssociation of abilities.associatedAbilities) {
                const associatedAbility = this.getNewAbility(nameOfAssociation, abilities.abilityType);
                let result = {} as ICanBeSelected;
                if (associatedAbility.abilityRequirement) {
                  result = this.findMatchingRequirement(associatedAbility.abilityRequirement, requirement, canBePicked, reasonItCannotBeSelected);
                  requirementMet = result.isSelectable;
                  reasonItCannotBeSelected = result.reasonItCannotBeSelected;
                }
                if (!requirementMet && associatedAbility.mechanicalBonus) {
                  result = this.findMatchingRequirement(associatedAbility.mechanicalBonus, requirement, canBePicked, reasonItCannotBeSelected);
                  requirementMet = result.isSelectable;
                  reasonItCannotBeSelected = result.reasonItCannotBeSelected;
                }
                if (requirementMet) {
                  break;
                }
              }
            }
          });
        if (requirement.requirementType === AbilityType.CharacterLevel) {
          requirementMet = level >= requirement.requirementValue;
          if (!requirementMet) {
            reasonItCannotBeSelected = this.getReasonWhyAbilityCannotBeSelected(requirement);
          }
        }
        if (requirement.requirementType === AbilityType.PowerPointFeature) {
          requirementMet = !!currentAbilities.find(ability => ability.abilityType === AbilityType.PowerPointFeature && requirement.requirementAbilityName === ability.abilityName && requirement.requirementValue);
          if (!requirementMet) {
            reasonItCannotBeSelected = this.getReasonWhyAbilityCannotBeSelected(requirement);
          }
        }
        if (requirement.requirementType === AbilityType.Subtheme) {
          requirementMet = !!currentAbilities.find(ability => ability.abilityType === AbilityType.Subtheme && requirement.requirementAbilityName === ability.abilityName && ability.abilityCost.find(subthemeRequirement => subthemeRequirement.requirementValue >= requirement.requirementValue && subthemeRequirement.requirementAbilityName === requirement.requirementAbilityName));
          if (!requirementMet) {
            reasonItCannotBeSelected = this.getReasonWhyAbilityCannotBeSelected(requirement);
          }
        }
        if (requirement.requirementType === AbilityType.Spell) {
          requirementMet = !!currentAbilities.find(ability => ability.abilityType === AbilityType.Spell &&
            !!ability.mechanicalBonus.find(bonuses => bonuses.keywords.find(keyword => keyword === requirement.requirementAbilityName)) === requirement.requirementValue);
          if (!requirementMet) {
            reasonItCannotBeSelected = this.getReasonWhyAbilityCannotBeSelected(requirement);
          }
        }

        if (requirement.requirementType === AbilityType.Attribute) {
          hasNecessaryAttributesResult = this.hasNecessaryAttributes(abilityToBeSelected.abilityRequirement, attributes);
        }

        // check for canAlsoMeetThisRequirement
        if (requirement.canAlsoMeetThisRequirement && requirement.requirementType !== AbilityType.Attribute) {
          const existingRequirementMet = alternateRequirementMap.get(requirement.canAlsoMeetThisRequirement);
          alternateRequirementMap.set(requirement.canAlsoMeetThisRequirement,
            existingRequirementMet || requirementMet);
        } else {
          canBePicked = requirementMet || !!(hasNecessaryAttributesResult && hasNecessaryAttributesResult.isSelectable);
          if (!canBePicked) {
            reasonItCannotBeSelected = this.getReasonWhyAbilityCannotBeSelected(requirement);
          }
        }


        let alternativeMapCanBePicked = true;
        alternateRequirementMap.forEach((value, key) => {
          alternativeMapCanBePicked = alternativeMapCanBePicked && value;
          canBePicked = alternativeMapCanBePicked;
          if (!canBePicked) {
            const requirementReason = abilityToBeSelected.abilityRequirement.find(abilityRequirement => abilityRequirement.canAlsoMeetThisRequirement === key);
            reasonItCannotBeSelected = this.getReasonWhyAbilityCannotBeSelected(requirementReason);
          }
        });
      }
    }
    return {isSelectable: canBePicked, reasonItCannotBeSelected: reasonItCannotBeSelected};
  }

  /**
   * This will take in the a requirements array and current attributes array and try to determine if any requirements require particular attributes. If they do then we need to determine if those attributes have been obtained.
   * Often multiple attributes can statisfy a single requirement, if this is the case then the canAlsoMeetThisRequirement string should be populated.  This means that all requirements with the same value can all satisfy the
   * same requirement.  If at least one of them is met then we are good to go.  If no requirements require attributes then this whole function can more or less be ignored and it's results shouldn't impact the over all decision.  For that reason it should return isSelectedable as true unless an attribute requirement is specifically not met.
   * @param requirements
   * @param currentAttributes
   * @param currentAbilities
   */
  hasNecessaryAttributes(requirements: IAbilityRequirement[],
                         currentAttributes: AttributeModel[]): ICanBeSelected {
    const alternateRequirementMap = new Map<string, boolean>();
    let reasonItCannotBeSelected = "";
    let requirementMet = true;  // By default we assume we've met all attribute requirements unless we explicitly find that we don't meet one.

    for (const currentRequirement of requirements) {
      if (currentRequirement.requirementType === AbilityType.Attribute) { // only look at attributes
        if (!(currentAttributes.find(attribute => attribute.attributeName === currentRequirement.requirementAbilityName))) { // if the current attributes don't have the attribute add it at strength 0
          currentAttributes = [
            ...currentAttributes,
            this.attributeFactoryService.getNewAttribute(currentRequirement.requirementAbilityName as AttributeName, AttributeStrength.Normal)
          ];
        }
        const pickedAttribute = currentAttributes.find(attribute => attribute && currentRequirement.requirementAbilityName === attribute.attributeName);
        requirementMet = pickedAttribute.attributeStrength >= currentRequirement.requirementValue;


        if (currentRequirement.canAlsoMeetThisRequirement) {
          const existingRequirementMet = alternateRequirementMap.get(currentRequirement.canAlsoMeetThisRequirement);

          requirementMet = existingRequirementMet || requirementMet;
          alternateRequirementMap.set(currentRequirement.canAlsoMeetThisRequirement, requirementMet);

        } else if (!requirementMet) {
          requirementMet = false;
          reasonItCannotBeSelected = this.getReasonWhyAbilityCannotBeSelected(currentRequirement);
        }
      }
    } // end of for loop


    let canBeSelected = true;
    alternateRequirementMap.forEach((value, key) => {
      canBeSelected = canBeSelected && value;
      if (!canBeSelected) {
        const requirementReason = requirements.find(requirement => requirement.canAlsoMeetThisRequirement === key);
        reasonItCannotBeSelected = this.getReasonWhyAbilityCannotBeSelected(requirementReason);
      }
    });


    return {
      isSelectable: canBeSelected && requirementMet,
      reasonItCannotBeSelected: reasonItCannotBeSelected
    };
  }

  /**
   * Attempts to find the matching requirements for an array of abilities
   * @param abilities
   * @param requirement
   * @param canBePicked
   * @param reasonItCannotBeSelected
   * @private
   */
  private findMatchingRequirement(abilities: Array<IAbilityBonus | IAbilityRequirement>,
                                  requirement: IAbilityRequirement,
                                  canBePicked: boolean,
                                  reasonItCannotBeSelected: string): ICanBeSelected {
    let requirementMet = false;
    abilities
      .find(bonus => {
        if ((bonus as IAbilityBonus).abilityBonus === requirement.requirementAbilityName) {
          canBePicked = canBePicked && !!requirement.requirementValue;
          if (!requirement.requirementValue) {
            reasonItCannotBeSelected = this.getReasonWhyAbilityCannotBeSelected(requirement);
          }
        } else if ((bonus as IAbilityRequirement).requirementAbilityName === requirement.requirementAbilityName) {
          requirementMet = canBePicked && !!requirement.requirementValue;
          if (!requirement.requirementValue) {
            reasonItCannotBeSelected = this.getReasonWhyAbilityCannotBeSelected(requirement);
          }
        }
      });
    return {isSelectable: requirementMet, reasonItCannotBeSelected: reasonItCannotBeSelected};
  }

  getReasonWhyAbilityCannotBeSelected(requirement: IAbilityRequirement): string {
    let haveOrNotHave: string;
    if (typeof requirement.requirementValue === "number" && requirement.requirementType === AbilityType.Attribute) {
      haveOrNotHave = "you require at least " + AttributeStrength[requirement.requirementValue] + " " + this.castleCasePipe.transform(requirement.requirementAbilityName);
    } else if (typeof requirement.requirementValue === "number" && requirement.requirementType === AbilityType.Subtheme) {
      const pluralOrSingular = requirement.requirementValue === 1 ? " rank " : " ranks ";
      haveOrNotHave = "you require at least " + requirement.requirementValue + pluralOrSingular + "in the " + requirement.requirementType + " " + this.castleCasePipe.transform(requirement.requirementAbilityName) + ".";
    } else if (typeof requirement.requirementValue === "number" && requirement.requirementType === AbilityType.CharacterLevel) {
      haveOrNotHave = "you require at least character level " + requirement.requirementValue + " to select this.";
    } else if (typeof requirement.requirementValue === "boolean" && requirement.requirementType === AbilityType.Spell || requirement.requirementType === AbilityType.Knack) {
      const additionalText = requirement.requirementValue ? "do not have" : "cannot have";
      haveOrNotHave = "you " + additionalText + " a Spell or Knack with the " + this.castleCasePipe.transform(requirement.requirementAbilityName) + " keyword.";
    } else {
      haveOrNotHave = !requirement.requirementValue ? "you have the " : "you do not have the ";
      haveOrNotHave += this.castleCasePipe.transform(requirement.requirementType) + " " + this.castleCasePipe.transform(requirement.requirementAbilityName) + ".";
    }
    return haveOrNotHave;
  }

  /**
   * returns true if the ability has not been selected, false if the ability has been selected
   * @param abilityToBeSelected
   * @param currentAbilities
   */
  private hasAbilityNotBeenSelected(abilityToBeSelected: AbilityModel, currentAbilities: Array<AbilityModel>): boolean {
    let canBePicked = !(currentAbilities // has the ability already been assigned
      .find((name) => abilityToBeSelected.abilityName === name.abilityName
        || (name.associatedAbilities && name.associatedAbilities.find((currentAbilityAssociations) => abilityToBeSelected.abilityName === currentAbilityAssociations))));
    if (currentAbilities && abilityToBeSelected.associatedAbilities) {
      canBePicked = !(abilityToBeSelected.associatedAbilities.find((abilityToBeSelectedAssociations) => currentAbilities.find((currentAbility) => currentAbility.abilityName === abilityToBeSelectedAssociations))
        || abilityToBeSelected.associatedAbilities.find((abilityToBeSelectedAssociations) => currentAbilities.find((currentAbility) => currentAbility.associatedAbilities && currentAbility.associatedAbilities.find((currentAbilityAssociation) => currentAbilityAssociation === abilityToBeSelectedAssociations))));
    }
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
   * Used to determine if a given ability model has one or more associated abilities.  This is most commonly the case with greater passive talents that also give a lesser powers.
   * The greater talent would be passed in along with the ability type talent and from there, if an active ability property exists on the talent then a new ability of type
   * AbilityType will be returned.  This is assumed to be used by the application to get active talents without necessarily having to store them as complete talents else where.
   * The same may be true for other abilities.
   * @param ability
   * @param abilityType
   */
  getAssociatedAbilities(ability: AbilityModel, abilityType: AbilityType): Array<AbilityModel> {
    const associatedAbilities = new Array<AbilityModel>();
    if (ability.associatedAbilities && ability.associatedAbilities.length > 0) {
      ability.associatedAbilities.forEach((associations) => {
        associatedAbilities.push(this.getNewAbility(associations, AbilityType.Talent));
      });
    }
    return associatedAbilities;
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
        if (givenAbility === bonus.abilityBonus) {
          if (this.isValueRange(bonus.value)) {
            if (ability.abilityType === AbilityType.Talent && bonus.abilityType === AbilityType.Passive) {
              resultingBonusValue += this.extractNumberFromValueRangeForPassiveTalents(bonus.value, level, bonus.adjustLevel);
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
    let delta = (bonus.maxBonus - bonus.minBonus);
    let multiplier = 0, remainder = 0;
    while (delta > 4) {
      multiplier += delta / 4;
      delta = Math.floor(delta / 4);
      remainder += (multiplier * 4) - (delta * 4);
    }
    if (multiplier > 0) {
      delta = 4;
    }
    const numberOfLevelsToGain = 10;
    const valueArray: Array<number> = [];
    for (let i = 0; i < numberOfLevelsToGain; i++) {
      valueArray[i] = bonus.minBonus;
      if (adjustLevel && i + 1 >= adjustLevel) {
        valueArray[i] = bonus.maxBonus;
      } else {
        switch (delta) {
          case 1:
            valueArray[i] += i >= 5 ? this.incrementValue(multiplier, remainder, 5) : 0;
            break;
          case 2:
            valueArray[i] += i >= 3 ? this.incrementValue(multiplier, remainder, 3) : 0;
            valueArray[i] += i >= 7 ? this.incrementValue(multiplier, remainder, 7) : 0;
            break;
          case 3:
            valueArray[i] += i >= 3 ? this.incrementValue(multiplier, remainder, 3) : 0;
            valueArray[i] += i >= 5 ? this.incrementValue(multiplier, remainder, 5) : 0;
            valueArray[i] += i >= 7 ? this.incrementValue(multiplier, remainder, 7) : 0;
            break;
          case 4:
            valueArray[i] += i >= 1 ? this.incrementValue(multiplier, remainder, 1) : 0;
            valueArray[i] += i >= 3 ? this.incrementValue(multiplier, remainder, 3) : 0;
            valueArray[i] += i >= 5 ? this.incrementValue(multiplier, remainder, 5) : 0;
            valueArray[i] += i >= 7 ? this.incrementValue(multiplier, remainder, 7) : 0;
            break;
          default:
          // do nothing setting min bonus is enough
        }
      }
    }
    return valueArray[level - 1];
  }

  private incrementValue(multiplier: number, remainder: number, level: number): number {
    if (multiplier > 0) {
      let value = Math.floor(multiplier);
      const temp = remainder * (level / 7);
      value = Math.floor(value + temp);
      return value;
    } else {
      return 1;
    }
  }


  printOutRequirements(ability: AbilityModel, currentDescription: string): string {
    if (ability && ability.abilityRequirement) {
      let requirementText = "<i>";
      ability.abilityRequirement.forEach((requirement, index) => {
        if (typeof requirement.requirementValue === "boolean") {
          const notText = requirement.requirementValue ? "" : "not ";
          requirementText += "You must " + notText + "already have " + this.castleCasePipe.transform(requirement.requirementAbilityName) + ".";
        } else if (requirement.requirementType === AbilityType.Attribute) {
          requirementText += "You require at least " + AttributeStrength[requirement.requirementValue as AttributeStrength] + " " + this.castleCasePipe.transform(requirement.requirementAbilityName) + ".";
        } else if (requirement.requirementType === AbilityType.Subtheme) {
          const rankOrRanks = requirement.requirementValue === 1 ? ' rank' : ' ranks';
          requirementText += "You require at least " + requirement.requirementValue + rankOrRanks + " in the " + this.castleCasePipe.transform(requirement.requirementAbilityName) + " subtheme.";
        }
        if (index < ability.abilityRequirement.length - 1) {
          requirementText += " ";
        }
      });
      requirementText += "</i>\n";
      return requirementText + currentDescription;
    } else {
      return currentDescription;
    }

  }


  /**
   * Someday this may do something awesome, for now it's just an accessor
   * @param ability
   */
  printOutFullDescription(ability: AbilityModel): string {
    let description = ability.abilityDescription.fullDescription;
    if (ability.associatedAbilities) {
      ability.associatedAbilities.forEach((association) => {
        const newAbility = this.getNewAbility(association, ability.abilityType);
        const associatedDescription = this.printOutFullDescription(newAbility);
        description += "\n" + associatedDescription;
      });
    }
    description = this.printOutAssociatedAbility(ability, Level.Ten, false, description);
    return this.printOutRequirements(ability, description);
  }

  /**
   * Given an ability and level write out a brief description that could go on a character sheet and use level to adjust for values that are scaling.
   * @param ability
   * @param level
   * @param currentAbilities
   */
  printOutBriefDescription(ability: AbilityModel, level: Level = Level.Ten, currentAbilities = new Array<AbilityModel>()): string {
    let description = ability.abilityDescription.briefDescription;
    let nextValueBonus = 0;
    if (this.hasReplacementValuesForBriefDescription(ability)) {
      for (const mechanic of ability.mechanicalBonus) {
        if (mechanic.keywords) {
          for (const keyword of mechanic.keywords) {
            nextValueBonus += this.getBonusForAbility(keyword, currentAbilities, level) as number;
          }
        }
        if (this.isValueRange(mechanic.value)) {
          let numberValue;
          if (ability.abilityType === AbilityType.Talent && (mechanic.abilityType === AbilityType.Passive || mechanic.abilityType === AbilityType.Feature)) {
            numberValue = this.extractNumberFromValueRangeForPassiveTalents(mechanic.value, level, mechanic.adjustLevel);
          } else {
            numberValue = this.attributeFactoryService.extractNumberFromValueRange(mechanic.value, level, mechanic.dieSize, mechanic.adjustLevel);
          }
          if (nextValueBonus > 0) {
            numberValue += nextValueBonus;
            nextValueBonus = 0;
          }
          description = description.replace("$" + mechanic.abilityBonus, numberValue).toString();
        }
      }
    }
    if (ability.associatedAbilities && ability.pickNumber <= 0) {
      ability.associatedAbilities.forEach((association) => {
        const newAbility = this.getNewAbility(association, ability.abilityType);
        const associatedDescription = this.printOutBriefDescription(newAbility, level, currentAbilities);
        description += "\n" + associatedDescription;
      });
    } else if (ability.innerSelectedAbilities && ability.pickNumber > 0) {
      ability.innerSelectedAbilities.forEach((association) => {
        const newAbility = this.getNewAbility(association, ability.abilityType);
        const associatedDescription = this.printOutBriefDescription(newAbility, level, currentAbilities);
        description += "\n" + associatedDescription;
      });
    }
    return this.printOutAssociatedAbility(ability, level, true, description);
  }

  /**
   * Nearly same as printOutBrief or FullDescription but also includes the ability name as it's meant to be
   * all housed within a higher level talent.  An associated talent will include the following formatting
   * abilityName: (abilityType) abilityAction. abilityDescription
   * @param ability
   * @param level
   * @param unalteredDescription
   * @param alteredDescription
   */
  printOutAssociatedAbility(ability: AbilityModel, level: Level = Level.Ten, isBriefDescription: boolean, alteredDescription: string): string {
    let nonTalentText = "";
    const description = isBriefDescription ? ability.abilityDescription.briefDescription : ability.abilityDescription.fullDescription;
    if (ability.mechanicalBonus && isBriefDescription && !ability.briefDescriptionAbilityType) {
      const matchingBonus = ability.mechanicalBonus.find(bonus => description.indexOf(bonus.abilityBonus) !== -1);
      nonTalentText = !!matchingBonus && matchingBonus.abilityType !== AbilityType.Talent && matchingBonus.abilityType !== AbilityType.Passive ? "(" + this.castleCasePipe.transform(matchingBonus.abilityType) + ") " : "";
    } else if (isBriefDescription && ability.briefDescriptionAbilityType) {
      nonTalentText = "(" + this.castleCasePipe.transform(ability.briefDescriptionAbilityType) + ") ";
    } else if (!isBriefDescription && ability.fullDescriptionAbilityType && ability.fullDescriptionAbilityType !== AbilityType.Talent) {
      nonTalentText = "(" + this.castleCasePipe.transform(ability.fullDescriptionAbilityType) + ") ";
    }
    const nonPassiveText = ability.abilityAction && ability.abilityAction !== ActionType.Passive ? ability.abilityAction + ". " : "";
    return this.castleCasePipe.transform(ability.abilityName) + ": " + nonTalentText + nonPassiveText + alteredDescription;
  }


  /**
   * This will return a collection of IAbilityBonuses that either have any qualifier or, if the optional ability name is provided, will return only IAbilityBonuses that match the given ability name.  For example if you want to see if a any bonuses for an ability A has the nonstacking qualifier for bonus b you could pass in ability A and AbilityBonus.B and you would get back a collection of bonuses that have a qualifier and the caller can process those qualifiers how they like.
   * @param ability
   * @param abilityName
   */
  getAbilityQualifiers(ability: AbilityModel, abilityName?: AbilityName): Array<IAbilityBonus> {
    const bonusesWithQualifiers = [];
    const hasMechanicalBonuses = ability.mechanicalBonus && ability.mechanicalBonus.length > 0;
    if (hasMechanicalBonuses) {
      for (const bonus of ability.mechanicalBonus) {
        const hasQualifiers = bonus.abilityQualifier && bonus.abilityQualifier.length > 0;
        if (hasQualifiers && !!abilityName && bonus.abilityBonus === abilityName) {
          bonusesWithQualifiers.push(bonus);
        } else if (hasQualifiers && !abilityName) {
          bonusesWithQualifiers.push(bonus);
        }
      }
    }
    return bonusesWithQualifiers;
  }


  /**
   * Give a bonus value of type value range or ability bonus figure out if it's a value range.  If so, return true otherwise return false.
   * @param bonusValue
   */
  isValueRange(bonusValue: ValueRange | AbilityBonus): bonusValue is ValueRange {
    return (bonusValue as ValueRange).minBonus !== undefined;
  }

  /**
   * looks at an ability model and tries to determine if the brief description has text that can potentially be replaced by mechanical bonuses.  It does this simply by checking for the existence of mechanical bonuses in the model and if there is a brief description written.
   * @param ability
   */
  hasReplacementValuesForBriefDescription(ability: AbilityModel): boolean {
    return ability.mechanicalBonus && ability.mechanicalBonus.length > 0 && !!ability.abilityDescription.briefDescription;
  }


  /**
   * Given a spell name pull the necessary spell information from the spellObject constant and convert that information into a meaningful spell ability
   * @param spellName
   */
  getSpellAsAbility(spellName: SpellName): AbilityModel {
    const spell = getSpellObject()[spellName];
    const ability = new AbilityModel();
    ability.abilityName = spell.name;
    ability.abilityType = AbilityType.Spell;
    ability.abilityAction = spell.castAction;
    ability.abilityCost = [{requirementAbilityName: spell.sphereName, requirementType: AbilityType.Subtheme, requirementValue: true} as IAbilityRequirement];
    const bonus: IAbilityBonus = {keywords: []} as IAbilityBonus;
    for (const keyword of spell.spellKeywords) {
      if (!!AbilityBonus[keyword]) {
        bonus.keywords = [...bonus.keywords, AbilityBonus[keyword]];
      }
    }
    bonus.abilityBonus = AbilityBonus.Keyword;
    ability.mechanicalBonus = [bonus];
    return ability;
  }
}
