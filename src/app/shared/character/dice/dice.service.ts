import {Injectable} from '@angular/core';
import {DiceSize} from "./dice-size.enum";
import {Dice} from "./dice";
import {LevelRange} from "../../spells/enums/level-range.enum";

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() {
  }

  getDieAverage(diceSize: DiceSize): number {
    if (diceSize === DiceSize.None) {
      return 0;
    } else {
      return diceSize / 2 + .5;
    }
  }

  getDieStatic(diceSize: DiceSize): number {
    if (diceSize === DiceSize.None) {
      return 1;
    } else {
      return parseFloat((this.getDieAverage(diceSize) * .3).toFixed(3));
    }
  }

  /**
   * gets the number of dice needed for a particular damage value
   * @param {DiceSize} diceSize
   * @param {number} modifier
   * @param {number} damage
   * @returns {any}
   */
  getNumOfDice(diceSize: DiceSize, modifier: number, damage: number): Dice {
    let numOfDice = 0;
    let totalModifierValue = 0;
    modifier += this.getDieStatic(diceSize);
    const dieAverage = this.getDieAverage(diceSize);
    if (damage < 1) {
      return null;
    } else if (damage < dieAverage) {

      return new Dice(0, DiceSize.None, Math.round(damage));
    } else if (diceSize === DiceSize.None) {
      return new Dice(0, DiceSize.None, Math.round(damage));
    }
    do {
      damage -= dieAverage;
      numOfDice++;
      damage -= modifier;
      totalModifierValue += modifier;
    } while (damage >= dieAverage && numOfDice < 9);
    totalModifierValue += damage;
    return new Dice(numOfDice, diceSize, Math.round(parseFloat(totalModifierValue.toFixed(2))));
  }

  /**
   * gets the remainder damage value to determine if there is roll over
   * @param {DiceSize} diceSize
   * @param {number} modifier
   * @param {number} damage
   * @returns {number}
   */
  getRemainder(diceSize: DiceSize, modifier: number, damage: number) {
    const dieAverage = this.getDieAverage(diceSize);
    const numOfDice: Dice = this.getNumOfDice(diceSize, modifier, damage);
    const remainder = damage - (numOfDice.numOfDice.value() * dieAverage);
    return Math.round(remainder % 1);
  }

  // getMap

  /**
   *
   * @param minDamage
   * @param maxDamage
   * @param maxLevel
   * @param dieSize
   */
  getDiceArrayFromDamageRange(minDamage: number, maxDamage: number, maxLevel: LevelRange, dieSize = DiceSize.None): Dice[] {
    if (maxLevel || maxDamage < minDamage) {
      const damageArray = [];
      const numberOfLevelsToGain = maxLevel - 1;
      minDamage = Math.floor(minDamage + this.getRemainder(dieSize, 0, minDamage) / 2);
      maxDamage = Math.floor(maxDamage + this.getRemainder(dieSize, 0, maxDamage) / 2);
      const damageAverage = (maxDamage - minDamage) / numberOfLevelsToGain;
      for (let i = 0; i < maxLevel; i++) {
        const damageAtLevelI = minDamage + i * damageAverage;
        damageArray.push(this.getNumOfDice(dieSize, 0, damageAtLevelI));
      }
      return damageArray;
    }
    return null;
  }

}
