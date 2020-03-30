import {Dice} from "../character/dice/dice";
import {WeaponCategory} from "./weapon-category.enum";
import {WeaponClass} from "./weapon-class.enum";


export interface WeaponType {
  category: WeaponCategory;
  weaponClass: WeaponClass;
  attack: Dice;
  damage: Dice;
  critical: Dice;
  range: Array<number>;
  specialText: string;


}
