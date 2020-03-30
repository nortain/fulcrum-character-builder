import {MagicDefense} from './magic-defense';
import {MagicDefenseType} from "./magic-defense-type.enum";
import {Field} from "../../field/field";

describe('MagicDefense', () => {
  let fort, ref, will;

  beforeEach(() => {
    fort = new MagicDefense(MagicDefenseType.Fortitude, new Field(0));
    ref = new MagicDefense(MagicDefenseType.Reflex, new Field(0));
    will = new MagicDefense(MagicDefenseType.Will, new Field(0));
  });

  it('should create an instance', () => {
    expect(new MagicDefense(MagicDefenseType.Fortitude, new Field(0))).toBeTruthy();
  });

  it('should be able to get the default fortitude defense for a character', function () {
    expect(fort.getDefense()).toBe(10);
  });

  it('should be able to add a bonus to defense', function () {
    fort.addDefenseBonus("racial", 1);
    expect(fort.getDefense()).toBe(11);
  });

  it('should be able to replace a bonus to defense', function () {
    expect(fort.getDefense()).toEqual(10);
    fort.addDefenseBonus("magicItem", 2);
    expect(fort.getDefense()).toEqual(12);
    fort.addDefenseBonus("magicItem", 3);
    expect(fort.getDefense()).toEqual(13);
  });

  it('should be able to clear out certain aspects of a magic defense bonus', function () {
    fort.addDefenseBonus("race", 1);
    fort.addDefenseBonus("magicItem", 2);
    expect(fort.getDefense()).toEqual(13);
    fort.removeDefenseBonus("magicItem");
    expect(fort.getDefense()).toEqual(11);
  });

  it('should be able to remove all bonuses, cause that might happen sometimes', function () {
    fort.addDefenseBonus("awesome", 3);
    fort.addDefenseBonus("sauce", 5);
    expect(fort.getDefense()).toEqual(18);
    fort.removeDefenseBonus();
    expect(fort.getDefense()).toEqual(10);
  });
});
