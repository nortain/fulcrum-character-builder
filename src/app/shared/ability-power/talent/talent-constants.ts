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

export type TalentConstants = { [K in TalentName]: AbilityModel };

export function getTalentObject(): TalentConstants {
  return {
    AcceleratedReflexes: {
      ...new AbilityModel(),
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
            "Gain a +2 to empowered attacks but you have a -1 to critical strikes.  At level 2 remove the critical strike penalty.  At level 6 your empowered bonus becomes +3."
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
            "Increase the amount of Healing granted by actions with the healing keyword by 1.  Increase by 1 at level 6."
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
        briefDescription: "Any spell or ability with the Forced Movement keyword has its push, pull, teleport and slide effects increased by 1.  Gain a +1 bonus to critical strikes.",
        fullDescription:
          "Any spell or ability with the Forced Movement keyword has its push, pull, teleport and slide effects increased by 1.  Gain a +1 bonus to critical strikes."
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
          "Your Missile Defense becomes your Active Defense. Increase your critical resistance by 1.  Increase this bonus to 2 at level 6. Gain the ability Deflection."
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
          "Increase Range attack damage by +1.  Increase this amount by 1 at level 6."
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
          "Increase your damage bonus for dual wielding attacks by +2.  Increase this bonus by 1 at levels 4 and 8."
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
          "Gain a +2 attack damage bonus when charging.  Increase this damage by 1 and levels 4 and 8."
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
          "Gain a +1 to attack damage.  At level 6 this bonus becomes +2."
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
          "Gain a +3 to critical strikes.  Increase this bonus by 1 at levels 4, 6, and 8."
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
          "Any spell or ability with the Friendly Movement keyword has its tactical move, shift, slide or teleport distance increased by 1 additional square. Increase your starting THP by 1.",
        fullDescription:
          "Any spell or ability with the Friendly Movement keyword has its tactical move, shift, slide or teleport distance increased by 1 additional square. Increase your starting THP by 1."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.FriendlyMovement, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}},
        {abilityBonus: AbilityBonus.StartingTemporaryHitPoints, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}]
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
          "Attacks made with a -2 DC penalty or less do 1/2 damage on a miss.  Gain a +" + AbilityBonus.EmpoweredDamage + " bonus to empowered attacks",
        fullDescription:
          "Attacks made with a -2 DC penalty or less do 1/2 damage on a miss.  Gain a +1 bonus to empowered attacks.  This bonus increases by 1 at level  6."
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
          "Tactically move speed - 3 squares.  You may drag up to three adjacent equal size creatures with you.  You may also choose to spend a recovery.",
        fullDescription:
          "Tactically move speed - 3 squares.  You may drag up to three adjacent equal size creatures with you.  You may also choose to spend a recovery."
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
      mechanicalBonus: [{abilityBonus: AbilityBonus.Keyword, abilityType: AbilityType.Power, value: AbilityBonus.FriendlyMovement}, // special case
        {abilityBonus: AbilityBonus.FriendlyMovement, abilityType: AbilityType.Power, value: {minBonus: 4, maxBonus: 4}}
      ]
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
          "When an ally within 10 squares becomes bloodied from an attack you can have that ally $" + AbilityBonus.ToGenerateTemporaryHitPoints + " Temporary Hit Points",
        fullDescription:
          "When an ally within 10 squares becomes bloodied from an attack you can have that ally gain 6 + level * 1.2 Temporary Hit Points"
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.ToGenerateTemporaryHitPoints, abilityType: AbilityType.Power, value: {minBonus: 7, maxBonus: 18}}],
      abilityRequirement: [{requirementAbilityName: AbilityBonus.ToGenerateTemporaryHitPoints, requirementType: AbilityType.Power, requirementValue: true}],
    } as AbilityModel,

    GreaterJuggernaut: {
      abilityName: TalentName.GreaterJuggernaut,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Increase the damage resistance of Juggernaut by 1 and gain the Armor Up feature.",
        fullDescription:
          "Increase the damage resistance of Juggernaut by 1 and gain the Armor Up feature."
      },
      associatedAbilities: [TalentName.ArmorUp],
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
          "You gain $" + AbilityBonus.ToGenerateTemporaryHitPoints + " THP.",
        fullDescription:
          "You gain 3 THP.  Increase the THP amount by 1 at levels 4, 6, and 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.ToGenerateTemporaryHitPoints, abilityType: AbilityType.Feature, value: {minBonus: 3, maxBonus: 6}}],
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
          "Increase your active defense by $" + AbilityBonus.ActiveDefense + ".",
        fullDescription:
          "Increase your active defense by 1."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.ActiveDefense, abilityType: AbilityType.Passive, value: {minBonus: 1, maxBonus: 1}}]
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
          " Increase attack damage by +1.  Increase this amount by 1 at level 6."
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
          "Increase your attack damage by 2.  Increase this bonus by 1 at levels 4 and 8."
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
          "Gain a +1 to hit to and " + AbilityBonus.ResistancePiercing + " resistance piercing to all attacks until the start of your next turn.",
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
          "Gain 3 to your empowered damage bonus.  Increase this bonus by 1 at levels 4 and 8."
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
          "You gain a +$" + AbilityBonus.ActiveDefense + " bonus to AD when wearing light armor or less. This bonus does not stack with any other AD bonuses (shield, evasion, quickness).",
        fullDescription:
          "You gain a +1 bonus to AD when wearing light armor or less.  This bonus does not stack with any other AD bonuses (shield, evasion, quickness)."
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
          "You gain a +$" + AbilityBonus.ActiveDefense + " bonus to AD when wearing medium armor or less. This bonus does not stack with any other AD bonuses (shield, evasion, quickness).",
        fullDescription:
          "You gain a +1 bonus to AD when wearing medium armor or less.  This bonus does not stack with any other AD bonuses (shield, evasion, quickness)."
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
          "Gain " + AbilityBonus.FortitudeDefense + " to Fortitude defense. All attacks that primarily target your Fortitude defense have a -2 DC.",
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
          "When attacking creatures in vision restricted squares you can reduce any vision penalty you may receive by 2.  You are never forced to use your passive defense due to lighting conditions.",
        fullDescription:
          "When attacking creatures in vision restricted squares you can reduce any vision penalty you may receive by 2.  You are never forced to use your passive defense due to lighting conditions."
      },
    } as AbilityModel,

    Unbreakable: {
      abilityName: TalentName.Unbreakable,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      abilityCost: [{requirementAbilityName: TalentType.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Spend a recovery to ignore a killing blow.  Set your hit points to recovery value + $" + AbilityBonus.RecoveryValue,
        fullDescription:
          "Spend a recovery to ignore a killing blow.  Set your hit points to recovery value + 5 + level / 2."
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
          "Increase your empowered damage by $" + AbilityBonus.EmpoweredDamage + ".  Once per turn when you hit an enemy with a weapon or implement attack on your turn you may slide them up to two squares.  The enemy must end the slide in an adjacent square. This slide can take place before you displace the enemy.",
        fullDescription:
          "Increase your empowered damage by +1.  Once per turn when you hit an enemy with a weapon or implement attack on your turn you may slide them up to two squares.  The enemy must end the slide in an adjacent square. This slide can take place before you displace the enemy."
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
          "You may pull an enemy within 2 squares of you 1 square.  Increase the damage of your Protector Aura by $" + AbilityBonus.Protector + " until SoNT.",
        fullDescription:
          "You may pull an enemy within 2 squares of you 1 square.  Increase the damage of your Protector Aura by 6 until SoNT.  Increase by 2 at levels 2, 4, 6 and by 3 at level 8"
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
          "Gain $" + AbilityBonus.EmpoweredDamage + " to your empowered damage bonus.  Increase the bonus damage provided by your Rage Feature by $" + AbilityBonus.Rage + ".",
        fullDescription:
          "Gain 1 to your empowered damage bonus.  Increase the bonus damage provided by your Rage Feature by 1.  Increase your Rage bonus damage by 1 at levels 4, 6, and 8."
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
          "Increase your protector aura damage by 2. Increase your rebuke bonus by 4.  Increase your rebuke bonus by 2 at levels 2, 4, 6 and increase by 3 at level 8."
      },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Protector, abilityType: AbilityType.Passive, value: {minBonus: 2, maxBonus: 2}}, {
        abilityBonus: AbilityBonus.Rebuke,
        abilityType: AbilityType.Passive,
        value: {minBonus: 4, maxBonus: 13}
      }],
      abilityRequirement: [{requirementAbilityName: AbilityBonus.Rebuke, requirementType: AbilityType.PowerPointFeature, requirementValue: true}]
    } as AbilityModel,
  };
}
