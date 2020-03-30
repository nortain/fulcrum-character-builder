/**The Dice class knows everything about dice, how to use them and how to print out how they should be displayed.*/
import {Field} from "../../field/field";
import {DiceSize} from "./dice-size.enum";

export class Dice {
  readonly numOfDice: Field;
  readonly sizeOfDice: Field;
  readonly modifierOfDice: Field;

  constructor(numOfDice: number = 0, sizeOfDice: DiceSize = DiceSize.None, modifierOfDice: number = 0) {
    this.numOfDice = new Field(numOfDice);
    this.sizeOfDice = new Field(sizeOfDice);
    this.modifierOfDice = new Field(modifierOfDice);
  }

  getSizeOfDice(): Field {
    return this.sizeOfDice;
  }

  /**Give the number, size and modifier of the dice we can print the roll like 3d12+4 or 2d6-*/
  printRoll(): string {
    const num = this.numOfDice.value();
    const size = this.sizeOfDice.value();
    const mod = this.modifierOfDice.value();
    if (size === DiceSize.None || num === 0) {
      return "" + mod;
    } else if (size > DiceSize.None && mod > 0) {
      return num + "d" + size + "+" + mod;
    } else if (size > DiceSize.None && mod < 0) {
      return num + "d" + size + mod;
    } else {
      return num + "d" + size;
    }
  }

  clearAll(): void {
    this.numOfDice.clearAll();
    this.sizeOfDice.clearAll();
    this.modifierOfDice.clearAll();
  }
}
