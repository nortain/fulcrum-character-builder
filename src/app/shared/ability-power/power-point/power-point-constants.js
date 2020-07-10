"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getPowerPointObject = void 0;
var ability_model_1 = require("../ability-model");
var action_type_enum_1 = require("../../action/action-type.enum");
var ability_type_enum_1 = require("../ability-type.enum");
var ability_bonus_enum_1 = require("../ability-bonus.enum");
var power_point_name_enum_1 = require("./power-point-name.enum");
var theme_type_enum_1 = require("../../theme-points/theme-type.enum");
function getPowerPointObject() {
    return {
        Rage: __assign(__assign({}, new ability_model_1.AbilityModel()), { abilityName: power_point_name_enum_1.PowerPointName.Rage, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, abilityAction: action_type_enum_1.ActionType.Passive, abilityCost: [{ requirementAbilityName: ability_bonus_enum_1.AbilityBonus.PowerPointFeature, requirementType: ability_type_enum_1.AbilityType.PowerPointFeature, requirementValue: 1 }], pickNumber: 1, abilityDescription: {
                briefDescription: "Your character can deal moderate extra damage with attacks.",
                fullDescription: "Your character can deal moderate extra damage with attacks."
            }, associatedAbilities: [power_point_name_enum_1.PowerPointName.GreaterRage, power_point_name_enum_1.PowerPointName.LesserRage, power_point_name_enum_1.PowerPointName.MinorRage], abilityRequirement: [{ requirementAbilityName: theme_type_enum_1.ThemeType.Martial, requirementType: ability_type_enum_1.AbilityType.Theme, requirementValue: 2 }] }),
        GreaterRage: __assign(__assign({}, new ability_model_1.AbilityModel()), { abilityName: power_point_name_enum_1.PowerPointName.Rage, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, abilityAction: action_type_enum_1.ActionType.Minor, abilityDescription: {
                briefDescription: "Your character can deal moderate extra damage with attacks.",
                fullDescription: "Your character can deal moderate extra damage with attacks."
            }, associatedAbilities: [power_point_name_enum_1.PowerPointName.GreaterRage, power_point_name_enum_1.PowerPointName.LesserRage, power_point_name_enum_1.PowerPointName.MinorRage], abilityRequirement: [{ requirementAbilityName: theme_type_enum_1.ThemeType.Martial, requirementType: ability_type_enum_1.AbilityType.Theme, requirementValue: 2 }] }),
        LesserRage: __assign(__assign({}, new ability_model_1.AbilityModel()), { abilityName: power_point_name_enum_1.PowerPointName.Rage, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, abilityAction: action_type_enum_1.ActionType.Minor, abilityDescription: {
                briefDescription: "Your character can deal moderate extra damage with attacks.",
                fullDescription: "Your character can deal moderate extra damage with attacks."
            }, associatedAbilities: [power_point_name_enum_1.PowerPointName.GreaterRage, power_point_name_enum_1.PowerPointName.LesserRage, power_point_name_enum_1.PowerPointName.MinorRage], abilityRequirement: [] }),
        MinorRage: __assign(__assign({}, new ability_model_1.AbilityModel()), { abilityName: power_point_name_enum_1.PowerPointName.Rage, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, abilityAction: action_type_enum_1.ActionType.Minor, abilityDescription: {
                briefDescription: "Your character can deal moderate extra damage with attacks.",
                fullDescription: "Your character can deal moderate extra damage with attacks."
            }, associatedAbilities: [power_point_name_enum_1.PowerPointName.GreaterRage, power_point_name_enum_1.PowerPointName.LesserRage, power_point_name_enum_1.PowerPointName.MinorRage] }),
    };
}
exports.getPowerPointObject = getPowerPointObject;
