import {MaxMovement} from "../armor/max-movement";
import {WeaponType} from "../weapon/weapon-type";
import {Dice} from "../character/dice/dice";
import {DiceSize} from "../character/dice/dice-size.enum";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";
import {Field} from "../field/field";
import {MagicDefense} from "../character/magic-defense/magic-defense";
import {Race} from "../character/race/race";
import {VisionType} from "../character/race/vision-type.enum";
import {AttributeName} from "../attribute/attribute-name.enum";
import {ThemeType} from "../theme-points/theme-type.enum";
import {SavingThrow} from "../character/saving-throw.enum";
import {BonusByLevel, NumberBonusByLevel} from "../character/bonus-by-level";
import {Bonus} from "../character/bonus";
import {MagentSpellList, SpellWardenSpellList} from "./spells/minor-spell-constants";
import {Spell} from "../spells/spell";
import {AssassinSpellList, ClericSpellList, DruidSpellList, WarriorMageSpellList} from "./spells/lesser-spell-constants";
import {AttributeModel} from "../attribute/attribute-model";
import {AttributeType} from "../attribute/attribute-type.enum";


export const NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS = 4;

export const STARTING_MOVEMENT = 6;
export const STARTING_INITIATIVE = 0;
export const STARTING_HIT_POINTS = 3;
export const STARTING_RECOVERIES = 6;
export const STARTING_THEME_POINTS = 4;

// Armor constants based off of the ArmorType Enum
export const ACTIVE_DEFENSE = [11, 13, 13, 13, 14];
export const PASSIVE_DEFENSE = [10, 11, 11, 12, 13];
export const CRITICAL_REDUCTION = [0, 0, 1, 2, 3];
export const CASTER_PENALTY = [3, 3, 2, 1, 0];
export const MAX_MOVEMENT: Array<MaxMovement> =
  [
    new MaxMovement(10, 0),
    new MaxMovement(10, 0),
    new MaxMovement(8, 0),
    new MaxMovement(7, 0),
    new MaxMovement(6, -1)
  ];
export const SKILL_PENALTY = [0, 0, 0, 1, 2];
export const REQUIRES_TRAINING = [false, false, false, false, true];
export const REQUIRES_THREE_MAGIC = [false, true, false, false, false];

export const STEALTH_INIT_BONUS = [0, 2, 4, 6];


