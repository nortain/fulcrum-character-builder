"use strict";
exports.__esModule = true;
exports.Spell = exports.SpellEffectType = void 0;
var SpellEffectType;
(function (SpellEffectType) {
    SpellEffectType["OnHit"] = "OnHit";
    SpellEffectType["OnMiss"] = "OnMiss";
    SpellEffectType["Bounce"] = "Bounce";
    SpellEffectType["SpellEffect"] = "SpellEffect";
    SpellEffectType["AfterEffect"] = "AfterEffect";
})(SpellEffectType = exports.SpellEffectType || (exports.SpellEffectType = {}));
var Spell = /** @class */ (function () {
    function Spell() {
    }
    return Spell;
}());
exports.Spell = Spell;
