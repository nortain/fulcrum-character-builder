import {VisionType} from "./vision-type.enum";
import {MagicDefenseType} from "../magic-defense/magic-defense-type.enum";
import {Bonus} from "../bonus";
import {ThemeType} from "../../theme-points/theme-type.enum";
import {AttributeName} from "../../attribute/attribute-enums/attribute-name.enum";
import {BonusByLevel} from "../bonus-by-level";
import {RacialSubType} from "./racial-sub-type.enum";
import {RaceType} from "./race-type.enum";
import {Level} from "../level.enum";

export class RaceModel {
  raceType: RaceType;
  level: Level;
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
  racialSubType: RacialSubType;
}
