import {Injectable} from '@angular/core';
import {DiceService} from "../character/dice/dice.service";
import {AttributeName} from "./attribute-name.enum";
import {WeaponCategory} from "../weapon/weapon-category.enum";
import {Level} from "../character/level.enum";
import {AttributeModel} from "./attribute-model";
import {ATTRIBUTE, AttributeAttackDamage} from "../constants/attribute-constants/attribute-constants";
import {LevelRange} from "../spells/enums/level-range.enum";
import {DiceSize} from "../character/dice/dice-size.enum";
import {Dice} from "../character/dice/dice";
import {AttributeStrength} from "./attribute-strength.enum";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";

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
          const damageRange = attackDamage.range[attribute.attributeStrength];
          const array = this.diceService.getDiceArrayFromDamageRange(damageRange.minBonus, damageRange.maxBonus, LevelRange.TEN, DiceSize.None);
          return array[level - 1];
        }
      }
    }
    return new Dice();
  }

  /**
   * Given an attribute and an attributeName this will return the bonus associated with the attribute name if any.  If no bonus exists then this will return 0.
   * @param attribute
   * @param skillType
   */
  getSkillBonus(attribute: AttributeModel, skillType: AttributeName) {
    let bonus: Array<number>;
    const text = "bonusTo" + skillType + "Skills";
    bonus = attribute[text];
    // switch (skillType) {
    //   case AttributeName.Brawn:
    //     bonus = attribute.bonusToBrawnSkills;
    //     break;
    //   case AttributeName.Presence:
    //     bonus = attribute.bonusToPresenceSkills;
    //     break;
    //   case AttributeName.Agility:
    //     bonus = attribute.bonusToAgilitySkills;
    //     break;
    //   case AttributeName.Intuition:
    //     bonus = attribute.bonusToIntuitionSKills;
    //     break;
    //   case AttributeName.Reasoning:
    //     bonus = attribute.bonusToReasoningSkills;
    //     break;
    //   default:
    //     return 0;
    // }
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
   * Given an attribute and a level this will return a dice object with the critical bonus provided by the attribute.  If the attribute doesn't provide any kind of critical bonus then the dice object will be an empty instance.
   * @param attribute
   * @param level
   */
  getCriticalBonus(attribute: AttributeModel, level: Level) {

  }
}
