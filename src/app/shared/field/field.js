"use strict";
exports.__esModule = true;
exports.Field = void 0;
var precision_enum_1 = require("./precision.enum");
var field_type_enum_1 = require("./field-type.enum");
var Field = /** @class */ (function () {
    function Field(baseValue, defaultValue) {
        this.baseValue = baseValue;
        this.defaultValue = defaultValue;
        this.precision = precision_enum_1.Precision.None;
        // objects that hold dynamic values
        this.replaceVal = {};
        this.preMultiply = {};
        this.addVal = {};
        this.postMultiply = {};
    }
    /**This function is the money shot of what makes this class useful and important.
    Calling value will return a return value that is equal to the base value.
    If replaceVal, pre/postMultiply or addVal a property that matches the passed in filter
    OR
    no filter is passed in and a parameter lives on any of the replaceVal, pre/postMultiply, addVal objects then those operations will be carried out.
      See the spec file for examples
    */
    Field.prototype.value = function (filter, precision) {
        var returnValue = this.baseValue;
        for (var _i = 0, _a = Object.keys(this.replaceVal); _i < _a.length; _i++) {
            var rep = _a[_i];
            if (!filter || rep === filter) {
                returnValue = this.replaceVal[rep];
            }
        }
        for (var _b = 0, _c = Object.keys(this.preMultiply); _b < _c.length; _b++) {
            var pm = _c[_b];
            if (!filter || pm === filter) {
                returnValue = Number(returnValue) * Number(this.preMultiply[pm]);
            }
        }
        for (var _d = 0, _e = Object.keys(this.addVal); _d < _e.length; _d++) {
            var a = _e[_d];
            if (!filter || a === filter) {
                returnValue = Number(returnValue) + Number(this.addVal[a]);
            }
        }
        for (var _f = 0, _g = Object.keys(this.postMultiply); _f < _g.length; _f++) {
            var m = _g[_f];
            if (!filter || m === filter) {
                returnValue = Number(returnValue) * Number(this.postMultiply[m]);
            }
        }
        if (!precision) {
            precision = this.precision;
        }
        if (!returnValue && returnValue !== 0) {
            return this.defaultValue;
        }
        else if (typeof returnValue === "number") {
            return this.round(returnValue, precision);
        }
        else {
            return returnValue;
        }
    };
    /*
    * isDifferentFrom will use the incoming filter to determine if the baseValue exists and if so, if rounding the base is NOT equal
    * to the value(filter).  Or in otherwords  if there is a basevalue and given a filter that value basevalue is different, then return TRUE.
    * In all other cases return false.
    * */
    Field.prototype.isDifferentFrom = function (filter) {
        return this.baseValue && this.round(this.baseValue, this.precision) !== this.value(filter);
    };
    /**Rounding function that is using a preset of determined precision values based off of the enum by the same name.*/
    Field.prototype.round = function (value, precision) {
        if (precision === void 0) { precision = precision_enum_1.Precision.None; }
        if (typeof value === "number") {
            return Math.floor(precision * value) / precision;
        }
        else {
            return value;
        }
    };
    Field.prototype.clearField = function (property) {
        if (this[property]) {
            this[property] = {};
        }
    };
    Field.prototype.clearAll = function () {
        for (var _i = 0, _a = Object.keys(field_type_enum_1.FieldType); _i < _a.length; _i++) {
            var type = _a[_i];
            this.clearField(type);
        }
    };
    return Field;
}());
exports.Field = Field;
