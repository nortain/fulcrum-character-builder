import {AttributeName} from "../../attribute/attribute-enums/attribute-name.enum";
import {ThemeType} from "../../theme-points/theme-type.enum";
import {MagicDefenseType} from "../magic-defense/magic-defense-type.enum";
import {RaceType} from "./race-type.enum";
import {VisionType} from "./vision-type.enum";
import {RacialSubType, RacialSubTypeToDamageTypeConverter} from "./racial-sub-type.enum";
import {Level} from "../level.enum";
import {NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS} from "../../constants/constants";
import {BonusByLevel} from "../bonus-by-level";
import {Bonus} from "../bonus";
import {STARTING_PLAYER_RACES} from "./race-constants/race-constants";
import {Injectable} from "@angular/core";
import {RaceModel} from "./race-model";

@Injectable({
  providedIn: 'root'
})
export class Race {

  constructor(public raceType: RaceType, public level?: Level, public racialSubType?: RacialSubType) {
    if (!level) {
      this.level = Level.One;
    }
    this.initializeData(raceType, this.level, racialSubType);
  }

  getNewRace(raceType: RaceType, level: Level, racialSubType?: RacialSubType): RaceModel {
    const model: RaceModel = {
      ...new RaceModel(),
      mechanicalBonusValues: STARTING_PLAYER_RACES[raceType].mechanicalBonusValues,
      vision: STARTING_PLAYER_RACES[raceType].vision ? STARTING_PLAYER_RACES[raceType].vision : VisionType.Normal,
      racialSubType: racialSubType ? racialSubType : null,
      magicDefenseBonus: STARTING_PLAYER_RACES[raceType].magicDefenseBonus !== undefined ? STARTING_PLAYER_RACES[raceType].magicDefenseBonus : null,
      availableAttributePoints: STARTING_PLAYER_RACES[raceType].availableAttributePoints ? STARTING_PLAYER_RACES[raceType].availableAttributePoints : NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS;
    };
    return model;
  }


  initializeData(raceType: RaceType, level: Level, racialSubType?: RacialSubType) {


    this.availableAttributePoints =
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
