import {Weapon} from "../weapon/weapon";
import {STARTING_HIT_POINTS, STARTING_INITIATIVE, STARTING_MOVEMENT, StartingCharacterMagicDefense, STEALTH_INIT_BONUS} from "../constants/constants";
import {RaceType} from "./race/race-type.enum";
import {Level} from "./level.enum";
import {RacialSubType} from "./race/racial-sub-type.enum";
import {ThemePointsContainer} from "../theme-points/theme-points-container";
import {WeaponClass} from "../weapon/weapon-class.enum";
import {WeaponCategory} from "../weapon/weapon-category.enum";
import {AttributeStrength} from "../attribute/attribute-enums/attribute-strength.enum";
import {AttributeName} from "../attribute/attribute-enums/attribute-name.enum";
import {PhysicalDefense} from "./physical-defense/physical-defense";
import {SubthemeContainer} from "../theme-points/subthemes/subtheme-container";
import {AttributeFactoryService} from "../attribute/attribute-factory.service";
import {RaceFactoryService} from "./race/race-factory.service";
import {RaceModel} from "./race/race-model";
import {CharacterModel} from "./character-model";
import {AttributeBonus} from "../attribute/character-attribute/attribute-bonus.enum";
import {AttributeModel} from "../attribute/attribute-model";

export class CharacterFactoryService {

  constructor(
    private attributeFactoryService: AttributeFactoryService,
    private raceFactoryService: RaceFactoryService,
  ) {

  }

  getNewCharacter(name: string,
                  raceType: RaceType = RaceType.Altwani,
                  level = Level.One,
                  subRace: RacialSubType = null,
                  themePoints = new ThemePointsContainer(),
                  subthemes = new SubthemeContainer(themePoints),
                  physicalDefense = new PhysicalDefense(),
                  weapons = [new Weapon('Fist', WeaponClass.Unarmed, WeaponCategory.Balanced)],
                  magicDefense = new StartingCharacterMagicDefense(),
                  attributes?: Map<AttributeName, AttributeModel>): CharacterModel {
    const model: CharacterModel = {
      ...new CharacterModel(),
      name: name,
      race: this.raceFactoryService.getNewRace(raceType, level, subRace),
      attributes: attributes ? attributes : this.attributeFactoryService.initializeAllAttributes(),
      level: level,
    };
    for (const attribute of model.attributes.values()) { // loop through all attributes to apply racial bonuses if any.
      this.assignAttributeStrength(model, attribute.attributeName, AttributeStrength.Normal);
    }
    return model;
  }

  getHitPoints(character: CharacterModel): number {
    let hp = STARTING_HIT_POINTS;
    const talentBonusHp = 0; // TODO add talents
    hp += character.themePoints.getHitPointBonus(character.level);
    hp += talentBonusHp;
    hp += this.attributeFactoryService.getHitPointBonus(character.attributes[AttributeName.Vitality].attributeStrength, character.level);
    return hp;
  }

  /**
   * Gets all initiative bonuses for a character and returns it as a whole number
   * @returns {number}
   */
  getInitiative(character: CharacterModel): number {
    let init = STARTING_INITIATIVE;
    init += this.attributeFactoryService.getInitiativeBonus(character.attributes[AttributeName.Quickness]);
    init += this.attributeFactoryService.getInitiativeBonus(character.attributes[AttributeName.Intuition]);
    init += STEALTH_INIT_BONUS[character.themePoints.stealth.getStrength()];
    return init;
  }

  /**
   * gets the string based representation damage of a weapon given an index of the weapon in the array of weapons the character may have
   * @param {number} index of the weapon to fetch damage for
   * @param race
   * @returns {string} based representation of said weapon's damage
   */
  getWeaponDamage(character: CharacterModel, index: number): string {
    let attributeBonus = 0;
    for (const attribute of character.attributes.values()) {
      attributeBonus += this.attributeFactoryService.getAttackDamageBonus(attribute, character.weapons[index].baseValues.category, character.level).modifierOfDice.value();
    }
    character.weapons[index].baseValues.damage.modifierOfDice.addVal['attributes'] = attributeBonus;
    const result = character.weapons[index].baseValues.damage.printRoll();
    return result;
  }

  /**
   * Takes a normal characters default speed and should add in bonuses to speed from agility, armor and talents
   * @returns {number} the value that represents the speed of the character
   */
  getSpeed(character: CharacterModel): number {
    let result = STARTING_MOVEMENT;
    result += this.attributeFactoryService.getSpeedBonus(character.attributes[AttributeName.Agility]);
    result += character.race.movementPenalty;
    if (character.physicalDefense.armor) {
      result += character.physicalDefense.armor.getMaxMovement().movementPenalty;
      if (result > character.physicalDefense.armor.getMaxMovement().maxMovement) {
        result = character.physicalDefense.armor.getMaxMovement().maxMovement;
      }
    }
    return result;
  }

  /**
   * Given the character model, we want to assign to a strength value to one fo the character's attributes
   * If the character is of a race where they get a bonus and their strength is normal, set it to heroic.  If
   * @param character
   * @param name
   * @param strength
   */
  assignAttributeStrength(character: CharacterModel, name: AttributeName, strength: AttributeStrength) {
    const attribute = character.attributes[name];
    const race = character.race;
    if (attribute.attributeStrength === AttributeStrength.Normal &&
      race.startingAttributes.indexOf(name) > -1) {
      attribute.attributeStrength = AttributeStrength.Heroic;
    } else {
      const strengthDifference = attribute.attributeStrength - strength;
      if (-strengthDifference <= character.race.availableAttributePoints) {
        attribute.attributeStrength = strength;
        race.availableAttributePoints += strengthDifference;
      }
    }

  }

}