export const ONE_MAGIC_SPELLS = {
  Magent: {
    Overview: "You are a bad ass magent",
    FeatureBonus: {
      name: "Attack Spell Damage Bonus",
      values: ["You can have your attack spells use either your strength, agility or both as a balanced stat for determining your bonus damage",
        "You can pick 3 spells.  This value increases by 1 at levels 2 and 6"]
    },
    GeneralFeature: {
      name: "If you have 1 theme point in general you gain ",
      values: [{
        name: "General Spell Bonus",
        values: [
          "1 spell knack",
          " 1 additional spell"]
      }]
    },
    ImplementKnacks: {
      RangedDefender: "You can use your AD vs range, area, and line attacks.",
      Carpetbagger: "When you attack with a weapon or imbue spell and could gain bonus damage from the Find Weakness or the Riposte sub themes you can increase the damage of the attack to that target by the Carpetbagger value.",
      ElegantRetaliation: "Once per encounter as a free action when you are damaged by an threatened attacker you can reduce the damage taken by the Elegant Retaliation value below and return that much damage to the enemy.",
      Reprobate: "Once per round, whenever an enemy misses you with an attack, choose to have your next weapon or spell attack you make to have its damage increased by the value listed below against the first target hit."
    },
    ImplementKnacksData: {
      Carpetbagger: [4, 4, 5, 6, 7, 7, 8, 9, 10, 11],
      ElegantRetaliation: [4, 4, 5, 6, 7, 7, 8, 9, 10, 11],
      Reprobate: [4, 4, 5, 6, 7, 7, 8, 9, 10, 11]
    } as NumberBonusByLevel,
    AdrenalinePowers: null,
    PowerPointAbilities: null,
    SpecialPowers: null,
    ImplementAttack: null,
    Spells: MagentSpellList()
  } as SpellSphere,
  SpellWarden: {
    Overview: "Spell Wardens were an ancient sect of Warriors who long ago discovered they could enhance their martial skills with the powers now known today as the essence of magic.  Although the order has all but been forgotten there are a rare few who have learned the secrets of Spell Warden and have passed those secrets down to others through the generations.  Although their magical capabilities aren’t nearly as strong as that of spell casters their sheer physical fortitude required to master this training style makes them a deadly foe on any battlefield.",
    FeatureBonus: {
      name: "Attack Spell Damage Bonus",
      values: ["You can have your attack spells use either your strength, agility or both as a balanced stat for determining your bonus damage",
        "You can pick 3 spells.  This value increases by 1 at levels 2 and 6"]
    },
    GeneralFeature: {
      name: "If you have 1 theme point in general you gain: ",
      values: [{
        name: "General Spell Bonus",
        values: [
          "1 spell knack",
          " 1 additional spell"]
      }]
    },
    ImplementKnacks: {
      RangedDefender: "You can use your AD vs range, area, and line attacks.",
      ImprovedWeaponSpells: "Increase the damage of your weapon and imbue spells by the amount listed below",
      SpellAbsorption: "The first time in a combat when you are damaged by an attack that targets your magic defense or hit by a critical strike, after the attack resolves, you gain temporary hit points equal to the temp hp value below.  These temporary hit points stack with any temporary hit points you might already have.",
      ShieldOfTheWarden: "If you have a protector’s aura or mark-like ability you can increase the damage inflicted with the mark or ability by the Mark bonus listed below."
    },
    ImplementKnacksData: {
      ImprovedWeaponSpells: [4, 4, 5, 6, 7, 7, 8, 9, 10, 11],
      SpellAbsorption: [4, 4, 5, 6, 7, 7, 8, 9, 10, 11],
      ShieldOfTheWarden: [4, 4, 5, 6, 7, 7, 8, 9, 10, 11]
    } as NumberBonusByLevel,
    AdrenalinePowers: null,
    PowerPointAbilities: null,
    SpecialPowers: null,
    ImplementAttack: null,
    Spells: SpellWardenSpellList()
  } as SpellSphere


};

