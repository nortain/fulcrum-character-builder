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
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: AbilityBonus.PowerPointFeature, requirementType: AbilityType.PowerPointFeature, requirementValue: 1}],
      abilityDescription:
        {
          briefDescription: "Increase the damage of all attacks by $" + AbilityBonus.Rage + " until the end of your turn.",
          fullDescription: "Increase the damage of all attacks by 5 until the end of your turn. Increase this bonus by 1 each additional level."
        },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Rage, abilityType: AbilityType.PowerPointFeature, value: {minBonus: 5, maxBonus: 14}}],
      abilityRequirement: [{requirementAbilityName: ThemeType.Martial, requirementType: AbilityType.Theme, requirementValue: 2}, {
        requirementAbilityName: SubthemeType.WeaponSpecialization,
        requirementType: AbilityType.Subtheme,
        requirementValue: 1
      }]
    } as AbilityModel,

    Rebuke: {
      ...new AbilityModel(),
      abilityName: PowerPointName.Rebuke,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: AbilityBonus.PowerPointFeature, requirementType: AbilityType.PowerPointFeature, requirementValue: 1}],
      abilityDescription:
        {
          briefDescription: "Increase the damage of your protector aura by $" + AbilityBonus.Rebuke + " until the start of your next turn.  If you are not attacked by a threatened enemy before the start of your next turn you regain the power point.",
          fullDescription: "Increase the damage of your protector aura by 12 until the start of your next turn.  If you are not attacked by a threatened enemy before the start of your next turn you regain the power point. Increase this bonus by 2 at levels 2, 5, 8 and increase this bonus by 3 at levels 3, 4, 6, 7, 9, 10",
        },
      mechanicalBonus: [{abilityBonus: AbilityBonus.Rebuke, abilityType: AbilityType.PowerPointFeature, value: {minBonus: 12, maxBonus: 36}}],
      abilityRequirement: [{requirementAbilityName: ThemeType.Martial, requirementType: AbilityType.Theme, requirementValue: 2}, {requirementAbilityName: SubthemeType.Protector, requirementType: AbilityType.Subtheme, requirementValue: 1}]
    } as AbilityModel,

    IgnorePain: {
      ...new AbilityModel(),
      abilityName: PowerPointName.IgnorePain,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: AbilityBonus.PowerPointFeature, requirementType: AbilityType.PowerPointFeature, requirementValue: 1}],
      abilityDescription:
        {
          briefDescription: "Gain $" + AbilityBonus.Fortify + " temporary hit points and increase your damage resistance until the start of your next turn by $" + AbilityBonus.TemporaryDamageResist + ".",
          fullDescription: "Gain 3 temporary hit points and increase your damage resistance until the start of your next turn by 1.  Increase your temporary hit points by 1 at levels 2, 4, 6, 7, 8, 9 and your damage resistance by 1 at levels 4, 8",
        },
      mechanicalBonus: [{
        abilityBonus: AbilityBonus.Fortify,
        abilityType: AbilityType.PowerPointFeature,
        value: {minBonus: 3, maxBonus: 9},
        keywords: [AbilityBonus.Fortify, AbilityBonus.IgnorePainTHP]
      }, {
        abilityBonus: AbilityBonus.TemporaryDamageResist,
        abilityType: AbilityType.PowerPointFeature,
        value: {minBonus: 1, maxBonus: 3}
      }],
      abilityRequirement: [{requirementAbilityName: ThemeType.Martial, requirementType: AbilityType.Theme, requirementValue: 2}, {requirementAbilityName: SubthemeType.Juggernaut, requirementType: AbilityType.Subtheme, requirementValue: 1}]
    } as AbilityModel,


  };

  // TODO implement the remaining power point features

}
