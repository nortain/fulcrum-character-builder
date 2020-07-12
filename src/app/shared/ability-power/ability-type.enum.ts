import {TalentName} from "./talent/talent-name.enum";
import {KnackName} from "./knack/knack-name.enum";
import {AbilityBonus} from "./ability-bonus.enum";
import {AttributeName} from "../attribute/attribute-enums/attribute-name.enum";
import {TalentType} from "./talent/talent-type.enum";
import {ActionType} from "../action/action-type.enum";
import {SpellDamageKeyword} from "../spells/enums/spell-damage-keyword.enum";
import {ArmorType} from "../armor/armor-type.enum";
import {SubthemeType} from "../theme-points/subthemes/subtheme-types.enum";
import {PowerPointName} from "./power-point/power-point-name.enum";
import {ThemeType} from "../theme-points/theme-type.enum";

export type AbilityName = TalentName | KnackName | AbilityBonus | AttributeName | TalentType | ActionType | SpellDamageKeyword | ArmorType | SubthemeType | PowerPointName | ThemeType;


export enum AbilityType {
  Ability = "Ability",
  Power = "Power",
  Feature = "Feature",
  Passive = "Passive",
  Knack = "Knack",
  Talent = "Talent",
  Subtheme = "Subtheme",
  Theme = "Theme",
  Attribute = "Attribute",
  Armor = "Armor",
  PowerPointFeature = "PowerPointFeature",
  Weapon = "Weapon",
  CharacterLevel = "CharacterLevel"
}


