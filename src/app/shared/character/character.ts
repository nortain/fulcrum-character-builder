import {Race} from "./race/race";
import {Weapon} from "../weapon/weapon";
import {Armor} from "../armor/armor";
import {StartingCharacterMagicDefense, STARTING_MOVEMENT, STARTING_INITIATIVE, STEALTH_INIT_BONUS} from "../constants/constants";
import {RaceType} from "./race/race-type.enum";
import {Level} from "./level.enum";
import {RacialSubType} from "./race/racial-sub-type.enum";
import {ThemePointsContainer} from "../theme-points/theme-points-container";
import {AttributeType} from "../attribute/attribute-type.enum";
import {AttributeBonus} from "../attribute/character-attribute/attribute-bonus.enum";
import {WeaponClass} from "../weapon/weapon-class.enum";
import {WeaponCategory} from "../weapon/weapon-category.enum";
import {AttributeStrength} from "../attribute/attribute-strength.enum";
import {AttributeName} from "../attribute/attribute-name.enum";
import {PhysicalDefense} from "./physical-defense/physical-defense";
import {SubthemeContainer} from "../theme-points/subthemes/subtheme-container";

export class Character extends Race {

  constructor(public name: string,
              public raceType: RaceType = RaceType.Altwani,
              level?: Level,
              subRace: RacialSubType = null,
              public themePoints = new ThemePointsContainer(),
              public subthemes = new SubthemeContainer(themePoints),
              public physicalDefense = new PhysicalDefense(),
              public weapons = [new Weapon('Fist', WeaponClass.Unarmed, WeaponCategory.Balanced)],
              public magicDefense = new StartingCharacterMagicDefense(),
              public attributes: any = {}) { // TODO find a new way to build attributes and put them here
    super(raceType, level, subRace);
    for (const attribute of this.attributes.attributesArray) {
      this.assignAttributePoint(attribute.strength, attribute.getName());
    }
  }

  /**
   * Gets all initiative bonuses for a character and returns it as a whole number
   * @returns {number}
   */
  getInitiative(): number {
    let init = STARTING_INITIATIVE;
    init += this.attributes.getBonus(AttributeBonus.InitiativeBonus);
    init += STEALTH_INIT_BONUS[this.themePoints.stealth.getStrength()];
    return init;
  }

  /**
   * gets the string based representation damage of a weapon given an index of the weapon in the array of weapons the character may have
   * @param {number} index of the weapon to fetch damage for
   * @returns {string} based representation of said weapon's damage
   */
  getWeaponDamage(index: number): string {
    let attributeBonus = 0;
    if (this.weapons[index].baseValues.category === WeaponCategory.Balanced) {
      attributeBonus = this.attributes.getBonus(AttributeBonus.SecondaryDamage);
    } else {
      attributeBonus = this.attributes.getBonus(AttributeBonus.PrimaryDamage);
    }
    this.weapons[0].baseValues.damage.modifierOfDice.addVal['attributes'] = attributeBonus;
    const result = this.weapons[0].baseValues.damage.printRoll();
    return result;
  }

  /**
   * Takes a normal characters default speed and should add in bonuses to speed from agility, armor and talents
   * @returns {number} the value that represents the speed of the character
   */
  getSpeed(): number {
    let result = STARTING_MOVEMENT;
    result = result + this.attributes.getBonus(AttributeBonus.SpeedBonus);
    if (this.physicalDefense.armor) {
      result += this.physicalDefense.armor.getMaxMovement().movementPenalty;
      if (result > this.physicalDefense.armor.getMaxMovement().maxMovement) {
        result = this.physicalDefense.armor.getMaxMovement().maxMovement;
      }
    }
    return result;
  }

  /**
   * Need to add more notes about how attributes are assigned to characters.
   * @param {number} strength of the attribute
   * @param {AttributeType} attribute is the type of the attribute
   */
  assignAttributePoint(strength: AttributeStrength, attribute: AttributeName) {
    if (strength === AttributeStrength.Normal &&
      this.startingAttributes.indexOf(attribute) > -1) {
      this.attributes[attribute].strength = AttributeStrength.Heroic;
    } else {
      const strengthDifference = this.attributes[attribute].strength - strength;
      if (-strengthDifference <= this.availableAttributePoints) {
        this.attributes[attribute].strength = strength;
        this.availableAttributePoints += strengthDifference;
      }
    }
  }


}
