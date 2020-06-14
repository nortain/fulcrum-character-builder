import {Injectable} from '@angular/core';
import {DiceService} from "../character/dice/dice.service";
import {AttributeName} from "./attribute-enums/attribute-name.enum";
import {WeaponCategory} from "../weapon/weapon-category.enum";
import {Level} from "../character/level.enum";
import {AttributeModel} from "./attribute-model";
import {AttributeAttackDamage, getAttributeObject, ValueRange} from "./attribute-constants/attribute-constants";
import {LevelRange} from "../spells/enums/level-range.enum";
import {DiceSize} from "../character/dice/dice-size.enum";
import {Dice} from "../character/dice/dice";
import {AttributeStrength} from "./attribute-enums/attribute-strength.enum";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";
import {
  AgilitySelections,
  AttributePick,
  AttributeSelectionsAlias,
  AttributeSelectionWithPicks,
  BrawnSelections,
  PresenceSelections,
  ReasoningSelections,
} from "./attribute-constants/selected-bonus-groups";
import {ArmorType} from "../armor/armor-type.enum";

@Injectable({
  providedIn: 'root'
})
export class AttributeFactoryService {

  bonusSelectionConstructor =
    {
      PresenceSelections: PresenceSelections,
      AgilitySelections: AgilitySelections,
      ReasoningSelections: ReasoningSelections,
      BrawnSelections: BrawnSelections
    };

  constructor(private diceService: DiceService) {
  }

  initializeAllAttributes(): Map<AttributeName, AttributeModel> {
    const attributesArray = new Map<AttributeName, AttributeModel>();
    for (const name of Object.keys(AttributeName)) {
      attributesArray.set(AttributeName[name], this.getNewAttribute(AttributeName[name]));
    }
    return attributesArray;
  }

  getNewAttribute(name: AttributeName, strength = AttributeStrength.Normal): AttributeModel {
    const attribute: AttributeModel = {
      ...getAttributeObject()[name],
    };
    attribute.attributeStrength = strength;
    return attribute;
  }

  /**
   * Given an attribute, a weapon category and a level this will return the amount of bonus damage
   * that particular attribute provides for the given weapon category and character level.  This is returned in the form as a dice object but the modifier of the dice will be the bonus value.  This can be obtained from the modifer directly or the printroll function
   * @param attribute
   * @param category
   * @param level
   */
  getAttackDamageBonus(attribute: AttributeModel, category: WeaponCategory, level: Level): Dice {
    const attackDamages: Array<AttributeAttackDamage> = attribute.bonusToAttackDamage;
    if (attackDamages) {
      for (const attackDamage of attackDamages) {
        if (attackDamage.category === category) {
          let damageRange = attackDamage.range[attribute.attributeStrength];
          if (attribute.attributeName === AttributeName.Presence) {
            const picks: Array<PresenceSelections> = attribute.chosenBonusPicks as Array<PresenceSelections>;
            damageRange = this.applyPresenceAttackPenaltyToDamageRange(damageRange, picks);
          }
          const array = this.diceService.getDiceArrayFromDamageRange(damageRange.minBonus, damageRange.maxBonus, LevelRange.TEN, DiceSize.None);
          return array[level - 1];
        }
      }
    }
    return new Dice();
  }

  /**
   * given a value range and an array of presence selections determine if any should reduce the damage of the value range and return it back.
   * @param damageRange
   * @param presenceSelections
   */
  applyPresenceAttackPenaltyToDamageRange(damageRange: ValueRange, presenceSelections: Array<PresenceSelections>): ValueRange {
    const newRange: ValueRange = {...damageRange};
    if (presenceSelections) {
      for (const selection of presenceSelections) {
        if ((selection as PresenceSelections).convertAttackDamageIntoGlobal) {
          newRange.minBonus += selection.convertAttackDamageIntoGlobal.bonusToAttack.minBonus;
          newRange.maxBonus += selection.convertAttackDamageIntoGlobal.bonusToAttack.maxBonus;
        }
      }
    }
    return newRange;
  }

  /**
   * Given an attribute and an attributeName this will return the bonus associated with the attribute name if any.  If no bonus exists then this will return 0.  This makes use of the fact that the attribute-model object has all skills listed as bonusTo<SkillName>Skills.  This allows us to literally pull the correct skill from the very attributeName that is passed in.
   * @param attribute
   * @param skillType
   */
  getSkillBonus(attribute: AttributeModel, skillType: AttributeName) {
    let bonus: Array<number>;
    const text = "bonusTo" + skillType + "Skills";
    bonus = attribute[text];
    if (bonus) {
      return bonus[attribute.attributeStrength];
    } else {
      return 0;
    }
  }

