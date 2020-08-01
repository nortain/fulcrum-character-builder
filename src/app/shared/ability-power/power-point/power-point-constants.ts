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

    ToThePain: {
      ...new AbilityModel(),
      abilityName: PowerPointName.ToThePain,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: AbilityBonus.PowerPointFeature, requirementType: AbilityType.PowerPointFeature, requirementValue: 1}],
      abilityDescription:
        {
          briefDescription: "Designate a single creature to count as isolated until the start of your next turn. You can also increase your duelist damage by $" + AbilityBonus.Duelist + ".",
          fullDescription: "Designate a single creature to count as isolated until the start of your next turn. You can also increase your duelist damage by 3.  Increase by 1 at levels 2, 4, 5, 6, 7, and 10",
        },
      mechanicalBonus: [{
        abilityBonus: AbilityBonus.Duelist,
        abilityType: AbilityType.PowerPointFeature,
        value: {minBonus: 3, maxBonus: 9},
        keywords: [AbilityBonus.ToThePain]
      }],
      abilityRequirement: [{requirementAbilityName: ThemeType.Martial, requirementType: AbilityType.Theme, requirementValue: 2}, {requirementAbilityName: SubthemeType.Duelist, requirementType: AbilityType.Subtheme, requirementValue: 1}]
    } as AbilityModel,


    Backstab: {
      ...new AbilityModel(),
      abilityName: PowerPointName.Backstab,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: AbilityBonus.PowerPointFeature, requirementType: AbilityType.PowerPointFeature, requirementValue: 1}],
      abilityDescription:
        {
          briefDescription: "Advance $" + AbilityBonus.Advance + " squares and increase your next Find Weakness damage this turn by $" + AbilityBonus.FindWeakness + ".",
          fullDescription: "Advance 2 squares and increase your next Find Weakness damage this turn by 8. Increase advance distance by 1 at levels 4, 8.  Increase damage by 2 at levels 2, 3, 4, 5, 7, 8, 9, 10 and increase by 1 at level 6",
        },
      mechanicalBonus: [{
        abilityBonus: AbilityBonus.Advance,
        abilityType: AbilityType.PowerPointFeature,
        value: {minBonus: 2, maxBonus: 4},
        keywords: [AbilityBonus.FriendlyMovement]
      }, {
        abilityBonus: AbilityBonus.FindWeakness,
        abilityType: AbilityType.PowerPointFeature,
        value: {minBonus: 8, maxBonus: 25},
        keywords: [AbilityBonus.Backstab]
      }],
      abilityRequirement: [{requirementAbilityName: ThemeType.Martial, requirementType: AbilityType.Theme, requirementValue: 2}, {
        requirementAbilityName: SubthemeType.FindWeakness,
        requirementType: AbilityType.Subtheme,
        requirementValue: 1
      }]
    } as AbilityModel,

    EvasiveRoll: {
      ...new AbilityModel(),
      abilityName: PowerPointName.EvasiveRoll,
      abilityType: AbilityType.PowerPointFeature,
      abilityAction: ActionType.Minor,
      abilityCost: [{requirementAbilityName: AbilityBonus.PowerPointFeature, requirementType: AbilityType.PowerPointFeature, requirementValue: 1}],
      abilityDescription:
        {
          briefDescription: "Perform two of the following actions:\n" +
            "Advance $" + AbilityBonus.Advance + " squares.  Increase to 3 squares at level 6.\n" +
            "Tactically Move " + AbilityBonus.TacticalMovement + " square\n" +
            "Reduce ongoing damage by $ " + AbilityBonus.ReduceOngoing + ".",
          fullDescription: "Perform two of the following actions:\n" +
            "Advance 2 squares.  Increase to 3 squares at level 6.\n" +
            "Tactically Move  1 square\n" +
            "Reduce ongoing damage by 1.  Increase the ongoing damage reduction by 1 at levels 4, and 8.",
        },
      mechanicalBonus: [{
        abilityBonus: AbilityBonus.Advance,
        abilityType: AbilityType.PowerPointFeature,
        value: {minBonus: 2, maxBonus: 3},
        keywords: [AbilityBonus.FriendlyMovement, AbilityBonus.EvasiveRoll]
      }, {
        abilityBonus: AbilityBonus.TacticalMovement,
        abilityType: AbilityType.PowerPointFeature,
        value: {minBonus: 1, maxBonus: 1},
        keywords: [AbilityBonus.FriendlyMovement, AbilityBonus.EvasiveRoll]
      }, {
        abilityBonus: AbilityBonus.ReduceOngoing,
        abilityType: AbilityType.PowerPointFeature,
        value: {minBonus: 1, maxBonus: 3},
        keywords: [AbilityBonus.ReduceOngoing, AbilityBonus.EvasiveRoll]
      }],
      abilityRequirement: [{requirementAbilityName: ThemeType.Martial, requirementType: AbilityType.Theme, requirementValue: 2}, {requirementAbilityName: SubthemeType.Evasion, requirementType: AbilityType.Subtheme, requirementValue: 1}]
    } as AbilityModel,
  };



}