export const TWO_MAGIC_SPELLS = {
  WarriorMage: {
    Overview: "As a part of selecting the warrior mage sphere you can choose one of the following trainings.  Each training comes with passive bonuses, unique sphere specific ability and dictates the effects of your adrenaline points.",
    FeatureBonus: {
      name: "If you have no ranks in general you gain the benefits from your training as a balanced warrior",
      values: [
        {
          name: "Training of the Balanced Warrior",
          values: [
            "You gain the Warrior’s Sigil Ability and 1 Sigil power",
            "You can select 4 spells from the Warrior Archmage Sphere",
            "Gain +1 damage to weapon and imbue spells. Increase by 1 at levels 5 and 9",
            "Gain the Fury ability",
            "Increase the damage done by your spells by 1 per stat point in Brawn and Agility."
          ]
        }
      ]

    },
    GeneralFeature: {
      name: "If you have 1 theme point in general you can choose between the following Trainings",
      values: [
        {
          name: "Training of the Provoking Psychic",
          values: [
            "The Phantom Blade implement attack and 1 implement knack",
            "The Warrior’s Sigil Ability and 1 Sigil power",
            "Visions of the Mind Power",
            "5 spells from the Warrior Archmage Sphere",
            "Force of Control Ability",
            "Magic attack bonus increased by your Reasoning bonus"
          ]
        },
        {
          name: "Training of the Ravaging Magi",
          values: [
            "The Phantom Blade implement attack and 1 implement knack",
            "The Warrior’s Sigil Ability and 1 Sigil power",
            "Ravaging Assault Power",
            "5 spells from the Warrior Archmage Sphere",
            "Force of the Aggression Ability",
            "Magic attack bonus increased by your Reasoning bonus"
          ]
        }
      ]
    },
    ImplementKnacks: {
      RangedDefender: "You can use your AD vs range, area, and line attacks.",
      PhantomChain: "Phantom Blades gains the forced movement keyword and if you hit a target with phantom blades that has your sigil on them you can slide them one square.  You can also increase the damage of phantom blades by the amount listed below.",
      EmpoweredOvercast: " When overcasting an attack spell you can increase the damage of the spell to the first target hit by the amount listed below.",
      GiftedMagi: "When your sigil is on an enemy, spells with the forced movement keyword have their distances increased by 1.  When your sigil is on an ally they can decrease the distance of forced movement effects against them by 1.  You can also increase the damage of all of your attack spells and implement attacks to the first target hit by the amount listed below.",
      EmpoweredSigil: "If your sigil is on an enemy you can increase the damage of the your Revenge or Rebuke by the amount listed below under Empowered Sigil.  If your sigil is on an ally you can increase the amount of damage reduced by your Force field power by the amount listed under force field."
    },
    ImplementKnacksData: {
      PhantomChain: [3, 3, 4, 4, 5, 5, 6, 6, 7, 8],
      EmpoweredOvercast: [6, 7, 8, 9, 10, 12, 13, 14, 15, 17],
      GiftedMagi: [2, 2, 2, 3, 3, 3, 4, 4, 4, 5],
      ForceField: [3, 3, 4, 5, 5, 6, 7, 7, 8, 9],
      Rebuke: [6, 7, 8, 9, 10, 12, 13, 14, 15, 17],
      Revenge: [6, 7, 8, 9, 10, 12, 13, 14, 15, 17]
    } as NumberBonusByLevel,
    AdrenalinePowers: [],
    PowerPointAbilities: [],
    SpecialPowers: null,
    ImplementAttack: new Spell(),
    Spells: WarriorMageSpellList()
  } as SpellSphere,
  Assassin: {
    Overview: "As a part of selecting the assassin sphere you can you choose one of the following paths.  Each path comes with passive bonuses, a unique sphere specific ability and dictates the effects of your adrenaline points.",
    FeatureBonus: {
      name: "Path of the Cutthroat",
      values: [
        "You gain the Veil of Shadows Ability",
        "You can select 4 spells from the Assassin Sphere",
        "Gain +1 damage to weapon spells. Increase this bonus 1 at levels 5 and 9",
        " Gain +1 damage to your Veil of Shadows effect at levels 2, and 6",
        "Gain the Fury ability",
        "Increase the attack damage done by your spells by 1 per stat point in Brawn and Agility"

      ]
    },
    GeneralFeature: {
      name: "If you have 1 theme point in general you can choose between the following Trainings",
      values: [
        {
          name: "Path of the Shadow",
          values: [
            "You gain the Shadow Stab Implement Attack and 1 implement knack",
            "You gain the Veil of Shadows Ability",
            "You can select 5 spells from the Assassin Sphere",
            "You gain the Swallowed by Shadows Ability",
            "You gain the Empowered Veil Ability",
            "Increase your magic attack bonus by your Presence bonus"
          ]
        },
        {
          name: "Path of Chilling Vengeance",
          values: [
            "You gain the Shadow Stab Implement Attack and 1 implement knack",
            "You gain the Veil of Shadows Ability",
            "You can select 5 spells from the Assassin Sphere",
            "You gain the Eternal Frost Ability",
            "You gain the Payback Ability",
            "Increase your magic attack bonus by your Presence bonus"
          ]
        }
      ]
    },
    ImplementKnacks: {
      RangedDefender: "You can use your AD vs range, area, and line attacks.",
      EmpoweredImplement: "You can increase the distance you can teleport using Shadow Stab by 1 square and you can increase the damage of your implement attack by 1.  This damage bonus increases by 1 at levels 4 and 8.",
      LethalShadows: "Increase the additional damage bonus provided by your Veil of Shadows by the damage bonus listed below.",
      VeiledImplement: "Increase the damage of your implement by the amount listed for the Veiled Implement value.",
      AssassinsContract: "Once per combat when you or ongoing damage kills a creature with your veil of shadows on it you can place ongoing damage onto the next target of your VoS when you cast it.  This bonus is unaffected by the talents, items or abilities that might increase ongoing damage."
    },
    ImplementKnacksData: {
      LethalShadows: [3, 3, 4, 4, 5, 5, 6, 6, 7, 8],
      VeiledImplement: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      AssassinsContract: [7, 8, 9, 11, 12, 14, 15, 17, 18, 20]
    } as NumberBonusByLevel,
    AdrenalinePowers: [],
    PowerPointAbilities: [],
    SpecialPowers: null,
    ImplementAttack: new Spell(),
    Spells: AssassinSpellList()
  } as SpellSphere,
  Cleric: {
    Overview: "As a part of selecting the Cleric sphere you can choose one of the following ways.  Each way comes with passive bonuses, a unique sphere specific ability and dictates the effects of your adrenaline points.",
    FeatureBonus: {
      name: "All cleric uses a resource called blessings. If you have no theme points in general you also gain the benefits of the Order of the Chosen",
      values: [
        {
          name: "Blessings",
          values: [
            "Depending on your order you start each combat with a certain number of blessings.  When you invoke the blessings of your order you spend all of the blessings you have.  The result of what your blessing does is dependant on the order you choose.  If you have 1 theme point in general you also gain 1 blessing when you hit an enemy with an attack, cast a utility spell or successfully spend a move action to maintain a concentration spell.  A cleric may not gain more than 1 blessing per round in this manner, however other powers or abilities may allow a cleric to gain additional blessings beyond this limit."
          ]
        },
        {
          name: "Order of the Chosen",
          values: [
            "You gain the Blessings Feature of either the Order of the Stalwart or Order of the Holy, you start each combat with 5 blessings",
            "You can select 4 spells from the Cleric Sphere",
            "Gain +1 damage to weapon spells. This bonus increases by 1 at levels 5 and 9",
            "Gain the Fury Ability",
            "Increase the damage done by your spells by 1 per stat point in Brawn and Agility."
          ]
        }
      ]
    },
    GeneralFeature: {
      name: "If you have 1 theme point in general you can choose between the following Orders",
      values: [
        {
          name: "Order of the Stalwart",
          values: [
            "Gain Order’s Implement as an implement attack and 1 Cleric knack",
            "Use your Presence stat to increase your magical attack bonus",
            "You can select 5 spells from the Cleric Sphere",
            "You gain the Blessings Feature for Order of the Stalwart and start combat with 5 blessings.",
            "Gain the Repentance Adrenaline Power",
            "Gain the Inner Resolve Power Point ability"
          ]
        },
        {
          name: "Order of the Holy",
          values: [
            "Gain Order’s Implement as an implement attack and 1 Cleric knack",
            "Use your Presence stat to increase your magical attack bonus",
            "You can select 5 spells from the Cleric Sphere",
            "You gain the Blessings Feature for Order of the Stalwart and start combat with 4 blessings.",
            "Gain the Divine Aid Adrenaline Power",
            "Gain the Favor Power Point Ability"
          ]
        }
      ]
    },
    ImplementKnacks: {
      RangedDefender: "You can use your AD vs range, area, and line attacks.",
      GracefulBonus: "Once per encounter as a swift action you can a cast the blessing of your order as if you had exactly 2 blessings.  This blessing doesn’t affect any current blessings you might already have.",
      ProtectionBonus: "Once per combat as a free action you can immediately reduce the damage of an attack against yourself or a friendly ally within 10 by the protection bonus listed below",
      Reverence: "Once per combat as a minor action you can cause all targets hit by the next attack you make this turn to get knocked prone and take additional damage equal to the Reverence bonus below.",
      ConcentratedFortune: "Increase the damage you deal when paying a spell’s concentration cost by the amount listed below."
    },
    ImplementKnacksData: {
      ProtectionBonus: [6, 7, 8, 10, 11, 12, 14, 15, 16, 18],
      Reverence: [4, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      ConcentratedFortune: [4, 4, 5, 6, 7, 7, 8, 9, 10, 11],
    } as NumberBonusByLevel,
    AdrenalinePowers: [],
    PowerPointAbilities: [],
    SpecialPowers: null,
    ImplementAttack: new Spell(),
    Spells: ClericSpellList()
  } as SpellSphere,
  Druid: {
    Overview: "As a part of selecting the warrior mage sphere you can choose one of the following trainings.  Each training comes with passive bonuses, unique sphere specific ability and dictates the effects of your adrenaline points.",
    FeatureBonus: {
      name: "Training of the Balanced Warrior",
      values: [
        "You gain the Warrior’s Sigil Ability and 1 Sigil power",
        "You can select 4 spells from the Warrior Archmage Sphere",
        "Gain +1 damage to weapon and imbue spells. Increase by 1 at levels 5 and 9",
        "Gain the Fury ability",
        "Increase the damage done by your spells by 1 per stat point in Brawn and Agility."
      ]
    },
    GeneralFeature: {
      name: "If you have 1 theme point in general you can choose between the following Trainings",
      values: [
        {
          name: "Training of the Provoking Psychic",
          values: [
            "The Phantom Blade implement attack and 1 implement knack",
            "The Warrior’s Sigil Ability and 1 Sigil power",
            "Visions of the Mind Power",
            "5 spells from the Warrior Archmage Sphere",
            "Force of Control Ability",
            "Magic attack bonus increased by your Reasoning bonus"
          ]
        },
        {
          name: "Training of the Ravaging Magi",
          values: [
            "The Phantom Blade implement attack and 1 implement knack",
            "The Warrior’s Sigil Ability and 1 Sigil power",
            "Ravaging Assault Power",
            "5 spells from the Warrior Archmage Sphere",
            "Force of the Aggression Ability",
            "Magic attack bonus increased by your Reasoning bonus"
          ]
        }
      ]
    },
    ImplementKnacks: {
      RangedDefender: "You can use your AD vs range, area, and line attacks.",
      PhantomChain: "Phantom Blades gains the forced movement keyword and if you hit a target with phantom blades that has your sigil on them you can slide them one square.  You can also increase the damage of phantom blades by the amount listed below.",
      EmpoweredOvercast: "When overcasting an attack spell you can increase the damage of the spell to the first target hit by the amount listed below.",
      GiftedMagi: "Once per round, whenever an enemy misses you with an attack, choose to have your next weapon or spell attack you make to have its damage increased by the value listed below against the first target hit.",
      EmpoweredSigil: "Once per round, whenever an enemy misses you with an attack, choose to have your next weapon or spell attack you make to have its damage increased by the value listed below against the first target hit."
    },
    ImplementKnacksData: {
      PhantomChain: [3],
      EmpoweredOvercast: [3],
      GiftedMagi: [3],
      ForceField: [3],
      Rebuke: [3],
      Revenge: [3]
    } as NumberBonusByLevel,
    AdrenalinePowers: [],
    PowerPointAbilities: [],
    SpecialPowers: null,
    ImplementAttack: new Spell(),
    Spells: DruidSpellList()
  } as SpellSphere,
};

export const SUBTHEME_BONUS = {
  WeaponSpecialization: {
    "1": {BonusDamage: [2, 3, 3, 4, 4, 5, 5, 6, 6, 7]},
    "2": {BonusDamage: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]},
    "3": {BonusDamage: [7, 9, 10, 12, 13, 14, 16, 17, 19, 21]},
    text: ["<b>Weapon Specialization:</b> Increase the damage of all weapon and unarmed attacks by your weapon specialization bonus"]
  },
  Protector: {
    "1": {
      Thorns: [2, 2, 3, 3, 4, 4, 5, 5, 6, 7],
      ProtectorAura: [8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
      RecoveryValueBonus: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3]
    },
    "2": {
      Thorns: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      ProtectorAura: [16, 20, 24, 28, 32, 36, 40, 44, 48, 52],
      RecoveryValueBonus: [2, 2, 3, 3, 4, 4, 5, 5, 6, 6]
    },
    text: [
      "<b>Thorns:</b> When you are hit by an enemy you threaten they take physical damage equal to your Thorns.",
      "<b>Protector Aura:</b> When an enemy threatened by you hits an ally you deal physical damage to them equal to your Protector Aura.",
      "<b>Recovery Value Bonus:</b> Increase your Out of Combat recovery value by the Recovery Value Bonus"
    ]
  },
  Juggernaut: {
    "1": {
      TempHp: [3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 9],
      DamageResist: [1, 1, 1, 2, 2, 2, 2, 3, 3, 3]
    },
    text: ["<b>Temporary Hp:</b> Increase your starting temporary hit points by the Temp Hp value",
      "<b>Damage Resist:</b> Reduce all non-ongoing damage taken by the damage resist value."]
  },
  FindWeakness: {
    "1": {
      Agile: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      Balanced: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    },
    "2": {
      Agile: [9, 11, 13, 15, 17, 19, 21, 23, 25, 27],
      Balanced: [7, 9, 10, 12, 13, 15, 16, 18, 19, 21]
    },
    "3": {
      Agile: [13, 16, 19, 22, 25, 28, 31, 34, 37, 40],
      Balanced: [7, 9, 10, 12, 13, 15, 16, 18, 19, 21]
    },
    text: ["Once per round as a free action you can deal increased damage with a <b>Balanced</b> or <b>Agile</b> to an enemy granting you combat superiority by your Find Weakness damage. This damage bonus is dependent on the weapon category you are using to make the attack. Heavy and Simple weapons cannot benefit from Find Weakness."]
  },
  Riposte: {
    "1": {
      IsolationDamage: [2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
      RiposteAura: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    },
    "2": {
      IsolationDamage: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      RiposteAura: [8, 10, 12, 14, 16, 18, 20, 22, 24, 26]
    },
    text: ["<b>Isolation Damage:</b> When you attack an enemy who is isolated you deal bonus Isolation Damage.", "<b>Riposte Aura:</b>  When an enemy threatened by you misses you with an attack you automatically deal damage equal to the Riposte Aura."]
  },
  Evasion: {
    "1": {
      ActiveDefense: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      CriticalDamageReduction: [1, 1, 1, 2, 2, 2, 2, 3, 3, 3]
    },
    text: ["<b>Active Defense:</b> Increase your active defense by 1.", "<b>Critical Damage Reduction:</b>Reduce ongoing damage from critical hits by the reduction value listed in the table below"]
  },
  Magent: ONE_MAGIC_SPELLS["Magent"],
  SpellWarden: ONE_MAGIC_SPELLS["SpellWarden"],
  Druid: TWO_MAGIC_SPELLS["Druid"],
  WarriorMage: TWO_MAGIC_SPELLS["WarriorMage"],
  Assassin: TWO_MAGIC_SPELLS["Assassin"],
  Cleric: TWO_MAGIC_SPELLS["Cleric"]
};

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
  } as Race,
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
  } as Race,
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
  } as Race,
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
  } as Race,
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
  } as Race,
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
  } as Race,
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
  } as Race,
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
  } as Race

};


