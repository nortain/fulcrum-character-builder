import {Injectable} from '@angular/core';
import {DiceService} from "../character/dice/dice.service";
import {AttributeName} from "./attribute-name.enum";
import {WeaponCategory} from "../weapon/weapon-category.enum";
import {Level} from "../character/level.enum";
import {AttributeModel} from "./attribute-model";
import {ATTRIBUTE, AttributeAttackDamage, ValueRange} from "../constants/attribute-constants/attribute-constants";
import {LevelRange} from "../spells/enums/level-range.enum";
import {DiceSize} from "../character/dice/dice-size.enum";
import {Dice} from "../character/dice/dice";
import {AttributeStrength} from "./attribute-strength.enum";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";
import {AgilitySelections, BrawnSelections, PresenceSelections, ReasoningSelections} from "../constants/attribute-constants/selected-bonus-groups";

@Injectable({
  providedIn: 'root'
})
export class AttributeFactoryService {

  constructor(private diceService: DiceService) {
  }

  getNewAttribute(name: AttributeName, strength = AttributeStrength.Normal): AttributeModel {
    const attribute: AttributeModel = {
      ...ATTRIBUTE[name],
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
    const attackDamages: Array<AttributeAttackDamage> = ATTRIBUTE[attribute.attributeName].bonusToAttackDamage;
    if (attackDamages) {
      for (const attackDamage of attackDamages) {
        if (attackDamage.category === category) {
          let damageRange = attackDamage.range[attribute.attributeStrength];
          if (attribute.attributeName === AttributeName.Presence) {
            const picks: Array<PresenceSelections> = attribute.choosenBonusPicks as Array<PresenceSelections>;
            damageRange = this.applyPresenceAttackPenaltyToDamageRange(damageRange, picks);
          }
          const array = this.diceService.getDiceArrayFromDamageRange(damageRange.minBonus, damageRange.maxBonus, LevelRange.TEN, DiceSize.None);
          return array[level - 1];
        }
      }
    }
    return new Dice();
  }

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
   * Given an attribute and a level this will return a dice object with the critical bonus provided by the attribute.  If the attribute doesn't provide any kind of critical bonus then the dice object will be an empty instance.  Fetches values for bonusToCritical, bonusToSpeedAndCritical, bonusToCriticalAndAggressivePress, bonusToEmpoweredAndCritical and bonusToBaseCritical
   * @param attribute
   * @param level
   */
  getCriticalBonus(attribute: AttributeModel, level: Level, weaponCategory?: WeaponCategory): number {
    let bonus = 0;
    if (attribute.choosenBonusPicks) {
      for (const att of attribute.choosenBonusPicks) {
        if (attribute.attributeName === AttributeName.Brawn) {
          if ((att as BrawnSelections).bonusToCriticalAndAggressivePress) {
            const range = (att as BrawnSelections).bonusToCriticalAndAggressivePress.criticalBonus;
            bonus += this.extractNumberFromValueRange(range, level);
          } else if ((att as BrawnSelections).bonusToEmpoweredAndCritical) {
            const range = (att as BrawnSelections).bonusToEmpoweredAndCritical.bonusToCritical;
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
          } else if ((att as ReasoningSelections).bonusToEmpoweredAndCritical) {
            const range = (att as ReasoningSelections).bonusToEmpoweredAndCritical.bonusToCritical;
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
}