  /**
   * gets the special text of an attribute if it's chosen in the case of brawn or based on
   * theme strength in the case of agility.
   * @param attribute
   */
  getSpecialText(attribute: AttributeModel): string {
    if (attribute && attribute.epicText && attribute.attributeStrength === AttributeStrength.Epic) {
      return attribute.epicText;
    } else if (attribute && attribute.legendaryText && attribute.attributeStrength === AttributeStrength.Legendary) {
      return attribute.legendaryText;
    } else if (attribute && attribute.attributeName === AttributeName.Brawn && attribute.chosenBonusPicks) {
      for (const pick of attribute.chosenBonusPicks) {
        if ((pick as BrawnSelections).bonusToCriticalAndAggressivePress) {
          return (pick as BrawnSelections).bonusToCriticalAndAggressivePress.pressText;
        } else if ((pick as BrawnSelections).bonusToEmpoweredAndAggressivePress) {
          return (pick as BrawnSelections).bonusToEmpoweredAndAggressivePress.pressText;
        }
      }
    }
    return "";
  }

  /**
   * Given an attributeModel determine the number of bonus trained skills a character gets
   * @param attribute
   */
  getTrainedSkillsBonus(attribute: AttributeModel): number {
    if (attribute && attribute.bonusToTrainedSkills) {
      return attribute.bonusToTrainedSkills[attribute.attributeStrength];
    }
    return 0;
  }

  /**
   * Given an attribute and a magicDefenseType determine if the attribute offers any magic defense for the given defense type.  If so, return the value as a number otherwise return 0;
   * @param attribute
   * @param magicDefense
   */
  getMagicDefense(attribute: AttributeModel, magicDefense: MagicDefenseType): number {
    const text = "bonusTo" + magicDefense;
    const bonus = attribute[text];
    if (bonus) {
      return bonus[attribute.attributeStrength];
    } else {
      return 0;
    }
  }

  /**
   * Given an attribute and a level this will return a dice object with the critical bonus provided by the attribute.  If the attribute doesn't provide any kind of critical bonus then the dice object will be an empty instance.  Fetches values for bonusToCritical, bonusToSpeedAndCritical, bonusToCriticalAndAggressivePress, bonusToCriticalAndEmpowered and bonusToBaseCritical
   * @param attribute
   * @param level
   * @param weaponCategory
   */
  getCriticalBonus(attribute: AttributeModel, level: Level, weaponCategory?: WeaponCategory): number {
    let bonus = 0;
    if (attribute.chosenBonusPicks && attribute.chosenBonusPicks.length > 0) {
      for (const att of attribute.chosenBonusPicks) {
        if (attribute.attributeName === AttributeName.Brawn) {
          if ((att as BrawnSelections).bonusToCriticalAndAggressivePress) {
            const range = (att as BrawnSelections).bonusToCriticalAndAggressivePress.criticalBonus;
            bonus += this.extractNumberFromValueRange(range, level);
          } else if ((att as BrawnSelections).bonusToCriticalAndEmpowered) {
            const range = (att as BrawnSelections).bonusToCriticalAndEmpowered.bonusToCritical;
            bonus += this.extractNumberFromValueRange(range, level);
          }
        } else if (attribute.attributeName === AttributeName.Agility) {
          if ((att as AgilitySelections).bonusToCritical) {
            const range = (att as AgilitySelections).bonusToCritical.bonusTo;
            bonus += this.extractNumberFromValueRange(range, level);
          } else if ((att as AgilitySelections).bonusToSpeedAndCritical) {
            const range = (att as AgilitySelections).bonusToSpeedAndCritical.bonusToCritical;
            bonus += this.extractNumberFromValueRange(range, level);
          }
        } else if (attribute.attributeName === AttributeName.Presence) {
          if ((att as PresenceSelections).bonusToGlobalDamageAndPenaltyToCritical) {
            const range = (att as PresenceSelections).bonusToGlobalDamageAndPenaltyToCritical.bonusToCritical;
            bonus += this.extractNumberFromValueRange(range, level);
          }
        } else {
          if ((att as ReasoningSelections).bonusToCritical) {
            const range = (att as ReasoningSelections).bonusToCritical.bonusTo;
            bonus += this.extractNumberFromValueRange(range, level);
          } else if ((att as ReasoningSelections).bonusToCriticalAndEmpowered) {
            const range = (att as ReasoningSelections).bonusToCriticalAndEmpowered.bonusToCritical;
            bonus += this.extractNumberFromValueRange(range, level);
          }
        }
      }
    }
    if (weaponCategory && attribute.bonusToBaseCritical && weaponCategory === attribute.bonusToBaseCritical.category) {
      const range = attribute.bonusToBaseCritical.range[attribute.attributeStrength];
      bonus += this.extractNumberFromValueRange(range, level);
    }
    return bonus;
  }

