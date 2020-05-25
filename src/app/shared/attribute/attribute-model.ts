import {AttributeName} from "./attribute-enums/attribute-name.enum";
import {ArmorType} from "../armor/armor-type.enum";
import {AgilityAttributePicks, AgilitySelections, BrawnAttributePicks, BrawnSelections, PresenceAttributePicks, PresenceSelections, ReasoningAttributePicks, ReasoningSelections} from "./attribute-constants/selected-bonus-groups";
import {AttributeStrength} from "./attribute-enums/attribute-strength.enum";
import {AttributeAttackDamage, ValueRange} from "./attribute-constants/attribute-constants";

export class AttributeModel {
  attributeName: AttributeName;
  attributeStrength: AttributeStrength;
  bonusToAttackDamage: Array<AttributeAttackDamage>;
  bonusToBaseCritical: AttributeAttackDamage;
  bonusToHitPoints: Array<ValueRange>;
  bonusToStartingTHP: Array<ValueRange>;
  bonusToDodge: Array<ValueRange>;
  firstTurnDamageResist: Array<ValueRange>;

  // Selected Bonus
  selectableBonusPicks: {
    typeOfPick: Array<BrawnAttributePicks | AgilityAttributePicks | PresenceAttributePicks | ReasoningAttributePicks>;
  };

  choosenBonusPicks: Array<BrawnSelections | AgilitySelections | PresenceSelections | ReasoningSelections>;

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
