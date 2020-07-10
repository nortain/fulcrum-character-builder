"use strict";
exports.__esModule = true;
exports.AbilityModel = void 0;
var AbilityModel = /** @class */ (function () {
    function AbilityModel() {
        this.pickNumber = 0; // used to determine how many sub talents can be chosen.  If 0 then no choices exist
        this.innerSelectedAbilities = new Array(); // A saved state of an ability.  This holds the name of any chosen abilities with regards to the pickNumber.  For example if pickNumber is 2, then innerSelectedAbilities should be between 0 and 2 in length to indicate which abilities have been chosen for this ability
    }
    return AbilityModel;
}());
exports.AbilityModel = AbilityModel;
