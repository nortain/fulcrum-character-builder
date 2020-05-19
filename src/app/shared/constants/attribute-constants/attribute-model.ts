import {WeaponCategory} from "../../weapon/weapon-category.enum";
import {AttributeType} from "../../attribute/attribute-type.enum";
import {AttributeName} from "../../attribute/attribute-name.enum";
import {ArmorType} from "../../armor/armor-type.enum";
import {AgilityAttributePicks, BrawnAttributePicks, PresenceAttributePicks, ReasoningAttributePicks} from "./selected-bonus-groups";
import {SpellCastingCategory} from "../../spells/enums/spell-casting-category";
import {AttributeStrength} from "../../attribute/attribute-strength.enum";

export class AttributeModel {
  attributeName: AttributeName;
  attributeType: AttributeType;
  attributeStrength: AttributeStrength;
  bonusToAttackDamage: [
    { min: number, max: number, category: WeaponCategory | SpellCastingCategory }
  ];
  bonusToHitPoints: { min: number, max: number };
  bonusToStartingTHP: { min: number, max: number };
  bonusToDodge: { min: number, max: number };
  firstTurnDamageResist: { min: number, max: number };

  // Selected Bonus
  selectedBonusPicks: {
    numberOfPicks: number
    typeOfPick: BrawnAttributePicks | AgilityAttributePicks | PresenceAttributePicks | ReasoningAttributePicks;
  };

  // Magic Defense Bonus
  bonusToFortitude: number;
  bonusToReflex: number;
  bonusToWill: number;

  // non scaling bonuses
  bonusRecoveries: number;
  bonusInitiative: number;
  bonusPowerPoints: number;

  epicText: string;
  legendaryText: string;
  bonusToAd: { bonusValue: number, armorTypes: Array<ArmorType> };


  // Bonus to skills
  bonusTrainedSkills: number;
  bonusToBrawnSkills: number;
  bonusToAgiSkills: number;
  bonusToReasoningSkills: number;
  bonusToPresenceSkills: number;


}
