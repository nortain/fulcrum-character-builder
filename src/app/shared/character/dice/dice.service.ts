import {Injectable} from '@angular/core';
import {DiceSize} from "./dice-size.enum";
import {Dice} from "./dice";
import {LevelRange} from "../../spells/enums/level-range.enum";

@Injectable()
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
    switch (diceSize) {
      case DiceSize.d6:
        return 5;
      case DiceSize.d8:
        return 6;
      case DiceSize.d10:
        return 7;
      case DiceSize.d12:
        return 8;
      default:
        return 1;
    }
  }

  /**
   * gets the number of dice needed for a particular spell
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
      return new Dice(0, DiceSize.None, damage);
    } else if (diceSize === DiceSize.None) {
      return new Dice(0, DiceSize.None, damage);
    }
    do {
      damage -= dieAverage;
      numOfDice++;
      damage -= modifier;
      totalModifierValue += modifier;
    } while (damage >= dieAverage && numOfDice < 9);
    totalModifierValue += damage;
    return new Dice(numOfDice, diceSize, totalModifierValue);
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

  getDiceArray(minDamage: number, maxDamage: number, maxLevel: LevelRange) {

  }

}
