import {VisionType} from "../vision-type.enum";
import {AttributeName} from "../../../attribute/attribute-enums/attribute-name.enum";
import {ThemeType} from "../../../theme-points/theme-type.enum";
import {Bonus} from "../../bonus";
import {MagicDefenseType} from "../../magic-defense/magic-defense-type.enum";
import {BonusByLevel} from "../../bonus-by-level";
import {SavingThrow} from "../../saving-throw.enum";
import {Dice} from "../../dice/dice";
import {DiceSize} from "../../dice/dice-size.enum";
import {RaceModel} from "../race-model";

export const STARTING_PLAYER_RACES = {
  Altwani: {
    vision: VisionType.Low,
    startingAttributes: [AttributeName.Agility, AttributeName.Reasoning, AttributeName.Intuition],
    availableLanguagePoints: 3,
    talentBonus: [ThemeType.Stealth],
    passiveBonuses: [
      {
        name: "Catstep",
        value: "Abilities that allow you to shift and tactical move ignore difficult terrain"
      } as Bonus
    ],
    activeBonuses: [
      {
        name: "Perfect Attack",
        value: "Once per encounter you may reroll an attack or spell attack roll."
      }
    ]
  } as RaceModel,
  Burman: {
    vision: VisionType.Star,
    startingAttributes: [AttributeName.Brawn, AttributeName.Reasoning, AttributeName.Vitality],
    availableLanguagePoints: 3,
    magicDefenseBonus: MagicDefenseType.Will,
    passiveBonuses: [
      {
        name: "Virile Recovery",
        value: "Increase your recovery value by $Virile Recovery$"
      },
      {
        name: "Low Center of Mass",
        value: "Any time you are affected with a non-falling attack that results in you being knocked prone you can make a medium saving throw, if the roll is successful you ignore the knockdown effect."
      }
    ],
    activeBonuses: [
      {
        name: "Tough as Nails",
        value: "Once per combat as a minor action you gain $Tough as Nails$ temporary hit points and reduce the damage category of all attacks against you by one until the start of your next turn."
      },
    ],
    mechanicalBonusValues: {
      "Tough as Nails": ["6", "7", "8", "10", "11", "12", "14", "15", "16", "18"],
      "Virile Recovery": ["1", "1", "1", "2", "2", "2", "2", "3", "3", "3"]
    } as BonusByLevel
  } as RaceModel,
  Elder: {
    startingAttributes: [AttributeName.Vitality, AttributeName.SelfDiscipline, AttributeName.Intuition],
    availableLanguagePoints: 4,
    talentBonus: [ThemeType.Combat, ThemeType.Magic],
    passiveBonuses: [
      {
        name: "Steady Gait",
        value: "As part of any movement you can reduce your speed by 1 to ignore difficult terrain for the action"
      }
    ],
    activeBonuses: [
      {
        name: "Resistance of the Ancients",
        value: "As a minor action you can remove all decaying effects on you and reduce your ongoing by $Resistance of the Ancients$"
      },
    ],
    mechanicalBonusValues: {
      "Resistance of the Ancients": ["5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
    } as BonusByLevel
  } as RaceModel,
  Human: {
    startingAttributes: [],
    availableAttributePoints: 6,
    availableLanguagePoints: 3,
    talentBonus: [ThemeType.General],
    powerPointBonus: 1,
    skillPointBonus: 1,
    passiveBonuses: [
      {
        name: "Powerpoint Bonus",
        value: "Start with 1 additional powerpoint"
      }, {
        name: "Skill point Bonus",
        value: "Start with 1 additional skill point"
      },
    ],
    activeBonuses: [
      {
        name: "Oh the Humanity",
        value: "As a minor action you can gain a +4 to hit with all attacks and any critical rolls gain 1 additional die until the end of your turn."
      },
    ]
  } as RaceModel,
  Feydra: {
    startingAttributes: [AttributeName.Agility, AttributeName.SelfDiscipline],
    optionalStartingAttributes: [AttributeName.Presence, AttributeName.Reasoning],
    vision: VisionType.Low,
    availableLanguagePoints: 6,
    magicDefenseBonus: MagicDefenseType.Reflex,
    passiveBonuses: [
      {
        name: "Eldritch Enervation",
        value: "Heal $Eldritch Infusion$ hit points when scoring a critical strike on an attack"
      }
    ],
    activeBonuses: [
      {
        name: "Eldritch Infusion",
        value: "As a minor action you gain advantage to the first roll of an attack or spell cast this turn.  You also increase the damage inflicted to all targets by $Eldritch Infusion$"
      },
    ],
    mechanicalBonusValues: {
      "Eldritch Enervation": ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
      "Eldritch Infusion": ["1 extra damage die.",
        "1 extra damage die.",
        "1 extra damage die.",
        "1 extra damage die.",
        "1 extra damage die.",
        "2 extra damage dice.",
        "2 extra damage dice.",
        "2 extra damage dice.",
        "2 extra damage dice.",
        "2 extra damage dice."
      ]
    } as BonusByLevel
  } as RaceModel,
  HighOrc: {
    startingAttributes: [AttributeName.Brawn, AttributeName.Presence, AttributeName.Quickness],
    vision: VisionType.Low,
    availableLanguagePoints: 3,
    talentBonus: [ThemeType.Combat],
    passiveBonuses: [
      {
        name: "Cut to the Chase",
        value: "You can perform a Standard Action Attack while charging instead of a basic attack."
      }
    ],
    activeBonuses: [
      {
        name: "Blood Rage",
        value: "As a swift action you gain an extra move action, and during this turn any skill check that uses brawn gains advantage"
      }
    ]
  } as RaceModel,
  Primental: {
    startingAttributes: [AttributeName.Brawn, AttributeName.Intuition],
    optionalStartingAttributes: [AttributeName.Reasoning, AttributeName.Presence],
    availableLanguagePoints: 3,
    talentBonus: [ThemeType.Magic],
    passiveBonuses: [
      {
        name: "Elemental Resistance",
        value: "You gain $Elemental Resistance$ resistance to the $racialSubTypePassive$ keyword and $Other Elemental Resistance$ to all other magic damage keywords"
      }, {
        name: "Elemental Type",
        value: ""
      }
    ],
    activeBonuses: [
      {
        name: "Elemental Release",
        value: "As a $racialSubTypeActive$."
      }
    ],
    mechanicalBonusValues: {
      "Elemental Resistance": ["3", "4", "5", "5", "6", "7", "7", "8", "9", "9"],
      "Other Elemental Resistance": ["2", "2", "3", "3", "4", "4", "5", "5", "6", "6"],
      racialSubTypePassive: [
        "Force",
        "Lightning",
        "Heat",
        "Cold",
      ],
      racialSubTypeActive: [
        "minor action strike the ground with tremendous force.  All adjacent enemies must make a hard saving throw (" + SavingThrow.Hard + ") throw or be knocked prone",
        "when you are hit with a melee attack by an enemy you can have the attacking enemy take $Lightning$ lightning damage as a free action",
        "minor action any successful attacks gain the heat keyword and do an additional $Heat$ heat damage (roll once)",
        "swift action you ignore all difficult terrain and your movement does not provoke opportunity attacks until the end of your turn"
      ],
      Lightning: ["17", "21", "25", "29", "33", "37", "41", "45", "49", "53"],
      Heat: [
        new Dice(1, DiceSize.d8, 3).printRoll(),
        new Dice(1, DiceSize.d8, 4).printRoll(),
        new Dice(1, DiceSize.d8, 6).printRoll(),
        new Dice(1, DiceSize.d10, 7).printRoll(),
        new Dice(1, DiceSize.d10, 9).printRoll(),
        new Dice(1, DiceSize.d10, 10).printRoll(),
        new Dice(1, DiceSize.d10, 12).printRoll(),
        new Dice(1, DiceSize.d12, 13).printRoll(),
        new Dice(1, DiceSize.d12, 15).printRoll(),
        new Dice(1, DiceSize.d12, 16).printRoll(),

      ]
    } as BonusByLevel
  } as RaceModel,
  Halfling: {
    startingAttributes: [AttributeName.Agility, AttributeName.Presence, AttributeName.Quickness],
    vision: VisionType.Low,
    availableLanguagePoints: 5,
    magicDefenseBonus: MagicDefenseType.Fortitude,
    passiveBonuses: [
      {
        name: "No Small Skill",
        value: "Increase the game your agility applies to weapons by $No Small Skill$.  Increase the damage your presence applies to magic attacks by $No Small Skill$"
      } as Bonus, {
        name: "Sheer Luck",
        value: "Gain a +1 bonus to your saving throw rolls"
      } as Bonus
    ],
    activeBonuses: [
      {
        name: "Tiny Target",
        value: "As a free action reduce the damage of an attack that targets AD or Reflex by $Tiny Target$"
      }
    ],
    racialRestriction: "Can't use two handed melee weapons",
    mechanicalBonusValues: {
      "No Small Skill": ["1", "1", "1", "1", "1", "2", "2", "2", "2", "2"],
      "Tiny Target": ["11", "14", "16", "19", "21", "24", "26", "29", "31", "34"]
    } as BonusByLevel
  } as RaceModel

};
