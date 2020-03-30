import { TestBed, inject } from '@angular/core/testing';

import { DiceService } from './dice.service';
import {DiceSize} from "./dice-size.enum";
import {Dice} from "./dice";

fdescribe('DiceService', () => {
  let diceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService]
    });
  });

  beforeEach(inject([DiceService], (svc: DiceService) => {
    diceService = svc;
  }));

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
    expect(diceService.getDieStatic(DiceSize.d6)).toEqual(5);
    expect(diceService.getDieStatic(DiceSize.d10)).toEqual(7);
    expect(diceService.getDieStatic(DiceSize.d12)).toEqual(8);
    expect(diceService.getDieStatic(DiceSize.None)).toEqual(1);
  });

  it('should be able to get numOfDice given a damage value, modifier and diceSize', () => {
    expect(diceService.getNumOfDice(DiceSize.d6, 0, 12.46632124).printRoll())
      .toEqual("2d6+5");
    expect(diceService.getNumOfDice(DiceSize.d8, 0, 43).printRoll())
      .toEqual("4d8+25");
    expect(diceService.getNumOfDice(DiceSize.d12, 0, 43).printRoll())
      .toEqual("3d12+23");
    expect(diceService.getNumOfDice(DiceSize.d10, 0, 68).printRoll())
      .toEqual("6d10+35");
    expect(diceService.getNumOfDice(DiceSize.d10, 0, 66).printRoll())
      .toEqual("5d10+38");
  });

  it('should be able to get the remainder for a give the dv, modifier and dice size', () => {
    expect(diceService.getRemainder(DiceSize.d6, 0, 12.46632124)).toEqual(0, "test 1");
    expect(diceService.getRemainder(DiceSize.d6, 0, 43)).toEqual(1, "test 2");
    expect(diceService.getRemainder(DiceSize.d8, 0, 43)).toEqual(0, "test 3");
    expect(diceService.getRemainder(DiceSize.d8, 0, 43.5)).toEqual(1, "test 4");
    expect(diceService.getRemainder(DiceSize.d12, 0, 43)).toEqual(1, "test 5");
    expect(diceService.getRemainder(DiceSize.d10, 0, 68)).toEqual(0, "test 6");
    expect(diceService.getRemainder(DiceSize.d10, 0, 66.49)).toEqual(1, "test 7");
    expect(diceService.getRemainder(DiceSize.d10, 0, 66.5)).toEqual(0, "test 8");
  });

  it('should be able to turn a min, max level range into an array of dice', () => {
    expect(true).toBeFalsy();
  });

});
