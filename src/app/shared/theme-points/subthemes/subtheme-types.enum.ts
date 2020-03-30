/**
 * first value Theme Type
 * second value is max strength assignable to sub theme
 * third value, the name of the subtheme type for easy self referencing
 */
import {ThemeType} from "../theme-type.enum";

export enum SubthemeType {
  WeaponSpecialization = "Combat,Greater,WeaponSpecialization",
  Protector = "Combat,Lesser,Protector",
  Juggernaut = "Combat,Minor,Juggernaut",
  FindWeakness = "Stealth,Greater,FindWeakness",
  Riposte = "Stealth,Lesser,Riposte",
  Evasion = "Stealth,Minor,Evasion",
  Magent = "Magic,Minor,Magent",
  SpellWarden = "Magic,Minor,SpellWarden",
  Assassin = "Magic,Lesser,Assassin",
  Druid = "Magic,Lesser,Druid",
  WarriorMage = "Magic,Lesser,WarriorMage",
  Cleric = "Magic,Lesser,Cleric",
  Priest = "Magic,Greater,Priest",
  Elementalist = "Magic,Greater,Elementalist",
  Warlock = "Magic,Greater,Warlock",
  Shaman = "Magic,Greater,Shaman",
  Archmage = "Magic,Greater,Archmage",
  Necromancer = "Magic,Greater,Necromancer"
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
