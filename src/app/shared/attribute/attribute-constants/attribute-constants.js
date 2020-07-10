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
exports.getAttributeObject = exports.ATTRIBUTE_BONUS_TO_AD = exports.ATTRIBUTE_POWER_POINT_BONUS = exports.ATTRIBUTE_INITIATIVE_BONUS = exports.ATTRIBUTE_TRAINED_SKILL_BONUS = exports.ATTRIBUTE_RECOVERY_BONUS = exports.ATTRIBUTE_INTUITION_INITIATIVE = exports.ATTRIBUTE_INTUITION_MAGIC_DEFENSE = exports.ATTRIBUTE_MAGIC_DEFENSE = exports.ATTRIBUTE_SKILL_BONUS = exports.AttributeConstants = exports.AttributeAttackDamage = exports.ValueRange = exports.INITIATIVE_TEXT = exports.PRESS_TEXT = void 0;
var attribute_model_1 = require("../attribute-model");
var attribute_name_enum_1 = require("../attribute-enums/attribute-name.enum");
var selected_bonus_groups_1 = require("./selected-bonus-groups");
var attribute_strength_enum_1 = require("../attribute-enums/attribute-strength.enum");
var weapon_category_enum_1 = require("../../weapon/weapon-category.enum");
var armor_type_enum_1 = require("../../armor/armor-type.enum");
exports.PRESS_TEXT = "When you press a foe after hitting you may choose the square they withdraw to as if you had performed a Tactical Rush, or you can displace a large foe.  This can not place the creature into Hazardous or Deadly terrain";
exports.INITIATIVE_TEXT = "Gain a bonus move action when rolling two odd numbers for initiative";
var ValueRange = /** @class */ (function () {
    function ValueRange() {
    }
    return ValueRange;
}());
exports.ValueRange = ValueRange;
var AttributeAttackDamage = /** @class */ (function () {
    function AttributeAttackDamage() {
    }
    return AttributeAttackDamage;
}());
exports.AttributeAttackDamage = AttributeAttackDamage;
var AttributeConstants = /** @class */ (function () {
    function AttributeConstants() {
    }
    return AttributeConstants;
}());
exports.AttributeConstants = AttributeConstants;
exports.ATTRIBUTE_SKILL_BONUS = [0, 2, 3, 4, 5];
exports.ATTRIBUTE_MAGIC_DEFENSE = [0, 2, 3, 4, 5];
exports.ATTRIBUTE_INTUITION_MAGIC_DEFENSE = [0, 1, 2, 2, 3];
exports.ATTRIBUTE_INTUITION_INITIATIVE = [0, 2, 4, 6, 8];
exports.ATTRIBUTE_RECOVERY_BONUS = [0, 0, 0, 1, 1];
exports.ATTRIBUTE_TRAINED_SKILL_BONUS = [0, 0, 1, 1, 2];
exports.ATTRIBUTE_INITIATIVE_BONUS = [0, 5, 10, 11, 16];
exports.ATTRIBUTE_POWER_POINT_BONUS = [0, 2, 4, 5, 7];
exports.ATTRIBUTE_BONUS_TO_AD = [0, 0, 0, 1, 1];
function getAttributeObject() {
    return __assign(__assign({}, new AttributeConstants()), { Brawn: __assign(__assign({}, new attribute_model_1.AttributeModel()), { attributeName: attribute_name_enum_1.AttributeName.Brawn, bonusToAttackDamage: [
                {
                    category: weapon_category_enum_1.WeaponCategory.Heavy,
                    range: [
                        { minBonus: 0, maxBonus: 0 },
                        { minBonus: 2, maxBonus: 5 },
                        { minBonus: 4, maxBonus: 10 },
                        { minBonus: 4, maxBonus: 10 },
                        { minBonus: 5, maxBonus: 12.5 },
                    ]
                },
                {
                    category: weapon_category_enum_1.WeaponCategory.Balanced,
                    range: [
                        { minBonus: 0, maxBonus: 0 },
                        { minBonus: 2, maxBonus: 5 },
                        { minBonus: 3, maxBonus: 7.5 },
                        { minBonus: 4, maxBonus: 10 },
                        { minBonus: 5, maxBonus: 12.5 },
                    ]
                }
            ], bonusToBrawnSkills: exports.ATTRIBUTE_SKILL_BONUS, selectableBonusPicks: {
                typeOfPick: [
                    __assign({}, new selected_bonus_groups_1.BrawnAttributePicks()), __assign({}, new selected_bonus_groups_1.BrawnAttributePicks()), __assign(__assign({}, new selected_bonus_groups_1.BrawnAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                attributeName: attribute_name_enum_1.AttributeName.Agility,
                                attributeStrength: attribute_strength_enum_1.AttributeStrength.Heroic,
                                category: weapon_category_enum_1.WeaponCategory.Balanced,
                                numberOfPicks: 1,
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.BrawnSelections()), { bonusToCriticalAndAggressivePress: {
                                criticalBonus: {
                                    minBonus: 1,
                                    maxBonus: 3,
                                },
                                pressText: exports.PRESS_TEXT,
                                pickValue: 1,
                                maxPicks: 1
                            }, bonusToCriticalAndEmpowered: {
                                bonusToCritical: { minBonus: 1, maxBonus: 3 },
                                bonusToEmpowered: { minBonus: 1, maxBonus: 3 },
                                pickValue: 1,
                                maxPicks: 0
                            }, bonusToProtectorAura: {
                                bonusTo: { minBonus: 4, maxBonus: 10 },
                                maxPicks: 0, pickValue: 1
                            } }) }), __assign(__assign({}, new selected_bonus_groups_1.BrawnAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                numberOfPicks: 2,
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.BrawnSelections()), { bonusToEmpoweredAndAggressivePress: {
                                empoweredBonus: {
                                    minBonus: 2, maxBonus: 5
                                },
                                pressText: exports.PRESS_TEXT,
                                pickValue: 2,
                                maxPicks: 1
                            }, bonusToEmpowered: {
                                pickValue: 2,
                                bonusTo: {
                                    minBonus: 3,
                                    maxBonus: 8
                                },
                                maxPicks: 1
                            }, bonusToCriticalAndEmpowered: {
                                bonusToCritical: { minBonus: 1, maxBonus: 3 },
                                bonusToEmpowered: { minBonus: 1, maxBonus: 3 },
                                pickValue: 1,
                                maxPicks: 0
                            }, bonusToProtectorAura: {
                                bonusTo: { minBonus: 4, maxBonus: 10 },
                                maxPicks: 0, pickValue: 1
                            } }) }), __assign(__assign({}, new selected_bonus_groups_1.BrawnAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                numberOfPicks: 3,
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.BrawnSelections()), { bonusToEmpoweredAndAggressivePress: {
                                empoweredBonus: { minBonus: 2, maxBonus: 5 },
                                pressText: exports.PRESS_TEXT,
                                pickValue: 2,
                                maxPicks: 1
                            }, bonusToEmpowered: {
                                pickValue: 2,
                                bonusTo: {
                                    minBonus: 3,
                                    maxBonus: 8
                                },
                                maxPicks: 3
                            }, bonusToCriticalAndEmpowered: {
                                bonusToCritical: { minBonus: 1, maxBonus: 2 },
                                bonusToEmpowered: { minBonus: 1, maxBonus: 3 },
                                pickValue: 1,
                                maxPicks: 0
                            }, bonusToProtectorAura: {
                                bonusTo: { minBonus: 4, maxBonus: 10 },
                                maxPicks: 0, pickValue: 1
                            } }) })
                ]
            } }), Agility: __assign(__assign({}, new attribute_model_1.AttributeModel()), { attributeName: attribute_name_enum_1.AttributeName.Agility, bonusToAttackDamage: [
                {
                    category: weapon_category_enum_1.WeaponCategory.Agile,
                    range: [
                        { minBonus: 0, maxBonus: 0 },
                        { minBonus: 2, maxBonus: 5 },
                        { minBonus: 4, maxBonus: 10 },
                        { minBonus: 4, maxBonus: 10 },
                        { minBonus: 5, maxBonus: 12.5 },
                    ]
                },
                {
                    category: weapon_category_enum_1.WeaponCategory.Balanced,
                    range: [
                        { minBonus: 0, maxBonus: 0 },
                        { minBonus: 2, maxBonus: 5 },
                        { minBonus: 3, maxBonus: 7.5 },
                        { minBonus: 4, maxBonus: 10 },
                        { minBonus: 5, maxBonus: 12.5 },
                    ]
                }
            ], bonusToAgilitySkills: exports.ATTRIBUTE_SKILL_BONUS, selectableBonusPicks: {
                typeOfPick: [
                    __assign({}, new selected_bonus_groups_1.AgilityAttributePicks()), __assign({}, new selected_bonus_groups_1.AgilityAttributePicks()), __assign(__assign({}, new selected_bonus_groups_1.AgilityAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                attributeName: attribute_name_enum_1.AttributeName.Brawn,
                                attributeStrength: attribute_strength_enum_1.AttributeStrength.Heroic,
                                category: weapon_category_enum_1.WeaponCategory.Balanced,
                                numberOfPicks: 1,
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.AgilitySelections()), { bonusToCritical: {
                                bonusTo: { minBonus: 3, maxBonus: 8 },
                                maxPicks: 0, pickValue: 1
                            }, bonusToSpeedAndCritical: {
                                bonusToSpeed: 1,
                                bonusToCritical: {
                                    minBonus: 1,
                                    maxBonus: 3,
                                },
                                maxPicks: 2
                            }, bonusToDualist: {
                                bonusTo: { minBonus: 1, maxBonus: 3 },
                                maxPicks: 0, pickValue: 1
                            }, bonusToFindWeakness: {
                                bonusTo: { minBonus: 2, maxBonus: 5 },
                                maxPicks: 0, pickValue: 1
                            } }) }), __assign(__assign({}, new selected_bonus_groups_1.AgilityAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                numberOfPicks: 2,
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.AgilitySelections()), { bonusToCritical: {
                                bonusTo: { minBonus: 3, maxBonus: 8 },
                                maxPicks: 0, pickValue: 1
                            }, bonusToSpeedAndCritical: {
                                bonusToSpeed: 1,
                                bonusToCritical: {
                                    minBonus: 1,
                                    maxBonus: 3,
                                },
                                maxPicks: 2
                            }, bonusToDualist: {
                                bonusTo: { minBonus: 1, maxBonus: 3 },
                                maxPicks: 0, pickValue: 1
                            }, bonusToFindWeakness: {
                                bonusTo: { minBonus: 2, maxBonus: 5 },
                                maxPicks: 0, pickValue: 1
                            } }) }), __assign(__assign({}, new selected_bonus_groups_1.AgilityAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                numberOfPicks: 3,
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.AgilitySelections()), { bonusToCritical: {
                                bonusTo: { minBonus: 3, maxBonus: 8 },
                                maxPicks: 0, pickValue: 1
                            }, bonusToSpeedAndCritical: {
                                bonusToSpeed: 1,
                                bonusToCritical: {
                                    minBonus: 1,
                                    maxBonus: 3,
                                },
                                maxPicks: 2
                            }, bonusToDualist: {
                                bonusTo: { minBonus: 1, maxBonus: 3 },
                                maxPicks: 0, pickValue: 1
                            }, bonusToFindWeakness: {
                                bonusTo: { minBonus: 2, maxBonus: 5 },
                                maxPicks: 0, pickValue: 1
                            } }) })
                ]
            } // end agility
         }), Reasoning: __assign(__assign({}, new attribute_model_1.AttributeModel()), { attributeName: attribute_name_enum_1.AttributeName.Reasoning, bonusToAttackDamage: [
                {
                    category: weapon_category_enum_1.WeaponCategory.Reasoning,
                    range: [
                        { minBonus: 0, maxBonus: 0 },
                        { minBonus: 2, maxBonus: 5 },
                        { minBonus: 4, maxBonus: 10 },
                        { minBonus: 5, maxBonus: 12 },
                        { minBonus: 6, maxBonus: 15 },
                    ]
                },
                {
                    category: weapon_category_enum_1.WeaponCategory.Hybrid,
                    range: [
                        { minBonus: 0, maxBonus: 0 },
                        { minBonus: 2, maxBonus: 5 },
                        { minBonus: 3, maxBonus: 7.5 },
                        { minBonus: 3, maxBonus: 7.5 },
                        { minBonus: 6, maxBonus: 15 },
                    ]
                }
            ], bonusToBaseCritical: {
                category: weapon_category_enum_1.WeaponCategory.Hybrid,
                range: [
                    { minBonus: 0, maxBonus: 0 },
                    { minBonus: 0, maxBonus: 0 },
                    { minBonus: 1, maxBonus: 3 },
                    { minBonus: 1, maxBonus: 3 },
                    { minBonus: 0, maxBonus: 0 },
                ]
            }, bonusToReasoningSkills: exports.ATTRIBUTE_SKILL_BONUS, selectableBonusPicks: {
                typeOfPick: [
                    __assign({}, new selected_bonus_groups_1.ReasoningAttributePicks()), __assign(__assign({}, new selected_bonus_groups_1.ReasoningAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                attributeName: attribute_name_enum_1.AttributeName.Presence,
                                attributeStrength: attribute_strength_enum_1.AttributeStrength.Champion,
                                category: weapon_category_enum_1.WeaponCategory.Hybrid,
                                numberOfPicks: 1
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.ReasoningSelections()), { bonusToCritical: { bonusTo: { minBonus: 2, maxBonus: 5 } }, bonusToEmpowered: { bonusTo: { minBonus: 1, maxBonus: 2.5 } } }) }), __assign(__assign({}, new selected_bonus_groups_1.ReasoningAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                attributeName: attribute_name_enum_1.AttributeName.Presence,
                                attributeStrength: attribute_strength_enum_1.AttributeStrength.Heroic,
                                category: weapon_category_enum_1.WeaponCategory.Hybrid,
                                numberOfPicks: 1
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.ReasoningSelections()), { bonusToCritical: { bonusTo: { minBonus: 2, maxBonus: 5 } }, bonusToEmpowered: { bonusTo: { minBonus: 1, maxBonus: 2.5 } } }) }), __assign(__assign({}, new selected_bonus_groups_1.ReasoningAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                attributeName: attribute_name_enum_1.AttributeName.Presence,
                                attributeStrength: attribute_strength_enum_1.AttributeStrength.Heroic,
                                category: weapon_category_enum_1.WeaponCategory.Hybrid,
                                numberOfPicks: 2
                            }, {
                                numberOfPicks: 1
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.ReasoningSelections()), { bonusToCriticalAndEmpowered: {
                                bonusToCritical: {
                                    minBonus: 1,
                                    maxBonus: 2.5,
                                },
                                bonusToEmpowered: { minBonus: 1, maxBonus: 2.5 },
                                pickValue: 1
                            }, bonusToCritical: { bonusTo: { minBonus: 3, maxBonus: 7.5 } } }) }), __assign(__assign({}, new selected_bonus_groups_1.ReasoningAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                numberOfPicks: 3,
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.ReasoningSelections()), { bonusToCritical: {
                                bonusTo: { minBonus: 3, maxBonus: 7.5 },
                            }, bonusToEmpowered: {
                                bonusTo: { minBonus: 1, maxBonus: 2.5 }
                            } }) })
                ]
            } }), Presence: __assign(__assign({}, new attribute_model_1.AttributeModel()), { attributeName: attribute_name_enum_1.AttributeName.Presence, bonusToAttackDamage: [
                {
                    category: weapon_category_enum_1.WeaponCategory.Presence,
                    range: [
                        { minBonus: 0, maxBonus: 0 },
                        { minBonus: 2, maxBonus: 5 },
                        { minBonus: 4, maxBonus: 10 },
                        { minBonus: 4, maxBonus: 10 },
                        { minBonus: 4, maxBonus: 10 },
                    ]
                },
                {
                    category: weapon_category_enum_1.WeaponCategory.Hybrid,
                    range: [
                        { minBonus: 0, maxBonus: 0 },
                        { minBonus: 2, maxBonus: 5 },
                        { minBonus: 2, maxBonus: 5 },
                        { minBonus: 3, maxBonus: 7.5 },
                        { minBonus: 4, maxBonus: 10 },
                    ]
                }
            ], bonusToBaseCritical: {
                category: weapon_category_enum_1.WeaponCategory.Hybrid,
                range: [
                    { minBonus: 0, maxBonus: 0 },
                    { minBonus: 0, maxBonus: 0 },
                    { minBonus: 1, maxBonus: 3 },
                    { minBonus: 1, maxBonus: 3 },
                    { minBonus: 0, maxBonus: 0 },
                ]
            }, bonusToPresenceSkills: exports.ATTRIBUTE_SKILL_BONUS, selectableBonusPicks: {
                typeOfPick: [
                    __assign({}, new selected_bonus_groups_1.PresenceAttributePicks()),
                    __assign(__assign({}, new selected_bonus_groups_1.PresenceAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                attributeName: attribute_name_enum_1.AttributeName.Reasoning,
                                attributeStrength: attribute_strength_enum_1.AttributeStrength.Champion,
                                category: weapon_category_enum_1.WeaponCategory.Hybrid,
                                numberOfPicks: 1
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.PresenceSelections()), { forcedMovement: {
                                bonusTo: 1,
                                maxPicks: 2,
                                pickValue: 1
                            }, friendlyMovement: {
                                bonusTo: 1,
                                maxPicks: 2,
                                pickValue: 1
                            }, bonusToHitWithEnvironmentAttacks: {
                                bonusTo: 1,
                                maxPicks: 2,
                                pickValue: 1
                            }, convertAttackDamageIntoGlobal: {
                                bonusToGlobal: { minBonus: 1, maxBonus: 3 },
                                bonusToAttack: { minBonus: -1, maxBonus: -3 },
                                maxPicks: 4, pickValue: 1
                            } }) }), __assign(__assign({}, new selected_bonus_groups_1.PresenceAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                attributeName: attribute_name_enum_1.AttributeName.Reasoning,
                                attributeStrength: attribute_strength_enum_1.AttributeStrength.Champion,
                                category: weapon_category_enum_1.WeaponCategory.Hybrid,
                                numberOfPicks: 3
                            }, {
                                attributeName: attribute_name_enum_1.AttributeName.Reasoning,
                                attributeStrength: attribute_strength_enum_1.AttributeStrength.Heroic,
                                category: weapon_category_enum_1.WeaponCategory.Hybrid,
                                numberOfPicks: 2
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.PresenceSelections()), { forcedMovement: {
                                bonusTo: 1, maxPicks: 2
                            }, friendlyMovement: {
                                bonusTo: 1, maxPicks: 2
                            }, bonusToHitWithEnvironmentAttacks: {
                                bonusTo: 1, maxPicks: 2
                            }, convertAttackDamageIntoGlobal: {
                                bonusToGlobal: { minBonus: 1, maxBonus: 3 },
                                bonusToAttack: { minBonus: -1, maxBonus: -3 },
                                maxPicks: 4, pickValue: 1
                            } }) }), __assign(__assign({}, new selected_bonus_groups_1.PresenceAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                numberOfPicks: 3
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.PresenceSelections()), { forcedMovement: {
                                bonusTo: 1, maxPicks: 2
                            }, friendlyMovement: {
                                bonusTo: 1, maxPicks: 2
                            }, bonusToHitWithEnvironmentAttacks: {
                                bonusTo: 1, maxPicks: 2
                            }, convertAttackDamageIntoGlobal: {
                                bonusToGlobal: { minBonus: 1, maxBonus: 3 },
                                bonusToAttack: { minBonus: -1, maxBonus: -3 },
                                maxPicks: 4, pickValue: 1
                            }, bonusToGlobalDamageAndPenaltyToCritical: {
                                bonusToGlobal: { minBonus: 1, maxBonus: 2.5 },
                                bonusToCritical: { minBonus: -1, maxBonus: -2.5 },
                                pickValue: 2, maxPicks: 1
                            } }) }), __assign(__assign({}, new selected_bonus_groups_1.PresenceAttributePicks()), { requiredHybridAttributeStrength: [
                            {
                                numberOfPicks: 6,
                            }
                        ], selections: __assign(__assign({}, new selected_bonus_groups_1.PresenceSelections()), { forcedMovement: {
                                bonusTo: 1, maxPicks: 2
                            }, friendlyMovement: {
                                bonusTo: 1, maxPicks: 2
                            }, bonusToHitWithEnvironmentAttacks: {
                                bonusTo: 1, maxPicks: 2
                            }, convertAttackDamageIntoGlobal: {
                                bonusToGlobal: { minBonus: 1, maxBonus: 3 },
                                bonusToAttack: { minBonus: -1, maxBonus: -3 },
                                maxPicks: 4, pickValue: 1
                            }, bonusToGlobalDamageAndPenaltyToCritical: {
                                bonusToGlobal: { minBonus: 1, maxBonus: 2.5 },
                                bonusToCritical: { minBonus: -1, maxBonus: -2.5 },
                                pickValue: 2, maxPicks: 1
                            } }) })
                ]
            } }), Vitality: __assign(__assign({}, new attribute_model_1.AttributeModel()), { attributeName: attribute_name_enum_1.AttributeName.Vitality, bonusToFortitude: exports.ATTRIBUTE_MAGIC_DEFENSE, bonusToHitPoints: [
                { minBonus: 0, maxBonus: 0 },
                { minBonus: 4, maxBonus: 10 },
                { minBonus: 8, maxBonus: 20 },
                { minBonus: 10, maxBonus: 25 },
                { minBonus: 14, maxBonus: 35 },
            ], bonusToRecoveries: exports.ATTRIBUTE_RECOVERY_BONUS, bonusToTrainedSkills: exports.ATTRIBUTE_TRAINED_SKILL_BONUS }), Quickness: __assign(__assign({}, new attribute_model_1.AttributeModel()), { attributeName: attribute_name_enum_1.AttributeName.Quickness, bonusToReflex: exports.ATTRIBUTE_MAGIC_DEFENSE, bonusToInitiative: exports.ATTRIBUTE_INITIATIVE_BONUS, firstTurnDamageResist: [
                { minBonus: 0, maxBonus: 0 },
                { minBonus: 2, maxBonus: 5 },
                { minBonus: 4, maxBonus: 10 },
                { minBonus: 5, maxBonus: 13 },
                { minBonus: 7, maxBonus: 18 },
            ], epicText: exports.INITIATIVE_TEXT, legendaryText: exports.INITIATIVE_TEXT, bonusToTrainedSkills: exports.ATTRIBUTE_TRAINED_SKILL_BONUS }), SelfDiscipline: __assign(__assign({}, new attribute_model_1.AttributeModel()), { attributeName: attribute_name_enum_1.AttributeName.SelfDiscipline, bonusToFortitude: exports.ATTRIBUTE_MAGIC_DEFENSE, bonusToPowerPoints: exports.ATTRIBUTE_POWER_POINT_BONUS, bonusToStartingTHP: [
                { minBonus: 0, maxBonus: 0 },
                { minBonus: 2, maxBonus: 5 },
                { minBonus: 4, maxBonus: 10 },
                { minBonus: 5, maxBonus: 13 },
                { minBonus: 7, maxBonus: 18 },
            ], bonusToAd: [{
                    bonusValue: exports.ATTRIBUTE_BONUS_TO_AD[attribute_strength_enum_1.AttributeStrength.Normal],
                    armorTypes: [armor_type_enum_1.ArmorType.CasterArmor]
                },
                {
                    bonusValue: exports.ATTRIBUTE_BONUS_TO_AD[attribute_strength_enum_1.AttributeStrength.Heroic],
                    armorTypes: [armor_type_enum_1.ArmorType.CasterArmor]
                },
                {
                    bonusValue: exports.ATTRIBUTE_BONUS_TO_AD[attribute_strength_enum_1.AttributeStrength.Champion],
                    armorTypes: [armor_type_enum_1.ArmorType.CasterArmor]
                },
                {
                    bonusValue: exports.ATTRIBUTE_BONUS_TO_AD[attribute_strength_enum_1.AttributeStrength.Epic],
                    armorTypes: [armor_type_enum_1.ArmorType.CasterArmor]
                },
                {
                    bonusValue: exports.ATTRIBUTE_BONUS_TO_AD[attribute_strength_enum_1.AttributeStrength.Legendary],
                    armorTypes: [armor_type_enum_1.ArmorType.CasterArmor]
                }
            ], bonusToTrainedSkills: exports.ATTRIBUTE_TRAINED_SKILL_BONUS }), Intuition: __assign(__assign({}, new attribute_model_1.AttributeModel()), { attributeName: attribute_name_enum_1.AttributeName.Intuition, bonusToWill: exports.ATTRIBUTE_INTUITION_MAGIC_DEFENSE, bonusToFortitude: exports.ATTRIBUTE_INTUITION_MAGIC_DEFENSE, bonusToReflex: exports.ATTRIBUTE_INTUITION_MAGIC_DEFENSE, bonusToInitiative: exports.ATTRIBUTE_INTUITION_INITIATIVE, bonusToBrawnSkills: exports.ATTRIBUTE_SKILL_BONUS, bonusToPresenceSkills: exports.ATTRIBUTE_SKILL_BONUS, bonusToAgilitySkills: exports.ATTRIBUTE_SKILL_BONUS, bonusToReasoningSkills: exports.ATTRIBUTE_SKILL_BONUS, bonusToIntuitionSKills: exports.ATTRIBUTE_SKILL_BONUS, bonusToDodge: [
                { minBonus: 0, maxBonus: 0 },
                { minBonus: 2, maxBonus: 5 },
                { minBonus: 4, maxBonus: 10 },
                { minBonus: 5, maxBonus: 13 },
                { minBonus: 7, maxBonus: 18 },
            ], bonusToAd: [{
                    bonusValue: exports.ATTRIBUTE_BONUS_TO_AD[attribute_strength_enum_1.AttributeStrength.Normal],
                    armorTypes: [armor_type_enum_1.ArmorType.None, armor_type_enum_1.ArmorType.LightArmor, armor_type_enum_1.ArmorType.MediumArmor]
                },
                {
                    bonusValue: exports.ATTRIBUTE_BONUS_TO_AD[attribute_strength_enum_1.AttributeStrength.Heroic],
                    armorTypes: [armor_type_enum_1.ArmorType.None, armor_type_enum_1.ArmorType.LightArmor, armor_type_enum_1.ArmorType.MediumArmor]
                },
                {
                    bonusValue: exports.ATTRIBUTE_BONUS_TO_AD[attribute_strength_enum_1.AttributeStrength.Champion],
                    armorTypes: [armor_type_enum_1.ArmorType.None, armor_type_enum_1.ArmorType.LightArmor, armor_type_enum_1.ArmorType.MediumArmor]
                },
                {
                    bonusValue: exports.ATTRIBUTE_BONUS_TO_AD[attribute_strength_enum_1.AttributeStrength.Epic],
                    armorTypes: [armor_type_enum_1.ArmorType.None, armor_type_enum_1.ArmorType.LightArmor, armor_type_enum_1.ArmorType.MediumArmor]
                },
                {
                    bonusValue: exports.ATTRIBUTE_BONUS_TO_AD[attribute_strength_enum_1.AttributeStrength.Legendary],
                    armorTypes: [armor_type_enum_1.ArmorType.None, armor_type_enum_1.ArmorType.LightArmor, armor_type_enum_1.ArmorType.MediumArmor]
                }
            ], bonusToTrainedSkills: exports.ATTRIBUTE_TRAINED_SKILL_BONUS }) });
}
exports.getAttributeObject = getAttributeObject;
