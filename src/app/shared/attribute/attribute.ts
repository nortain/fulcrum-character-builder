import {AttributeType} from "./attribute-type.enum";
import {AttributeStrength} from "./attribute-strength.enum";
import {AttributeName} from "./attribute-name.enum";
import {SpecialText} from "./special-text.enum";
import {
  IN_INIT_BONUS,
  IN_THP_BONUS, MAGIC_DEFENSE, PRIMARY_DAMAGE, QU_HP_BONUS, QU_INIT_BONUS, SD_HP_BONUS,
  SD_PP_BONUS,
  SECONDARY_DAMAGE,
  SKILL_BONUS, TRAINED_SKILL_BONUS, VI_HP_BONUS
} from "../constants/constants";
import {Armor} from "../armor/armor";
import {ArmorType} from "../armor/armor-type.enum";
import {Level} from "../character/level.enum";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";


export class Attribute {
  private epicText: string;
  private legendaryText: string;
  type: AttributeType;

  constructor(protected name: AttributeName, public strength: AttributeStrength) {
    this.assignType(name);
  }

  getName(): AttributeName {
    return this.name;
  }

  getSkillBonus(): number {
    if (this.hasSkillBonus()) {
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

  /**Given a level this finds how many bonus hit points an attribute gives based on its strength*/
  getHitPointBonus(level: Level): number {
    if (this.hasHpBonus()) {
      if (this.name === AttributeName.Vitality) {
        return VI_HP_BONUS[level][this.strength];
      } else if (this.name === AttributeName.Quickness) {
        return QU_HP_BONUS[level][this.strength];
      } else {// assumes SelfDiscipline
        return SD_HP_BONUS[level][this.strength];
      }
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
      || this.type === AttributeType.MentalDefensive
      || this.type === AttributeType.PhysicalDefensive) {
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
    if (this.type === AttributeType.PhysicalDefensive || this.name === AttributeName.SelfDiscipline) {
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
    if (this.type === AttributeType.MentalOffensive && this.strength > AttributeStrength.Champion) {
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
    return this.type === AttributeType.PhysicalOffensive || this.type === AttributeType.MentalOffensive;
  }

  private hasMagicDefense(magicDefenseType: MagicDefenseType): boolean {
    return (magicDefenseType === MagicDefenseType.Fortitude && this.name === AttributeName.Vitality) ||
      (magicDefenseType === MagicDefenseType.Reflex && this.name === AttributeName.Quickness) ||
      (magicDefenseType === MagicDefenseType.Will && this.name === AttributeName.SelfDiscipline);
  }

  /**Return the skill bonus for the given attribute*/
  hasSkillBonus(): boolean {
    return this.type === AttributeType.MentalOffensive
      || this.type === AttributeType.PhysicalOffensive
      || this.name === AttributeName.Intuition;
  }

  /**Return true if this attribute gives a bonus to hp*/
  hasHpBonus(): boolean {
    return this.type === AttributeType.PhysicalDefensive || this.name === AttributeName.SelfDiscipline;
  }

  hasThpBonus(): boolean {
    return this.name === AttributeName.Intuition;
  }


  getSpecialText(): string {
    return this.getEpicText() + this.getLegendaryText();
  }

  /**responsible for assigned the special text and attributeType based on the name of the attribute*/
  private assignType(name) {
    switch (name) {
      case AttributeName.Brawn:
      case AttributeName.Agility:
        this.type = AttributeType.PhysicalOffensive;
        break;
      case AttributeName.Intuition:
      case AttributeName.SelfDiscipline:
        this.type = AttributeType.MentalDefensive;
        break;
      case AttributeName.Quickness:
      case AttributeName.Vitality:
        this.type = AttributeType.PhysicalDefensive;
        break;
      case AttributeName.Reasoning:
      case AttributeName.Presence:
        this.type = AttributeType.MentalOffensive;
        break;
      default:
        throw new Error("Invalid attribute was created!");
    }
    this.epicText = SpecialText[name.toString().trim() + "EpicText"];
    this.legendaryText = SpecialText[name.toString().trim() + "LegendaryText"];

  }

  private getEpicText(): string {
    if (this.strength > AttributeStrength.Champion) {
      return this.epicText;
    } else {
      return '';
    }
  }

  private getLegendaryText(): string {
    if (this.strength === AttributeStrength.Legendary) {
      return this.legendaryText;
    } else {
      return '';
    }
  }


}
