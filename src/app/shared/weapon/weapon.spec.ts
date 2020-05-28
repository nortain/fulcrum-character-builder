import {Weapon} from './weapon';
import {WeaponCategory} from "./weapon-category.enum";
import {WeaponClass} from "./weapon-class.enum";
import {BASE_WEAPON_DAMAGE} from "../constants/constants";

describe('Weapon', () => {
  let axe: Weapon, dagger: Weapon, spear: Weapon;
  beforeEach(() => {
    axe = new Weapon("axe", WeaponClass.Melee2h, WeaponCategory.Heavy);
    dagger = new Weapon("dagger", WeaponClass.Thrown, WeaponCategory.Agile);
    spear = new Weapon("spear", WeaponClass.Polearm, WeaponCategory.Balanced);
  });

  it('should create an instance', () => {
    expect(axe).toBeDefined();
  });

  it('should be able to get the weapon damage', () => {
    expect(axe.baseValues.damage.printRoll()).toBe("2d12");
    expect(dagger.baseValues.damage.printRoll()).toBe("2d6-1");
    expect(spear.baseValues.damage.printRoll()).toBe("2d8");
  });

  it('should be able to get attack roll for the weapon', () => {
    expect(axe.baseValues.attack.printRoll()).toBe("2d12+2");
    expect(dagger.baseValues.attack.printRoll()).toBe("2d12+3");
  });

  it('should be able to get base text or an empty string if none exists', () => {
    expect(axe.baseValues.specialText).toBe(BASE_WEAPON_DAMAGE.Heavy[WeaponClass.Melee2h].specialText);
    expect(dagger.baseValues.specialText).toBe("");
    expect(spear.baseValues.specialText).toBe("");
  });

  it('should be able to get critical for the weapon', () => {
    expect(axe.baseValues.critical.printRoll()).toBe("1d10+1");
    expect(dagger.baseValues.critical.printRoll()).toBe("1d8+1");
    expect(spear.baseValues.critical.printRoll()).toBe("1d8+1");
  });

  it('should be able to get range for weapons that have it', () => {
    expect(axe.baseValues.range.length).toEqual(0);
    expect(dagger.baseValues.range.length).toEqual(3);
    expect(spear.baseValues.range).toEqual(BASE_WEAPON_DAMAGE.Balanced.Polearm.range);
  });

});
