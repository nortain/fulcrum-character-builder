import {Weapon} from "../weapon/weapon";
import {STARTING_HIT_POINTS, STARTING_INITIATIVE, STARTING_MOVEMENT, StartingCharacterMagicDefense} from "../constants/constants";
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
import {CharacterModel} from "./character-model";
import {AttributeModel} from "../attribute/attribute-model";
import {Injectable} from "@angular/core";
import {AttributeSelectionsAlias, AttributeSelectionWithPicks} from "../attribute/attribute-constants/selected-bonus-groups";
import {Armor} from "../armor/armor";
import {ThemeType} from "../theme-points/theme-type.enum";
import {ThemeStrength} from "../theme-points/theme-strength.enum";
import {RaceModel} from "./race/race-model";

@Injectable({
  providedIn: 'root'
})
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
                  selectedWeaponCategory = WeaponCategory.Balanced,
                  attributes?: Map<AttributeName, AttributeModel>): CharacterModel {
    const model: CharacterModel = {
      ...new CharacterModel(),
      name: name,
      race: this.raceFactoryService.getNewRace(raceType, level, subRace),
      level: level,
      themePoints: themePoints,
      subThemes: subthemes,
      physicalDefense: physicalDefense,
      weapons: weapons,
      magicDefense: magicDefense,
      selectedWeaponCategory: selectedWeaponCategory,
      attributes: attributes ? attributes : this.attributeFactoryService.initializeAllAttributes()
    };
    for (const attribute of model.attributes.values()) { // loop through all attributes to apply racial bonuses if any.
      this.assignAttributeStrength(model, attribute.attributeName, attribute.attributeStrength);
    }
    return model;
  }

  getHitPoints(character: CharacterModel): number {
    let hp = STARTING_HIT_POINTS;
    const talentBonusHp = 0; // TODO add talents
    hp += character.themePoints.getHitPointBonus(character.level);
    hp += talentBonusHp;
    hp += this.attributeFactoryService.getHitPointBonus(character.attributes.get(AttributeName.Vitality), character.level);
    return hp;
  }

  /**
   * Gets all initiative bonuses for a character and returns it as a whole number
   * @returns {number}
   */
  getInitiative(character: CharacterModel): number {
    let init = STARTING_INITIATIVE; // TODO add talents
    init += this.attributeFactoryService.getInitiativeBonus(character.attributes.get(AttributeName.Quickness));
    init += this.attributeFactoryService.getInitiativeBonus(character.attributes.get(AttributeName.Intuition));
    init += character.themePoints.getInitiativeBonus();
    return init;
  }

  getStartingTemporaryHitPoints(character: CharacterModel): number {
    let thp = 0;
    thp += character.themePoints.getStartingTemporaryHitPoints(character.level);
    thp += character.physicalDefense.getStartingTemporaryHitPoints();
    thp += this.attributeFactoryService.getStartingTemporaryHitPoints(character.attributes.get(AttributeName.SelfDiscipline), character.level);
    thp += 0; // TODO add for talents
    return thp;
  }

  /**
   * gets the string based representation damage of a weapon given an index of the weapon in the array of weapons the character may have
   * @param character
   * @param {number} index of the weapon to fetch damage for
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

  getCharacterAbilities(character: CharacterModel): string {
    let description = "";
    const abilities = this.raceFactoryService.getActiveAbilities(character.race, character.level);
    for (const ability of abilities) {
      description += ability.toString();
    }
    return description;
  }

  /**
   * Takes a normal characters default speed and should add in bonuses to speed from agility, armor and talents
   * @returns {number} the value that represents the speed of the character
   */
  getSpeed(character: CharacterModel): number {
    let result = STARTING_MOVEMENT;
    result += this.attributeFactoryService.getSpeedBonus(character.attributes.get(AttributeName.Agility));
    result += this.raceFactoryService.getSpeed(character.race);
    if (character.physicalDefense.armor) {
      result += character.physicalDefense.armor.getMaxMovement().movementPenalty;
      if (result > character.physicalDefense.armor.getMaxMovement().maxMovement) {
        result = character.physicalDefense.armor.getMaxMovement().maxMovement;
      }
    }
    return result;
  }

  presentAttributeSelections(character: CharacterModel, attributeName: AttributeName): AttributeSelectionWithPicks {
    return this.attributeFactoryService.presentChoices(attributeName, character.attributes, character.selectedWeaponCategory);
  }

  /**
   * Allows a character to select an attribute bonus.  If a selection cannot be made then an error is thrown.
   * @param character
   * @param selection
   * @param propertyName
   */
  selectAttributeBonus<K extends keyof AttributeSelectionsAlias>(character: CharacterModel, selection: AttributeSelectionWithPicks, propertyName: K): void {
    if (!this.attributeFactoryService.selectBonus(character.attributes, selection, propertyName)) {
      throw Error("Cannot select " + propertyName + " from " + selection.selections.name);
    }
  }

  assignThemePoint(character: CharacterModel, themeType: ThemeType, themeStrength: ThemeStrength) {
    character.themePoints.assignThemePoint(themeType, themeStrength);
  }

  /**
   * assigns an armor to a character
   * @param character
   * @param armor
   */
  assignArmor(character: CharacterModel, armor: Armor) {
    character.physicalDefense.equipArmor(armor);
  }

  /**
   * TODO implement me
   * This should look at a characters talents to determine if a character is trained in using heavy armor
   */
  isTrainedInHeavyArmor(): boolean {
    return true;
  }


  assignCharacterRace(character: CharacterModel, race: RaceModel): CharacterModel {
    if (character.race.raceType !== race.raceType) {
      character.race = race;
      character = this.cloneCharacter(character);
    } else if (character.level !== race.level) {
      this.assignCharacterLevel(character, race.level);
    }
    return character;
  }

  assignCharacterLevel(character: CharacterModel, level: Level) {
    character.level = level;
    character.race.level = level;
  }


  /**
   * Given the character model, we want to assign to a strength value to one fo the character's attributes
   * If the character is of a race where they get a bonus and their strength is normal, set it to heroic.  If
   * @param character
   * @param name
   * @param strength
   */
  assignAttributeStrength(character: CharacterModel, name: AttributeName, strength: AttributeStrength) {
    const attribute = character.attributes.get(name);
    const race = character.race;
    const startingAttributes = this.raceFactoryService.getStartingAttributes(race);
    const isNameAStartingAttribute = startingAttributes.indexOf(name) > -1;
    const isAttributeStrengthNormal = strength === AttributeStrength.Normal;
    if (isAttributeStrengthNormal && isNameAStartingAttribute) {
      this.attributeFactoryService.assignStrength(attribute, AttributeStrength.Heroic);
    } else {
      const strengthDifference = attribute.attributeStrength - strength;
      const isTheStrengthDifferenceLessThanOrEqualToAvailableAttributePoints = -strengthDifference <= character.race.availableAttributePoints;
      if (isTheStrengthDifferenceLessThanOrEqualToAvailableAttributePoints) {
        this.attributeFactoryService.assignStrength(attribute, strength);
        this.raceFactoryService.assignAvailableAttributePoints(race, strengthDifference);
      }
    }
  }

  /**
   * takes a character to make a new copy of it but will reset all attributes
   * @param character
   * @param makeNewSubtheme
   */
  cloneCharacter(character: CharacterModel, makeNewSubtheme?: boolean) {
    const subThemes = makeNewSubtheme ? undefined : character.subThemes;
    const char = this.getNewCharacter(
      character.name,
      character.race.raceType,
      character.level,
      character.race.racialSubType,
      character.themePoints,
      subThemes,
      character.physicalDefense,
      character.weapons,
      character.magicDefense,
      character.selectedWeaponCategory,
      character.attributes
    );
    return char;
  }

}
