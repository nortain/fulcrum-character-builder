import {Spell, SpellEffectType} from "../../spells/spell";
import {SpellName} from "../../spells/enums/spell-name.enum";
import {CasterType} from "../../theme-points/subthemes/subtheme-types.enum";
import {SpellType} from "../../spells/enums/spell-type.enum";
import {SpellKeywords} from "../../spells/spell-keywords.enum";
import {AreaOfEffectTypes} from "../../area-of-effect/area-of-effect-types.enum";
import {ActionType} from "../../action/action-type.enum";
import {DurationType} from "../../duration/duration-type.enum";
import {SpellChart} from "../../spells/spell-chart";
import {LevelRange} from "../../spells/enums/level-range.enum";
import {DiceSize} from "../../character/dice/dice-size.enum";
import {SpellDamageKeyword} from "../../spells/enums/spell-damage-keyword.enum";
import {AllDefenseType} from "../../character/physical-defense/physical-defense-type.enum";
import {Dice} from "../../character/dice/dice";

export type SpellConstants = { [K in SpellName]: Spell };

export function getSpellObject(): SpellConstants {
  return {
    // START SHAMAN
    HealingWinds: {
      name: SpellName.HealingWinds,
      sphereName: CasterType.Shaman,
      spellType: SpellType.FriendlyUtility,
      spellKeywords: [SpellKeywords.Regeneration, SpellKeywords.FriendlyMovement],
      areaOfEffect: {
        numberOfTargets: 1,
        range: 10,
        type: AreaOfEffectTypes.Ranged
      },
      castAction: ActionType.Deliberate,
      duration: [DurationType.Immediate],
      spellEffectText: [
        {
          type: SpellEffectType.SpellEffect,
          text: "You can grant regeneration equal to the regeneration table below to a friendly target or yourself.  " +
            "You can then slide that target a number of squares equal to the slide distance.  As a swift action make an implement attack.",
          spellChart:
            [
              {
                ...new SpellChart(),
                rowName: "Regeneration",
                levelRange: LevelRange.FIFTHTEEN,
                dieSize: DiceSize.None,
                minValue: 4,
                maxValue: 18
              },
              {
                ...new SpellChart(),
                rowName: "Slide",
                levelRange: LevelRange.FIFTHTEEN,
                dieSize: DiceSize.None,
                minValue: 1,
                maxValue: 4
              }
            ]
        }
      ]
    },
    Reawaken: {
      name: SpellName.Reawaken,
      sphereName: CasterType.Shaman,
      spellType: SpellType.FriendlyUtility,
      damageKeyword: SpellDamageKeyword.Wild,
      spellKeywords: [SpellKeywords.Fortify],
      areaOfEffect: {
        numberOfTargets: 1,
        range: 10,
        type: AreaOfEffectTypes.Ranged
      },
      castAction: ActionType.Deliberate,
      duration: [DurationType.Immediate],
      spellEffectText: [
        {
          type: SpellEffectType.SpellEffect,
          text: "A friendly creature within range gains temporary hit points equal to the temporary hit point value.  As a swift action, you can also make a ranged 1 in 10 attack.",
          spellChart:
            [
              {
                ...new SpellChart(),
                rowName: "Temp Hp",
                levelRange: LevelRange.FIFTHTEEN,
                dieSize: DiceSize.None,
                minValue: 5,
                maxValue: 20
              },
              {
                ...new SpellChart(),
                rowName: "Attack",
                levelRange: LevelRange.FIFTHTEEN,
                dieSize: DiceSize.d8,
                minValue: 6.3,
                maxValue: 25.31
              }
            ]
        }
      ]
    },

    // START DRUID
    FierceDevotion: {
      name: SpellName.FierceDevotion,
      sphereName: CasterType.Cleric,
      defenseType: [AllDefenseType.Missile],
      spellType: SpellType.DirectEffect,
      spellKeywords: [SpellKeywords.Concentration],
      damageKeyword: SpellDamageKeyword.Wild,
      areaOfEffect: {
        numberOfTargets: 1,
        range: 1,
        type: AreaOfEffectTypes.Ranged
      },
      castAction: ActionType.Standard,
      critRoll: new Dice(1, DiceSize.d10, 2),
      duration: [DurationType.Immediate, DurationType.Concentration],
      spellEffectText: [{
        type: SpellEffectType.OnHit,
        text: "Target takes wild damage equal to the attack table below + magical attack bonus.  The target also gains the devotion effect that lasts so long as you maintain concentration.  At the start of your next turn after you cast this spell you must spend your move action to maintain concentration or this spell’s effect is removed.  You may only have 1 concentration effect active at a time.",
        spellChart: [{
          ...new SpellChart(),
          rowName: SpellDamageKeyword.Wild,
          levelRange: LevelRange.FIFTHTEEN,
          dieSize: DiceSize.d8,
          minValue: 13.33,
          maxValue: 53.74
        },
          {
            ...new SpellChart(),
            rowName: SpellKeywords.Concentration,
            levelRange: LevelRange.FIFTHTEEN,
            dieSize: DiceSize.None,
            minValue: 10.38,
            maxValue: 34.81
          }]
      }, {
        type: SpellEffectType.AfterEffect,
        text: "Each time you pay the concentration cost of this spell the target with the devotion effect takes wild damage equal to the concentration table’s damage value below + global damage bonus",
      }],
    },

    // START Magent
    AcidFang: {
      name: SpellName.AcidFang,
      sphereName: CasterType.Magent,
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
  };
}
