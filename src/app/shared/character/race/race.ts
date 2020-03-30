import {AttributeName} from "../../attribute/attribute-name.enum";
import {ThemeType} from "../../theme-points/theme-type.enum";
import {MagicDefenseType} from "../magic-defense/magic-defense-type.enum";
import {RaceType} from "./race-type.enum";
import {VisionType} from "./vision-type.enum";
import {RacialSubType, RacialSubTypeToDamageTypeConverter} from "./racial-sub-type.enum";
import {Level} from "../level.enum";
import {NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS, STARTING_PLAYER_RACES} from "../../constants/constants";
import {BonusByLevel} from "../bonus-by-level";
import {Bonus} from "../bonus";

export class Race {
  vision: VisionType;
  magicDefenseBonus: MagicDefenseType;
  availableAttributePoints: number;
  availableLanguagePoints: number;
  passiveBonuses: Array<Bonus>;
  activeBonuses: Array<Bonus>;
  talentBonus: Array<ThemeType>;
  startingAttributes: Array<AttributeName>;
  optionalStartingAttributes: Array<AttributeName>;
  powerPointBonus: number;
  skillPointBonus: number;
  recoveryBonus: number;
  racialRestriction: string;
  mechanicalBonusValues: BonusByLevel;

  constructor(public raceType: RaceType, public level?: Level, public racialSubType?: RacialSubType) {
    if (!level) {
      this.level = Level.One;
    }
    this.initializeData(raceType, this.level, racialSubType);
  }


  initializeData(raceType: RaceType, level: Level, racialSubType?: RacialSubType) {
    this.mechanicalBonusValues = STARTING_PLAYER_RACES[raceType].mechanicalBonusValues;
    this.vision = STARTING_PLAYER_RACES[raceType].vision ? STARTING_PLAYER_RACES[raceType].vision : VisionType.Normal;
    this.racialSubType = racialSubType ? racialSubType : null;
    this.magicDefenseBonus = STARTING_PLAYER_RACES[raceType].magicDefenseBonus !== undefined ? STARTING_PLAYER_RACES[raceType].magicDefenseBonus : null;
    this.availableAttributePoints = STARTING_PLAYER_RACES[raceType].availableAttributePoints ? STARTING_PLAYER_RACES[raceType].availableAttributePoints : NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS;
    this.availableLanguagePoints = STARTING_PLAYER_RACES[raceType].availableLanguagePoints;
    this.passiveBonuses = STARTING_PLAYER_RACES[raceType].passiveBonuses;
    this.activeBonuses = STARTING_PLAYER_RACES[raceType].activeBonuses;
    this.talentBonus = STARTING_PLAYER_RACES[raceType].talentBonus;
    this.startingAttributes = STARTING_PLAYER_RACES[raceType].startingAttributes;
    this.recoveryBonus = this.getRecoveryBonus();
    this.powerPointBonus = STARTING_PLAYER_RACES[raceType].powerPointBonus ? STARTING_PLAYER_RACES[raceType].powerPointBonus : 0;
    this.skillPointBonus = STARTING_PLAYER_RACES[raceType].skillPointBonus ? STARTING_PLAYER_RACES[raceType].skillPointBonus : 0;
    this.racialRestriction = STARTING_PLAYER_RACES[raceType].racialRestriction ? STARTING_PLAYER_RACES[raceType].racialRestriction : "";
  }

  formatText(text: string): string {
    let result = "";
    if (!text) {
      return "";
    }
    const chunk = text.split("$");
    if (chunk.length > 1) {
      for (let i = 1; i <= chunk.length; i += 2) {
        if (chunk[i - 1]) {
          result = result.concat(chunk[i - 1]);
          const valueText = this.formatText(<string>this.getMechanicalBonus(chunk[i]));
          if (valueText !== undefined) {
            result = result.concat(valueText);
          }

        }
      }
    } else {
      result = chunk[0];
    }
    return result;
  }


  /** In the constants file there are a number of default values for races.
   * This gets the mechanical text value for those bonus by using the propertyName to match up with predefined values in the constants file.
   * In the mechanicBonus object there is a name matching an active or passive bonus with a key of the same name as the given propertyName.
   * The value will be a level based array of th resulting value.  In events where the array is not exactly a length of 10 a conditional path is taken.
   * Currently this only exists for RacialSubType, which given a racialSubType will match up to the spell damage keyword they have an affinity for.
   */
  getMechanicalBonus(propertyName: string): string {
    if (this.mechanicalBonusValues) {
      const valueArray = this.mechanicalBonusValues[propertyName];
      let valueResult: string;
      if (valueArray && valueArray.length === 10) {
        valueResult = valueArray[this.level - 1];
      } else if (valueArray) {
        valueResult = valueArray[RacialSubTypeToDamageTypeConverter[this.racialSubType]];
      }
      return valueResult;
    } else {
      return null;
    }
  }

  private getRecoveryBonus(): number {
    if (this.raceType === RaceType.Burman) {
      return parseInt(this.getMechanicalBonus("Virile Recovery"), 10);
    } else {
      return 0;
    }
  }

}