export const BASE_WEAPON_DAMAGE = {
  Agile: {
    Thrown: {
      damage: new Dice(2, DiceSize.d6, -1),
      critical: new Dice(1, DiceSize.d8, 1),
      range: [6, 12, 18]
    } as WeaponType,
    Unarmed: {
      damage: new Dice(2, DiceSize.d6, 0),
      critical: new Dice(1, DiceSize.d8, 0),
    } as WeaponType,
    "Melee 1h": {
      damage: new Dice(2, DiceSize.d6, 1),
      critical: new Dice(1, DiceSize.d10, 0),
    } as WeaponType,
    "Melee 2h": {
      damage: new Dice(2, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d12, 0)
    } as WeaponType,
    Polearm: {
      damage: new Dice(2, DiceSize.d6, 1),
      critical: new Dice(1, DiceSize.d10, 1),
      range: [2]
    } as WeaponType,
    Ranged: {
      damage: new Dice(2, DiceSize.d6, 1),
      critical: new Dice(1, DiceSize.d10, 0),
      range: [12, 25, 50],
      specialText: "Move action to Reload"
    } as WeaponType
  },
  Balanced: {
    Thrown: {
      damage: new Dice(2, DiceSize.d6, 0),
      critical: new Dice(1, DiceSize.d6, 1),
      range: [5, 10, 15]
    } as WeaponType,
    Unarmed: {
      damage: new Dice(2, DiceSize.d6, 1),
      critical: new Dice(1, DiceSize.d6, 0),
    } as WeaponType,
    "Melee 1h": {
      damage: new Dice(2, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 0),
    } as WeaponType,
    "Melee 2h": {
      damage: new Dice(2, DiceSize.d10, 0),
      critical: new Dice(1, DiceSize.d10, 0)
    } as WeaponType,
    Polearm: {
      damage: new Dice(2, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 1),
      range: [2]
    } as WeaponType,
    Ranged: {
      damage: new Dice(2, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 0),
      range: [12, 25, 50],
      specialText: "Move action to Reload"
    } as WeaponType
  },
  Heavy: {
    Thrown: {
      attack: new Dice(2, 12, 2),
      damage: new Dice(2, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 0),
      range: [4, 8, 12],
      specialText: "-1 to hit"
    } as WeaponType,
    Unarmed: {
      attack: new Dice(2, 12, 2),
      damage: new Dice(2, DiceSize.d8, 1),
      critical: new Dice(1, DiceSize.d6, 1),
      specialText: "-1 to hit"
    } as WeaponType,
    "Melee 1h": {
      attack: new Dice(2, 12, 2),
      damage: new Dice(2, DiceSize.d10, 0),
      critical: new Dice(1, DiceSize.d8, 1),
      specialText: "-1 to hit"
    } as WeaponType,
    "Melee 2h": {
      attack: new Dice(2, 12, 2),
      damage: new Dice(2, DiceSize.d12, 0),
      critical: new Dice(1, DiceSize.d10, 1),
      specialText: "-1 to hit"
    } as WeaponType,
    Polearm: {
      attack: new Dice(2, 12, 2),
      damage: new Dice(2, DiceSize.d10, 0),
      critical: new Dice(1, DiceSize.d10, 0),
      range: [2],
      specialText: "-1 to hit"
    } as WeaponType,
    Ranged: {
      attack: new Dice(2, 12, 2),
      damage: new Dice(2, DiceSize.d10, 0),
      critical: new Dice(1, DiceSize.d8, 1),
      range: [15, 30, 60],
      specialText: "1- to hit, Move action to Reload"
    } as WeaponType
  },
  Simple: {
    Thrown: {
      damage: new Dice(2, DiceSize.d6, -1),
      critical: new Dice(1, DiceSize.d6, 0),
      range: [3, 6, 9],
      specialText: "Requires no training, no extra attribute damage"
    } as WeaponType,
    "Melee 1h": {
      damage: new Dice(2, DiceSize.d6, 2),
      critical: new Dice(1, DiceSize.d6, 1),
      specialText: "Requires no training, no extra attribute damage"
    } as WeaponType,
    "Melee 2h": {
      damage: new Dice(2, DiceSize.d8, 2),
      critical: new Dice(1, DiceSize.d8, 1),
      specialText: "Requires no training, no extra attribute damage"
    } as WeaponType,
    Ranged: {
      damage: new Dice(2, DiceSize.d6, 2),
      critical: new Dice(1, DiceSize.d8, 1),
      range: [10, 20, 40],
      specialText: "Requires no training, no extra attribute damage, Move action to Reload"
    } as WeaponType
  }
};

export class StartingCharacterMagicDefense {
  Fortitude = new MagicDefense(MagicDefenseType.Fortitude, new Field(10));
  Reflex = new MagicDefense(MagicDefenseType.Reflex, new Field(10));
  Will = new MagicDefense(MagicDefenseType.Will, new Field(10));
}

export class Knack {
  name: string;
  text: string;
  subthemeName: string;
}


export class KeyValuePair {
  [s: string]: string;
}

// https://basarat.gitbooks.io/typescript/docs/types/index-signatures.html

export class Feature {
  name: string;
  values: any[];
}

export class SpecialPower {
  name: string;
  powers: Spell[];
}

export interface SpellSphere {
  Overview: string;
  FeatureBonus: Feature;
  GeneralFeature: Feature;
  ImplementKnacks: KeyValuePair;
  ImplementKnacksData: NumberBonusByLevel;
  AdrenalinePowers: Spell[];
  PowerPointAbilities: Spell[];
  SpecialPowers: SpecialPower;
  ImplementAttack: Spell;
  Spells: Spell[];
}




