import {DiceService} from "../character/dice/dice.service";
import {Injectable} from '@angular/core';

import {AttributeName} from "./attribute-name.enum";
import {WeaponCategory} from "../weapon/weapon-category.enum";
import {Level} from "../character/level.enum";
import {AttributeModel} from "./attribute-model";
import {ATTRIBUTE, AttributeAttackDamage} from "../constants/attribute-constants/attribute-constants";
import {LevelRange} from "../spells/enums/level-range.enum";
import {DiceSize} from "../character/dice/dice-size.enum";
import {Dice} from "../character/dice/dice";
import {AttributeStrength} from "./attribute-strength.enum";

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

  getAttackDamageBonus(attribute: AttributeModel, category: WeaponCategory, level: Level): Dice {
    const attackDamages: Array<AttributeAttackDamage> = ATTRIBUTE[attribute.attributeName].bonusToAttackDamage;
    for (const attackDamage of attackDamages) {
      if (attackDamage.category === category) {
        const damageRange = attackDamage.range[attribute.attributeStrength];
        const array = this.diceService.getDiceArrayFromDamageRange(damageRange.min, damageRange.max, LevelRange.TEN, DiceSize.None);
        return array[level - 1];
      }
    }
    return new Dice();
  }
}
