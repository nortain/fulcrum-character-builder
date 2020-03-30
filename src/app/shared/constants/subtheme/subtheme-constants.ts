import {Subtheme} from "../../theme-points/subthemes/subtheme";
import {SubthemeType} from "../../theme-points/subthemes/subtheme-types.enum";

export interface SubthemeObject {
  combat: Subtheme[];
  stealth: Subtheme[];
  magic: Subtheme[];
}

export function getSubthemeObject(magic: number): SubthemeObject {
  let magicArray;
  switch (magic) {
    case 1: {
      magicArray = [
        new Subtheme(SubthemeType.SpellWarden),
        new Subtheme(SubthemeType.Magent)
      ];
      break;
    }
    case 2: {
      magicArray = [
        new Subtheme(SubthemeType.Cleric),
        new Subtheme(SubthemeType.Assassin),
        new Subtheme(SubthemeType.Druid),
        new Subtheme(SubthemeType.WarriorMage)
      ];
      break;
    }
    case 3: {
      magicArray = [
        new Subtheme(SubthemeType.Necromancer),
        new Subtheme(SubthemeType.Archmage),
        new Subtheme(SubthemeType.Elementalist),
        new Subtheme(SubthemeType.Priest),
        new Subtheme(SubthemeType.Shaman),
        new Subtheme(SubthemeType.Warlock)
      ];
      break;
    }
    default:
      magicArray = [];
      break;
  }
  return {
    combat: [
      new Subtheme(SubthemeType.WeaponSpecialization),
      new Subtheme(SubthemeType.Protector),
      new Subtheme(SubthemeType.Juggernaut)
    ],
    stealth: [
      new Subtheme(SubthemeType.FindWeakness),
      new Subtheme(SubthemeType.Riposte),
      new Subtheme(SubthemeType.Evasion)
    ],
    magic: magicArray
  };
}
