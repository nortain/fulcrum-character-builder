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
exports.getSubthemeObject = void 0;
var ability_model_1 = require("../../ability-power/ability-model");
var ability_type_enum_1 = require("../../ability-power/ability-type.enum");
var action_type_enum_1 = require("../../action/action-type.enum");
var ability_bonus_enum_1 = require("../../ability-power/ability-bonus.enum");
var subtheme_types_enum_1 = require("./subtheme-types.enum");
function getSubthemeObject() {
    return {
        GreaterRage: __assign(__assign({}, new ability_model_1.AbilityModel()), { abilityName: subtheme_types_enum_1.SubthemeType.WeaponSpecialization, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, abilityAction: action_type_enum_1.ActionType.Minor, abilityDescription: {
                briefDescription: "Increase the damage of attacks by $" + ability_bonus_enum_1.AbilityBonus.AttackDamage + ".",
                fullDescription: "Increase the damage of attacks by 3.  Increase by 1 at levels 2, 4, 5, 7, 8, 10."
            }, mechanicalBonus: [{ abilityBonus: ability_bonus_enum_1.AbilityBonus.AttackDamage, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, value: { minBonus: 3, maxBonus: 9 } }] }),
        LesserRage: __assign(__assign({}, new ability_model_1.AbilityModel()), { abilityName: subtheme_types_enum_1.SubthemeType.WeaponSpecialization, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, abilityAction: action_type_enum_1.ActionType.Minor, abilityDescription: {
                briefDescription: "Increase the damage of attacks by $" + ability_bonus_enum_1.AbilityBonus.AttackDamage + ".",
                fullDescription: "Increase the damage of attacks by 2.  Increase by 1 at levels 3, 5, 7, 9."
            }, mechanicalBonus: [{ abilityBonus: ability_bonus_enum_1.AbilityBonus.AttackDamage, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, value: { minBonus: 2, maxBonus: 6 } }] }),
        MinorRage: __assign(__assign({}, new ability_model_1.AbilityModel()), { abilityName: subtheme_types_enum_1.SubthemeType.WeaponSpecialization, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, abilityAction: action_type_enum_1.ActionType.Minor, abilityDescription: {
                briefDescription: "Increase the damage of attacks by $" + ability_bonus_enum_1.AbilityBonus.AttackDamage + ".",
                fullDescription: "Increase the damage of attacks by 1.  Increase by 1 at levels 4, 8."
            }, mechanicalBonus: [{ abilityBonus: ability_bonus_enum_1.AbilityBonus.AttackDamage, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, value: { minBonus: 1, maxBonus: 3 } }] }),
        MinorProtector: __assign(__assign({}, new ability_model_1.AbilityModel()), { abilityName: subtheme_types_enum_1.SubthemeType.Protector, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, abilityAction: action_type_enum_1.ActionType.Minor, abilityDescription: {
                briefDescription: "Your protector aura deals $" + ability_bonus_enum_1.AbilityBonus.Protector + " damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take " + ability_bonus_enum_1.AbilityBonus.Thorns + " thorns damage.",
                fullDescription: "Your protector aura deals 4 damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take 2 thorns damage. Increase your protector damage by 1 every level.  Increase your thorns damage by 1 at levels 5, 9"
            }, mechanicalBonus: [{ abilityBonus: ability_bonus_enum_1.AbilityBonus.Protector, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, value: { minBonus: 8, maxBonus: 26 } }, {
                    abilityBonus: ability_bonus_enum_1.AbilityBonus.Thorns,
                    abilityType: ability_type_enum_1.AbilityType.PowerPointFeature,
                    value: { minBonus: 4 / 4, maxBonus: 13 / 4 }
                }] }),
        Juggernaut: __assign(__assign({}, new ability_model_1.AbilityModel()), { abilityName: subtheme_types_enum_1.SubthemeType.Juggernaut, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, abilityAction: action_type_enum_1.ActionType.Minor, abilityDescription: {
                briefDescription: "Your protector aura deals $" + ability_bonus_enum_1.AbilityBonus.Protector + " damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take " + ability_bonus_enum_1.AbilityBonus.Thorns + " thorns damage.",
                fullDescription: "Your protector aura deals 8 damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take 2 thorns damage. Increase your protector damage by 2 every level.  Increase your thorns damage by 1 at levels 3, 5, 7, 9"
            }, mechanicalBonus: [{ abilityBonus: ability_bonus_enum_1.AbilityBonus.Protector, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, value: { minBonus: 8, maxBonus: 26 } }, {
                    abilityBonus: ability_bonus_enum_1.AbilityBonus.Thorns,
                    abilityType: ability_type_enum_1.AbilityType.PowerPointFeature,
                    value: { minBonus: 8 / 4, maxBonus: 26 / 4 }
                }] }),
        LesserProtector: __assign(__assign({}, new ability_model_1.AbilityModel()), { abilityName: subtheme_types_enum_1.SubthemeType.Protector, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, abilityAction: action_type_enum_1.ActionType.Minor, abilityDescription: {
                briefDescription: "Your protector aura deals $" + ability_bonus_enum_1.AbilityBonus.Protector + " damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take " + ability_bonus_enum_1.AbilityBonus.Thorns + " thorns damage.",
                fullDescription: "Your protector aura deals 8 damage to enemies who attack your allies while threatened.  Threatened enemies who attack you take 2 thorns damage. Increase your protector damage by 2 every level.  Increase your thorns damage by 1 at levels 3, 5, 7, 9"
            }, mechanicalBonus: [{ abilityBonus: ability_bonus_enum_1.AbilityBonus.Protector, abilityType: ability_type_enum_1.AbilityType.PowerPointFeature, value: { minBonus: 8, maxBonus: 26 } }, {
                    abilityBonus: ability_bonus_enum_1.AbilityBonus.Thorns,
                    abilityType: ability_type_enum_1.AbilityType.PowerPointFeature,
                    value: { minBonus: 8 / 4, maxBonus: 26 / 4 }
                }] })
    };
}
exports.getSubthemeObject = getSubthemeObject;
