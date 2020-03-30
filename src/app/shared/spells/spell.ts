import {Dice} from "../character/dice/dice";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";
import {AllDefenseType, PhysicalDefenseType} from "../character/physical-defense/physical-defense-type.enum";

import {SpellKeywords} from "./spell-keywords.enum";
import {AreaOfEffect} from "../area-of-effect/area-of-effect";
import {ActionType} from "../action/action-type.enum";
import {DurationType} from "../duration/duration-type.enum";
import {Minion} from "../minion/minion";
import {SpellDamageKeyword} from "./enums/spell-damage-keyword.enum";
import {SpellType} from "./enums/spell-type.enum";
import {SpellChart} from "./spell-chart";
import {CasterType} from "../theme-points/subthemes/subtheme-types.enum";

export enum SpellEffectType {
  OnHit = "OnHit",
  OnMiss = "OnMiss",
  Bounce = "Bounce",
  SpellEffect = "SpellEffect",
  AfterEffect = "AfterEffect"
}

export interface SpellEffect {
  type?: SpellEffectType;
  text?: string;
  spellChart?: SpellChart[];
}


export class Spell {
  name: string;
  sphereName: CasterType;
  defenseType?: AllDefenseType[];
  spellType?: SpellType;
  spellKeywords?: SpellKeywords[];
  damageKeyword?: SpellDamageKeyword;
  areaOfEffect?: AreaOfEffect;
  castAction?: ActionType;
  duration?: DurationType[];
  critRoll?: Dice;
  special?: string[];
  minion?: Minion;
  spellEffectText?: SpellEffect[]; // TODO move spell chart array into the spell effect interface
}
