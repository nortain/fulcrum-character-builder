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
exports.SpellWardenSpellList = exports.MagentSpellList = void 0;
var spell_1 = require("../../spells/spell");
var physical_defense_type_enum_1 = require("../../character/physical-defense/physical-defense-type.enum");
var spell_keywords_enum_1 = require("../../spells/spell-keywords.enum");
var area_of_effect_types_enum_1 = require("../../area-of-effect/area-of-effect-types.enum");
var action_type_enum_1 = require("../../action/action-type.enum");
var duration_type_enum_1 = require("../../duration/duration-type.enum");
var level_range_enum_1 = require("../../spells/enums/level-range.enum");
var dice_size_enum_1 = require("../../character/dice/dice-size.enum");
var spell_chart_1 = require("../../spells/spell-chart");
var spell_type_enum_1 = require("../../spells/enums/spell-type.enum");
var spell_damage_keyword_enum_1 = require("../../spells/enums/spell-damage-keyword.enum");
function MagentSpellList() {
    return [
        {
            name: "Acid Fang",
            defenseType: [physical_defense_type_enum_1.AllDefenseType.Missile],
            spellType: spell_type_enum_1.SpellType.WeaponAttack,
            spellKeywords: [spell_keywords_enum_1.SpellKeywords.Weapon],
            damageKeyword: spell_damage_keyword_enum_1.SpellDamageKeyword.Acid,
            areaOfEffect: {
                numberOfTargets: 1,
                range: 1,
                type: area_of_effect_types_enum_1.AreaOfEffectTypes.Ranged
            },
            castAction: action_type_enum_1.ActionType.Standard,
            duration: [duration_type_enum_1.DurationType.Immediate],
            spellEffectText: [
                {
                    type: spell_1.SpellEffectType.SpellEffect,
                    text: "Make a basic attack.  Regardless of your weapon type this attack is resolved as a ranged 1 in 10 attack. \n" +
                        "On hit: Deal normal weapon damage and add additional acid damage equal to the level chart below.\n",
                    spellChart: [
                        __assign(__assign({}, new spell_chart_1.SpellChart()), { rowName: "Damage", levelRange: level_range_enum_1.LevelRange.TEN, dieSize: dice_size_enum_1.DiceSize.None, minValue: 2.22, maxValue: 6.65 })
                    ]
                }
            ],
            special: ["At the time of picking this spell you can choose for this attack to have an AoE of either Melee 1 in 1 or Weapon Range 1 in Range."],
        }
    ];
}
exports.MagentSpellList = MagentSpellList;
function SpellWardenSpellList() {
    return [__assign({}, new spell_1.Spell())];
}
exports.SpellWardenSpellList = SpellWardenSpellList;
