import {inject, TestBed} from '@angular/core/testing';

import {DiceService} from './dice.service';
import {DiceSize} from "./dice-size.enum";
import {LevelRange} from "../../spells/enums/level-range.enum";

describe('DiceService', () => {
  let diceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService]
    });
  });

  beforeEach( () => {
    diceService = TestBed.inject(DiceService);
  });

  it('should be created', inject([DiceService], (service: DiceService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to return the correct dice value for a given dice size', () => {
    expect(diceService.getDieAverage(DiceSize.d6)).toEqual(3.5);
    expect(diceService.getDieAverage(DiceSize.d10)).toEqual(5.5);
    expect(diceService.getDieAverage(DiceSize.d12)).toEqual(6.5);
    expect(diceService.getDieAverage(DiceSize.None)).toEqual(0);
  });

  it('should be able to get a die static for a given die', () => {
    expect(diceService.getDieStatic(DiceSize.d6)).toEqual(1.05);
    expect(diceService.getDieStatic(DiceSize.d10)).toEqual(1.65);
    expect(diceService.getDieStatic(DiceSize.d12)).toEqual(1.95);
    expect(diceService.getDieStatic(DiceSize.None)).toEqual(1);
  });

  it('should be able to get numOfDice given a damage value, modifier and diceSize', () => {
    expect(diceService.getNumOfDice(DiceSize.d6, 0, 12.46632124).printRoll())
      .toEqual("2d6+5");
    expect(diceService.getNumOfDice(DiceSize.d8, 0, 43).printRoll())
      .toEqual("7d8+12");
    expect(diceService.getNumOfDice(DiceSize.d12, 0, 43).printRoll())
      .toEqual("5d12+11");
    expect(diceService.getNumOfDice(DiceSize.d10, 0, 68).printRoll())
      .toEqual("9d10+19");
    expect(diceService.getNumOfDice(DiceSize.d10, 0, 66).printRoll())
      .toEqual("9d10+17");
    expect(diceService.getNumOfDice(DiceSize.d10, 0, 62).printRoll())
      .toEqual("8d10+18");
  });

  it('should be able to get the remainder for a given the dv, modifier and dice size', () => {
    expect(diceService.getRemainder(DiceSize.d6, 0, 12.46632124)).toEqual(0, "test 1");
    expect(diceService.getRemainder(DiceSize.d6, 0, 43)).toEqual(1, "test 2");
    expect(diceService.getRemainder(DiceSize.d8, 0, 43)).toEqual(1, "test 3");
    expect(diceService.getRemainder(DiceSize.d8, 0, 43.5)).toEqual(0, "test 4");
    expect(diceService.getRemainder(DiceSize.d12, 0, 43)).toEqual(1, "test 5");
    expect(diceService.getRemainder(DiceSize.d10, 0, 68)).toEqual(1, "test 6");
    expect(diceService.getRemainder(DiceSize.d10, 0, 66.49)).toEqual(1, "test 7");
    expect(diceService.getRemainder(DiceSize.d10, 0, 66.5)).toEqual(0, "test 8");
  });

  it('should be able to turn a min, max level range into an array of dice', () => {
    const damageArray = diceService.getDiceArrayFromDamageRange(12, 36, LevelRange.FIFTHTEEN);
    const expectedStaticDamage = [12, 14, 15, 17, 19, 21, 22, 24, 26, 27, 29, 31, 33, 34, 36];
    damageArray.forEach((damage, index) => {
      expect(damage.printRoll()).toBe(expectedStaticDamage[index].toString(), "The error index is: " + index);
    });

  });

  it('should be able to get dice array with a d8', () => {
    const expectedD8Damage = ["2d8+3", "2d8+5", "2d8+6", "3d8+4", "3d8+5", "3d8+7", "4d8+4", "4d8+6", "4d8+8", "4d8+9", "5d8+7", "5d8+8", "5d8+10", "6d8+7", "6d8+9"];

    const damageArray = diceService.getDiceArrayFromDamageRange(12, 36, LevelRange.FIFTHTEEN, DiceSize.d8);
    damageArray.forEach((damage, index) => {
      expect(damage.printRoll()).toBe(expectedD8Damage[index], "The error index is " + index);
    });
  });

  it('should be able to get dice array with a d6', () => {
    const expectedD8Damage = ["2d6+5", "3d6+2", "3d6+3", "3d6+4", "3d6+5",
      "3d6+6", '4d6+4', "4d6+5", "4d6+5", "4d6+6",
      "4d6+7", "5d6+5", "5d6+6", "5d6+7", "5d6+8"];
    const damageArray = diceService.getDiceArrayFromDamageRange(12.4, 25.9, LevelRange.FIFTHTEEN, DiceSize.d6);
    damageArray.forEach((damage, index) => {
      expect(damage.printRoll()).toBe(expectedD8Damage[index], "The error index is " + index);
    });
  });

  it('should be able to get dice array with a d6 and a large spread', () => {
    const expectedD8Damage = ["2d6+5", "3d6+4", "3d6+7", "4d6+6", "5d6+5",
      "5d6+7", '6d6+6', "6d6+9", "7d6+8", "7d6+10",
      "8d6+9", "8d6+12", "9d6+11", "9d6+13", "9d6+16"];
    const damageArray = diceService.getDiceArrayFromDamageRange(11.9, 47.4, LevelRange.FIFTHTEEN, DiceSize.d6);
    damageArray.forEach((damage, index) => {
      expect(damage.printRoll()).toBe(expectedD8Damage[index], "The error index is " + index);
    });
  });


});
