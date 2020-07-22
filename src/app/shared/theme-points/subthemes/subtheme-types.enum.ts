/**
 * first value Theme Type
 * second value is max strength assignable to sub theme
 * third value, the name of the subtheme type for easy self referencing
 */
import {ThemeType} from "../theme-type.enum";
import {ThemeStrength} from "../theme-strength.enum";

export class SubthemeModel {
  subthemeType: SubthemeType;
  themeType: ThemeType;
  maxThemeStrength: ThemeStrength;
}

export enum SubthemeType {
  WeaponSpecialization = "WeaponSpecialization",
  Protector = "Protector",
  Juggernaut = "Juggernaut",
  FindWeakness = "FindWeakness",
  Dualist = "Dualist",
  Evasion = "Evasion",
  Magent = "Magent",
  SpellWarden = "SpellWarden",
  Assassin = "Assassin",
  Druid = "Druid",
  WarriorMage = "WarriorMage",
  Cleric = "Cleric",
  Priest = "Priest",
  Elementalist = "Elementalist",
  Warlock = "Warlock",
  Shaman = "Shaman",
  Archmage = "Archmage",
  Necromancer = "Necromancer"
}

export enum CasterType {
  Magent = "Magent",
  SpellWarden = "SpellWarden",
  Cleric = "Cleric",
  Druid = "Druid",
  Assassin = "Assassin",
  WarriorMage = "WarriorMage",
  Elementalist = "Elementalist",
  Warlock = "Warlock",
  Shaman = "Shaman",
  Necromancer = "Necromancer",
  Priest = "Priest",
  Archmage = "Archmage"

}
