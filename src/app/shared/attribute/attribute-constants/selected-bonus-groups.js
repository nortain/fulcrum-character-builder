"use strict";
exports.__esModule = true;
exports.AgilityAttributePicks = exports.BrawnAttributePicks = exports.ReasoningAttributePicks = exports.PresenceAttributePicks = exports.AgilitySelections = exports.BrawnSelections = exports.ReasoningSelections = exports.PresenceSelections = exports.AttributeBonusWithSpeed = exports.AttributeBonusWithText = exports.NonScalingAttributeBonus = exports.GlobalDamageAndPenaltyToAttack = exports.GlobalDamageAndPenaltyToCritical = exports.AttributeBonus = exports.CriticalAndEmpoweredBonus = exports.AttributePick = exports.AttributeSelectionWithPicks = exports.SelectionNames = void 0;
var SelectionNames;
(function (SelectionNames) {
    SelectionNames["PresenceSelections"] = "PresenceSelections";
    SelectionNames["ReasoningSelections"] = "ReasoningSelections";
    SelectionNames["BrawnSelections"] = "BrawnSelections";
    SelectionNames["AgilitySelections"] = "AgilitySelections";
})(SelectionNames = exports.SelectionNames || (exports.SelectionNames = {}));
/**
 * A holder for one of the attributeSelection alias along with a total number of available picks that can be made.  This class is essentally holding what possible selections are available to a player and how many picks they have to allocate to those selections.
 */
var AttributeSelectionWithPicks = /** @class */ (function () {
    function AttributeSelectionWithPicks() {
        this.numberOfPicks = 0;
    }
    return AttributeSelectionWithPicks;
}());
exports.AttributeSelectionWithPicks = AttributeSelectionWithPicks;
var AttributePick = /** @class */ (function () {
    function AttributePick() {
    }
    return AttributePick;
}());
exports.AttributePick = AttributePick;
var CriticalAndEmpoweredBonus = /** @class */ (function () {
    function CriticalAndEmpoweredBonus() {
    }
    return CriticalAndEmpoweredBonus;
}());
exports.CriticalAndEmpoweredBonus = CriticalAndEmpoweredBonus;
var AttributeBonus = /** @class */ (function () {
    function AttributeBonus() {
    }
    return AttributeBonus;
}());
exports.AttributeBonus = AttributeBonus;
var GlobalDamageAndPenaltyToCritical = /** @class */ (function () {
    function GlobalDamageAndPenaltyToCritical() {
    }
    return GlobalDamageAndPenaltyToCritical;
}());
exports.GlobalDamageAndPenaltyToCritical = GlobalDamageAndPenaltyToCritical;
var GlobalDamageAndPenaltyToAttack = /** @class */ (function () {
    function GlobalDamageAndPenaltyToAttack() {
    }
    return GlobalDamageAndPenaltyToAttack;
}());
exports.GlobalDamageAndPenaltyToAttack = GlobalDamageAndPenaltyToAttack;
var NonScalingAttributeBonus = /** @class */ (function () {
    function NonScalingAttributeBonus() {
    }
    return NonScalingAttributeBonus;
}());
exports.NonScalingAttributeBonus = NonScalingAttributeBonus;
var AttributeBonusWithText = /** @class */ (function () {
    function AttributeBonusWithText() {
    }
    return AttributeBonusWithText;
}());
exports.AttributeBonusWithText = AttributeBonusWithText;
var AttributeBonusWithSpeed = /** @class */ (function () {
    function AttributeBonusWithSpeed() {
    }
    return AttributeBonusWithSpeed;
}());
exports.AttributeBonusWithSpeed = AttributeBonusWithSpeed;
var PresenceSelections = /** @class */ (function () {
    function PresenceSelections() {
        this.name = SelectionNames.PresenceSelections;
    }
    return PresenceSelections;
}());
exports.PresenceSelections = PresenceSelections;
var ReasoningSelections = /** @class */ (function () {
    function ReasoningSelections() {
        this.name = SelectionNames.ReasoningSelections;
    }
    return ReasoningSelections;
}());
exports.ReasoningSelections = ReasoningSelections;
var BrawnSelections = /** @class */ (function () {
    function BrawnSelections() {
        this.name = SelectionNames.BrawnSelections;
    }
    return BrawnSelections;
}());
exports.BrawnSelections = BrawnSelections;
var AgilitySelections = /** @class */ (function () {
    function AgilitySelections() {
        this.name = SelectionNames.AgilitySelections;
    }
    return AgilitySelections;
}());
exports.AgilitySelections = AgilitySelections;
var PresenceAttributePicks = /** @class */ (function () {
    function PresenceAttributePicks() {
        this.requiredHybridAttributeStrength = new Array();
        this.selections = new PresenceSelections();
    }
    return PresenceAttributePicks;
}());
exports.PresenceAttributePicks = PresenceAttributePicks;
var ReasoningAttributePicks = /** @class */ (function () {
    function ReasoningAttributePicks() {
        this.requiredHybridAttributeStrength = new Array();
        this.selections = new ReasoningSelections();
    }
    return ReasoningAttributePicks;
}());
exports.ReasoningAttributePicks = ReasoningAttributePicks;
var BrawnAttributePicks = /** @class */ (function () {
    function BrawnAttributePicks() {
        this.requiredHybridAttributeStrength = new Array();
        this.selections = new BrawnSelections();
    }
    return BrawnAttributePicks;
}());
exports.BrawnAttributePicks = BrawnAttributePicks;
var AgilityAttributePicks = /** @class */ (function () {
    function AgilityAttributePicks() {
        this.requiredHybridAttributeStrength = new Array();
        this.selections = new AgilitySelections();
    }
    return AgilityAttributePicks;
}());
exports.AgilityAttributePicks = AgilityAttributePicks;
