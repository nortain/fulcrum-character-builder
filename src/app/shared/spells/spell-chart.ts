import {LevelRange} from "./enums/level-range.enum";
import {SpellDamageKeyword} from "./enums/spell-damage-keyword.enum";
import {DiceSize} from "../character/dice/dice-size.enum";

export class SpellChart {
  rowName: string;
  levelRange: LevelRange;
  minValue: number;
  maxValue: number;
  dieSize: DiceSize;
  damageKeyword: SpellDamageKeyword;
}
