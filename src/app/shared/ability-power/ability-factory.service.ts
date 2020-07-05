import {Injectable} from '@angular/core';
import {AbilityName, AbilityType} from "./ability-type.enum";
import {AbilityModel, IAbilityRequirement, ICanBeSelected} from "./ability-model";
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
    }
    return model;
  }

  selectAbility<K extends keyof AbilityType>(abilityToBeSelected: AbilityModel, currentAbilities: Array<AbilityModel>, attributes = new Array<AttributeModel>(), innerSelections = new Array<AbilityName>()): Array<AbilityModel> {
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
      const canBeSelected = this.canAbilityBeSelected(abilityToBeSelected, currentAbilities);
      if (canBeSelected.isSelectable) {
        newAbilities = [...newAbilities, this.getNewAbility(abilityToBeSelected.abilityName, abilityToBeSelected.abilityType)];
      } else {
        throw new Error("The ability: " + this.castleCasePipe.transform(abilityToBeSelected.abilityName) + " is an invalid selection because " + canBeSelected.reasonItCannotBeSelected);
      }
    }
    return newAbilities;
  }

  /**
   * Give an ability to be selected, all current abilities and all attributes, determine if the ability is allowed to be selected.  This doesn't consider cost of the talent that a character might have, this is simply comparing data to see if the ability is eligible to be selected.  If so, return true otherwise return false.
   * @param abilityToBeSelected
   * @param currentAbilities
   * @param attributes
   */
  canAbilityBeSelected(abilityToBeSelected: AbilityModel, currentAbilities: Array<AbilityModel>, attributes = new Array<AttributeModel>()): ICanBeSelected {
    let reasonItCannotBeSelected: string;
    let canBePicked = this.hasAbilityNotBeenSelected(abilityToBeSelected, currentAbilities);
    if (canBePicked && abilityToBeSelected.abilityRequirement) {
      for (const requirement of abilityToBeSelected.abilityRequirement) {
        currentAbilities
          .find(abilities => {
            if (abilities && abilities.abilityRequirement) {
              abilities.abilityRequirement
                .find(abilityRequirement => {
                  if (abilityRequirement.requirementType === requirement.requirementType) {
                    canBePicked = canBePicked && !!requirement.requirementValue;
                    if (!requirement.requirementValue) {
                      reasonItCannotBeSelected = this.getReasonWhyAbilityCannotBeSelected(requirement);
                    }
                  }
                });
            }
          });
        if (requirement.requirementType in AttributeName) {
          if (!(requirement.requirementType in attributes)) {
            attributes = [this.attributeFactoryService.getNewAttribute(requirement.requirementType as AttributeName, AttributeStrength.Normal)];
          }
          const pickedAttribute = attributes.find(attribute => attribute && requirement.requirementType === attribute.attributeName);
          const enough = pickedAttribute.attributeStrength >= requirement.requirementValue;
          canBePicked = canBePicked && enough;
          if (!enough) {
            reasonItCannotBeSelected = this.getReasonWhyAbilityCannotBeSelected(requirement);
          }
        }
      }
    }
    return {isSelectable: canBePicked, reasonItCannotBeSelected: reasonItCannotBeSelected};
  }

  getReasonWhyAbilityCannotBeSelected(requirement: IAbilityRequirement): string {
    let haveOrNotHave: string;
    if (typeof requirement.requirementValue === "number") {
      haveOrNotHave = "you require at least " + AttributeStrength[requirement.requirementValue] + " " + this.castleCasePipe.transform(requirement.requirementType);
    } else {
      haveOrNotHave = requirement.requirementValue ? "you have " : " you do not have ";
      haveOrNotHave += this.castleCasePipe.transform(requirement.requirementType);
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
   * Used to determine if a given ability model has one or more associated abilities.  This is most commonly the case with greater passive talents that also give a lesser powers.  The greater talent would be passed in along with the ability type talent and from their, if an active ability property exists on the talent then a new ability of type AbilityType will be returned.  This is assumed to be used by the application to get active talents without necessarily having to store them as complete talents else where.  The same may be true for other abilities.
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


  printOutRequirements(ability: AbilityModel, currentDescription: string): string {
    if (ability && ability.abilityRequirement) {
      let requirementText = "<i>";
      ability.abilityRequirement.forEach((requirement, index) => {
        if (typeof requirement.requirementValue === "boolean") {
          const notText = requirement.requirementValue ? "" : "not ";
          requirementText += "You must " + notText + "already have " + this.castleCasePipe.transform(requirement.requirementType) + ".";
        } else if (Object.values(AttributeStrength).includes(requirement.requirementValue as AttributeStrength)) {
          requirementText += "You require at least " + AttributeStrength[requirement.requirementValue as AttributeStrength] + " " + this.castleCasePipe.transform(requirement.requirementType) + ".";
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
        if (this.isValueRange(mechanic.value)) {
          let numberValue;
          if (ability.abilityType === AbilityType.Talent && mechanic.abilityType === AbilityType.Passive) {
            numberValue = this.extractNumberFromValueRangeForPassiveTalents(mechanic.value, level, mechanic.adjustLevel);
          } else {
            numberValue = this.attributeFactoryService.extractNumberFromValueRange(mechanic.value, level, mechanic.dieSize, mechanic.adjustLevel);
          }
          if (nextValueBonus > 0) {
            numberValue += nextValueBonus;
            nextValueBonus = 0;
          }
          description = description.replace("$" + mechanic.abilityBonus, numberValue).toString();
        } else if (mechanic.abilityBonus === AbilityBonus.Keyword) {
          nextValueBonus = this.getBonusForAbility(mechanic.value, currentAbilities, level) as number;
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
      nonTalentText = !!matchingBonus && matchingBonus.abilityType !== AbilityType.Talent && matchingBonus.abilityType !== AbilityType.Passive ? "(" + matchingBonus.abilityType + ") " : "";
    } else if (isBriefDescription && ability.briefDescriptionAbilityType) {
      nonTalentText = "(" + ability.briefDescriptionAbilityType + ") ";
    } else if (!isBriefDescription && ability.fullDescriptionAbilityType && ability.fullDescriptionAbilityType !== AbilityType.Talent) {
      nonTalentText = "(" + ability.fullDescriptionAbilityType + ") ";
    }
    const nonPassiveText = ability.abilityAction && ability.abilityAction !== ActionType.Passive ? ability.abilityAction + ". " : "";
    return this.castleCasePipe.transform(ability.abilityName) + ": " + nonTalentText + nonPassiveText + alteredDescription;
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
}
