import {AbilityModel} from "../ability-model";
import {ActionType} from "../../action/action-type.enum";
import {AbilityType} from "../ability-type.enum";
import {AbilityBonus} from "../ability-bonus.enum";
import {TalentStrength} from "./talent-strength.enum";
import {AttributeStrength} from "../../attribute/attribute-enums/attribute-strength.enum";
import {TalentName} from "./talent-name.enum";
import {Level} from "../../character/level.enum";

export function getTalentObject() {
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
      name: TalentName.Deflection,
      abilityType: AbilityType.Ability,
      abilityAction: ActionType.Free,
      abilityCost: null,
      abilityDescription: {
        briefDescription: "Reduce the damage of an attack against AD by $DamageResist.  If the attack is a burst or range attack the reduction becomes  $DamageResist",
        fullDescription: "Reduce the damage of an attack against AD by 4 + level / 3.  If the attack is a burst or range attack the reduction becomes  5 + level / 2"
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
        briefDescription: "Your Missile Defense becomes your Active Defense. Increase your critical resistance by $CriticalResist.  Gain the ability Deflection",
        fullDescription:
          "Your Missile Defense becomes your Active Defense. Increase your critical resistance by 1.  Increase this bonus to 2 at level 6.  Gain the ability Deflection.\n" +
          "Deflection (Lesser Ability):  Free.  Reduce the damage of an attack against AD by 4 + level / 3.  If the attack is a burst or range attack the reduction becomes  5 + level / 2."
      }
      ,
      mechanicalBonus: [
        {abilityType: AbilityBonus.MissileDefense, value: AbilityBonus.ActiveDefense},
        {abilityType: AbilityBonus.CriticalResist, value: {minBonus: 1, maxBonus: 2}}
      ],
      abilityRequirement: [{requirementType: AbilityBonus.Agility, requirementValue: AttributeStrength.Heroic}],
      activeAbility: TalentName.Deflection
    } as AbilityModel,

    AdvancedWeaponTrainingRanged: {
      abilityName: TalentName.AdvancedWeaponTrainingRanged,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementType: AbilityBonus.Combat, requirementValue: TalentStrength.Greater}, {requirementType: AbilityBonus.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription: "Gain the Sure Shot power. \n " +
          "Melee Archer:  You are able to convert your range attacks into a melee attack with a -1 DC.\n" +
          "Vulnerable Shots:  Increase Range attack damage by $AttackDamage",
        fullDescription:
          "<i>At Most a character can have 1 Advanced Weapon Training Talent</i>" +
          "The character gains all the following benefits:" +
          "Sure Shot (Lesser Power):  Gain advantage to a missed ranged weapon attack.  If the attack still misses this power is not expended." +
          "    Melee Archer:  You are able to convert your range attacks into a melee attack with a -1 DC." +
          "    Vulnerable Shots:  Increase Range attack damage by +1.  Increase this amount by 1 at level 6."
      },
      mechanicalBonus: [
        {abilityType: AbilityBonus.AttackDamage, value: {minBonus: 1, maxBonus: 2}}
      ],
      abilityRequirement: [{requirementType: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
      activeAbility: TalentName.SureShot
    } as AbilityModel,

    AdvancedWeaponTrainingTwoWeaponFighting: {
      abilityName: TalentName.AdvancedWeaponTrainingTwoWeaponFighting,
      abilityType: AbilityType.Talent,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementType: AbilityBonus.Combat, requirementValue: TalentStrength.Greater}, {requirementType: AbilityBonus.Stealth, requirementValue: TalentStrength.Greater}],
      abilityDescription: {
        briefDescription: "Gain the Follow Up Attack power. \n " +
          "Coordinated Strikes:  Increase your damage bonus for dual wielding attacks by $AttackDamage.",
        fullDescription:
          "<i>At Most a character can have 1 Advanced Weapon Training Talent</i>" +
          "The character gains all the following benefits:" +
          "        Coordinated Strikes:  Increase your damage bonus for dual wielding attacks by +2.  Increase this bonus by 1 at levels 4 and 8." +
          "  Follow up attack (Power):  Once per combat you may gain advantage to an attack that has missed its target. If the attack still misses this power is not expended."
      },
      mechanicalBonus: [
        {abilityType: AbilityBonus.AttackDamage, value: {minBonus: 2, maxBonus: 4}}
      ],
      abilityRequirement: [{requirementType: AbilityBonus.AdvancedWeaponTraining, requirementValue: false}],
      activeAbility: TalentName.FollowUpAttack
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
        briefDescription: "Gain advantage to a missed ranged weapon attack.  If the attack still misses this power is not expended.",
        fullDescription:
          "Gain advantage to a missed ranged weapon attack.  If the attack still misses this power is not expended."
      },
      mechanicalBonus: []
    } as AbilityModel

  };
}
