import {Spell, SpellEffectType} from "../../spells/spell";
import {AllDefenseType, PhysicalDefenseType} from "../../character/physical-defense/physical-defense-type.enum";
import {SpellKeywords} from "../../spells/spell-keywords.enum";
import {AreaOfEffect} from "../../area-of-effect/area-of-effect";
import {AreaOfEffectTypes} from "../../area-of-effect/area-of-effect-types.enum";
import {ActionType} from "../../action/action-type.enum";
import {DurationType} from "../../duration/duration-type.enum";
import {Dice} from "../../character/dice/dice";
import {LevelRange} from "../../spells/enums/level-range.enum";
import {DiceSize} from "../../character/dice/dice-size.enum";
import {SpellChart} from "../../spells/spell-chart";
import {SpellType} from "../../spells/enums/spell-type.enum";
import {SpellDamageKeyword} from "../../spells/enums/spell-damage-keyword.enum";

export function MagentSpellList(): Spell[] {
  return [
    {
      name: "Acid Fang",
      defenseType: [AllDefenseType.Missile],
      spellType: SpellType.WeaponAttack,
      spellKeywords: [SpellKeywords.Weapon],
      damageKeyword: SpellDamageKeyword.Acid,
      areaOfEffect: {
        numberOfTargets: 1,
        range: 1,
        type: AreaOfEffectTypes.Ranged
      },
      castAction: ActionType.Standard,
      duration: [DurationType.Immediate],
      spellEffectText: [
        {
          type: SpellEffectType.SpellEffect,
          text: "Make a basic attack.  Regardless of your weapon type this attack is resolved as a ranged 1 in 10 attack. \n" +
          "On hit: Deal normal weapon damage and add additional acid damage equal to the level chart below.\n",
          spellChart: [
            {
              ...new SpellChart(),
              rowName: "Damage",
              levelRange: LevelRange.TEN,
              dieSize: DiceSize.None,
              minValue: 2.22,
              maxValue: 6.65
            }
          ]
        }
      ],
      special: ["At the time of picking this spell you can choose for this attack to have an AoE of either Melee 1 in 1 or Weapon Range 1 in Range."],
    }
  ] as Spell[];
}

export function SpellWardenSpellList(): Spell[] {
  return [{...new Spell()}];
}
