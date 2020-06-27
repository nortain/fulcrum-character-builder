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
    } as AbilityModel

  };
}
