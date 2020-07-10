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
exports.WarriorMageSpellList = exports.AssassinSpellList = exports.DruidSpellList = exports.ClericSpellList = void 0;
var spell_1 = require("../../spells/spell");
var physical_defense_type_enum_1 = require("../../character/physical-defense/physical-defense-type.enum");
var spell_keywords_enum_1 = require("../../spells/spell-keywords.enum");
var area_of_effect_types_enum_1 = require("../../area-of-effect/area-of-effect-types.enum");
var action_type_enum_1 = require("../../action/action-type.enum");
var duration_type_enum_1 = require("../../duration/duration-type.enum");
var dice_1 = require("../../character/dice/dice");
var level_range_enum_1 = require("../../spells/enums/level-range.enum");
var dice_size_enum_1 = require("../../character/dice/dice-size.enum");
var spell_chart_1 = require("../../spells/spell-chart");
var spell_type_enum_1 = require("../../spells/enums/spell-type.enum");
var spell_damage_keyword_enum_1 = require("../../spells/enums/spell-damage-keyword.enum");
function ClericSpellList() {
    return [__assign(__assign({}, new spell_1.Spell()), { name: "Fierce Devotion", defenseType: [physical_defense_type_enum_1.AllDefenseType.Missile], spellType: spell_type_enum_1.SpellType.DirectEffect, spellKeywords: [spell_keywords_enum_1.SpellKeywords.Concentration], damageKeyword: spell_damage_keyword_enum_1.SpellDamageKeyword.Wild, areaOfEffect: {
                numberOfTargets: 1,
                range: 10,
                type: area_of_effect_types_enum_1.AreaOfEffectTypes.Ranged
            }, castAction: action_type_enum_1.ActionType.Standard, critRoll: new dice_1.Dice(1, dice_size_enum_1.DiceSize.d10, 2), duration: [duration_type_enum_1.DurationType.Immediate, duration_type_enum_1.DurationType.Concentration], spellEffectText: [
                {
                    type: spell_1.SpellEffectType.OnHit,
                    text: "Target takes wild damage equal to the attack table below + magical attack bonus.  The target also gains the devotion effect that lasts so long as you maintain concentration.  At the start of your next turn after you cast this spell you must spend your move action to maintain concentration or this spell’s effect is removed.  You may only have 1 concentration effect active at a time.",
                    spellChart: [
                        __assign(__assign({}, new spell_chart_1.SpellChart()), { rowName: spell_damage_keyword_enum_1.SpellDamageKeyword.Wild, levelRange: level_range_enum_1.LevelRange.FIFTHTEEN, dieSize: dice_size_enum_1.DiceSize.d8, minValue: 13.33, maxValue: 53.74 })
                    ]
                }, {
                    type: spell_1.SpellEffectType.AfterEffect,
                    text: "Each time you pay the concentration cost of this spell the target with the devotion effect takes wild damage equal to the concentration table’s damage value below + global damage bonus",
                    spellChart: [
                        __assign(__assign({}, new spell_chart_1.SpellChart()), { rowName: spell_keywords_enum_1.SpellKeywords.Concentration, levelRange: level_range_enum_1.LevelRange.FIFTHTEEN, dieSize: dice_size_enum_1.DiceSize.None, minValue: 10.38, maxValue: 34.81 })
                    ]
                }
            ] })];
}
exports.ClericSpellList = ClericSpellList;
function DruidSpellList() {
    return [__assign(__assign({}, new spell_1.Spell()), { name: "Fierce Devotion", defenseType: [physical_defense_type_enum_1.AllDefenseType.Missile], spellType: spell_type_enum_1.SpellType.DirectEffect, spellKeywords: [spell_keywords_enum_1.SpellKeywords.Concentration], damageKeyword: spell_damage_keyword_enum_1.SpellDamageKeyword.Wild, areaOfEffect: {
                numberOfTargets: 1,
                range: 1,
                type: area_of_effect_types_enum_1.AreaOfEffectTypes.Ranged
            }, castAction: action_type_enum_1.ActionType.Standard, critRoll: new dice_1.Dice(1, dice_size_enum_1.DiceSize.d10, 2), duration: [duration_type_enum_1.DurationType.Immediate, duration_type_enum_1.DurationType.Concentration], spellEffectText: [{
                    type: spell_1.SpellEffectType.OnHit,
                    text: "Target takes wild damage equal to the attack table below + magical attack bonus.  The target also gains the devotion effect that lasts so long as you maintain concentration.  At the start of your next turn after you cast this spell you must spend your move action to maintain concentration or this spell’s effect is removed.  You may only have 1 concentration effect active at a time.",
                    spellChart: [__assign(__assign({}, new spell_chart_1.SpellChart()), { rowName: spell_damage_keyword_enum_1.SpellDamageKeyword.Wild, levelRange: level_range_enum_1.LevelRange.FIFTHTEEN, dieSize: dice_size_enum_1.DiceSize.d8, minValue: 13.33, maxValue: 53.74 }), __assign(__assign({}, new spell_chart_1.SpellChart()), { rowName: spell_keywords_enum_1.SpellKeywords.Concentration, levelRange: level_range_enum_1.LevelRange.FIFTHTEEN, dieSize: dice_size_enum_1.DiceSize.None, minValue: 10.38, maxValue: 34.81 })]
                }, {
                    type: spell_1.SpellEffectType.AfterEffect,
                    text: "Each time you pay the concentration cost of this spell the target with the devotion effect takes wild damage equal to the concentration table’s damage value below + global damage bonus",
                }] })];
}
exports.DruidSpellList = DruidSpellList;
function AssassinSpellList() {
    return [__assign(__assign({}, new spell_1.Spell()), { name: "Fierce Devotion", defenseType: [physical_defense_type_enum_1.AllDefenseType.Missile], spellType: spell_type_enum_1.SpellType.DirectEffect, spellKeywords: [spell_keywords_enum_1.SpellKeywords.Concentration], damageKeyword: spell_damage_keyword_enum_1.SpellDamageKeyword.Wild, areaOfEffect: {
                numberOfTargets: 1,
                range: 1,
                type: area_of_effect_types_enum_1.AreaOfEffectTypes.Ranged
            }, castAction: action_type_enum_1.ActionType.Standard, critRoll: new dice_1.Dice(1, dice_size_enum_1.DiceSize.d10, 2), duration: [duration_type_enum_1.DurationType.Immediate, duration_type_enum_1.DurationType.Concentration], spellEffectText: [{
                    type: spell_1.SpellEffectType.OnHit,
                    text: "Target takes wild damage equal to the attack table below + magical attack bonus.  The target also gains the devotion effect that lasts so long as you maintain concentration.  At the start of your next turn after you cast this spell you must spend your move action to maintain concentration or this spell’s effect is removed.  You may only have 1 concentration effect active at a time.",
                    spellChart: [__assign(__assign({}, new spell_chart_1.SpellChart()), { rowName: spell_damage_keyword_enum_1.SpellDamageKeyword.Wild, levelRange: level_range_enum_1.LevelRange.FIFTHTEEN, dieSize: dice_size_enum_1.DiceSize.d8, minValue: 13.33, maxValue: 53.74 }), __assign(__assign({}, new spell_chart_1.SpellChart()), { rowName: spell_keywords_enum_1.SpellKeywords.Concentration, levelRange: level_range_enum_1.LevelRange.FIFTHTEEN, dieSize: dice_size_enum_1.DiceSize.None, minValue: 10.38, maxValue: 34.81 })]
                }, {
                    type: spell_1.SpellEffectType.AfterEffect,
                    text: "Each time you pay the concentration cost of this spell the target with the devotion effect takes wild damage equal to the concentration table’s damage value below + global damage bonus",
                }] })];
}
exports.AssassinSpellList = AssassinSpellList;
function WarriorMageSpellList() {
    return [__assign(__assign({}, new spell_1.Spell()), { name: "Fierce Devotion", defenseType: [physical_defense_type_enum_1.AllDefenseType.Missile], spellType: spell_type_enum_1.SpellType.DirectEffect, spellKeywords: [spell_keywords_enum_1.SpellKeywords.Concentration], damageKeyword: spell_damage_keyword_enum_1.SpellDamageKeyword.Wild, areaOfEffect: {
                numberOfTargets: 1,
                range: 1,
                type: area_of_effect_types_enum_1.AreaOfEffectTypes.Ranged
            }, castAction: action_type_enum_1.ActionType.Standard, critRoll: new dice_1.Dice(1, dice_size_enum_1.DiceSize.d10, 2), duration: [duration_type_enum_1.DurationType.Immediate, duration_type_enum_1.DurationType.Concentration], spellEffectText: [{
                    type: spell_1.SpellEffectType.OnHit,
                    text: "Target takes wild damage equal to the attack table below + magical attack bonus.  The target also gains the devotion effect that lasts so long as you maintain concentration.  At the start of your next turn after you cast this spell you must spend your move action to maintain concentration or this spell’s effect is removed.  You may only have 1 concentration effect active at a time.",
                    spellChart: [__assign(__assign({}, new spell_chart_1.SpellChart()), { rowName: spell_damage_keyword_enum_1.SpellDamageKeyword.Wild, levelRange: level_range_enum_1.LevelRange.FIFTHTEEN, dieSize: dice_size_enum_1.DiceSize.d8, minValue: 13.33, maxValue: 53.74 }), __assign(__assign({}, new spell_chart_1.SpellChart()), { rowName: spell_keywords_enum_1.SpellKeywords.Concentration, levelRange: level_range_enum_1.LevelRange.FIFTHTEEN, dieSize: dice_size_enum_1.DiceSize.None, minValue: 10.38, maxValue: 34.81 })]
                }, {
                    type: spell_1.SpellEffectType.AfterEffect,
                    text: "Each time you pay the concentration cost of this spell the target with the devotion effect takes wild damage equal to the concentration table’s damage value below + global damage bonus",
                }] })];
}
exports.WarriorMageSpellList = WarriorMageSpellList;
