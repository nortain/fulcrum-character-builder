import {Dice} from './dice';
import {DiceSize} from "./dice-size.enum";
import {Field} from "../../field/field";

describe('Dice', () => {
  let empty: Dice, noDiceJustPlus: Dice, _3d12Plus5: Dice;
  beforeEach(() => {
    empty = new Dice();
    noDiceJustPlus = new Dice(0, DiceSize.d6, -3);
    _3d12Plus5 = new Dice(3, DiceSize.d12, 5);
  });
  it('should create an instance', () => {
    expect(new Dice()).toBeTruthy();
  });

  it('should be able to print out a roll', () => {
    expect(empty.printRoll()).toBe("0");
    expect(_3d12Plus5.printRoll()).toBe("3d12+5");
  });

  it('should be able to display dice if no dice are present', () => {
    expect(noDiceJustPlus.printRoll()).toBe("-3");
  });

  it('should be able to modify the values of my dice', () => {
    empty.getSizeOfDice().replaceVal["skillz"] = DiceSize.d4;
    expect(empty.printRoll()).toBe("0");
    empty.numOfDice.addVal["axe"] = 2;
    expect(empty.printRoll()).toBe("2d4");
    empty.modifierOfDice.addVal["bob"] = 3;
    expect(empty.printRoll()).toBe("2d4+3");
  });

});
