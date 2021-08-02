import {AbilityModel} from "../ability-model";
import {ActionType} from "../../action/action-type.enum";
import {AbilityType} from "../ability-type.enum";
import {AbilityBonus} from "../ability-bonus.enum";
import {TalentStrength} from "./talent-strength.enum";
import {AttributeStrength} from "../../attribute/attribute-enums/attribute-strength.enum";
import {TalentName} from "./talent-name.enum";
import {Level} from "../../character/level.enum";
import {TalentType} from "./talent-type.enum";
import {AttributeName} from "../../attribute/attribute-enums/attribute-name.enum";
import {ArmorType} from "../../armor/armor-type.enum";
import {SubthemeType} from "../../theme-points/subthemes/subtheme-types.enum";
import {ThemeStrength} from "../../theme-points/theme-strength.enum";
import {PowerPointName} from "../power-point/power-point-name.enum";

export type TalentConstants = { [K in TalentName]: AbilityModel };

export function getTalentObject(): TalentConstants {
  return {
    AcceleratedReflexes: {
      abilityName: TalentName.AcceleratedReflexes,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription:
        {
          briefDescription: "Gain a +3 to Initiative.",
          fullDescription: "Gain a +3 to Initiative."
        },
      mechanicalBonus: [
        {abilityBonus: AbilityBonus.Initiative, abilityType: AbilityType.Passive, value: {minBonus: 3, maxBonus: 3}}
      ]
    } as AbilityModel,
    Deflection: {
      ...new AbilityModel(),
      abilityName: TalentName.Deflection,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      fullDescriptionAbilityType: AbilityType.Ability,
      briefDescriptionAbilityType: AbilityType.Ability,
      abilityDescription: {
        briefDescription: "Reduce the damage of an attack against AD by $DamageResist. If the attack is a burst or range attack the reduction becomes $" + AbilityBonus.DamageResist,
        fullDescription: "Reduce the damage of an attack against AD by 4 + level / 3. If the attack is a burst or range attack the reduction becomes 5 + level / 2"
      },
      mechanicalBonus: [
        {abilityBonus: AbilityBonus.DamageResist, abilityType: AbilityType.Ability, value: {minBonus: 4, maxBonus: 7}},
        {abilityBonus: AbilityBonus.DamageResist, abilityType: AbilityType.Ability, value: {minBonus: 5, maxBonus: 10}}
      ]
    } as AbilityModel,
    EmpoweredStrikes: {
      ...new AbilityModel(),
      abilityName: TalentName.EmpoweredStrikes,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription:
        {
          briefDescription: "Gain a +$" + AbilityBonus.EmpoweredDamage + " to empowered attacks but you have a $" + AbilityBonus.CriticalStrike + " to critical strikes.",
          fullDescription:
            "Gain a +2 to empowered attacks but you have a -1 to critical strikes. At level 2 remove the critical strike penalty. At level 6 your empowered bonus becomes +3."
        },
      mechanicalBonus: [
        {abilityBonus: AbilityBonus.EmpoweredDamage, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 3}},
        {abilityBonus: AbilityBonus.CriticalStrike, abilityType: AbilityType.Passive, value: {minBonus: -1, maxBonus: 0}, adjustLevel: Level.Two}
      ]
    } as AbilityModel,
    HealingSpecialization: {
      ...new AbilityModel(),
      abilityName: TalentName.HealingSpecialization,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription:
        {
          briefDescription: "Increase the amount of Healing granted by actions with the healing keyword by $Healing.",
          fullDescription:
            "Increase the amount of Healing granted by actions with the healing keyword by 1. Increase by 1 at level 6."
        },
      mechanicalBonus: [
        {abilityBonus: AbilityBonus.Healing, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 2}}
      ]
    } as AbilityModel,
    ImprovedController: {
      abilityName: TalentName.ImprovedController,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription: "Any spell or ability with the Forced Movement keyword has its push, pull, teleport and slide effects increased by 1. Gain a +1 bonus to critical strikes.",
        fullDescription:
          "Any spell or ability with the Forced Movement keyword has its push, pull, teleport and slide effects increased by 1. Gain a +1 bonus to critical strikes."
      }
      ,
      mechanicalBonus: [
        {abilityBonus: AbilityBonus.CriticalStrike, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}},
        {abilityBonus: AbilityBonus.ForcedMovement, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}
      ]
    } as AbilityModel,
    ImprovedVitality: {
      ...new AbilityModel(),
      abilityName: TalentName.ImprovedVitality,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription:
        {
          briefDescription: "Increase your starting THP by $" + AbilityBonus.StartingTemporaryHitPoints + ".",
          fullDescription:
            "Increase your starting THP by 3. Increase this amount by 1 at levels 3, 6, and 9"
        },
      mechanicalBonus: [
        {abilityBonus: AbilityBonus.StartingTemporaryHitPoints, abilityType: AbilityType.Passive, value: {minBonus: 3, maxBonus: 6}}
      ]
    } as AbilityModel,
    MissileParry: {
      abilityName: TalentName.MissileParry,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription: "Gain the following:\n" +
          "Your Missile Defense becomes your Active Defense. Increase your critical resistance by $CriticalResist. Gain the ability Deflection",
        fullDescription:
          "Your Missile Defense becomes your Active Defense. Increase your critical resistance by 1. Increase this bonus to 2 at level 6. Gain the ability Deflection."
      },
      mechanicalBonus: [
        {abilityBonus: AbilityBonus.MissileDefense, abilityType: AbilityType.Passive, value: AbilityBonus.ActiveDefense},
        {abilityBonus: AbilityBonus.CriticalResist, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 2}}
      ],
      abilityRequirement: [{requirementAbilityName: AttributeName.Agility, requirementType: AbilityType.Attribute, requirementValue: AttributeStrength.Heroic}],
      associatedAbilities: [TalentName.Deflection]
    } as AbilityModel,
    AdvancedWeaponTrainingRanged: {
      abilityName: TalentName.AdvancedWeaponTrainingRanged,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}, {requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "The character gains all the following benefits:",
        fullDescription:
          "The character gains all the following benefits:"
      },
      abilityRequirement: [{requirementAbilityName: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
      associatedAbilities: [TalentName.MeleeArcher, TalentName.VulnerableShots, TalentName.SureShot]
    } as AbilityModel,
    MeleeArcher: {
      abilityName: TalentName.MeleeArcher,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "You are able to convert your range attacks into a melee attack with a -1 DC.",
        fullDescription:
          "You are able to convert your range attacks into a melee attack with a -1 DC."
      }
    } as AbilityModel,
    VulnerableShots: {
      abilityName: TalentName.VulnerableShots,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "Increase Range attack damage by $AttackDamage",

        fullDescription:
          "Increase Range attack damage by +1. Increase this amount by 1 at level 6."
      },
      mechanicalBonus: [
        {abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 2}}
      ]
    } as AbilityModel,


    AdvancedWeaponTrainingTwoWeaponFighting: {
      abilityName: TalentName.AdvancedWeaponTrainingTwoWeaponFighting,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}, {requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription: "Gain Following benefits:",

        fullDescription:
          "Gain the following benefits:"
      },
      abilityRequirement: [{requirementAbilityName: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
      associatedAbilities: [TalentName.CoordinatedStrikes, TalentName.FollowUpAttack]
    } as AbilityModel,

    CoordinatedStrikes: {
      abilityName: TalentName.CoordinatedStrikes,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "Increase your damage bonus for dual wielding attacks by $AttackDamage.",
        fullDescription:
          "Increase your damage bonus for dual wielding attacks by +2. Increase this bonus by 1 at levels 4 and 8."
      },
      mechanicalBonus: [
        {abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 4}}
      ]
    } as AbilityModel,

    FollowUpAttack: {
      abilityName: TalentName.FollowUpAttack,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      fullDescriptionAbilityType: AbilityType.Power,
      briefDescriptionAbilityType: AbilityType.Power,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}, {requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription: "Gain advantage to an attack that has missed its target. If the attack still misses this power is not expended.",
        fullDescription:
          "Gain advantage to an attack that has missed its target. If the attack still misses this power is not expended."
      },
      abilityRequirement: [{requirementAbilityName: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
    } as AbilityModel,

    SureShot: {
      abilityName: TalentName.SureShot,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      fullDescriptionAbilityType: AbilityType.Power,
      briefDescriptionAbilityType: AbilityType.Power,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}, {requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription: "Gain advantage to a missed ranged weapon attack. If the attack still misses this power is not expended.",
        fullDescription:
          "Gain advantage to a missed ranged weapon attack. If the attack still misses this power is not expended."
      },
      abilityRequirement: [{requirementAbilityName: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
    } as AbilityModel,

    ChargeMastery: {
      abilityName: TalentName.ChargeMastery,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Gain the following benefits while charging:",
        fullDescription:
          "Gain the following benefits while charging:"
      },
      associatedAbilities: [TalentName.MeasuredCharge, TalentName.DefensiveCharge, TalentName.AccurateCharge, TalentName.AcceleratedCharge, TalentName.SavageCharge],
    } as AbilityModel,

    ChargeMasteryLesser: {
      abilityName: TalentName.ChargeMasteryLesser,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      pickNumber: 2,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Gain the following benefits",
        fullDescription:
          "Pick any of the following 2 benefits to gain while charging:"
      },
      associatedAbilities: [TalentName.MeasuredCharge, TalentName.DefensiveCharge, TalentName.AccurateCharge, TalentName.AcceleratedCharge, TalentName.SavageCharge],
    } as AbilityModel,

    MeasuredCharge: {
      abilityName: TalentName.MeasuredCharge,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "You do not grant combat superiority from charging.",
        fullDescription:
          "You do not grant combat superiority from charging."
      },
    } as AbilityModel,
    DefensiveCharge: {
      abilityName: TalentName.DefensiveCharge,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "You gain -2 DC against any attacks you incur while charging.",
        fullDescription:
          "You gain -2 DC against any attacks you incur while charging."
      },
    } as AbilityModel,
    AccurateCharge: {
      abilityName: TalentName.AccurateCharge,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "Gain a +2 bonus to hit when charging (+1 after negating the -1).",
        fullDescription:
          "Gain a +2 bonus to hit when charging (+1 after negating the -1)."
      },
      mechanicalBonus: []
    } as AbilityModel,
    AcceleratedCharge: {
      abilityName: TalentName.AcceleratedCharge,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "Increase your speed by 1 when performing a charge.",
        fullDescription:
          "Increase your speed by 1 when performing a charge."
      },
      mechanicalBonus: []
    } as AbilityModel,
    SavageCharge: {
      abilityName: TalentName.SavageCharge,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "Gain a $Charging attack damage bonus when charging.",
        fullDescription:
          "Gain a +2 attack damage bonus when charging. Increase this damage by 1 and levels 4 and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Charging, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 4}}]
    } as AbilityModel,

    FuriousStrikes: {
      abilityName: TalentName.FuriousStrikes,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Gain a $AttackDamage to attack damage.",
        fullDescription:
          "Gain a +1 to attack damage. At level 6 this bonus becomes +2."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 2}}]
    } as AbilityModel,

    LethalStrikes: {
      abilityName: TalentName.LethalStrikes,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Gain a $" + AbilityBonus.CriticalStrike + " to critical strikes.",
        fullDescription:
          "Gain a +3 to critical strikes. Increase this bonus by 1 at levels 4, 6, and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.CriticalStrike, abilityType: AbilityType.Passive, value: {minBonus: 3, maxBonus: 6}}]
    } as AbilityModel,

    FriendlyController: {
      abilityName: TalentName.FriendlyController,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Any spell or ability with the Friendly Movement keyword has its tactical move, advance, slide or teleport distance increased by 1 additional square. Increase your starting THP by 1.",
        fullDescription:
          "Any spell or ability with the Friendly Movement keyword has its tactical move, advance, slide or teleport distance increased by 1 additional square. Increase your starting THP by 1."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.FriendlyMovement, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}},
        {abilityBonus: AbilityBonus.StartingTemporaryHitPoints, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}]
    } as AbilityModel,


    FortificationSpecialization: {
      abilityName: TalentName.FortificationSpecialization,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase the number of temporary hit points your spells and abilities with the fortify keyword grant by $" + AbilityBonus.Fortify + ".",
        fullDescription:
          "Increase the number of temporary hit points your spells and abilities with the fortify keyword grant by 1."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Fortify, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}]
    } as AbilityModel,


    PowerSource: {
      abilityName: TalentName.PowerSource,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase your total power points by 1. Start combat with 1 additional THP.",
        fullDescription:
          "Increase your total power points by 1. Start combat with 1 additional THP."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.PowerPoint, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}},
        {abilityBonus: AbilityBonus.StartingTemporaryHitPoints, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}]
    } as AbilityModel,

    Reaper: {
      abilityName: TalentName.Reaper,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Universal, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Attacks made with a -2 DC penalty or less do 1/2 damage on a miss. Gain a +$" + AbilityBonus.EmpoweredDamage + " bonus to empowered attacks",
        fullDescription:
          "Attacks made with a -2 DC penalty or less do 1/2 damage on a miss. Gain a +1 bonus to empowered attacks. This bonus increases by 1 at level  6."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.EmpoweredDamage, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 2}}]
    } as AbilityModel,

    BoilingRage: {
      abilityName: TalentName.BoilingRage,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      fullDescriptionAbilityType: AbilityType.Power,
      briefDescriptionAbilityType: AbilityType.Power,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "You can increase all damage done until the end of this round by $" + AbilityBonus.GlobalDamage + ". This ability can only be used after being crit or while bloodied.",
        fullDescription:
          "You can increase all damage done until the end of this round by 8 + 1.5 * level. This ability can only be used after being crit or while bloodied."
      },
      mechanicalBonus: [
        {abilityBonus: AbilityBonus.GlobalDamage, abilityType: AbilityType.Power, value: {minBonus: 8, maxBonus: 23}}
      ],
      abilityRequirement: [{requirementAbilityName: AttributeName.Brawn, requirementValue: AttributeStrength.Champion}],

    } as AbilityModel,


    PrecisionStrike: {
      abilityName: TalentName.PrecisionStrike,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      fullDescriptionAbilityType: AbilityType.Power,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "You can increase your hit bonus by $" + AbilityBonus.ToHit + " and your attack damage bonus by $" + AbilityBonus.AttackDamage + " to your next attack action made this turn.",
        fullDescription:
          "You can increase your hit bonus by 2 and your attack damage bonus by 4 + level to your next attack action made this turn."
      },
      mechanicalBonus: [
        {abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.Power, value: {minBonus: 4, maxBonus: 14}},
        {abilityBonus: AbilityBonus.GlobalDamage, abilityType: AbilityType.Power, value: {minBonus: 2, maxBonus: 2}}
      ],
      abilityRequirement: [{requirementAbilityName: AttributeName.Agility, requirementValue: AttributeStrength.Champion}],

    } as AbilityModel,

    UnstoppableMarch: {
      abilityName: TalentName.UnstoppableMarch,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Move,
      fullDescriptionAbilityType: AbilityType.Power,
      briefDescriptionAbilityType: AbilityType.Power,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Tactically move speed - 3 squares. You may drag up to three adjacent equal size creatures with you. You may also choose to spend a recovery.",
        fullDescription:
          "Tactically move speed - 3 squares. You may drag up to three adjacent equal size creatures with you. You may also choose to spend a recovery."
      },
      abilityRequirement: [{requirementAbilityName: AttributeName.Brawn, requirementValue: AttributeStrength.Heroic}],

    } as AbilityModel,

    CounterSwing: {
      abilityName: TalentName.CounterSwing,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      fullDescriptionAbilityType: AbilityType.Power,
      briefDescriptionAbilityType: AbilityType.Power,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "You may make a -1 DC attack.",
        fullDescription:
          "You may make a -1 DC attack."
      },
      abilityRequirement: [{requirementAbilityName: AttributeName.Brawn, requirementValue: AttributeStrength.Heroic}],

    } as AbilityModel,

    LightningStrike: {
      abilityName: TalentName.LightningStrike,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      fullDescriptionAbilityType: AbilityType.Power,
      briefDescriptionAbilityType: AbilityType.Power,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "You may make a -2 DC attack with a +2 to hit.",
        fullDescription:
          "You may make a -2 DC attack with a +2 to hit."
      },
      abilityRequirement: [{requirementAbilityName: AttributeName.Agility, requirementType: AbilityType.Attribute, requirementValue: AttributeStrength.Heroic}],

    } as AbilityModel,

    KnightsMove: {
      abilityName: TalentName.KnightsMove,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Move,
      fullDescriptionAbilityType: AbilityType.Feature,
      briefDescriptionAbilityType: AbilityType.Feature,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Two allies within 7 squares are able to tactically move 2 squares.",
        fullDescription:
          "Two allies within 7 squares are able to tactically move 2 squares."
      },
      abilityRequirement: [{requirementAbilityName: AttributeName.Reasoning, requirementType: AbilityType.Attribute, requirementValue: AttributeStrength.Champion}],

    } as AbilityModel,

    MasterTactician: {
      abilityName: TalentName.MasterTactician,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Slide up to 3 allies within 10 squares of you $" + AbilityBonus.FriendlyMovement + " squares each.",
        fullDescription:
          "Slide up to 3 allies within 10 squares 4 squares each."
      },
      abilityRequirement: [{requirementAbilityName: AttributeName.Reasoning, requirementValue: AttributeStrength.Heroic}],
      mechanicalBonus: [{abilityBonus: AbilityBonus.FriendlyMovement, keywords: [AbilityBonus.FriendlyMovement], abilityType: AbilityType.Power, value: {minBonus: 4, maxBonus: 4}}]
    } as AbilityModel,

    CommandingStrike: {
      abilityName: TalentName.CommandingStrike,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Standard,
      fullDescriptionAbilityType: AbilityType.Power,
      briefDescriptionAbilityType: AbilityType.Power,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Two allies within 10 squares are able to make a basic attack with a +1 to hit.",
        fullDescription:
          "Two allies within 10 squares are able to make a basic attack with a +1 to hit."
      },
      abilityRequirement: [{requirementAbilityName: AttributeName.Reasoning, requirementValue: AttributeStrength.Heroic}],
    } as AbilityModel,

    Bolster: {
      abilityName: TalentName.Bolster,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      fullDescriptionAbilityType: AbilityType.Power,
      briefDescriptionAbilityType: AbilityType.Power,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "When an ally within 10 squares becomes bloodied from an attack you can have that ally gain $" + AbilityBonus.Fortify + " Temporary Hit Points",
        fullDescription:
          "When an ally within 10 squares becomes bloodied from an attack you can have that ally gain 6 + level * 1.2 Temporary Hit Points"
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Fortify, abilityType: AbilityType.Power, value: {minBonus: 7, maxBonus: 18}}],
      abilityRequirement: [
        {requirementAbilityName: AbilityBonus.Fortify, requirementType: AbilityType.Spell, requirementValue: true, canAlsoMeetThisRequirement: "Fortify"},
        {requirementAbilityName: AbilityBonus.Fortify, requirementType: AbilityType.Knack, requirementValue: true, canAlsoMeetThisRequirement: "Fortify"}],
    } as AbilityModel,

    /**
     * abilityRequirement: [
     {
          requirementAbilityName: AttributeName.Reasoning,
          requirementType: AbilityType.Attribute,
          requirementValue: AttributeStrength.Heroic,
          canAlsoMeetThisRequirement: 'AttributeRequirement'
        },
     {requirementAbilityName: AttributeName.SelfDiscipline, requirementType: AbilityType.Attribute, requirementValue: AttributeStrength.Heroic, canAlsoMeetThisRequirement: 'AttributeRequirement'},
     {requirementAbilityName: AttributeName.Presence, requirementType: AbilityType.Attribute, requirementValue: AttributeStrength.Heroic, canAlsoMeetThisRequirement: 'AttributeRequirement'}]
     }
     */

    GreaterJuggernaut: {
      abilityName: TalentName.GreaterJuggernaut,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Increase the damage resistance of Juggernaut by $" + AbilityBonus.Juggernaut + " and gain the Armor Up feature.",
        fullDescription:
          "Increase the damage resistance of Juggernaut by 1 and gain the Armor Up feature."
      },
      associatedAbilities: [TalentName.ArmorUp],
      mechanicalBonus: [{abilityBonus: AbilityBonus.Juggernaut, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}],
      abilityRequirement: [{requirementAbilityName: SubthemeType.Juggernaut, requirementType: AbilityType.Subtheme, requirementValue: 1}],
    } as AbilityModel,
    ArmorUp: {
      abilityName: TalentName.ArmorUp,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Move,
      fullDescriptionAbilityType: AbilityType.Feature,
      briefDescriptionAbilityType: AbilityType.Feature,
      abilityDescription: {
        briefDescription:
          "You gain $" + AbilityBonus.Fortify + " THP.",
        fullDescription:
          "You gain 3 THP. Increase the THP amount by 1 at levels 4, 6, and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Fortify, abilityType: AbilityType.Feature, value: {minBonus: 3, maxBonus: 6}}],
    } as AbilityModel,

    AdvancedWeaponTrainingShieldMastery: {
      abilityName: TalentName.AdvancedWeaponTrainingShieldMastery,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "The character gains the following benefits when equipped with a shield:",
        fullDescription:
          "The character gains the following benefits when equipped with a shield:"
      },
      abilityRequirement: [{requirementAbilityName: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
      associatedAbilities: [TalentName.ImprovedDefenses, TalentName.SturdyArm, TalentName.ShieldBlock]
    } as AbilityModel,

    SturdyArm: {
      abilityName: TalentName.SturdyArm,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "Increase your starting THP by $" + AbilityBonus.StartingTemporaryHitPoints,
        fullDescription:
          "Increase your starting THP by 1"
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.StartingTemporaryHitPoints, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}],
    } as AbilityModel,

    ShieldBlock: {
      abilityName: TalentName.ShieldBlock,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Reduce the damage taken from an attack targeting physical defense by $" + AbilityBonus.TemporaryDamageResist + ".",
        fullDescription:
          "Reduce the damage taken from an attack targeting physical defense by 6 +  1.2 * level."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.TemporaryDamageResist, abilityType: AbilityType.Power, value: {minBonus: 7, maxBonus: 18}}],
      abilityRequirement: [{requirementAbilityName: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],

    } as AbilityModel,

    ImprovedDefenses: {
      abilityName: TalentName.ImprovedDefenses,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "Increase your active defense by $" + AbilityBonus.ActiveDefense + ". This cannot increase max permanent defense beyond $" + AbilityBonus.MaxDefense,
        fullDescription:
          "Increase your active defense by 1. This cannot increase max permanent defense beyond 15 + level"
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.ActiveDefense, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}},
        {abilityBonus: AbilityBonus.MaxDefense, abilityType: AbilityType.Talent, value: {minBonus: 16, maxBonus: 25}}]
    } as AbilityModel,

    AdvancedWeaponTrainingWaterDancer: {
      abilityName: TalentName.AdvancedWeaponTrainingWaterDancer,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}, {requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "The character gains all the following benefits when fighting with a weapon and an empty offhand or both hands unoccupied:",
        fullDescription:
          "The character gains all the following benefits when fighting with a weapon and an empty offhand or both hands unoccupied:"
      },
      abilityRequirement: [{requirementAbilityName: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
      associatedAbilities: [TalentName.ImprovedDefenses, TalentName.GracefulStrikes, TalentName.Sidestep]
    } as AbilityModel,


    GracefulStrikes: {
      abilityName: TalentName.GracefulStrikes,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "Increase attack damage by $" + AbilityBonus.AttackDamage + ".",
        fullDescription:
          " Increase attack damage by +1. Increase this amount by 1 at level 6."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 2}}]
    } as AbilityModel,

    Sidestep: {
      abilityName: TalentName.Sidestep,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}, {requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Reduce the damage taken from an attack that targets Active Defense or Reflex by $" + AbilityBonus.TemporaryDamageResist,
        fullDescription:
          "Reduce the damage taken from an attack that targets Active Defense or Reflex by 6 + 1.2 * level."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.TemporaryDamageResist, abilityType: AbilityType.Power, value: {minBonus: 7, maxBonus: 18}}],
      abilityRequirement: [{requirementAbilityName: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
    } as AbilityModel,

    AdvancedWeaponTrainingBigWeapons: {
      abilityName: TalentName.AdvancedWeaponTrainingBigWeapons,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater},
        {requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "The character gains the following benefits when fighting with a two handed weapon:",
        fullDescription:
          "The character gains the following benefits when fighting with a two handed weapon:"
      },
      abilityRequirement: [{requirementAbilityName: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
      associatedAbilities: [TalentName.RendingStrikes, TalentName.LengthAdvantage]
    } as AbilityModel,

    LengthAdvantage: {
      abilityName: TalentName.LengthAdvantage,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      briefDescriptionAbilityType: AbilityType.Power,
      fullDescriptionAbilityType: AbilityType.Power,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser},
        {requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Make a snap basic attack with a +4 to hit against an enemy that leaves a square you threaten",
        fullDescription:
          "Make a snap basic attack with a +4 to hit against an enemy that leaves a square you threaten"
      },
      abilityRequirement: [{requirementAbilityName: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
    } as AbilityModel,

    RendingStrikes: {
      abilityName: TalentName.RendingStrikes,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "Increase your attack damage by $" + AbilityBonus.AttackDamage,
        fullDescription:
          "Increase your attack damage by 2. Increase this bonus by 1 at levels 4 and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 4}}]
    } as AbilityModel,

    AdvancedWeaponTrainingInnerFocus: {
      abilityName: TalentName.AdvancedWeaponTrainingInnerFocus,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater},
        {requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Gain the following:",
        fullDescription:
          "Gain the following:"
      },
      abilityRequirement: [{requirementAbilityName: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
      associatedAbilities: [TalentName.ChiFocus, TalentName.ChiStrikes]
    } as AbilityModel,

    ChiFocus: {
      abilityName: TalentName.ChiFocus,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser},
        {requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription: "Choose two effects among the following, you may choose the same option twice:\n" +
          "Increase your damage by $" + AbilityBonus.AttackDamage + " until the start of your next turn.\n" +
          "Gain $" + AbilityBonus.TemporaryDamageResist + " damage resistance until the start of your next turn.\n" +
          "Gain a +1 to hit to and $" + AbilityBonus.ResistancePiercing + " resistance piercing to all attacks until the start of your next turn.",
        fullDescription: "Choose two effects among the following, you may choose the same option twice:\n" +
          "Increase your damage by 4 + (level / 2 ) until the start of your next turn.\n" +
          "Gain 2 + (level / 3) damage resistance until the start of your next turn.\n" +
          "Gain a +1 to hit to and 5 + level resistance piercing to all attacks until the start of your next turn."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.Power, value: {minBonus: 4, maxBonus: 9}},
        {abilityBonus: AbilityBonus.TemporaryDamageResist, abilityType: AbilityType.Power, value: {minBonus: 2, maxBonus: 5}},
        {abilityBonus: AbilityBonus.ResistancePiercing, abilityType: AbilityType.Power, value: {minBonus: 6, maxBonus: 15}}],
      abilityRequirement: [{requirementAbilityName: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
    } as AbilityModel,

    ChiStrikes: {
      abilityName: TalentName.ChiStrikes,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "Gain  $" + AbilityBonus.EmpoweredDamage + " to your empowered damage bonus.",
        fullDescription:
          "Gain 3 to your empowered damage bonus. Increase this bonus by 1 at levels 4 and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.EmpoweredDamage, abilityType: AbilityType.Passive, value: {minBonus: 3, maxBonus: 5}}]
    } as AbilityModel,

    ArmorOfTheScoundrel: {
      abilityName: TalentName.ArmorOfTheScoundrel,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser},
        {requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "You gain a +$" + AbilityBonus.ActiveDefense + " bonus to AD when wearing light armor or less. This bonus does not stack with any other AD bonuses (shield, evasion, intuition).",
        fullDescription:
          "You gain a +1 bonus to AD when wearing light armor or less. This bonus does not stack with any other AD bonuses (shield, evasion, intuition)."
      },
      mechanicalBonus: [{
        abilityBonus: AbilityBonus.ActiveDefense, abilityType: AbilityType.Passive, abilityQualifier: [
          {requirementAbilityName: AbilityBonus.NonStacking, requirementValue: true}, {requirementAbilityName: ArmorType.LightArmor, requirementValue: true}, {requirementAbilityName: ArmorType.None, requirementValue: true}
        ], value: {minBonus: 1, maxBonus: 1}
      }],
      abilityRequirement: [{requirementAbilityName: AttributeName.Agility, requirementType: AbilityType.Attribute, requirementValue: AttributeStrength.Heroic}]
    } as AbilityModel,

    ArmorOfTheNorthmen: {
      abilityName: TalentName.ArmorOfTheNorthmen,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "You gain a +$" + AbilityBonus.ActiveDefense + " bonus to AD when wearing medium armor or less. This bonus does not stack with any other AD bonuses (shield, evasion, intuition).",
        fullDescription:
          "You gain a +1 bonus to AD when wearing medium armor or less. This bonus does not stack with any other AD bonuses (shield, evasion, intuition)."
      },
      mechanicalBonus: [{
        abilityBonus: AbilityBonus.ActiveDefense, abilityType: AbilityType.Passive, abilityQualifier: [
          {requirementAbilityName: AbilityBonus.NonStacking, requirementValue: true}, {requirementAbilityName: ArmorType.MediumArmor, requirementValue: true}, {
            requirementAbilityName: ArmorType.LightArmor,
            requirementValue: true
          }, {requirementAbilityName: ArmorType.None, requirementValue: true}
        ], value: {minBonus: 1, maxBonus: 1}
      }],
      abilityRequirement: [{requirementAbilityName: AttributeName.Brawn, requirementType: AbilityType.Attribute, requirementValue: AttributeStrength.Heroic}]
    } as AbilityModel,

    AdvancedArmorTraining: {
      abilityName: TalentName.AdvancedArmorTraining,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "You are trained in the use of heavy armor.",
        fullDescription:
          "You are trained in the use of heavy armor."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.HeavyArmorTraining, abilityType: AbilityType.Passive, value: AbilityBonus.HeavyArmorTraining}],
    } as AbilityModel,

    UnboundFortitude: {
      abilityName: TalentName.UnboundFortitude,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Gain $" + AbilityBonus.FortitudeDefense + " to Fortitude defense. All attacks that primarily target your Fortitude defense have a -2 DC.",
        fullDescription:
          "Gain 1 to Fortitude defense. All attacks that primarily target your Fortitude defense have a -2 DC."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.FortitudeDefense, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}],
    } as AbilityModel,

    BlindFighting: {
      abilityName: TalentName.BlindFighting,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}, {requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "When attacking creatures in vision restricted squares you can reduce any vision penalty you may receive by 2. You are never forced to use your passive defense due to lighting conditions.",
        fullDescription:
          "When attacking creatures in vision restricted squares you can reduce any vision penalty you may receive by 2. You are never forced to use your passive defense due to lighting conditions."
      },
    } as AbilityModel,

    Unbreakable: {
      abilityName: TalentName.Unbreakable,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Spend a recovery to ignore a killing blow. Set your hit points to recovery value + $" + AbilityBonus.RecoveryValue,
        fullDescription:
          "Spend a recovery to ignore a killing blow. Set your hit points to recovery value + 5 + level / 2."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.RecoveryValue, abilityType: AbilityType.Power, value: {minBonus: 5, maxBonus: 10}}]
    } as AbilityModel,

    DislodgingBlows: {
      abilityName: TalentName.DislodgingBlows,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Increase your empowered damage by $" + AbilityBonus.EmpoweredDamage + ". Once per turn when you hit an enemy with a weapon or implement attack on your turn you may slide them up to two squares. The enemy must end the slide in an adjacent square. This slide can take place before you displace the enemy.",
        fullDescription:
          "Increase your empowered damage by +1. Once per turn when you hit an enemy with a weapon or implement attack on your turn you may slide them up to two squares. The enemy must end the slide in an adjacent square. This slide can take place before you displace the enemy."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.EmpoweredDamage, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}]
    } as AbilityModel,

    WeaponMastery: {
      abilityName: TalentName.WeaponMastery,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Gain $" + AbilityBonus.AttackDamage + " to your attack damage bonus and gain the Masterful Strikes Feature.",
        fullDescription:
          "Gain 1 to your attack damage bonus and gain the Masterful Strikes Feature."
      },
      associatedAbilities: [TalentName.MasterfulStrikes],
      mechanicalBonus: [{abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}],
      abilityRequirement: [{requirementAbilityName: SubthemeType.WeaponSpecialization, requirementType: AbilityType.Subtheme, requirementValue: ThemeStrength.Lesser}]
    } as AbilityModel,

    MasterfulStrikes: {
      abilityName: TalentName.MasterfulStrikes,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Move,
      fullDescriptionAbilityType: AbilityType.Feature,
      abilityDescription: {
        briefDescription:
          "Gain a +$" + AbilityBonus.AttackDamage + " to your attack damage bonus to all attacks until the end of your turn.",
        fullDescription:
          "Gain a +3 to your attack damage bonus to all attacks until the end of your turn. Increase this bonus by 1 at levels 2, 4, 6 and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.Feature, value: {minBonus: 3, maxBonus: 7}}],
    } as AbilityModel,

    ProtectionMastery: {
      abilityName: TalentName.ProtectionMastery,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Gain $" + AbilityBonus.Protector + " protector aura damage and gain the Taunt Feature.",
        fullDescription:
          "Gain 4 to your protector aura damage and gain the Taunt Feature."
      },
      associatedAbilities: [TalentName.Taunt],
      mechanicalBonus: [{abilityBonus: AbilityBonus.Protector, abilityType: AbilityType.Passive, value: {minBonus: 4, maxBonus: 4}}],
      abilityRequirement: [{requirementAbilityName: SubthemeType.Protector, requirementType: AbilityType.Subtheme, requirementValue: ThemeStrength.Lesser}]
    } as AbilityModel,

    Taunt: {
      abilityName: TalentName.Taunt,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Move,
      fullDescriptionAbilityType: AbilityType.Feature,
      abilityDescription: {
        briefDescription:
          "You may pull an enemy within 2 squares of you 1 square. Increase the damage of your Protector Aura by $" + AbilityBonus.Protector + " until SoNT.",
        fullDescription:
          "You may pull an enemy within 2 squares of you 1 square. Increase the damage of your Protector Aura by 6 until SoNT. Increase by 2 at levels 2, 4, 6 and by 3 at level 8"
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Protector, abilityType: AbilityType.Feature, value: {minBonus: 6, maxBonus: 15}}],
    } as AbilityModel,

    Enrage: {
      abilityName: TalentName.Enrage,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Gain $" + AbilityBonus.EmpoweredDamage + " to your empowered damage bonus. Increase the bonus damage provided by your Rage Feature by $" + AbilityBonus.Rage + ".",
        fullDescription:
          "Gain 1 to your empowered damage bonus. Increase the bonus damage provided by your Rage Feature by 1. Increase your Rage bonus damage by 1 at levels 4, 6, and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Rage, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 4}}, {
        abilityBonus: AbilityBonus.EmpoweredDamage,
        abilityType: AbilityType.Passive,
        value: {minBonus: 1, maxBonus: 1}
      }],
      abilityRequirement: [{requirementAbilityName: AbilityBonus.Rage, requirementType: AbilityType.PowerPointFeature, requirementValue: true}]
    } as AbilityModel,

    BristlingGuardian: {
      abilityName: TalentName.BristlingGuardian,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase your protector aura damage by $" + AbilityBonus.Protector + ". Increase your rebuke bonus by $" + AbilityBonus.Rebuke + ".",
        fullDescription:
          "Increase your protector aura damage by 2. Increase your rebuke bonus by 4. Increase your rebuke bonus by 2 at levels 2, 4, 6 and increase by 3 at level 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Protector, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 2}}, {
        abilityBonus: AbilityBonus.Rebuke,
        abilityType: AbilityType.Passive,
        value: {minBonus: 4, maxBonus: 13}
      }],
      abilityRequirement: [{requirementAbilityName: AbilityBonus.Rebuke, requirementType: AbilityType.PowerPointFeature, requirementValue: true}]
    } as AbilityModel,

    Stoicism: {
      abilityName: TalentName.Stoicism,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase your starting temporary hit points by $" + AbilityBonus.StartingTemporaryHitPoints + ". Increase the amount of temporary hit points gained from ignore pain by $" + AbilityBonus.IgnorePainTHP + ".",
        fullDescription:
          "Increase your starting temporary hit points by 2. Increase the amount of temporary hit points gained from ignore pain by 1. Increase the Ignore Pain temporary hit point gain by 1 at levels 4, 6, 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.StartingTemporaryHitPoints, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 2}}, {
        abilityBonus: AbilityBonus.IgnorePainTHP,
        abilityType: AbilityType.Passive,
        value: {minBonus: 1, maxBonus: 4}
      }],
      abilityRequirement: [{requirementAbilityName: AbilityBonus.IgnorePain, requirementType: AbilityType.PowerPointFeature, requirementValue: true}]
    } as AbilityModel,

    ImprovedWeaponSpecialization: {
      abilityName: TalentName.ImprovedWeaponSpecialization,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase the damage bonus provided by Weapon Specialization by $" + AbilityBonus.WeaponSpecialization + ".",
        fullDescription:
          "Increase the damage bonus provided by Weapon Specialization by 1. Increase by 1 at level 6."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.WeaponSpecialization, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 2}}],
      abilityRequirement: [{requirementAbilityName: SubthemeType.WeaponSpecialization, requirementType: AbilityType.Subtheme, requirementValue: 1}]
    } as AbilityModel,

    ReinforcedWeaponSpecialization: {
      abilityName: TalentName.ReinforcedWeaponSpecialization,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase the damage bonus provided by Weapon Specialization by $" + AbilityBonus.WeaponSpecialization + ".",
        fullDescription:
          "Increase the damage bonus provided by Weapon Specialization by 2."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.WeaponSpecialization, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 2}}],
      abilityRequirement: [{requirementAbilityName: TalentName.ImprovedWeaponSpecialization, requirementType: AbilityType.Talent, requirementValue: true}, {
        requirementAbilityName: AbilityBonus.CharacterLevel,
        requirementType: AbilityType.CharacterLevel,
        requirementValue: Level.Ten
      }]
    } as AbilityModel,

    ImprovedProtector: {
      abilityName: TalentName.ImprovedProtector,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase your protector aura by $" + AbilityBonus.Protector + ".",
        fullDescription:
          "Increase your protector aura by 4. Increase this by 1 at levels 2, 4, 6 and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Protector, abilityType: AbilityType.Passive, value: {minBonus: 4, maxBonus: 8}}],
      abilityRequirement: [{requirementAbilityName: SubthemeType.Protector, requirementType: AbilityType.Subtheme, requirementValue: 1}]
    } as AbilityModel,

    ReinforcedProtector: {
      abilityName: TalentName.ReinforcedProtector,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase your protector aura by $" + AbilityBonus.Protector + ".",
        fullDescription:
          "Increase your protector aura by an additional 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Protector, abilityType: AbilityType.Passive, value: {minBonus: 8, maxBonus: 8}}],
      abilityRequirement: [{requirementAbilityName: TalentName.ImprovedProtector, requirementType: AbilityType.Talent, requirementValue: true}, {
        requirementAbilityName: AbilityBonus.CharacterLevel,
        requirementType: AbilityType.CharacterLevel,
        requirementValue: Level.Ten
      }]
    } as AbilityModel,

    Intervene: {
      abilityName: TalentName.Intervene,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "When an adjacent attacker hits an ally or an adjacent ally is hit with an attack. The attack instead hits you and the original target gains $" + AbilityBonus.Fortify + " Temporary hit points.",
        fullDescription:
          "When an adjacent attacker hits an ally or an adjacent ally is hit with an attack. The attack instead hits you and the original target gains 5 + level / 2 Temporary hit points."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Fortify, abilityType: AbilityType.Power, value: {minBonus: 5, maxBonus: 10}}],
      abilityRequirement: [{requirementAbilityName: SubthemeType.Protector, requirementType: AbilityType.Subtheme, requirementValue: 1}]
    } as AbilityModel,

    JustAFleshWound: {
      abilityName: TalentName.JustAFleshWound,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase the damage reduction of your evasion powers and abilities by $" + AbilityBonus.Dodge + ". The turn after making a dodge you may use your Rapid Recovery feature as a minor action OR heal for $" + AbilityBonus.Healing + " as a swift action.",
        fullDescription:
          "Increase the damage reduction of your evasion powers and abilities by 2 + (level / 4). The turn after making a dodge you may use your Rapid Recovery feature as a minor action OR heal for 2  + (level / 4) as a swift action."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Dodge, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 4}},
        {abilityBonus: AbilityBonus.Healing, abilityType: AbilityType.Talent, value: {minBonus: 2, maxBonus: 2}}]
    } as AbilityModel,

    IndomitableResolve: {
      abilityName: TalentName.IndomitableResolve,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Spend up to two recoveries. Each recovery heals for an additional $" + AbilityBonus.Healing + ".",
        fullDescription:
          "Spend up to two recoveries. Each recovery heals for an additional 3. Increase this amount by 1 at levels 4, 6, and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Healing, abilityType: AbilityType.Power, value: {minBonus: 3, maxBonus: 6}}]
    } as AbilityModel,

    AnchoredFighter: {
      abilityName: TalentName.AnchoredFighter,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Gain Forced movement Resist $" + AbilityBonus.ForcedMovementResistance + ". Your character counts as a large creature vs enemy displacement attempts.",
        fullDescription:
          "Gain Forced movement Resist 1. Your character counts as a large creature vs enemy displacement attempts. At level 6 increase the FMR to 2."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.ForcedMovementResistance, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 2}}]
    } as AbilityModel,

    AllAroundFighter: {
      ...new AbilityModel(),
      abilityName: TalentName.AllAroundFighter,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Gain $" + AbilityBonus.StartingTemporaryHitPoints + " Starting Temporary Hit Point. Flanking enemies have a -1 to hit you.",
        fullDescription:
          "Gain 1 Starting Temporary Hit Point. Flanking enemies have a -1 to hit you. (They only get a +1 instead of +2)"
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.StartingTemporaryHitPoints, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}]
    } as AbilityModel,

    FightThroughThePain: {
      ...new AbilityModel(),
      abilityName: TalentName.FightThroughThePain,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase your starting temporary hit points by $" + AbilityBonus.StartingTemporaryHitPoints + ". Once per turn when you hit an enemy with a Natural Even Hit you may reduce the amount of ongoing damage you are taking by $" + AbilityBonus.ReduceOngoing + ".",
        fullDescription:
          "Increase your starting temporary hit points by 1. Once per turn when you hit an enemy with a Natural Even Hit you may reduce the amount of ongoing damage you are taking by 1. At level 6 increase this ongoing reduction to 2."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.StartingTemporaryHitPoints, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}, {
        abilityBonus: AbilityBonus.ReduceOngoing,
        abilityType: AbilityType.Talent,
        value: {minBonus: 1, maxBonus: 2}
      }]
    } as AbilityModel,

    UnwaveringGuard: {
      ...new AbilityModel(),
      abilityName: TalentName.UnwaveringGuard,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Gain $" + AbilityBonus.Fortify + ". Until SoNT, gain Damage Resist $" + AbilityBonus.DamageResist + " and any attack that scores a critical also has a -1 DC applied to it.",
        fullDescription:
          "Gain 3 + level / 2 Temporary Hit Points. Until Start of next turn, gain Damage Resist 3 + level / 3 and any attack that scores a critical also has a -1 DC applied to it."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Fortify, abilityType: AbilityType.Power, value: {minBonus: 3, maxBonus: 8}}, {
        abilityBonus: AbilityBonus.DamageResist,
        abilityType: AbilityType.Power,
        value: {minBonus: 3, maxBonus: 6}
      }]
    } as AbilityModel,

    AspectOfTheBoar: {
      ...new AbilityModel(),
      abilityName: TalentName.AspectOfTheBoar,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "If you hit the target of a charge attack that is your size or smaller you may displace them and continue moving any distance unused by the charge. The displaced target does not get an opportunity attack, but other enemies may if you move through threatened squares. These extra squares of movement must be in a straight path. You also gain a $" + AbilityBonus.Charging + " attack damage bonus to charge attacks.",
        fullDescription:
          "If you hit the target of a charge attack that is your size or smaller you may displace them and continue moving any distance unused by the charge. The displaced target does not get an opportunity attack, but other enemies may if you move through threatened squares. These extra squares of movement must be in a straight path. You also gain a 1 attack damage bonus to charge attacks."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Charging, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}]
    } as AbilityModel,

    CripplingStrike: {
      ...new AbilityModel(),
      abilityName: TalentName.CripplingStrike,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Any target struck by your opportunity attack can’t move for the rest of the triggering action.",
        fullDescription:
          "Any target struck by your opportunity attack can’t move for the rest of the triggering action."
      }
    } as AbilityModel,


    OpportuneStrikes: {
      ...new AbilityModel(),
      abilityName: TalentName.OpportuneStrikes,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}, {requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Gain $" + AbilityBonus.OpportunityAttackDamage + " to hit and damage with all opportunity attacks.",
        fullDescription:
          "Gain 3 to hit and damage with all opportunity attacks."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.OpportunityAttackDamage, abilityType: AbilityType.Passive, value: {minBonus: 3, maxBonus: 3}}, {
        abilityBonus: AbilityBonus.OpportunityAttackToHit,
        abilityType: AbilityType.Passive,
        value: {minBonus: 3, maxBonus: 3}
      }]
    } as AbilityModel,

    DeadEye: {
      ...new AbilityModel(),
      abilityName: TalentName.DeadEye,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}, {requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increases the range of all missile weapons by $" + AbilityBonus.MissileRangeDistance + "/$" + AbilityBonus.MissileRangeDistance + "/$" + AbilityBonus.MissileRangeDistance + ".",
        fullDescription:
          "Increases the range of all missile weapons by 5/5/5."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.MissileRangeDistance, abilityType: AbilityType.Passive, value: {minBonus: 5, maxBonus: 5}}, {
        abilityBonus: AbilityBonus.MissileRangeDistance,
        abilityType: AbilityType.Passive,
        value: {minBonus: 5, maxBonus: 5}
      }, {abilityBonus: AbilityBonus.MissileRangeDistance, abilityType: AbilityType.Passive, value: {minBonus: 5, maxBonus: 5}}]
    } as AbilityModel,

    ItsAllInTheWrist: {
      ...new AbilityModel(),
      abilityName: TalentName.ItsAllInTheWrist,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}, {requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increases the range of all thrown missile weapons by $" + AbilityBonus.ThrownRangeDistance + "/$" + AbilityBonus.ThrownRangeDistance + "/$" + AbilityBonus.ThrownRangeDistance + ".",
        fullDescription:
          "Increases the range of all thrown missile weapons by 2/2/2."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.ThrownRangeDistance, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 2}}, {
        abilityBonus: AbilityBonus.ThrownRangeDistance,
        abilityType: AbilityType.Passive,
        value: {minBonus: 2, maxBonus: 2}
      }, {abilityBonus: AbilityBonus.ThrownRangeDistance, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 2}}]
    } as AbilityModel,

    ImprovedFindWeakness: {
      ...new AbilityModel(),
      abilityName: TalentName.ImprovedFindWeakness,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase the damage done by Find Weakness by $" + AbilityBonus.FindWeakness + ".",
        fullDescription:
          "Increase the damage done by Find Weakness by 2. Increase this bonus by 1 at levels 4 and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.FindWeakness, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 4}}],
      abilityRequirement: [{requirementAbilityName: SubthemeType.FindWeakness, requirementType: AbilityType.Subtheme, requirementValue: 1}]
    } as AbilityModel,

    ReinforcedFindWeakness: {
      abilityName: TalentName.ReinforcedFindWeakness,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase your Find Weakness damage by $" + AbilityBonus.FindWeakness + ".",
        fullDescription:
          "Increase your Find Weakness damage by 4."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.FindWeakness, abilityType: AbilityType.Passive, value: {minBonus: 4, maxBonus: 4}}],
      abilityRequirement: [{requirementAbilityName: TalentName.ImprovedFindWeakness, requirementType: AbilityType.Talent, requirementValue: true}, {
        requirementAbilityName: AbilityBonus.CharacterLevel,
        requirementType: AbilityType.CharacterLevel,
        requirementValue: Level.Ten
      }]
    } as AbilityModel,

    ImprovedDuelist: {
      ...new AbilityModel(),
      abilityName: TalentName.ImprovedDuelist,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase your Duelist Damage by $" + AbilityBonus.Duelist + ".",
        fullDescription:
          "Increase your Duelist Damage by 1. This becomes a +2 bonus at level 6."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Duelist, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 2}}],
      abilityRequirement: [{requirementAbilityName: SubthemeType.Duelist, requirementType: AbilityType.Subtheme, requirementValue: 1}]
    } as AbilityModel,

    ReinforcedDuelist: {
      abilityName: TalentName.ReinforcedDuelist,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase your Duelist damage by $" + AbilityBonus.Duelist + ".",
        fullDescription:
          "Increase your Duelist damage by 2."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Duelist, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 2}}],
      abilityRequirement: [{requirementAbilityName: TalentName.ImprovedDuelist, requirementType: AbilityType.Talent, requirementValue: true}, {
        requirementAbilityName: AbilityBonus.CharacterLevel,
        requirementType: AbilityType.CharacterLevel,
        requirementValue: Level.Ten
      }]
    } as AbilityModel,

    PowerRoll: {
      ...new AbilityModel(),
      abilityName: TalentName.PowerRoll,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase the advance, tactical move or ongoing reduction of the first action of Evasive Roll by $" + AbilityBonus.EvasiveRoll + ". At Level 6 increase both actions by " + AbilityBonus.EvasiveRoll + ".",
        fullDescription:
          "Increase the advance, tactical move or ongoing reduction of the first action of Evasive Roll by 1. At level 6 increase both actions done by 1."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.EvasiveRoll, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}, {
        abilityBonus: AbilityBonus.EvasiveRoll,
        abilityType: AbilityType.Passive,
        value: {minBonus: 1, maxBonus: 1}
      }],
      abilityRequirement: [{requirementAbilityName: PowerPointName.EvasiveRoll, requirementType: AbilityType.PowerPointFeature, requirementValue: 1}]
    } as AbilityModel,

    RangedSuperiority: {
      ...new AbilityModel(),
      abilityName: TalentName.RangedSuperiority,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "If two or more allies have combat superiority due to flanking an enemy any range attack you make against the target also has combat superiority.",
        fullDescription:
          "If two or more allies have combat superiority due to flanking an enemy any range attack you make against the target also has combat superiority."
      },
    } as AbilityModel,

    DefensiveMobility: {
      ...new AbilityModel(),
      abilityName: TalentName.DefensiveMobility,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "All opportunity attacks provoked from advancing have a -1 to hit and -2 DC.",
        fullDescription:
          "All opportunity attacks provoked from advancing have a -1 to hit and -2 DC."
      },
    } as AbilityModel,

    OpportuneDefense: {
      ...new AbilityModel(),
      abilityName: TalentName.OpportuneDefense,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Opportunity attacks against you suffer a -2 to hit and a -1 DC.",
        fullDescription:
          "Opportunity attacks against you suffer a -2 to hit and a -1 DC."
      },
    } as AbilityModel,

    CraftyEscape: {
      ...new AbilityModel(),
      abilityName: TalentName.CraftyEscape,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Gain $" + AbilityBonus.CriticalResist + " critical resistance. If you start your turn threatened by one or more enemies your careful step action becomes tactical.",
        fullDescription:
          "Gain 1 critical resistance. If you start your turn threatened by one or more enemies your careful step action becomes tactical."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.CriticalResist, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}],
    } as AbilityModel,

    NimbleFootwork: {
      ...new AbilityModel(),
      abilityName: TalentName.NimbleFootwork,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase your starting THP by $" + AbilityBonus.StartingTemporaryHitPoints + ". Your tactical movement and advancing can move through squares occupied by enemies.",
        fullDescription:
          "Increase your starting THP by 1. Your tactical movement and advancing can move through squares occupied by enemies."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.StartingTemporaryHitPoints, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}],
    } as AbilityModel,

    EvasiveFire: {
      ...new AbilityModel(),
      abilityName: TalentName.EvasiveFire,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Standard,
      fullDescriptionAbilityType: AbilityType.Power,
      briefDescriptionAbilityType: AbilityType.Power,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "You are able to resolve a ranged attack as if it were a melee 1 attack (targets AD, doesn't provoke OAs). This attack gets a +3 to hit. After this attack resolves you may tactically move 2 squares.",
        fullDescription:
          "You are able to resolve a ranged attack as if it were a melee 1 attack (targets AD, doesn't provoke OAs). This attack gets a +3 to hit. After this attack resolves you may tactically move 2 squares."
      },
    } as AbilityModel,

    SpringStep: {
      ...new AbilityModel(),
      abilityName: TalentName.SpringStep,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase the number of squares you can advance when performing the careful step action by $" + AbilityBonus.CarefulStep + ".",
        fullDescription:
          "Increase the number of squares you can advance when performing the careful step action by 1."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.CarefulStep, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}],
    } as AbilityModel,

    TurnTheTables: {
      ...new AbilityModel(),
      abilityName: TalentName.TurnTheTables,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Move,
      briefDescriptionAbilityType: AbilityType.Feature,
      fullDescriptionAbilityType: AbilityType.Feature,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "All enemies flanking you grant you combat superiority 3 and count as isolated until the end of your turn.",
        fullDescription:
          "All enemies flanking you grant you combat superiority 3 and count as isolated until the end of your turn."
      },
    } as AbilityModel,

    Murder: {
      ...new AbilityModel(),
      abilityName: TalentName.Murder,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Move,
      briefDescriptionAbilityType: AbilityType.Power,
      fullDescriptionAbilityType: AbilityType.Power,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Get a +2 hit bonus to and an attack damage bonus of $" + AbilityBonus.AttackDamage + " to the next attack you make against this turn against a creature that is isolated or granting you combat superiority. If this attack misses this power is refreshed.",
        fullDescription:
          "Get a +2 hit bonus to and an attack damage bonus of (17 + level * 3) to the next attack you make against this turn against a creature that is isolated or granting you combat superiority. If this attack misses this power is refreshed."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.Power, value: {minBonus: 17, maxBonus: 47}}],
    } as AbilityModel,

    EasyMark: {
      ...new AbilityModel(),
      abilityName: TalentName.EasyMark,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Swift,
      briefDescriptionAbilityType: AbilityType.Power,
      fullDescriptionAbilityType: AbilityType.Power,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Mark a target as a swift action until the end of your turn. The marked target grants you combat superiority 3 and can only use passive defense against your attacks.",
        fullDescription:
          "Mark a target as a swift action until the end of your turn. The marked target grants you combat superiority 3 and can only use passive defense against your attacks."
      }
    } as AbilityModel,

    CounterStrike: {
      ...new AbilityModel(),
      abilityName: TalentName.CounterStrike,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Inflict $" + AbilityBonus.CounterStrike + " damage to an enemy that you threaten that misses you with an attack. This damage stacks with any damage done from the Dualist feature.",
        fullDescription:
          "Inflict 5 damage to an enemy that you threaten that misses you with an attack. This damage stacks with any damage done from the Dualist feature. Increase this damage by 1 at levels 2, 4, 6, 8, and 10."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.CounterStrike, abilityType: AbilityType.Passive, value: {minBonus: 5, maxBonus: 10}}],
    } as AbilityModel,

    FindWeaknessMastery: {
      abilityName: TalentName.FindWeaknessMastery,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Increase the damage of your Find Weakness ability by $" + AbilityBonus.FindWeakness + " and gain the Weakness Exposed feature.",
        fullDescription:
          "Increase the damage of your Find Weakness ability by 2 and gain the Weakness Exposed feature."
      },
      associatedAbilities: [TalentName.WeaknessExposed],
      mechanicalBonus: [{abilityBonus: AbilityBonus.FindWeakness, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 2}}],
      abilityRequirement: [{requirementAbilityName: SubthemeType.FindWeakness, requirementType: AbilityType.Subtheme, requirementValue: ThemeStrength.Lesser}]
    } as AbilityModel,

    WeaknessExposed: {
      abilityName: TalentName.WeaknessExposed,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Move,
      fullDescriptionAbilityType: AbilityType.Feature,
      abilityDescription: {
        briefDescription:
          "Increase the damage of your next Find Weakness ability this turn by $" + AbilityBonus.FindWeakness + ".",
        fullDescription:
          "Increase the damage of your next Find Weakness ability this turn by 5 + level / 2."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.FindWeakness, abilityType: AbilityType.Feature, value: {minBonus: 5, maxBonus: 10}}],
    } as AbilityModel,

    MasterDuelist: {
      abilityName: TalentName.MasterDuelist,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Increase the damage of your Duelist ability by $" + AbilityBonus.Duelist + " and gain the Deadly Guard feature.",
        fullDescription:
          "Increase you Dualist damage by 1 and gain the Deadly Guard feature."
      },
      associatedAbilities: [TalentName.DeadlyGuard],
      mechanicalBonus: [{abilityBonus: AbilityBonus.Duelist, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}],
      abilityRequirement: [{requirementAbilityName: SubthemeType.Duelist, requirementType: AbilityType.Subtheme, requirementValue: ThemeStrength.Lesser}]
    } as AbilityModel,

    DeadlyGuard: {
      abilityName: TalentName.DeadlyGuard,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Move,
      fullDescriptionAbilityType: AbilityType.Feature,
      abilityDescription: {
        briefDescription:
          "Increase your Duelist ability by $" + AbilityBonus.Duelist + ".",
        fullDescription:
          "Increase you Duelist damage by 3, increasing by 1 at levels 4, 6, and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Duelist, abilityType: AbilityType.Feature, value: {minBonus: 3, maxBonus: 6}}],
    } as AbilityModel,

    EvasionMastery: {
      abilityName: TalentName.EvasionMastery,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Gain a $" + AbilityBonus.PassiveDefense + " and gain the Back Flip feature.",
        fullDescription:
          "Gain a +1 bonus to PD and gain the Back Flip feature."
      },
      associatedAbilities: [TalentName.BackFlip],
      mechanicalBonus: [{abilityBonus: AbilityBonus.PassiveDefense, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}],
      abilityRequirement: [{requirementAbilityName: SubthemeType.Evasion, requirementType: AbilityType.Subtheme, requirementValue: ThemeStrength.Minor}]
    } as AbilityModel,

    BackFlip: {
      abilityName: TalentName.BackFlip,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Move,
      fullDescriptionAbilityType: AbilityType.Feature,
      abilityDescription: {
        briefDescription:
          "You perform a back flip allowing you to advance $" + AbilityBonus.Advance + "square. The first opportunity attack made by a creature while back flipping automatically misses.",
        fullDescription:
          "You perform a back flip allowing you to advance 1 square. The first opportunity attack made by a creature while back flipping automatically misses."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Advance, abilityType: AbilityType.Feature, value: {minBonus: 1, maxBonus: 1}}],
    } as AbilityModel,

    DreadPirateTactics: {
      abilityName: TalentName.DreadPirateTactics,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase your Duelist damage by $" + AbilityBonus.Duelist + " but gain a $" + AbilityBonus.CriticalStrike + " critical strikes. Increase the Duelist damage provided by To the Pain by $" + AbilityBonus.ToThePain + ".",
        fullDescription:
          "Increase your Duelist damage by 1 but gain a -1 to critical strikes. Increase the Duelist Damage bonus provided by To the Pain by 1, increasing by 1 at levels 4, 6, and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Duelist, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}},
        {abilityBonus: AbilityBonus.CriticalStrike, abilityType: AbilityType.Passive, value: {minBonus: -1, maxBonus: -1}},
        {abilityBonus: AbilityBonus.ToThePain, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 4}}],
      abilityRequirement: [{requirementAbilityName: AbilityBonus.ToThePain, requirementType: AbilityType.PowerPointFeature, requirementValue: true}]
    } as AbilityModel,

    TwistedDagger: {
      abilityName: TalentName.TwistedDagger,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase the damage of your find weakness feature by $" + AbilityBonus.FindWeakness + ". Increase the damage of your Backstab powerpoint feature by $" + AbilityBonus.Backstab + ".",
        fullDescription:
          "Increase the damage of your find weakness feature by 1. Increase the damage of your Backstab powerpoint feature by 2. Increase your bonus damage to Backstab by 1 at levels 2, 4, 6, and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.FindWeakness, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}},
        {abilityBonus: AbilityBonus.Backstab, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 6}}],
      abilityRequirement: [{requirementAbilityName: AbilityBonus.Backstab, requirementType: AbilityType.PowerPointFeature, requirementValue: true}]
    } as AbilityModel,

    UnboundReflex: {
      abilityName: TalentName.UnboundReflex,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Gain $" + AbilityBonus.ReflexDefense + " to Reflex defense. All attacks that primarily target your Reflex defense have a -2 DC.",
        fullDescription:
          "Gain 1 to Reflex defense. All attacks that primarily target your Reflex defense have a -2 DC."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.ReflexDefense, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}],
    } as AbilityModel,

    PerfectDefense: {
      abilityName: TalentName.PerfectDefense,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Gain $" + AbilityBonus.PassiveDefense + " to your passive defense (cannot exceed AD -1).",
        fullDescription:
          "Gain 2 to your passive defense (cannot exceed AD -1)."
      },
      associatedAbilities: [TalentName.PerfectDodge],
      mechanicalBonus: [{abilityBonus: AbilityBonus.PassiveDefense, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 2}}],
    } as AbilityModel,

    PerfectDodge: {
      abilityName: TalentName.PerfectDodge,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      abilityDescription: {
        briefDescription:
          "Once per combat you can reduce the damage and ongoing applied by an attack by $" + AbilityBonus.TemporaryDamageResist + ".",
        fullDescription:
          "Once per combat you can reduce the damage and ongoing applied by an attack by 2. This increases by 1 at levels 4 and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.TemporaryDamageResist, abilityType: AbilityType.Ability, value: {minBonus: 2, maxBonus: 4}}]
    } as AbilityModel,


    SuperiorIsolation: {
      abilityName: TalentName.SuperiorIsolation,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        fullDescription:
          "Enemies granting you combat superiority from flanking count as being isolated.",
        briefDescription:
          "Enemies granting you combat superiority from flanking count as being isolated."
      }
    } as AbilityModel,

    FirstStrike: {
      abilityName: TalentName.FirstStrike,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        fullDescription:
          "All creatures that have not yet acted in combat grant you combat superiority and count as being isolated.",
        briefDescription:
          "All creatures that have not yet acted in combat grant you combat superiority and count as being isolated."
      }
    } as AbilityModel,

    AtTheReady: {
      abilityName: TalentName.AtTheReady,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "At the start of your turn gain " + AbilityBonus.TemporaryDamageResist + " damage resist that lasts until the end of the round.  This passive no longer applies once round 3 of combat starts.",
        fullDescription:
          "At the start of your turn gain 2 damage resist that lasts until the end of the round.  This passive no longer applies once round 3 of combat starts. Increase the resistance by 1 at levels 4 and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.TemporaryDamageResist, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 4}}],
    } as AbilityModel,

    UnfairAdvantage: {
      abilityName: TalentName.UnfairAdvantage,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Gain an additional +1 hit bonus against targets with combat superiority.",
        fullDescription:
          "Gain an additional +1 hit bonus against targets with combat superiority."
      }
    } as AbilityModel,

    DeftOpening: {
      abilityName: TalentName.DeftOpening,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Gain a +1 hit bonus against isolated targets.",
        fullDescription:
          "Gain a +1 hit bonus against isolated targets."
      }
    } as AbilityModel,

    Soothsayer: {
      abilityName: TalentName.Soothsayer,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Grant a target in 10 one of the following:",
        fullDescription:
          "Grant a target in 10 one of the following:"
      },
      associatedAbilities: [TalentName.SoothsayerHeal, TalentName.SoothsayerMend],
      abilityRequirement: [{requirementAbilityName: AbilityBonus.Healing, requirementType: AbilityType.Power, requirementValue: true}],
    } as AbilityModel,

    SoothsayerHeal: {
      abilityName: TalentName.SoothsayerHeal,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      abilityDescription: {
        briefDescription:
          "Heal a blooded target for " + AbilityBonus.Healing + " Hit points.",
        fullDescription:
          "Heal a blooded target for for 8 hit points.  Increase this by 1 at levels 2, 4, 5, 7, 8, 10.  Increase by 2 at levels 3, 6, 9."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Healing, abilityType: AbilityType.Power, value: {minBonus: 8, maxBonus: 20}}]
    } as AbilityModel,

    SoothsayerMend: {
      abilityName: TalentName.SoothsayerMend,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      abilityDescription: {
        briefDescription:
          "Reduce ongoing by " + AbilityBonus.ReduceOngoing + ".",
        fullDescription:
          "Reduce ongoing by 4.  Increase by 1 at levels 3, 5, 7 and 9"
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.ReduceOngoing, abilityType: AbilityType.Power, value: {minBonus: 4, maxBonus: 8}}]
    } as AbilityModel,

    ThievesIntuition: {
      abilityName: TalentName.ThievesIntuition,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Gain advantage to initiative rolls.",
        fullDescription:
          "Gain advantage to initiative rolls."
      }
    } as AbilityModel,

    PressTheAdvantage: {
      abilityName: TalentName.PressTheAdvantage,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "After striking a creature with combat superiority cause the target to gain Stun (2).",
        fullDescription:
          "After striking a creature with combat superiority cause the target to gain Stun (2)."
      }
    } as AbilityModel,

    CleverPloy: {
      abilityName: TalentName.CleverPloy,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "When an adjacent enemy uses a forced movement ability against you, you may choose to swap positions with the enemy instead of being moved.  The enemy gains disoriented (1).",
        fullDescription:
          "When an adjacent enemy uses a forced movement ability against you, you may choose to swap positions with the enemy instead of being moved.  The enemy gains disoriented (1)."
      }
    } as AbilityModel,

    AgileEvasion: {
      abilityName: TalentName.AgileEvasion,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Increase the damage reduction of your evasion powers and abilities by " + AbilityBonus.Dodge + ". On your next turn you are able to tactically move " + AbilityBonus.TacticalMovement + " as a minor action OR as a swift action reduce your current ongoing by " + AbilityBonus.ReduceOngoing + ".",
        fullDescription:
          "Increase the damage reduction of your evasion powers and abilities by 2 + (level / 4). On your next turn you are able to tactically move 1 as a minor action OR as a swift action reduce your current ongoing by 1 + (level / 6)."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Dodge, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 4}},
        {abilityBonus: AbilityBonus.TacticalMovement, abilityType: AbilityType.Ability, value: {minBonus: 1, maxBonus: 1}},
        {abilityBonus: AbilityBonus.ReduceOngoing, abilityType: AbilityType.Ability, value: {minBonus: 1, maxBonus: 2}}]
    } as AbilityModel,

    Regroup: {
      abilityName: TalentName.Regroup,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Spend up to 2 recoveries and gain a -1 DC against all attacks until the start of your next turn.",
        fullDescription:
          "Spend up to 2 recoveries and gain a -1 DC against all attacks until the start of your next turn."
      }
    } as AbilityModel,

    Ghost: {
      abilityName: TalentName.Ghost,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Gain " + AbilityBonus.Fortify + " THP.  Until the end of your turn, you gain a +2 speed bonus and all of your movement becomes tactical.",
        fullDescription:
          "Gain 3 + level / 2 Temporary Hit Points.  Until the end of your turn, you gain a +2 speed bonus and all of your movement becomes tactical (movement does not provoke opportunity attacks)."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Fortify, abilityType: AbilityType.Power, value: {minBonus: 3, maxBonus: 8}}]
    } as AbilityModel,

    GoForTheKill: {
      abilityName: TalentName.GoForTheKill,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "The next application of Find Weakness of Duelist damage dealt this turn does " + AbilityBonus.AttackDamage + " additional damage.",
        fullDescription:
          "The next application of Find Weakness or Duelist damage dealt this turn does 11 + 2 * level additional damage."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.Power, value: {minBonus: 13, maxBonus: 31}}]
    } as AbilityModel,

    ShadowGuard: {
      abilityName: TalentName.ShadowGuard,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Lose threatening and all incoming attacks have a -3 DC applied to them until the start of your next.",
        fullDescription:
          "Lose threatening and all incoming attacks have a -3 DC applied to them until the start of your next."
      }
    } as AbilityModel,

    FatalMistake: {
      abilityName: TalentName.FatalMistake,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "When a threatened enemy makes an odd attack roll against you, before their attack is resolved, you can perform a -3 DC basic attack with a +2 to hit against the triggering enemy. " +
          "If the attack hits the creature loses all awareness track effects and gains Dazed (2).  If this attack misses the power is not expended.",
        fullDescription:
          "When a threatened enemy makes an odd attack roll against you, before their attack is resolved, you can perform a -3 DC basic attack with a +2 to hit against the triggering enemy. " +
          "If the attack hits the creature loses all awareness track effects and gains Dazed (2).  If this attack misses the power is not expended."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.Power, value: {minBonus: 13, maxBonus: 31}}]
    } as AbilityModel,

    OutOfTheGates: {
      abilityName: TalentName.OutOfTheGates,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Start combat with " + AbilityBonus.StartingTemporaryHitPoints + " additional THP. Until the start of round 3 gain a +2 bonus to speed.",
        fullDescription:
          "Start combat with 1 additional Temporary Hit Point.  Until the start of round 3 gain a +2 bonus to speed."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.StartingTemporaryHitPoints, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}]
    } as AbilityModel,

    ArcaneConduit: {
      abilityName: TalentName.ArcaneConduit,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Magic, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Ignore any casting penalties from armor and you can use a shield in the offhand. Additionally increase your starting THP by " + AbilityBonus.StartingTemporaryHitPoints + ".",
        fullDescription:
          "Ignore any casting penalties from armor and you can use a shield in the offhand. Additionally increase your starting THP by 1.  Increase staring temporary hit points by 1 at level 6."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.StartingTemporaryHitPoints, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 2}},
        {abilityBonus: AbilityBonus.IgnoreArmorPenalty, abilityType: AbilityType.Passive, value: true}]
    } as AbilityModel,

    KineticReinforcement: {
      abilityName: TalentName.KineticReinforcement,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Magic, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Gain a " + AbilityBonus.ActiveDefense + " to AD if you are wearing light or medium armor, or caster armor.  This bonus doesn’t stack with any other AD bonuses.",
        fullDescription:
          "Gain a +1 to AD if you are wearing light or medium armor, or caster armor.  This bonus doesn't stack with any other AD bonuses."
      },
      mechanicalBonus: [{
        abilityBonus: AbilityBonus.ActiveDefense, abilityType: AbilityType.Passive, abilityQualifier: [
          {requirementAbilityName: AbilityBonus.NonStacking, requirementValue: true},
          {requirementAbilityName: ArmorType.MediumArmor, requirementValue: true},
          {requirementAbilityName: ArmorType.LightArmor, requirementValue: true},
          {requirementAbilityName: ArmorType.None, requirementValue: true},
          {requirementAbilityName: ArmorType.CasterArmor, requirementValue: true}
        ],
        value: {minBonus: 1, maxBonus: 1}
      }],
      abilityRequirement: [
        {
          requirementAbilityName: AttributeName.Reasoning,
          requirementType: AbilityType.Attribute,
          requirementValue: AttributeStrength.Heroic,
          canAlsoMeetThisRequirement: 'AttributeRequirement'
        },
        {requirementAbilityName: AttributeName.SelfDiscipline, requirementType: AbilityType.Attribute, requirementValue: AttributeStrength.Heroic, canAlsoMeetThisRequirement: 'AttributeRequirement'},
        {requirementAbilityName: AttributeName.Presence, requirementType: AbilityType.Attribute, requirementValue: AttributeStrength.Heroic, canAlsoMeetThisRequirement: 'AttributeRequirement'}]
    } as AbilityModel,
  };
}
