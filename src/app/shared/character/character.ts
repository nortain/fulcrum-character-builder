import {Weapon} from "../weapon/weapon";
import {StartingCharacterMagicDefense, STARTING_MOVEMENT, STARTING_INITIATIVE, STEALTH_INIT_BONUS} from "../constants/constants";
import {RaceType} from "./race/race-type.enum";
import {Level} from "./level.enum";
import {RacialSubType} from "./race/racial-sub-type.enum";
import {ThemePointsContainer} from "../theme-points/theme-points-container";
import {AttributeBonus} from "../attribute/character-attribute/attribute-bonus.enum";
import {WeaponClass} from "../weapon/weapon-class.enum";
import {WeaponCategory} from "../weapon/weapon-category.enum";
import {AttributeStrength} from "../attribute/attribute-enums/attribute-strength.enum";
import {AttributeName} from "../attribute/attribute-enums/attribute-name.enum";
import {PhysicalDefense} from "./physical-defense/physical-defense";
import {SubthemeContainer} from "../theme-points/subthemes/subtheme-container";
import {AttributeFactoryService} from "../attribute/attribute-factory.service";
import {RaceFactoryService} from "./race/race-factory.service";
import {AttributeModel} from "../attribute/attribute-model";
import {RaceModel} from "./race/race-model";

export class Character {
  attributes: Array<AttributeModel>;
  race: RaceModel;

  constructor(
    private attributeFactoryService: AttributeFactoryService,
    private raceFactoryService: RaceFactoryService,
    public name: string,
    public raceType: RaceType = RaceType.Altwani,
    level?: Level,
    subRace: RacialSubType = null,
    public themePoints = new ThemePointsContainer(),
    public subthemes = new SubthemeContainer(themePoints),
    public physicalDefense = new PhysicalDefense(),
    public weapons = [new Weapon('Fist', WeaponClass.Unarmed, WeaponCategory.Balanced)],
    public magicDefense = new StartingCharacterMagicDefense()) { // TODO find a new way to build attributes and put them here
    this.attributes = this.attributeFactoryService.initializeAllAttributes();
    this.race = this.raceFactoryService.getNewRace(raceType, level, subRace);
    for (const attribute of this.attributes) {
      this.assignAttributePoint(attribute, this.race);
    }
  }

  /**
   * Gets all initiative bonuses for a character and returns it as a whole number
   * @returns {number}
   */
  getInitiative(): number {
    let init = STARTING_INITIATIVE;
    init += this.attributeFactoryService.getInitiativeBonus(this.attributes[AttributeName.Quickness]);
    init += this.attributeFactoryService.getInitiativeBonus(this.attributes[AttributeName.Intuition]);
    init += STEALTH_INIT_BONUS[this.themePoints.stealth.getStrength()];
    return init;
  }

  /**
   * gets the string based representation damage of a weapon given an index of the weapon in the array of weapons the character may have
   * @param {number} index of the weapon to fetch damage for
   * @param race
   * @returns {string} based representation of said weapon's damage
   */
  getWeaponDamage(index: number, race: RaceModel): string {
    let attributeBonus = 0;
    for (const attribute of this.attributes) {
      attributeBonus += this.attributeFactoryService.getAttackDamageBonus(attribute, this.weapons[index].baseValues.category, race.level).modifierOfDice.value();
    }
    this.weapons[index].baseValues.damage.modifierOfDice.addVal['attributes'] = attributeBonus;
    const result = this.weapons[index].baseValues.damage.printRoll();
    return result;
  }

  /**
   * Takes a normal characters default speed and should add in bonuses to speed from agility, armor and talents
   * @returns {number} the value that represents the speed of the character
   */
  getSpeed(): number {
    let result = STARTING_MOVEMENT;
    result += this.attributeFactoryService.getSpeedBonus(this.attributes[AttributeName.Agility]);
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
   * @param {AttributeType} attribute is the type of the attribute
   * @param race
   */
  assignAttributePoint(attribute: AttributeModel, race: RaceModel) {
    if (attribute.attributeStrength === AttributeStrength.Normal &&
      race.startingAttributes.indexOf(attribute.attributeName) > -1) {
      this.attributes[attribute.attributeName].strength = AttributeStrength.Heroic;
    } else {
      const strengthDifference = this.attributes[attribute.attributeName].strength - attribute.attributeStrength;
      if (-strengthDifference <= race.availableAttributePoints) {
        this.attributes[attribute.attributeName].strength = attribute.attributeStrength;
        race.availableAttributePoints += strengthDifference;
      }
    }
  }


}
