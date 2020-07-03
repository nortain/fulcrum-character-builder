import {AbilityModel} from "../ability-model";
import {ActionType} from "../../action/action-type.enum";
import {AbilityType} from "../ability-type.enum";
import {AbilityBonus} from "../ability-bonus.enum";
import {TalentStrength} from "./talent-strength.enum";
import {AttributeStrength} from "../../attribute/attribute-enums/attribute-strength.enum";
import {TalentName} from "./talent-name.enum";
import {Level} from "../../character/level.enum";

export type TalentConstants = {[K in TalentName]: AbilityModel };

export function getTalentObject(): TalentConstants {
  return {
    AcceleratedReflexes: {
      ...new AbilityModel(),
      abilityName: TalentName.AcceleratedReflexes,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementType: AbilityBonus.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription:
        {
          briefDescription: "Gain a +3 to Initiative.",
          fullDescription: "Gain a +3 to Initiative."
        },
      mechanicalBonus: [
        {abilityType: AbilityBonus.Initiative, value: {minBonus: 3, maxBonus: 3}}
      ]
    } as AbilityModel,
    Deflection: {
      ...new AbilityModel(),
      abilityName: TalentName.Deflection,
      abilityType: AbilityType.Ability,
      abilityAction: ActionType.Free,
      abilityDescription: {
        briefDescription: "Reduce the damage of an attack against AD by $DamageResist. If the attack is a burst or range attack the reduction becomes $" + AbilityBonus.DamageResist,
        fullDescription: "Reduce the damage of an attack against AD by 4 + level / 3. If the attack is a burst or range attack the reduction becomes 5 + level / 2"
      },
      mechanicalBonus: [
        {abilityType: AbilityBonus.DamageResist, value: {minBonus: 4, maxBonus: 7}},
        {abilityType: AbilityBonus.DamageResist, value: {minBonus: 5, maxBonus: 10}}
      ]
    } as AbilityModel,
    EmpoweredStrikes: {
      ...new AbilityModel(),
      abilityName: TalentName.EmpoweredStrikes,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementType: AbilityBonus.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription:
        {
          briefDescription: "Gain a +$" + AbilityBonus.EmpoweredDamage + " to empowered attacks but you have a $" + AbilityBonus.CriticalStrike + " to critical strikes.",
          fullDescription:
            "Gain a +2 to empowered attacks but you have a -1 to critical strikes.  At level 2 remove the critical strike penalty.  At level 6 your empowered bonus becomes +3."
        },
      mechanicalBonus: [
        {abilityType: AbilityBonus.EmpoweredDamage, value: {minBonus: 2, maxBonus: 3}},
        {abilityType: AbilityBonus.CriticalStrike, value: {minBonus: -1, maxBonus: 0}, adjustLevel: Level.Two}
      ]
    } as AbilityModel,
    HealingSpecialization: {
      ...new AbilityModel(),
      abilityName: TalentName.HealingSpecialization,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementType: AbilityBonus.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription:
        {
          briefDescription: "Increase the amount of Healing granted by actions with the healing keyword by $Healing.",
          fullDescription:
            "Increase the amount of Healing granted by actions with the healing keyword by 1.  Increase by 1 at level 6."
        },
      mechanicalBonus: [
        {abilityType: AbilityBonus.Healing, value: {minBonus: 1, maxBonus: 2}}
      ]
    } as AbilityModel,
    ImprovedController: {
      abilityName: TalentName.ImprovedController,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementType: AbilityBonus.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription: "Any spell or ability with the Forced Movement keyword has its push, pull, teleport and slide effects increased by 1.  Gain a +1 bonus to critical strikes.",
        fullDescription:
          "Any spell or ability with the Forced Movement keyword has its push, pull, teleport and slide effects increased by 1.  Gain a +1 bonus to critical strikes."
      }
      ,
      mechanicalBonus: [
        {abilityType: AbilityBonus.CriticalStrike, value: {minBonus: 1, maxBonus: 1}},
        {abilityType: AbilityBonus.ForcedMovement, value: {minBonus: 1, maxBonus: 1}}
      ]
    } as AbilityModel,
    ImprovedVitality: {
      ...new AbilityModel(),
      abilityName: TalentName.ImprovedVitality,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementType: AbilityBonus.Universal, requirementValue: TalentStrength.Lesser}],
      abilityDescription:
        {
          briefDescription: "Increase your starting THP by $" + AbilityBonus.StartingTemporaryHitPoints + ".",
          fullDescription:
            "Increase your starting THP by 3. Increase this amount by 1 at levels 3, 6, and 9"
        },
      mechanicalBonus: [
        {abilityType: AbilityBonus.StartingTemporaryHitPoints, value: {minBonus: 3, maxBonus: 6}}
      ]
    } as AbilityModel,
    MissileParry: {
      abilityName: TalentName.MissileParry,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementType: AbilityBonus.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription: "Gain the following:\n" +
          "Your Missile Defense becomes your Active Defense. Increase your critical resistance by $CriticalResist. Gain the ability Deflection",
        fullDescription:
          "<i>Requires Heroic Agility</i>\n" +
          "Your Missile Defense becomes your Active Defense. Increase your critical resistance by 1.  Increase this bonus to 2 at level 6. Gain the ability Deflection."
      },
      mechanicalBonus: [
        {abilityType: AbilityBonus.MissileDefense, value: AbilityBonus.ActiveDefense},
        {abilityType: AbilityBonus.CriticalResist, value: {minBonus: 1, maxBonus: 2}}
      ],
      abilityRequirement: [{requirementType: AbilityBonus.Agility, requirementValue: AttributeStrength.Heroic}],
      associatedAbilities: [TalentName.Deflection]
    } as AbilityModel,
    AdvancedWeaponTrainingRanged: {
      abilityName: TalentName.AdvancedWeaponTrainingRanged,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementType: AbilityBonus.Combat, requirementValue: TalentStrength.Greater}, {requirementType: AbilityBonus.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "The character gains all the following benefits:",
        fullDescription:
          "<i>At Most a character can have 1 Advanced Weapon Training Talent</i>" +
          "The character gains all the following benefits:"
      },
      abilityRequirement: [{requirementType: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
      associatedAbilities: [TalentName.MeleeArcher, TalentName.VulnerableShots, TalentName.SureShot]
    } as AbilityModel,
    MeleeArcher: {
      abilityName: TalentName.MeleeArcher,
      abilityType: AbilityType.Passive,
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
      abilityType: AbilityType.Passive,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "Increase Range attack damage by $AttackDamage",

        fullDescription:
          "Increase Range attack damage by +1.  Increase this amount by 1 at level 6."
      },
      mechanicalBonus: [
        {abilityType: AbilityBonus.AttackDamage, value: {minBonus: 1, maxBonus: 2}}
      ]
    } as AbilityModel,


    AdvancedWeaponTrainingTwoWeaponFighting: {
      abilityName: TalentName.AdvancedWeaponTrainingTwoWeaponFighting,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementType: AbilityBonus.Combat, requirementValue: TalentStrength.Greater}, {requirementType: AbilityBonus.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription: "Gain Following benefits.",

        fullDescription:
          "<i>At Most a character can have 1 Advanced Weapon Training Talent</i>" +
          "The character gains all the following benefits:"
      },
      abilityRequirement: [{requirementType: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
      associatedAbilities: [TalentName.CoordinatedStrikes, TalentName.FollowUpAttack]
    } as AbilityModel,

    CoordinatedStrikes: {
      abilityName: TalentName.CoordinatedStrikes,
      abilityType: AbilityType.Passive,
      abilityAction: ActionType.Passive,
      abilityDescription: {
        briefDescription:
          "Increase your damage bonus for dual wielding attacks by $AttackDamage.",
        fullDescription:
          "Increase your damage bonus for dual wielding attacks by +2.  Increase this bonus by 1 at levels 4 and 8."
      },
      mechanicalBonus: [
        {abilityType: AbilityBonus.AttackDamage, value: {minBonus: 2, maxBonus: 4}}
      ]
    } as AbilityModel,

    FollowUpAttack: {
      abilityName: TalentName.FollowUpAttack,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      abilityCost: [{requirementType: AbilityBonus.Combat, requirementValue: TalentStrength.Lesser}, {requirementType: AbilityBonus.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription: "Gain advantage to an attack that has missed its target. If the attack still misses this power is not expended.",
        fullDescription:
          "Gain advantage to an attack that has missed its target. If the attack still misses this power is not expended."
      },
      mechanicalBonus: [],
      abilityRequirement: [{requirementType: TalentName.AdvancedWeaponTrainingTwoWeaponFighting, requirementValue: false}]
    } as AbilityModel,

    SureShot: {
      abilityName: TalentName.SureShot,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Free,
      abilityCost: [{requirementType: AbilityBonus.Combat, requirementValue: TalentStrength.Lesser}, {requirementType: AbilityBonus.Stealth, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription: "Gain advantage to a missed ranged weapon attack. If the attack still misses this power is not expended.",
        fullDescription:
          "Gain advantage to a missed ranged weapon attack. If the attack still misses this power is not expended."
      },
      mechanicalBonus: []
    } as AbilityModel,

    ChargeMastery: {
      abilityName: TalentName.ChargeMastery,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementType: AbilityBonus.Combat, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription:
          "Gain the following benefits while charging:",
        fullDescription:
          "Gain the following benefits while charging:"
      },
      associatedAbilities: [TalentName.MeasuredCharge, TalentName.DefensiveCharge, TalentName.AccurateCharge, TalentName.AcceleratedCharge, TalentName.SavageCharge],
      mechanicalBonus: []
    } as AbilityModel,

    ChargeMasteryLesser: {
      abilityName: TalentName.ChargeMasteryLesser,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      pickNumber: 2,
      abilityCost: [{requirementType: AbilityBonus.Combat, requirementValue: TalentStrength.Lesser}],
      abilityDescription: {
        briefDescription:
          "Pick any of the following 2 benefits to gain while charging:",
        fullDescription:
          "Pick any of the following 2 benefits to gain while charging:"
      },
      associatedAbilities: [TalentName.MeasuredCharge, TalentName.DefensiveCharge, TalentName.AccurateCharge, TalentName.AcceleratedCharge, TalentName.SavageCharge],
      mechanicalBonus: []
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
      mechanicalBonus: []
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
      mechanicalBonus: []
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
      mechanicalBonus: [{abilityType: AbilityBonus.Charging, value: {minBonus: 2, maxBonus: 4}}]
    } as AbilityModel,
  };
}