  getFirstTurnDamageResist(attribute: AttributeModel, level: Level): number {
    if (attribute && attribute.firstTurnDamageResist) {
      const range = attribute.firstTurnDamageResist[attribute.attributeStrength];
      return this.extractNumberFromValueRange(range, level);
    }
    return 0;
  }

  getSpeedBonus(attribute: AttributeModel): number {
    let speedBonus = 0;
    if (attribute && attribute.chosenBonusPicks) {
      for (const pick of attribute.chosenBonusPicks) {
        if ((pick as AgilitySelections).bonusToSpeedAndCritical) {
          speedBonus += (pick as AgilitySelections).bonusToSpeedAndCritical.bonusToSpeed;
        }
      }
    }
    return speedBonus;
  }

  getArmorBonus(attribute: AttributeModel, armorType: ArmorType): number {
    if (attribute && attribute.bonusToAd) {
      const bonusToAdElement = attribute.bonusToAd[attribute.attributeStrength];
      if (bonusToAdElement.armorTypes.includes(armorType)) {
        return bonusToAdElement.bonusValue;
      }
    }
    return 0;
  }

  getPowerPointBonus(attribute: AttributeModel): number {
    if (attribute && attribute.bonusToPowerPoints) {
      return attribute.bonusToPowerPoints[attribute.attributeStrength];
    }
    return 0;
  }

  getHitPointBonus(attribute: AttributeModel, level: Level): number {
    if (attribute && attribute.bonusToHitPoints) {
      const range = attribute.bonusToHitPoints[attribute.attributeStrength];
      return this.extractNumberFromValueRange(range, level);
    }
    return 0;
  }

  getStartingTemporaryHitPoints(attribute: AttributeModel, level: Level): number {
    if (attribute && attribute.bonusToStartingTHP) {
      const range = attribute.bonusToStartingTHP[attribute.attributeStrength];
      return this.extractNumberFromValueRange(range, level);
    }
    return 0;
  }

  getBonusRecoveryPoints(attribute: AttributeModel): number {
    if (attribute && attribute.bonusToRecoveries) {
      return attribute.bonusToRecoveries[attribute.attributeStrength];
    }
    return 0;
  }

  getInitiativeBonus(attribute: AttributeModel): number {
    if (attribute && attribute.bonusToInitiative) {
      return attribute.bonusToInitiative[attribute.attributeStrength];
    }
    return 0;
  }

  getDodgeBonus(attribute: AttributeModel, level: Level): number {
    if (attribute && attribute.bonusToDodge) {
      const range = attribute.bonusToDodge[attribute.attributeStrength];
      return this.extractNumberFromValueRange(range, level);
    }
    return 0;
  }

  /**
   * Given an attribute name, a map of attributes and a weapon cateogry return an attribute selection with picks.
   * If an attributeName has selectable bonus picks and enough attributeStrength has been assigned to said attribute (using the passed in map) get the requiredHybridAttributeStrength
   * Each requiredHybridAttributeStrength is a requirement of how strong certain other attributes must be if their weaponCategory matches the category passed in.
   * For Ex. if an Agility attribute is passed in with a weaponCategory of balanced then Brawn must be of at with least an attributeStrength of Heroic to present options.
   * If the requiredAttribute is Strong Enough then that inner function returns true and we assign the number of picks of that selection that can be made along with all possible selections
   * that can be made.
   * @param attributeType
   * @param attributes
   * @param category
   */
  presentChoices(attributeType: AttributeName, attributes: Map<AttributeName, AttributeModel>, category: WeaponCategory): AttributeSelectionWithPicks {
    const attributeWithPicks = new AttributeSelectionWithPicks();
    const attribute: AttributeModel = attributes.get(attributeType);
    if (attribute && attribute.selectableBonusPicks) {
      const typeOfPick = attribute.selectableBonusPicks.typeOfPick[attribute.attributeStrength].requiredHybridAttributeStrength;
      if (typeOfPick && typeOfPick.length > 0) {
        for (const pick of typeOfPick) {
          if (this.isRequiredAttributeStrongEnough(pick, attributes, category)) {
            attributeWithPicks.numberOfPicks = pick.numberOfPicks;
            attributeWithPicks.selections = attribute.selectableBonusPicks.typeOfPick[attribute.attributeStrength].selections;
            break;
          }
        }
      }

    }
    return attributeWithPicks;
  }

