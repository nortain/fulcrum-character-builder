"use strict";
exports.__esModule = true;
exports.MagicDefense = void 0;
var field_1 = require("../../field/field");
var MagicDefense = /** @class */ (function () {
    function MagicDefense(type, strength) {
        this.type = type;
        this.strength = strength;
        if (strength.value() < 10) {
            this.strength = new field_1.Field(10);
        }
    }
    MagicDefense.prototype.addDefenseBonus = function (name, value) {
        this.strength.addVal[name] = value;
    };
    /**
     * takes in a string name to remove that bonus from the field object.  If no name is provided then all bonuses from the field are removed
     * @param {string} name
     */
    MagicDefense.prototype.removeDefenseBonus = function (name) {
        if (!name) {
            this.strength.clearAll();
        }
        else if (this.strength.value(name)) {
            this.strength.addVal[name] = 0;
        }
    };
    MagicDefense.prototype.getDefense = function () {
        return this.strength.value();
    };
    return MagicDefense;
}());
exports.MagicDefense = MagicDefense;
