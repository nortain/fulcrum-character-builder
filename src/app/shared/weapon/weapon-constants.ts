import {WeaponCategory} from "./weapon-category.enum";
import {Dice} from "../character/dice/dice";
import {DiceSize} from "../character/dice/dice-size.enum";
import {WeaponClass} from "./weapon-class.enum";
import {WeaponType} from "./weapon-type";

export const BASE_WEAPON_DAMAGE = {
  Agile: {
    Ranged1h: {
      attack: new Dice(2, DiceSize.d12, 1),
      damage: new Dice(1, DiceSize.d4, 1),
      critical: new Dice(1, DiceSize.d4, 1),
      range: [10, 20, 30],
      specialText: "+1 to Hit",
      weaponClass: WeaponClass.Ranged1h,
      category: WeaponCategory.Agile
    } as WeaponType,
    Thrown: {
      attack: new Dice(2, DiceSize.d12, 1),
      damage: new Dice(1, DiceSize.d4, 0),
      critical: new Dice(1, DiceSize.d4, 1),
      range: [6, 12, 18],
      specialText: "+1 to Hit",
      weaponClass: WeaponClass.Thrown,
      category: WeaponCategory.Agile
    } as WeaponType,
    Unarmed: {
      attack: new Dice(2, DiceSize.d12, 1),
      damage: new Dice(1, DiceSize.d4, 0),
      critical: new Dice(1, DiceSize.d4, 1),
      specialText: "+1 to Hit, Damage roll is -1 DC",
      weaponClass: WeaponClass.Unarmed,
      category: WeaponCategory.Agile
    } as WeaponType,
    Melee1h: {
      attack: new Dice(2, DiceSize.d12, 1),
      damage: new Dice(1, DiceSize.d6, 0),
      critical: new Dice(1, DiceSize.d6, 0),
      specialText: "+1 to Hit",
      weaponClass: WeaponClass.Melee1h,
      category: WeaponCategory.Agile
    } as WeaponType,
    Melee2h: {
      attack: new Dice(2, DiceSize.d12, 1),
      damage: new Dice(1, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 0),
      specialText: "+1 to Hit",
      weaponClass: WeaponClass.Melee2h,
      category: WeaponCategory.Agile
    } as WeaponType,
    Polearm: {
      attack: new Dice(2, DiceSize.d12, 1),
      damage: new Dice(1, DiceSize.d6, 0),
      critical: new Dice(1, DiceSize.d6, 1),
      range: [2],
      specialText: "+1 to Hit",
      weaponClass: WeaponClass.Polearm,
      category: WeaponCategory.Agile
    } as WeaponType,
    Ranged: {
      attack: new Dice(2, DiceSize.d12, 1),
      damage: new Dice(1, DiceSize.d6, 0),
      critical: new Dice(1, DiceSize.d6, 0),
      range: [12, 25, 50],
      specialText: "+1 to hit",
      weaponClass: WeaponClass.Ranged,
      category: WeaponCategory.Agile
    } as WeaponType
  },
  Balanced: {
    Ranged1h: {
      attack: new Dice(2, DiceSize.d12, 0),
      damage: new Dice(1, DiceSize.d6, 1),
      critical: new Dice(1, DiceSize.d6, 1),
      range: [10, 20, 30],
      weaponClass: WeaponClass.Ranged1h,
      category: WeaponCategory.Balanced
    } as WeaponType,
    Thrown: {
      attack: new Dice(2, DiceSize.d12, 0),
      damage: new Dice(1, DiceSize.d6, 0),
      critical: new Dice(1, DiceSize.d6, 1),
      range: [5, 10, 15],
      weaponClass: WeaponClass.Thrown,
      category: WeaponCategory.Balanced
    } as WeaponType,
    Unarmed: {
      attack: new Dice(2, DiceSize.d12, 0),
      damage: new Dice(1, DiceSize.d6, 0),
      critical: new Dice(1, DiceSize.d6, 1),
      specialText: "Damage roll is -1 DC",
      weaponClass: WeaponClass.Unarmed,
      category: WeaponCategory.Balanced
    } as WeaponType,
    Melee1h: {
      attack: new Dice(2, DiceSize.d12, 0),
      damage: new Dice(1, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 0),
      weaponClass: WeaponClass.Melee1h,
      category: WeaponCategory.Balanced
    } as WeaponType,
    Melee2h: {
      attack: new Dice(2, DiceSize.d12, 0),
      damage: new Dice(1, DiceSize.d10, 0),
      critical: new Dice(1, DiceSize.d10, 0),
      weaponClass: WeaponClass.Melee2h,
      category: WeaponCategory.Balanced
    } as WeaponType,
    Polearm: {
      attack: new Dice(2, DiceSize.d12, 0),
      damage: new Dice(1, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 1),
      range: [2],
      weaponClass: WeaponClass.Polearm,
      category: WeaponCategory.Balanced
    } as WeaponType,
    Ranged: {
      attack: new Dice(2, DiceSize.d12, 0),
      damage: new Dice(1, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 0),
      range: [12, 25, 50],
      weaponClass: WeaponClass.Ranged,
      category: WeaponCategory.Balanced
    } as WeaponType
  },
  Heavy: {
    Ranged1h: {
      attack: new Dice(2, 12, -1),
      damage: new Dice(1, DiceSize.d8, 1),
      critical: new Dice(1, DiceSize.d8, 1),
      range: [10, 20, 30],
      specialText: "-1 to hit",
      weaponClass: WeaponClass.Ranged1h,
      category: WeaponCategory.Heavy
    } as WeaponType,
    Thrown: {
      attack: new Dice(2, 12, -1),
      damage: new Dice(1, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 1),
      range: [4, 8, 12],
      specialText: "-1 to hit",
      weaponClass: WeaponClass.Thrown,
      category: WeaponCategory.Heavy
    } as WeaponType,
    Unarmed: {
      attack: new Dice(2, 12, -1),
      damage: new Dice(1, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 1),
      specialText: "-1 to hit, Damage roll is -1 DC",
      weaponClass: WeaponClass.Unarmed,
      category: WeaponCategory.Heavy
    } as WeaponType,
    Melee1h: {
      attack: new Dice(2, 12, -1),
      damage: new Dice(1, DiceSize.d10, 0),
      critical: new Dice(1, DiceSize.d10, 0),
      specialText: "-1 to hit",
      weaponClass: WeaponClass.Melee1h,
      category: WeaponCategory.Heavy
    } as WeaponType,
    Melee2h: {
      attack: new Dice(2, 12, -1),
      damage: new Dice(1, DiceSize.d12, 0),
      critical: new Dice(1, DiceSize.d12, 0),
      specialText: "-1 to hit",
      weaponClass: WeaponClass.Melee2h,
      category: WeaponCategory.Heavy
    } as WeaponType,
    Polearm: {
      attack: new Dice(2, 12, -1),
      damage: new Dice(1, DiceSize.d10, 0),
      critical: new Dice(1, DiceSize.d10, 1),
      range: [2],
      specialText: "-1 to hit",
      weaponClass: WeaponClass.Polearm,
      category: WeaponCategory.Heavy
    } as WeaponType,
    Ranged: {
      attack: new Dice(2, 12, -1),
      damage: new Dice(1, DiceSize.d10, 0),
      critical: new Dice(1, DiceSize.d10, 0),
      range: [15, 30, 60],
      specialText: "1- to hit",
      weaponClass: WeaponClass.Ranged,
      category: WeaponCategory.Heavy
    } as WeaponType
  }
};
