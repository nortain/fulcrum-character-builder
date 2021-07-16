import {TalentName} from "./talent/talent-name.enum";
import {KnackName} from "./knack/knack-name.enum";
import {AbilityBonus} from "./ability-bonus.enum";
import {AttributeName} from "../attribute/attribute-enums/attribute-name.enum";
import {TalentType} from "./talent/talent-type.enum";
import {ActionType} from "../action/action-type.enum";
import {SpellDamageKeyword} from "../spells/enums/spell-damage-keyword.enum";
import {ArmorType} from "../armor/armor-type.enum";
import {CasterType, SubthemeType} from "../theme-points/subthemes/subtheme-types.enum";
import {PowerPointName} from "./power-point/power-point-name.enum";
import {ThemeType} from "../theme-points/theme-type.enum";
import {SpellKeywords} from "../spells/spell-keywords.enum";
import {SpellName} from "../spells/enums/spell-name.enum";

export type AbilityName = TalentName | KnackName | AbilityBonus | AttributeName | TalentType | ActionType | SpellDamageKeyword | ArmorType | SubthemeType | PowerPointName | ThemeType | SpellKeywords | SpellName | CasterType;


export enum AbilityType {
  Ability = "Ability",
  Power = "Power",
  Feature = "Feature",
  Passive = "Passive",
  Knack = "Knack",
  Talent = "Talent",
  Spell = "Spell",
  Subtheme = "Subtheme",
  Theme = "Theme",
  Attribute = "Attribute",
  Armor = "Armor",
  PowerPointFeature = "PowerPointFeature",
  Weapon = "Weapon",
  CharacterLevel = "CharacterLevel"
}

/**
 * Note to self about abilities.  Abilities are going to track not only what a character has but what they can do.  In the case of knacks and spells, what a character can do is going to be based on their spell or knack keywords.  That will on one hand tell them what effects can be empowered by talents but it will also let talents know what a character is capable of.  Some logic will need to exist to maintain adding and removing abilities based on what knacks and spells a character presently has.
 */


