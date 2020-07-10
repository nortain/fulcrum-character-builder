"use strict";
exports.__esModule = true;
exports.Dice = void 0;
/**The Dice class knows everything about dice, how to use them and how to print out how they should be displayed.*/
var field_1 = require("../../field/field");
var dice_size_enum_1 = require("./dice-size.enum");
var Dice = /** @class */ (function () {
    function Dice(numOfDice, sizeOfDice, modifierOfDice) {
        if (numOfDice === void 0) { numOfDice = 0; }
        if (sizeOfDice === void 0) { sizeOfDice = dice_size_enum_1.DiceSize.None; }
        if (modifierOfDice === void 0) { modifierOfDice = 0; }
        this.numOfDice = new field_1.Field(numOfDice);
        this.sizeOfDice = new field_1.Field(sizeOfDice);
        this.modifierOfDice = new field_1.Field(modifierOfDice);
    }
    Dice.prototype.getSizeOfDice = function () {
        return this.sizeOfDice;
    };
    /**Give the number, size and modifier of the dice we can print the roll like 3d12+4 or 2d6-*/
    Dice.prototype.printRoll = function () {
        var num = this.numOfDice.value();
        var size = this.sizeOfDice.value();
        var mod = this.modifierOfDice.value();
        if (size === dice_size_enum_1.DiceSize.None || num === 0) {
            return "" + mod;
        }
        else if (size > dice_size_enum_1.DiceSize.None && mod > 0) {
            return num + "d" + size + "+" + mod;
        }
        else if (size > dice_size_enum_1.DiceSize.None && mod < 0) {
            return num + "d" + size + mod;
        }
        else {
            return num + "d" + size;
        }
    };
    Dice.prototype.clearAll = function () {
        this.numOfDice.clearAll();
        this.sizeOfDice.clearAll();
        this.modifierOfDice.clearAll();
    };
    return Dice;
}());
exports.Dice = Dice;
