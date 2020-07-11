import {AbilityModel} from "../ability-model";
import {ActionType} from "../../action/action-type.enum";
import {AbilityType} from "../ability-type.enum";
import {AbilityBonus} from "../ability-bonus.enum";
import {PowerPointName} from "./power-point-name.enum";
import {ThemeType} from "../../theme-points/theme-type.enum";
import {SubthemeType} from "../../theme-points/subthemes/subtheme-types.enum";

export type PowerPointConstants = { [K in PowerPointName]: AbilityModel };

export function getPowerPointObject(): PowerPointConstants {
  return {
    Rage: {
      ...new AbilityModel(),
      abilityName: PowerPointName.Rage,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: AbilityBonus.PowerPointFeature, requirementType: AbilityType.PowerPointFeature, requirementValue: 1}],
      pickNumber: 1,
      abilityDescription:
        {
          briefDescription: "Your character can deal moderate extra damage with attacks.",
          fullDescription: "Your character can deal moderate extra damage with attacks."
        },
      associatedAbilities: [PowerPointName.GreaterRage, PowerPointName.LesserRage, PowerPointName.MinorRage],
      abilityRequirement: [{requirementAbilityName: ThemeType.Martial, requirementType: AbilityType.Theme, requirementValue: 2}, {
        requirementAbilityName: SubthemeType.WeaponSpecialization,
        requirementType: AbilityType.Subtheme,
        requirementValue: 1
      }]
    } as AbilityModel,


    GreaterRage: {
      ...new AbilityModel(),
      abilityName: PowerPointName.Rage,
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
      abilityName: PowerPointName.Rage,
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
      abilityName: PowerPointName.Rage,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityDescription:
        {
          briefDescription: "Increase the damage of attacks by $" + AbilityBonus.AttackDamage + ".",
          fullDescription: "Increase the damage of attacks by 1.  Increase by 1 at levels 4, 8."
        },
      mechanicalBonus: [{abilityBonus: AbilityBonus.AttackDamage, abilityType: AbilityType.PowerPointFeature, value: {minBonus: 1, maxBonus: 3}}]
    } as AbilityModel,

    Protector: {
      ...new AbilityModel(),
      abilityName: PowerPointName.Protector,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Passive,
      abilityCost: [{requirementAbilityName: AbilityBonus.PowerPointFeature, requirementType: AbilityType.PowerPointFeature, requirementValue: 1}],
      pickNumber: 1,
      abilityDescription:
        {
          briefDescription: "Your character gains a protector's aura that does the following:\n" +
            "<list>" +
            "<ul>" +
            "<li>All creatures threatened by you are affected by your protector's aura.</li>" +
            "<li>Your aura is removed until end of turn if attacked by a creature.</li>" +
            "<li>Your aura deals 1/4 aura damage as thorns damage to enemies who attack you.</li>" +
            "<li>Enemies leaving your aura on their turn take 1/2 aura damage.</li>" +
            "<li>Creatures using tactical rush or press to move you take full protector damage but each creature size larger than your own reduces that damage by half down to a minimum of 1/4.</li>" +
            "<li>When affected by multiple protector auras, only the strongest aura is resolved.</li>" +
            "</ul>" +
            "</list>",
          fullDescription: "Your character gains a protector's aura that does the following:\n" +
            "<list>" +
            "<ul>" +
            "<li>All creatures threatened by you are affected by your protector's aura.</li>" +
            "<li>Your aura is removed until end of turn if attacked by a creature.</li>" +
            "<li>Your aura deals 1/4 aura damage as thorns damage to enemies who attack you.</li>" +
            "<li>Enemies leaving your aura on their turn take 1/2 aura damage.</li>" +
            "<li>Creatures using tactical rush or press to move you take full protector damage but each creature size larger than your own reduces that damage by half down to a minimum of 1/4.</li>" +
            "<li>When affected by multiple protector auras, only the strongest aura is resolved.</li>" +
            "</ul>" +
            "</list>",
        },
      associatedAbilities: [PowerPointName.LesserProtector, PowerPointName.MinorProtector],
      abilityRequirement: [{requirementAbilityName: ThemeType.Martial, requirementType: AbilityType.Theme, requirementValue: 2}, {requirementAbilityName: SubthemeType.Protector, requirementType: AbilityType.Subtheme, requirementValue: 1}]
    } as AbilityModel,


    LesserProtector: {
      ...new AbilityModel(),
      abilityName: PowerPointName.LesserProtector,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityDescription:
        {
          briefDescription: "Your protector aura deals $" + AbilityBonus.Protector + " damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take " + AbilityBonus.Thorns + " thorns damage.",
          fullDescription: "Your protector aura deals 8 damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take 2 thorns damage. Increase your protector damage by 2 every level.  Increase your thorns damage by 1 at levels 3, 5, 7, 9"
        },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Protector, abilityType: AbilityType.PowerPointFeature, value: {minBonus: 8, maxBonus: 26}}, {abilityBonus: AbilityBonus.Thorns, abilityType: AbilityType.PowerPointFeature, value: {minBonus: Math.floor(8 / 4), maxBonus: Math.floor(26 / 4)}}]
    } as AbilityModel,

    MinorProtector: {
      ...new AbilityModel(),
      abilityName: PowerPointName.MinorProtector,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityDescription:
        {
          briefDescription: "Your protector aura deals $" + AbilityBonus.Protector + " damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take " + AbilityBonus.Thorns + " thorns damage.",
          fullDescription: "Your protector aura deals 4 damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take 2 thorns damage. Increase your protector damage by 1 every level.  Increase your thorns damage by 1 at levels 5, 9"
        },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Protector, abilityType: AbilityType.PowerPointFeature, value: {minBonus: 8, maxBonus: 26}}, {abilityBonus: AbilityBonus.Thorns, abilityType: AbilityType.PowerPointFeature, value: {minBonus: Math.floor(4 / 4), maxBonus: Math.floor(13 / 4)}}]
    } as AbilityModel,

  };

}