  /**
   * given a required hybrid attribute, a map of all attributes and a weapon category, determine if the required attribute is strong enough for a selection.  If so, it returns true, if not return false.  If the required attribute has no name than always return true because any given selections are then strong enough.
   * @param requiredHybridAttribute
   * @param attributes
   * @param category
   */
  isRequiredAttributeStrongEnough(requiredHybridAttribute: AttributePick, attributes: Map<AttributeName, AttributeModel>, category: WeaponCategory): boolean {
    const hybridAttribute = attributes.get(requiredHybridAttribute.attributeName);
    if (!hybridAttribute) {
      return true;
    }
    return hybridAttribute.attributeStrength >= requiredHybridAttribute.attributeStrength && requiredHybridAttribute.category === category;
  }


  canBonusPickBeAssigned<K extends keyof AttributeSelectionsAlias>(attribute: AttributeModel, selection: AttributeSelectionWithPicks, propertyName: K, choice: AttributeSelectionsAlias[K]): boolean {
    let namedPicksUsed = 0;
    let totalPicksUsed = choice["pickValue"] && choice["maxPicks"] > 0 ? choice["pickValue"] : 1; // if we have a pick value greater than 1 use that otherwise default to 1
    const maxPicks = choice["maxPicks"] ? choice["maxPicks"] : Number.MAX_SAFE_INTEGER; // if we have max picks use them otherwise assume an unlimited number of picks
    if (attribute && attribute.chosenBonusPicks) {
      for (const pick of attribute.chosenBonusPicks) { // for each chosenPick
        for (const selectionName of Object.keys(pick)) { // check that selection
          if (selection.selections[selectionName] && propertyName === selectionName) { // if the selection exists and it's name matches the property name
            namedPicksUsed++;
          }
          if (selection.selections[selectionName] && selectionName !== "name") {
            const pickValue = selection.selections[selectionName].pickValue ? selection.selections[selectionName].pickValue : 1;
            totalPicksUsed += pickValue;
          }
        }
      }
    }
    return (namedPicksUsed < maxPicks && totalPicksUsed <= selection.numberOfPicks);
  }

  /**
   * Given the properties we want to try and determine if the propertyName K can be selected given the map of attributes and a AttributeSelectionWithPicks.  If a selection can be made
   * return true, otherwise return false.  Cases that would prevent a selection from being made is if the propertyName K has already been selected a max number of times or if there are
   * not enough selection points left to make the selection.
   * @param attributes - map of all 8 attributes a character has
   * @param selection - a fully populated (i.e. selectedableBonusPicks in attribute-constant) selection object of the type of strength that matches attribute strength in the attribute Map
   * @param propertyName The name of the property for the given selection's selection property.  You could also say K extends keyof selection.selections
   */
  selectBonus<K extends keyof AttributeSelectionsAlias>(attributes: Map<AttributeName, AttributeModel>, selection: AttributeSelectionWithPicks, propertyName: K): boolean {
    const choice = this.getProperty(selection.selections, propertyName);
    let attribute: AttributeModel;
    const type = selection.selections.name.toString().replace("Selections", ""); // risky unchecked way of finding the attribute but i'm tired and test should help ensure it works.
    attribute = attributes.get(AttributeName[type]);
    if (this.canBonusPickBeAssigned(attribute, selection, propertyName, choice)) {
      const newSelection: AttributeSelectionsAlias = {
        ...new this.bonusSelectionConstructor[selection.selections.name](),
        [propertyName]: choice
      };
      attribute.chosenBonusPicks.push(newSelection);
      return true;
    }
    return false;
  }

  /**
   * Given an attribute
   * @param attribute
   */
  getNumberOfBonusAttributePointsSpent<K extends keyof AttributeSelectionsAlias>(attribute: AttributeModel): number {
    let totalPicksUsed = 0;
    if (attribute && attribute.chosenBonusPicks) {
      for (const pick of attribute.chosenBonusPicks) { // for each chosenPick
        for (const selectionName of Object.keys(pick)) { // check that selection
          if (selectionName !== "name") {
            const pickValue = pick[selectionName].pickValue ? pick[selectionName].pickValue : 1;
            totalPicksUsed += pickValue;
          }
        }
      }
    }
    return totalPicksUsed;
  }


// ******* HELPER FUNCTIONS BELOW **********
  /**
   * Helper function that will take a value, range and dicesize and pull out the printed roll and return
   * it as a number,
   * @param range
   * @param level
   * @param diceSize
   */
  extractNumberFromValueRange(range: ValueRange, level: Level, diceSize = DiceSize.None): number {
    const array = this.diceService.getDiceArrayFromDamageRange(range.minBonus, range.maxBonus, LevelRange.TEN, diceSize);
    return parseInt(array[level - 1].modifierOfDice.value(), 10);
  }

  /**
   * Crazy wizardry that lets you access properties of an object by passing in the object and a property name
   * @param o
   * @param propertyName
   */
  getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName];
  }
}


