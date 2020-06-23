import {TalentName} from "./talent/talent-name.enum";
import {KnackName} from "../../share/ability-power/knack/knack-name.enum";

export type AbilityName = TalentName | KnackName;

export enum AbilityType {
  Ability = "Ability",
  Power = "Power",
  Feature = "Feature",
  Passive = "Passive",
  Knack = "Knack",
  Talent = "Talent"
}


