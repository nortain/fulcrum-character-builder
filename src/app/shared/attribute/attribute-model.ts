import {AttributeName} from "./attribute-name.enum";
import {ArmorType} from "../armor/armor-type.enum";
import {AgilityAttributePicks, BrawnAttributePicks, PresenceAttributePicks, ReasoningAttributePicks} from "../constants/attribute-constants/selected-bonus-groups";
import {AttributeStrength} from "./attribute-strength.enum";
import {AttributeAttackDamage, ValueRange} from "../constants/attribute-constants/attribute-constants";

export class AttributeModel {
  attributeName: AttributeName;
  attributeStrength: AttributeStrength;
  bonusToAttackDamage: Array<AttributeAttackDamage>;
  bonusToCrit: AttributeAttackDamage;
  bonusToHitPoints: Array<ValueRange>;
  bonusToStartingTHP: Array<ValueRange>;
  bonusToDodge: Array<ValueRange>;
  firstTurnDamageResist: Array<ValueRange>;

  // Selected Bonus
  selectedBonusPicks: {
    typeOfPick: Array<BrawnAttributePicks | AgilityAttributePicks | PresenceAttributePicks | ReasoningAttributePicks>;
  };

  // Magic Defense Bonus
  bonusToFortitude: Array<number>;
  bonusToReflex: Array<number>;
  bonusToWill: Array<number>;

  // non scaling bonuses
  bonusToRecoveries: Array<number>;
  bonusToInitiative: Array<number>;
  bonusToPowerPoints: Array<number>;

  epicText: string;
  legendaryText: string;
  bonusToAd: Array<{
    bonusValue: number,
    armorTypes: Array<ArmorType>
  }>;


  // Bonus to skills
  bonusToTrainedSkills: Array<number>;
  bonusToBrawnSkills: Array<number>;
  bonusToAgilitySkills: Array<number>;
  bonusToReasoningSkills: Array<number>;
  bonusToPresenceSkills: Array<number>;
  bonusToIntuitionSKills: Array<number>;


}
