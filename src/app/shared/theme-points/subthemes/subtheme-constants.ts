import {AbilityModel} from "../../ability-power/ability-model";

import {AbilityType} from "../../ability-power/ability-type.enum";
import {ActionType} from "../../action/action-type.enum";
import {AbilityBonus} from "../../ability-power/ability-bonus.enum";
import {SubthemeType} from "./subtheme-types.enum";

export function getSubthemeObject() {
  return {
    GreaterRage: {
      ...new AbilityModel(),
      abilityName: SubthemeType.WeaponSpecialization,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityDescription:
        {
          briefDescription: "Increase the damage of attacks by $" + AbilityBonus.AttackDamage + ".",
          fullDescription: "Increase the damage of attacks by 3.  Increase by 1 at levels 2, 4, 5, 7, 8, 10."
        },
      mechanicalBonus: [{abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.PowerPointFeature, value: {minBonus: 3, maxBonus: 9}}]
    } as AbilityModel,

    LesserRage: {
      ...new AbilityModel(),
      abilityName: SubthemeType.WeaponSpecialization,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityDescription:
        {
          briefDescription: "Increase the damage of attacks by $" + AbilityBonus.AttackDamage + ".",
          fullDescription: "Increase the damage of attacks by 2.  Increase by 1 at levels 3, 5, 7, 9."
        },
      mechanicalBonus: [{abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.PowerPointFeature, value: {minBonus: 2, maxBonus: 6}}]
    } as AbilityModel,


    MinorRage: {
      ...new AbilityModel(),
      abilityName: SubthemeType.WeaponSpecialization,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityDescription:
        {
          briefDescription: "Increase the damage of attacks by $" + AbilityBonus.AttackDamage + ".",
          fullDescription: "Increase the damage of attacks by 1.  Increase by 1 at levels 4, 8."
        },
      mechanicalBonus: [{abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.PowerPointFeature, value: {minBonus: 1, maxBonus: 3}}]
    } as AbilityModel,

    MinorProtector: {
      ...new AbilityModel(),
      abilityName: SubthemeType.Protector,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityDescription:
        {
          briefDescription: "Your protector aura deals $" + AbilityBonus.Protector + " damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take " + AbilityBonus.Thorns + " thorns damage.",
          fullDescription: "Your protector aura deals 4 damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take 2 thorns damage. Increase your protector damage by 1 every level.  Increase your thorns damage by 1 at levels 5, 9"
        },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Protector, abilityType: AbilityType.PowerPointFeature, value: {minBonus: 8, maxBonus: 26}}, {
        abilityBonus: AbilityBonus.Thorns,
        abilityType: AbilityType.PowerPointFeature,
        value: {minBonus: 4 / 4, maxBonus: 13 / 4}
      }]
    } as AbilityModel,

    Juggernaut: {
      ...new AbilityModel(),
      abilityName: SubthemeType.Juggernaut,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityDescription:
        {
          briefDescription: "Your protector aura deals $" + AbilityBonus.Protector + " damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take " + AbilityBonus.Thorns + " thorns damage.",
          fullDescription: "Your protector aura deals 8 damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take 2 thorns damage. Increase your protector damage by 2 every level.  Increase your thorns damage by 1 at levels 3, 5, 7, 9"
        },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Protector, abilityType: AbilityType.PowerPointFeature, value: {minBonus: 8, maxBonus: 26}}, {
        abilityBonus: AbilityBonus.Thorns,
        abilityType: AbilityType.PowerPointFeature,
        value: {minBonus: 8 / 4, maxBonus: 26 / 4}
      }]
    } as AbilityModel,

    LesserProtector: {
      ...new AbilityModel(),
      abilityName: SubthemeType.Protector,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityDescription:
        {
          briefDescription: "Your protector aura deals $" + AbilityBonus.Protector + " damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take " + AbilityBonus.Thorns + " thorns damage.",
          fullDescription: "Your protector aura deals 8 damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take 2 thorns damage. Increase your protector damage by 2 every level.  Increase your thorns damage by 1 at levels 3, 5, 7, 9"
        },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Protector, abilityType: AbilityType.PowerPointFeature, value: {minBonus: 8, maxBonus: 26}}, {
        abilityBonus: AbilityBonus.Thorns,
        abilityType: AbilityType.PowerPointFeature,
        value: {minBonus: 8 / 4, maxBonus: 26 / 4}
      }]
    } as AbilityModel
  };
}

