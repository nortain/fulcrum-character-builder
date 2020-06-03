import {ThemePoint} from "./theme-point";
import {ThemeType} from "./theme-type.enum";
import {ThemeStrength} from "./theme-strength.enum";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";
import {Level} from "../character/level.enum";

export class ThemePointsContainer {

  combat: ThemePoint;
  stealth: ThemePoint;
  magic: ThemePoint;
  general: ThemePoint;


  constructor(combat?: ThemeStrength, stealth?: ThemeStrength, magic?: ThemeStrength, general?: ThemeStrength) {
    this.combat = new ThemePoint(ThemeType.Combat, combat);
    this.stealth = new ThemePoint(ThemeType.Stealth, stealth);
    this.magic = new ThemePoint(ThemeType.Magic, magic);
    this.general = new ThemePoint(ThemeType.General, general);
  }

  /**returns the total number of theme points that are assigned*/
  getTotalThemePoints(currentNumberOfTheme: number = 0): number {
    return this.combat.getStrength() + this.stealth.getStrength() + this.magic.getStrength() + this.general.getStrength() - currentNumberOfTheme;
  }

  getHitPointBonus(level: Level): number {
    let bonus = 3;
    bonus += Math.floor((3 + level) * 5 + this.combat.getStrength() * .5 + this.stealth.getStrength() * .25);
    return bonus;
  }

  /**
   * returns a number to indicate how my theme points are available excluding the theme that was currently passed in
   * @param {string} exluduceCurrentTheme
   * @returns {number}
   */
  getOtherThemePoints(exluduceCurrentTheme: string): number {
    const result = this.getTotalThemePoints() - this[exluduceCurrentTheme].getStrength();
    return result;
  }

  /**Gets the defensive bonus based on theme point distribution*/
  getDefensiveBonus(): Array<MagicDefenseType> {
    const result = [];
    for (const type of this.getStrongestThemePoints()) {
      if (type === ThemeType.Combat) {
        result.push(MagicDefenseType.Fortitude);
      } else if (type === ThemeType.Stealth) {
        result.push(MagicDefenseType.Reflex);
      } else if (type === ThemeType.Magic) {
        result.push(MagicDefenseType.Will);
      }
    }
    return result;
  }

  /**
   * returns an array of theme types based on their strength.  This is used for determining which magic defense gets a bonus from selected theme points
   * */
  getStrongestThemePoints(): Array<ThemeType> {
    const results = [];
    if (this.combat.getStrength() >= this.stealth.getStrength() && this.combat.getStrength() >= this.magic.getStrength()) {
      results.push(ThemeType.Combat);
    }
    if (this.stealth.getStrength() >= this.combat.getStrength() && this.stealth.getStrength() >= this.magic.getStrength()) {
      results.push(ThemeType.Stealth);
    }
    if (this.magic.getStrength() >= this.combat.getStrength() && this.magic.getStrength() >= this.stealth.getStrength()) {
      results.push(ThemeType.Magic);
    }
    return results;
  }

  /**
   * gets the bonus to out of combat recovery based on the strength of the general theme
   * @returns {number}
   */
  getOOCRecoveryValue(): number {
    if (this.general.getStrength() > ThemeStrength.None) {
      return Math.floor((this.general.getStrength() + 4) / 4);
    } else {
      return 0;
    }
  }

  /**
   *
   * @returns {number} returns the amount of bonus theme points a character get
   */
  getPowerPointBonus(): number {
    if (this.general.getStrength() > ThemeStrength.None) {
      return 1;
    } else {
      return 0;
    }
  }

  getAdrenalinePoints(): number {
    if (this.magic.getStrength() === ThemeStrength.Greater) {
      return 0;
    } else if (this.magic.getStrength() === ThemeStrength.Lesser) {
      return 2 - this.general.getStrength();
    } else if (this.magic.getStrength() === ThemeStrength.Minor) {
      return 3 - this.general.getStrength();
    } else {
      return 3;
    }
  }
}
