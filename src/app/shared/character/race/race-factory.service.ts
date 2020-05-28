import {RaceType} from "./race-type.enum";
import {VisionType} from "./vision-type.enum";
import {RacialSubType, RacialSubTypeToDamageTypeConverter} from "./racial-sub-type.enum";
import {Level} from "../level.enum";
import {NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS} from "../../constants/constants";
import {STARTING_PLAYER_RACES} from "./race-constants/race-constants";
import {Injectable} from "@angular/core";
import {RaceModel} from "./race-model";
import {DiceService} from "../dice/dice.service";
import {ValueRange} from "../../attribute/attribute-constants/attribute-constants";
import {DiceSize} from "../dice/dice-size.enum";
import {LevelRange} from "../../spells/enums/level-range.enum";

@Injectable({
  providedIn: 'root'
})
export class RaceFactoryService {

  constructor() {
  }

  getNewRace(raceType: RaceType, level: Level, racialSubType?: RacialSubType): RaceModel {
    const model: RaceModel = {
      ...new RaceModel(),
      raceType: raceType,
      level: level,
      mechanicalBonusValues: STARTING_PLAYER_RACES[raceType].mechanicalBonusValues,
      vision: STARTING_PLAYER_RACES[raceType].vision ? STARTING_PLAYER_RACES[raceType].vision : VisionType.Normal,
      racialSubType: racialSubType ? racialSubType : null,
      magicDefenseBonus: STARTING_PLAYER_RACES[raceType].magicDefenseBonus !== undefined ? STARTING_PLAYER_RACES[raceType].magicDefenseBonus : null,
      availableAttributePoints: STARTING_PLAYER_RACES[raceType].availableAttributePoints ? STARTING_PLAYER_RACES[raceType].availableAttributePoints : NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS,
      availableLanguagePoints: STARTING_PLAYER_RACES[raceType].availableLanguagePoints,
      passiveBonuses: STARTING_PLAYER_RACES[raceType].passiveBonuses,
      activeBonuses: STARTING_PLAYER_RACES[raceType].activeBonuses,
      talentBonus: STARTING_PLAYER_RACES[raceType].talentBonus,
      startingAttributes: STARTING_PLAYER_RACES[raceType].startingAttributes,
      powerPointBonus: STARTING_PLAYER_RACES[raceType].powerPointBonus ? STARTING_PLAYER_RACES[raceType].powerPointBonus : 0,
      skillPointBonus: STARTING_PLAYER_RACES[raceType].skillPointBonus ? STARTING_PLAYER_RACES[raceType].skillPointBonus : 0,
      racialRestriction: STARTING_PLAYER_RACES[raceType].racialRestriction ? STARTING_PLAYER_RACES[raceType].racialRestriction : ""
    };
    model.recoveryBonus = this.getRecoveryBonus(model);
    return model;
  }

  formatText(race: RaceModel, text: string): string {
    let result = "";
    if (!text) {
      return "";
    }
    const chunk = text.split("$");
    if (chunk.length > 1) {
      for (let i = 1; i <= chunk.length; i += 2) {
        if (chunk[i - 1]) {
          result = result.concat(chunk[i - 1]);
          const valueText = this.formatText(race, <string> this.getMechanicalBonus(race, chunk[i]));
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
  getMechanicalBonus(race: RaceModel, propertyName: string): string {
    if (race.mechanicalBonusValues) {
      const valueArray = race.mechanicalBonusValues[propertyName];
      let valueResult: string;
      if (valueArray && valueArray.length === 10) {
        valueResult = valueArray[race.level - 1];
      } else if (valueArray) {
        valueResult = valueArray[RacialSubTypeToDamageTypeConverter[race.racialSubType]];
      }
      return valueResult;
    } else {
      return null;
    }
  }

  private getRecoveryBonus(race: RaceModel): number {
    if (race.raceType === RaceType.Burman) {
      return parseInt(this.getMechanicalBonus(race, "Virile Recovery"), 10);
    } else {
      return 0;
    }
  }

}
