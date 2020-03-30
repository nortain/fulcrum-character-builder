import {ThemePointsContainer} from "../theme-points-container";
import {Subtheme} from "./subtheme";
import {ThemeType} from "../theme-type.enum";
import {getSubthemeObject, SubthemeObject} from "../../constants/subtheme/subtheme-constants";
import {ThemeStrength} from "../theme-strength.enum";
import {Knack} from "../../constants/constants";


export class SubthemeContainer {
  /**
   * subthemes based on theme type that contain subthemes
   */
  combat: Subtheme[];
  stealth: Subtheme[];
  magic: Subtheme;
  spellKnacks: Knack[];

  constructor(public themePoints: ThemePointsContainer) {
    this.combat = [];
    this.stealth = [];
    this.magic = null;
    this.spellKnacks = [];
  }


  /**
   * builds a subtheme object with all possible subthemes based on the passed in themes point container.  Any unavailable subthemes will be null.
   * Ex. if a theme container has 3 combat and 1 magic then this function should return a SubthemeObject with all 3 combat themes, null for stealth and then both 1 magic sub themes but null for 2 magic and 3magic
   */
  buildSubthemeObject(): SubthemeObject {
    const so = getSubthemeObject(this.themePoints.magic.getStrength());
    this.filterSubtheme("combat", so);
    this.filterSubtheme("stealth", so);
    return so;
  }

  /**
   * Takes in a subtheme type of either stealth or combat and a subtheme object that contains all subthemes.  This will prune out any subthemes that don't have theme points
   * @param {"combat" | "stealth"} subthemeTypes
   * @param {SubthemeObject} so
   */
  private filterSubtheme(subthemeTypes: "combat" | "stealth", so: SubthemeObject) {
    const subthemeBasedOnThemePoints = this.themePoints[subthemeTypes];
    const subtheme = this[subthemeTypes];
    if (subthemeBasedOnThemePoints.getStrength() < 1) {
      so[subthemeTypes] = [];
    } else if (subtheme.length > 0) {
      for (const item of this[subthemeTypes]) {
        so[subthemeTypes].find((element, index, array) => {
          if (element.subthemeName === item.subthemeName) {
            array[index] = item;
            return true;
          }
        });
      }
    }
  }

  /**
   * gets the available number of subtheme points for a given theme type
   * @param {"combat" | "stealth" | "magic"} themeType
   * @returns {number}
   */
  getAvailableSubthemePoints(themeType: "combat" | "stealth" | "magic"): number {
    return this.themePoints[themeType].getStrength() - this.getSubthemeStrength(themeType);
  }

  /**
   * gets the current strength or number of theme points assigned to one of available subthemes.
   * @param {"combat" | "stealth" | "magic"} themeType
   * @returns {number}
   */
  getSubthemeStrength(themeType: "combat" | "stealth" | "magic"): number {
    let total = 0;
    if (themeType === "magic") {
      if (this.magic) {
        total = this[themeType].themeStrength;
      }
    } else {
      for (const sub of this[themeType]) {
        total += sub.themeStrength;
      }
    }
    return total;
  }


  private buildNewArray(array: Subtheme[], assignedSub: Subtheme) {
    const newArray = [assignedSub];
    for (const sub of array) {
      if (sub.subthemeName !== assignedSub.subthemeName) {
        newArray.push(sub);
      }
    }
    return newArray;
  }

  /**
   * assigns the given subtheme to the property combat, stealth or magic placeholder if there are enough available themepoints.  If there aren't, nothing happens and an error is logged to the console.  Ideally this should be checked before a call is made.
   * @param {Subtheme} subtheme to be added
   */
  assignSubtheme(subtheme: Subtheme) {
    switch (subtheme.themeType) {
      case ThemeType.Combat: {
        if (this.getAvailableSubthemePoints("combat") < subtheme.themeStrength) {
          this.handleError("There aren't enough available combat theme points to assign the subtheme " + subtheme.getSubthemeFormattedName());
        } else {
          this.combat = this.buildNewArray(this.combat, subtheme);
        }
        break;
      }
      case ThemeType.Stealth: {
        if (this.getAvailableSubthemePoints("stealth") < subtheme.themeStrength) {
          this.handleError("There aren't enough available stealth theme points to assign the subtheme " + subtheme.getSubthemeFormattedName());
        } else {
          this.stealth = this.buildNewArray(this.stealth, subtheme);

        }
        break;
      }
      case ThemeType.Magic: {
        if (this.themePoints.magic.getStrength() < subtheme.themeStrength) {
          this.handleError("There aren't enough available magic theme points to assign the subtheme " + subtheme.getSubthemeFormattedName());
        } else {
          this.magic = subtheme;
        }
        break;

      }
      default: // do nothing
        break;
    }
  }

  handleError(msg: string) {
    console.error(msg);
  }


}
