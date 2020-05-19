import {AttributeType} from "./attribute-type.enum";
import {AttributeStrength} from "./attribute-strength.enum";
import {AttributeName} from "./attribute-name.enum";
import {IN_INIT_BONUS, IN_THP_BONUS, MAGIC_DEFENSE, PRIMARY_DAMAGE, QU_INIT_BONUS, SD_PP_BONUS, SECONDARY_DAMAGE, SKILL_BONUS, TRAINED_SKILL_BONUS, VITALITY_HP_BONUS} from "../constants/constants";
import {Armor} from "../armor/armor";
import {ArmorType} from "../armor/armor-type.enum";
import {Level} from "../character/level.enum";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";
import {AttributeModel} from "../constants/attribute-constants/attribute-model";
import {DiceService} from "../character/dice/dice.service";
import {LevelRange} from "../spells/enums/level-range.enum";
import {Injectable} from "@angular/core";

@Injectable(
  {providedIn: 'root'}
)
export class AttributeService {


  constructor(private diceService: DiceService) {
    this.assignType(name);
  }

  createAttribute(name: AttributeName, strength: AttributeStrength): AttributeModel {
    return {
      ...new AttributeModel(),
      attributeName: name,
      attributeType: this.assignType(name),
      attributeStrength: strength
    };
  }

  getName(state: AttributeModel): string {
    if (state.attributeName === AttributeName.SelfDiscipline) {
      return "Self Discipline";
    } else {
      return state.attributeName;
    }
  }

  getSkillBonus(state: AttributeModel): number {
    if (this.hasSkillBonus(state)) {
      return SKILL_BONUS[this.strength];
    } else {
      return 0;
    }
  }


  getMagicDefense(magicDefenseType: MagicDefenseType): number {
    let value = 0;
    if (this.name === AttributeName.Intuition) {
      const result = MAGIC_DEFENSE[this.strength] - 1;
      if (result > value) {
        value = result;
      }
    } else if (this.hasMagicDefense(magicDefenseType)) {
      value = MAGIC_DEFENSE[this.strength];
    }
    return value;

  }

  getPrimaryDamage(): number {
    if (this.hasDamageBonus()) {
      return PRIMARY_DAMAGE[this.strength];
    } else {
      return 0;
    }

  }

  getSecondaryDamage(): number {
    if (this.hasDamageBonus()) {
      return SECONDARY_DAMAGE[this.strength];
    } else {
      return 0;
    }

  }

  /**
   * Given a level this finds how many bonus hit points an attribute gives based on its strength
   * */
  getHitPointBonus(level: Level): number {
    if (this.hasHpBonus()) {
      const dice = this.diceService
        .getDiceArrayFromDamageRange(VITALITY_HP_BONUS[this.strength][0], VITALITY_HP_BONUS[this.strength][1], LevelRange.TEN);
      return dice[level].modifierOfDice.value();
    } else {
      return 0;
    }
  }


  getTemporaryHitPointBonus(level: Level): number {
    if (this.hasThpBonus()) {
      return IN_THP_BONUS[level][this.strength];
    } else {
      return 0;
    }
  }

  /**gets critical die bonus for the given attribute given the level*/
  getCritDieBonus(level: Level): number {
    if (this.strength < AttributeStrength.Legendary
      || this.state.attributeType === AttributeType.MentalDefensive
      || this.state.attributeType === AttributeType.PhysicalDefensive) {
      return 0;
    } else {
      if (level === Level.Ten) {
        return 3;
      } else if (level > Level.Five) {
        return 2;
      } else {
        return 1;
      }
    }
  }

  /**Gets initiative bonus for the given attribute*/
  getInitiativeBonus(): number {
    if (this.name === AttributeName.Quickness) {
      return QU_INIT_BONUS[this.strength];
    } else if (this.name === AttributeName.Intuition) {
      return IN_INIT_BONUS[this.strength];
    } else {
      return 0;
    }
  }

  /**gets any potential bonus to armor dependent on the type of armor the character is wearing*/
  getArmorBonus(armor: Armor): number {
    if (this.strength > AttributeStrength.Champion) {
      if (this.name === AttributeName.Quickness &&
        (armor.type === ArmorType.LightArmor || armor.type === ArmorType.None)) {
        return 1;
      } else if (this.name === AttributeName.SelfDiscipline && armor.type === ArmorType.CasterArmor) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  /**returns the number of bonus trained skills a character gets*/
  getTrainedSkillBonus(): number {
    if (this.state.attributeType === AttributeType.PhysicalDefensive || this.name === AttributeName.SelfDiscipline) {
      return TRAINED_SKILL_BONUS[this.strength];
    } else {
      return 0;
    }
  }

  getRecoveryBonus(): number {
    if (this.name === AttributeName.Vitality && this.strength > AttributeStrength.Champion) {
      return 1;
    } else {
      return 0;
    }
  }

  getPowerPointBonus(): number {
    if (this.state.attributeType === AttributeType.MentalOffensive && this.strength > AttributeStrength.Champion) {
      return 1;
    } else if (this.name === AttributeName.SelfDiscipline) {
      return SD_PP_BONUS[this.strength];
    } else {
      return 0;
    }
  }

  getSpeedBonus(): number {
    if (this.name === AttributeName.Agility && this.strength > AttributeStrength.Champion) {
      return 1;
    } else {
      return 0;
    }
  }

  hasDamageBonus(): boolean {
    return this.state.attributeType === AttributeType.PhysicalOffensive || this.state.attributeType === AttributeType.MentalOffensive;
  }

  private hasMagicDefense(magicDefenseType: MagicDefenseType): boolean {
    return (magicDefenseType === MagicDefenseType.Fortitude && this.name === AttributeName.Vitality) ||
      (magicDefenseType === MagicDefenseType.Reflex && this.name === AttributeName.Quickness) ||
      (magicDefenseType === MagicDefenseType.Will && this.name === AttributeName.SelfDiscipline);
  }

  /**Return the skill bonus for the given attribute*/
  hasSkillBonus(state: AttributeModel): boolean {
    return state.attributeType === AttributeType.MentalOffensive
      || state.attributeType === AttributeType.PhysicalOffensive
      || state.attributeName === AttributeName.Intuition;
  }

  /**Return true if this attribute gives a bonus to hp*/
  hasHpBonus(): boolean {
    return this.state.attributeName === AttributeName.Vitality;
  }

  hasThpBonus(): boolean {
    return this.name === AttributeName.Intuition;
  }


  /**responsible for assigned the special text and attributeType based on the attributeName of the attribute*/
  private assignType(name): AttributeType {
    switch (name) {
      case AttributeName.Brawn:
      case AttributeName.Agility:
        return AttributeType.PhysicalOffensive;
      case AttributeName.Intuition:
      case AttributeName.SelfDiscipline:
        return AttributeType.MentalDefensive;
      case AttributeName.Quickness:
      case AttributeName.Vitality:
        return AttributeType.PhysicalDefensive;
      case AttributeName.Reasoning:
      case AttributeName.Presence:
        return AttributeType.MentalOffensive;
      default:
        throw new Error("Invalid attribute was created!");
    }
  }

}
