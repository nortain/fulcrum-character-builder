import {PhysicalDefenseType} from "./physical-defense-type.enum";
import {Field} from "../../field/field";
import {Armor} from "../../armor/armor";
import {Item} from "../../armor/item";
import {ArmorType} from "../../armor/armor-type.enum";

export class BaseDefenses {
  activeDefenses: PhysicalDefenseType[] = [];
  passiveDefenses: PhysicalDefenseType[] = [
    PhysicalDefenseType.Missile,
    PhysicalDefenseType.Unarmed,
    PhysicalDefenseType.Zone];
}


export class DefenseModel {
  defenses = new BaseDefenses();
  activeDefenseBonus = new Field(0);
  passiveDefenseBonus = new Field(0);
  armor: Armor = new Armor(ArmorType.None);
  helm: Item;
  bracer: Item;
  boots: Item;
  cloak: Item;
  jewlery: Item;
}
