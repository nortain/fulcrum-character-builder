import {AttributeModel} from "../../attribute/attribute-model";
import {AttributeName} from "../../attribute/attribute-name.enum";

import {AgilityAttributePicks, AttributeBonus, BrawnAttributePicks, PresenceAttributePicks, ReasoningAttributePicks} from "./selected-bonus-groups";
import {AttributeStrength} from "../../attribute/attribute-strength.enum";
import {WeaponCategory} from "../../weapon/weapon-category.enum";
import {ArmorType} from "../../armor/armor-type.enum";


export const PRESS_TEXT = "When you press a foe after hitting you may choose the square they withdraw to as if you had performed a Tactical Rush, or you can displace a large foe.  This can not place the creature into Hazardous or Deadly terrain";

export const INITATIVE_TEXT = "Gain a bonus move action when rolling two odd numbers for initiative";

export class ValueRange {
  minBonus: number;
  maxBonus: number;
}


export class AttributeAttackDamage {
  category: WeaponCategory;
  range: Array<ValueRange>;
}

export const ATTRIBUTE_SKILL_BONUS = [0, 2, 3, 4, 5];
export const ATTRIBUTE_MAGIC_DEFENSE = [0, 2, 3, 4, 5];
export const ATTRIBUTE_INTUITION_MAGIC_DEFENSE = [0, 1, 2, 2, 3];
export const ATTRIBUTE_INTUITION_INITAITIVE = [0, 2, 4, 6, 8];
export const ATTRIBUTE_RECOVERY_BONUS = [0, 0, 0, 1, 1];
export const ATTRIBUTE_TRAINED_SKILL_BONUS = [0, 0, 1, 1, 2];
export const ATTRIBUTE_INITIATIVE_BONUS = [0, 5, 10, 11, 16];
export const ATTRIBUTE_POWER_POINT_BONUS = [0, 2, 4, 5, 7];
export const ATTRIBUTE_BONUS_TO_AD = [0, 0, 0, 1, 1];

export const ATTRIBUTE = {
  Brawn: {
    ...new AttributeModel(),
    attributeName: AttributeName.Brawn,
    bonusToAttackDamage: [
      {
        category: WeaponCategory.Heavy,
        range: [
          {minBonus: 0, maxBonus: 0},
          {minBonus: 2, maxBonus: 5},
          {minBonus: 4, maxBonus: 10},
          {minBonus: 4, maxBonus: 10},
          {minBonus: 5, maxBonus: 12.5},
        ]
      },
      {
        category: WeaponCategory.Balanced,
        range: [
          {minBonus: 0, maxBonus: 0},
          {minBonus: 2, maxBonus: 5},
          {minBonus: 3, maxBonus: 7.5},
          {minBonus: 4, maxBonus: 10},
          {minBonus: 5, maxBonus: 12.5},
        ]
      }], // end damage
    bonusToBrawnSkills: ATTRIBUTE_SKILL_BONUS,
    selectableBonusPicks: {
      typeOfPick: [
        {
          ...new BrawnAttributePicks()
        } as BrawnAttributePicks, {
          ...new BrawnAttributePicks()
        } as BrawnAttributePicks, {
          ...new BrawnAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              attributeName: AttributeName.Agility,
              attributeStrength: AttributeStrength.Heroic,
              category: WeaponCategory.Balanced,
              numberOfPicks: 1,
            }
          ],
          selections: {
            bonusToCriticalAndAggressivePress: {
              criticalBonus: {
                minBonus: 1,
                maxBonus: 3,
              },
              pressText: PRESS_TEXT,
              pickValue: 1
            },
            bonusToEmpoweredAndCritical: {
              bonusToCritical: {minBonus: 1, maxBonus: 3},
              bonusToEmpowered: {minBonus: 1, maxBonus: 3},
              pickValue: 1,
              maxPicks: 0
            },
            bonusToProtectorAura: {
              bonusTo: {minBonus: 4, maxBonus: 10},
              maxPicks: 0, pickValue: 1
            }
          }
        } as BrawnAttributePicks, {
          ...new BrawnAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              numberOfPicks: 2,
            }
          ],
          selections: {
            bonusToEmpoweredAndAggressivePress: {
              empoweredBonus: {
                minBonus: 2, maxBonus: 5
              },
              pressText: PRESS_TEXT,
              pickValue: 2
            },
            bonusToEmpowered: {
              pickValue: 2,
              bonusTo: {
                minBonus: 3,
                maxBonus: 8
              },
              maxPicks: 1
            } as AttributeBonus,
            bonusToEmpoweredAndCritical: {
              bonusToCritical: {minBonus: 1, maxBonus: 3},
              bonusToEmpowered: {minBonus: 1, maxBonus: 3},
              pickValue: 1,
              maxPicks: 0
            },
            bonusToProtectorAura: {
              bonusTo: {minBonus: 4, maxBonus: 10},
              maxPicks: 0, pickValue: 1
            }
          }
        } as BrawnAttributePicks, {
          ...new BrawnAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              numberOfPicks: 3,
            }
          ],
          selections: {
            bonusToEmpoweredAndAggressivePress: {
              empoweredBonus: {minBonus: 2, maxBonus: 5},
              pressText: PRESS_TEXT,
              pickValue: 2
            },
            bonusToEmpowered: {
              pickValue: 2,
              bonusTo: {
                minBonus: 3,
                maxBonus: 8
              },
              maxPicks: 3
            },
            bonusToEmpoweredAndCritical: {
              bonusToCritical: {minBonus: 1, maxBonus: 2},
              bonusToEmpowered: {minBonus: 1, maxBonus: 3},
              pickValue: 1,
              maxPicks: 0
            },
            bonusToProtectorAura: {
              bonusTo: {minBonus: 4, maxBonus: 10},
              maxPicks: 0, pickValue: 1
            }
          }
        } as BrawnAttributePicks
      ] as Array<BrawnAttributePicks>
    }
  } as AttributeModel,
  Agility: {
    ...new AttributeModel(),
    attributeName: AttributeName.Agility,
    bonusToAttackDamage: [
      {
        category: WeaponCategory.Agile,
        range: [
          {minBonus: 0, maxBonus: 0},
          {minBonus: 2, maxBonus: 5},
          {minBonus: 4, maxBonus: 10},
          {minBonus: 4, maxBonus: 10},
          {minBonus: 5, maxBonus: 12.5},
        ]
      },
      {
        category: WeaponCategory.Balanced,
        range: [
          {minBonus: 0, maxBonus: 0},
          {minBonus: 2, maxBonus: 5},
          {minBonus: 3, maxBonus: 7.5},
          {minBonus: 4, maxBonus: 10},
          {minBonus: 5, maxBonus: 12.5},
        ]
      }], // end damage
    bonusToAgilitySkills: ATTRIBUTE_SKILL_BONUS,
    selectableBonusPicks: {
      typeOfPick: [
        {
          ...new AgilityAttributePicks()
        } as AgilityAttributePicks, {
          ...new AgilityAttributePicks()
        } as AgilityAttributePicks, {
          ...new AgilityAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              attributeName: AttributeName.Brawn,
              attributeStrength: AttributeStrength.Heroic,
              category: WeaponCategory.Balanced,
              numberOfPicks: 1,
            }
          ],
          selections: {
            bonusToCritical: {
              bonusTo: {minBonus: 3, maxBonus: 8},
              maxPicks: 0, pickValue: 1
            },
            bonusToSpeedAndCritical: {
              bonusToSpeed: 1,
              bonusToCritical: {
                minBonus: 1,
                maxBonus: 3,
              },
              maxPicks: 2
            },
            bonusToDualist: {
              bonusTo: {minBonus: 1, maxBonus: 3},
              maxPicks: 0, pickValue: 1
            },
            bonusToFindWeakness: {
              bonusTo: {minBonus: 2, maxBonus: 5},
              maxPicks: 0, pickValue: 1
            }
          }
        } as AgilityAttributePicks, {
          ...new AgilityAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              numberOfPicks: 2,
            }
          ],
          selections: {
            bonusToCritical: {
              bonusTo: {minBonus: 3, maxBonus: 8},
              maxPicks: 0, pickValue: 1
            },
            bonusToSpeedAndCritical: {
              bonusToSpeed: 1,
              bonusToCritical: {
                minBonus: 1,
                maxBonus: 3,
              },
              maxPicks: 2
            },
            bonusToDualist: {
              bonusTo: {minBonus: 1, maxBonus: 3},
              maxPicks: 0, pickValue: 1
            },
            bonusToFindWeakness: {
              bonusTo: {minBonus: 2, maxBonus: 5},
              maxPicks: 0, pickValue: 1
            }
          }
        } as AgilityAttributePicks, {
          ...new AgilityAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              numberOfPicks: 3,
            }
          ],
          selections: {
            bonusToCritical: {
              bonusTo: {minBonus: 3, maxBonus: 8},
              maxPicks: 0, pickValue: 1
            },
            bonusToSpeedAndCritical: {
              bonusToSpeed: 1,
              bonusToCritical: {
                minBonus: 1,
                maxBonus: 3,
              },
              maxPicks: 2
            },
            bonusToDualist: {
              bonusTo: {minBonus: 1, maxBonus: 3},
              maxPicks: 0, pickValue: 1
            },
            bonusToFindWeakness: {
              bonusTo: {minBonus: 2, maxBonus: 5},
              maxPicks: 0, pickValue: 1
            }
          }
        } as AgilityAttributePicks
      ] as Array<AgilityAttributePicks>
    } // end agility
  } as AttributeModel,
  Reasoning: {
    ...new AttributeModel(),
    attributeName: AttributeName.Reasoning,
    bonusToAttackDamage: [
      {
        category: WeaponCategory.Reasoning,
        range: [
          {minBonus: 0, maxBonus: 0},
          {minBonus: 2, maxBonus: 5},
          {minBonus: 4, maxBonus: 10},
          {minBonus: 5, maxBonus: 12},
          {minBonus: 6, maxBonus: 15},
        ]
      },
      {
        category: WeaponCategory.Hybrid,
        range: [
          {minBonus: 0, maxBonus: 0},
          {minBonus: 2, maxBonus: 5},
          {minBonus: 3, maxBonus: 7.5},
          {minBonus: 3, maxBonus: 7.5},
          {minBonus: 6, maxBonus: 15},
        ]
      }], // end damage
    bonusToBaseCritical:
      {
        category: WeaponCategory.Hybrid,
        range: [
          {minBonus: 0, maxBonus: 0},
          {minBonus: 0, maxBonus: 0},
          {minBonus: 1, maxBonus: 3},
          {minBonus: 1, maxBonus: 3},
          {minBonus: 0, maxBonus: 0},
        ]
      },
    bonusToReasoningSkills: ATTRIBUTE_SKILL_BONUS,
    selectableBonusPicks: {
      typeOfPick: [
        { // normal
          ...new ReasoningAttributePicks()
        } as ReasoningAttributePicks, { // heroic
          ...new ReasoningAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              attributeName: AttributeName.Presence,
              attributeStrength: AttributeStrength.Champion,
              category: WeaponCategory.Hybrid,
              numberOfPicks: 1
            }
          ],
          selections: {
            bonusToCritical: {bonusTo: {minBonus: 2, maxBonus: 5}},
            bonusToEmpowered: {bonusTo: {minBonus: 1, maxBonus: 2.5}}
          }
        } as ReasoningAttributePicks, { // champion
          ...new ReasoningAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              attributeName: AttributeName.Presence,
              attributeStrength: AttributeStrength.Heroic,
              category: WeaponCategory.Hybrid,
              numberOfPicks: 1
            }
          ],
          selections: {
            bonusToCritical: {bonusTo: {minBonus: 2, maxBonus: 5}},
            bonusToEmpowered: {bonusTo: {minBonus: 1, maxBonus: 2.5}}
          }
        } as ReasoningAttributePicks, { // EPIC
          ...new ReasoningAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              numberOfPicks: 1
            }, {
              attributeName: AttributeName.Presence,
              attributeStrength: AttributeStrength.Heroic,
              category: WeaponCategory.Hybrid,
              numberOfPicks: 2
            }
          ],
          selections: {
            bonusToEmpoweredAndCritical: {
              bonusToCritical: {
                minBonus: 1,
                maxBonus: 2.5,
              },
              bonusToEmpowered: {minBonus: 1, maxBonus: 2.5},
              pickValue: 1
            },
            bonusToCritical: {bonusTo: {minBonus: 3, maxBonus: 7.5}}
          }
        } as ReasoningAttributePicks, { // legendary
          ...new ReasoningAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              numberOfPicks: 3,
            }
          ],
          selections: {
            bonusToCritical: {
              bonusTo: {minBonus: 3, maxBonus: 7.5},
            },
            bonusToEmpowered: {
              bonusTo: {minBonus: 1, maxBonus: 2.5}
            }
          }
        } as ReasoningAttributePicks
      ] as Array<ReasoningAttributePicks>
    }
  } as AttributeModel,
  Presence: {
    ...new AttributeModel(),
    attributeName: AttributeName.Presence,
    bonusToAttackDamage: [
      {
        category: WeaponCategory.Presence,
        range: [
          {minBonus: 0, maxBonus: 0},
          {minBonus: 2, maxBonus: 5},
          {minBonus: 4, maxBonus: 10},
          {minBonus: 4, maxBonus: 10},
          {minBonus: 4, maxBonus: 10},
        ]
      },
      {
        category: WeaponCategory.Hybrid,
        range: [
          {minBonus: 0, maxBonus: 0},
          {minBonus: 2, maxBonus: 5},
          {minBonus: 2, maxBonus: 5},
          {minBonus: 3, maxBonus: 7.5},
          {minBonus: 4, maxBonus: 10},
        ]
      }], // end damage
    bonusToBaseCritical:
      {
        category: WeaponCategory.Hybrid,
        range: [
          {minBonus: 0, maxBonus: 0},
          {minBonus: 0, maxBonus: 0},
          {minBonus: 1, maxBonus: 3},
          {minBonus: 1, maxBonus: 3},
          {minBonus: 0, maxBonus: 0},
        ]
      },
    bonusToPresenceSkills: ATTRIBUTE_SKILL_BONUS,
    selectableBonusPicks: {
      typeOfPick: [
        { // normal
          ...new PresenceAttributePicks()
        }, { // heroic
          ...new PresenceAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              attributeName: AttributeName.Presence,
              attributeStrength: AttributeStrength.Champion,
              category: WeaponCategory.Hybrid,
              numberOfPicks: 1
            }
          ],
          selections: {
            forcedMovement: {
              bonusTo: 1,
              maxPicks: 2,
              pickValue: 1
            },
            friendlyMovement: {
              bonusTo: 1,
              maxPicks: 2,
              pickValue: 1
            },
            bonusToHitWithEnvironmentAttacks: {
              bonusTo: 1,
              maxPicks: 2,
              pickValue: 1
            },
            convertAttackDamageIntoGlobal: {
              bonusToGlobal: {minBonus: 1, maxBonus: 3},
              bonusToAttack: {minBonus: -1, maxBonus: -3},
              maxPicks: 4, pickValue: 1
            }
          }
        } as PresenceAttributePicks, { // champion
          ...new PresenceAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              attributeName: AttributeName.Presence,
              attributeStrength: AttributeStrength.Heroic,
              category: WeaponCategory.Hybrid,
              numberOfPicks: 2
            }, {
              attributeName: AttributeName.Presence,
              attributeStrength: AttributeStrength.Champion,
              category: WeaponCategory.Hybrid,
              numberOfPicks: 3
            }
          ],
          selections: {
            forcedMovement: {
              bonusTo: 1, maxPicks: 2
            },
            friendlyMovement: {
              bonusTo: 1, maxPicks: 2
            },
            bonusToHitWithEnvironmentAttacks: {
              bonusTo: 1, maxPicks: 2
            },
            convertAttackDamageIntoGlobal: {
              bonusToGlobal: {minBonus: 1, maxBonus: 3},
              bonusToAttack: {minBonus: -1, maxBonus: -3},
              maxPicks: 4, pickValue: 1
            }
          }
        } as PresenceAttributePicks, { // EPIC
          ...new PresenceAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              numberOfPicks: 3
            }
          ],
          selections: {
            forcedMovement: {
              bonusTo: 1, maxPicks: 2
            },
            friendlyMovement: {
              bonusTo: 1, maxPicks: 2
            },
            bonusToHitWithEnvironmentAttacks: {
              bonusTo: 1, maxPicks: 2
            },
            convertAttackDamageIntoGlobal: {
              bonusToGlobal: {minBonus: 1, maxBonus: 3},
              bonusToAttack: {minBonus: -1, maxBonus: -3},
              maxPicks: 4, pickValue: 1
            },
            bonusToGlobalDamageAndPenaltyToCritical: {
              bonusToGlobal: {minBonus: 1, maxBonus: 2.5},
              bonusToCritical: {minBonus: -1, maxBonus: -2.5},
              pickValue: 2, maxPicks: 1
            }
          }
        } as PresenceAttributePicks, { // legendary
          ...new PresenceAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              numberOfPicks: 6,
            }
          ],
          selections: {
            forcedMovement: {
              bonusTo: 1, maxPicks: 2
            },
            friendlyMovement: {
              bonusTo: 1, maxPicks: 2
            },
            bonusToHitWithEnvironmentAttacks: {
              bonusTo: 1, maxPicks: 2
            },
            convertAttackDamageIntoGlobal: {
              bonusToGlobal: {minBonus: 1, maxBonus: 3},
              bonusToAttack: {minBonus: -1, maxBonus: -3},
              maxPicks: 4, pickValue: 1
            },
            bonusToGlobalDamageAndPenaltyToCritical: {
              bonusToGlobal: {minBonus: 1, maxBonus: 2.5},
              bonusToCritical: {minBonus: -1, maxBonus: -2.5},
              pickValue: 2, maxPicks: 1
            }
          }
        } as PresenceAttributePicks
      ] as Array<PresenceAttributePicks>
    }
  } as AttributeModel,
  Vitality: {
    ...new AttributeModel(),
    attributeName: AttributeName.Vitality,
    bonusToFortitude: ATTRIBUTE_MAGIC_DEFENSE,
    bonusToHitPoints: [
      {minBonus: 0, maxBonus: 0},
      {minBonus: 4, maxBonus: 10},
      {minBonus: 8, maxBonus: 20},
      {minBonus: 10, maxBonus: 25},
      {minBonus: 14, maxBonus: 35},
    ],
    bonusToRecoveries: ATTRIBUTE_RECOVERY_BONUS,
    bonusToTrainedSkills: ATTRIBUTE_TRAINED_SKILL_BONUS
  } as AttributeModel,
  Quickness: {
    ...new AttributeModel(),
    attributeName: AttributeName.Quickness,
    bonusToReflex: ATTRIBUTE_MAGIC_DEFENSE,
    bonusToInitiative: ATTRIBUTE_INITIATIVE_BONUS,
    firstTurnDamageResist: [
      {minBonus: 0, maxBonus: 0},
      {minBonus: 2, maxBonus: 5},
      {minBonus: 4, maxBonus: 10},
      {minBonus: 5, maxBonus: 13},
      {minBonus: 7, maxBonus: 18},
    ],
    epicText: INITATIVE_TEXT,
    legendaryText: INITATIVE_TEXT,
    bonusToTrainedSkills: ATTRIBUTE_TRAINED_SKILL_BONUS
  } as AttributeModel,
  SelfDiscipline: {
    ...new AttributeModel(),
    attributeName: AttributeName.SelfDiscipline,
    bonusToFortitude: ATTRIBUTE_MAGIC_DEFENSE,
    bonusToPowerPoints: ATTRIBUTE_POWER_POINT_BONUS,
    bonusToStartingTHP: [
      {minBonus: 0, maxBonus: 0},
      {minBonus: 2, maxBonus: 5},
      {minBonus: 4, maxBonus: 10},
      {minBonus: 5, maxBonus: 13},
      {minBonus: 7, maxBonus: 18},
    ],
    bonusToAd: [{
      bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Normal],
      armorTypes: [ArmorType.CasterArmor]
    },
      {
        bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Heroic],
        armorTypes: [ArmorType.CasterArmor]
      },
      {
        bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Champion],
        armorTypes: [ArmorType.CasterArmor]
      },
      {
        bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Epic],
        armorTypes: [ArmorType.CasterArmor]
      }
      , {
        bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Legendary],
        armorTypes: [ArmorType.CasterArmor]
      }
    ],
    bonusToTrainedSkills: ATTRIBUTE_TRAINED_SKILL_BONUS
  } as AttributeModel,
  Intuition: {
    ...new AttributeModel(),
    attributeName: AttributeName.Intuition,
    bonusToWill: ATTRIBUTE_INTUITION_MAGIC_DEFENSE,
    bonusToFortitude: ATTRIBUTE_INTUITION_MAGIC_DEFENSE,
    bonusToReflex: ATTRIBUTE_INTUITION_MAGIC_DEFENSE,
    bonusToInitiative: ATTRIBUTE_INTUITION_INITAITIVE,
    bonusToBrawnSkills: ATTRIBUTE_SKILL_BONUS,
    bonusToPresenceSkills: ATTRIBUTE_SKILL_BONUS,
    bonusToAgilitySkills: ATTRIBUTE_SKILL_BONUS,
    bonusToReasoningSkills: ATTRIBUTE_SKILL_BONUS,
    bonusToIntuitionSKills: ATTRIBUTE_SKILL_BONUS,
    bonusToDodge: [
      {minBonus: 0, maxBonus: 0},
      {minBonus: 2, maxBonus: 5},
      {minBonus: 4, maxBonus: 10},
      {minBonus: 5, maxBonus: 13},
      {minBonus: 7, maxBonus: 18},
    ],
    bonusToAd: [{
      bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Normal],
      armorTypes: [ArmorType.None, ArmorType.LightArmor, ArmorType.MediumArmor]
    },
      {
        bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Heroic],
        armorTypes: [ArmorType.None, ArmorType.LightArmor, ArmorType.MediumArmor]
      },
      {
        bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Champion],
        armorTypes: [ArmorType.None, ArmorType.LightArmor, ArmorType.MediumArmor]
      },
      {
        bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Epic],
        armorTypes: [ArmorType.None, ArmorType.LightArmor, ArmorType.MediumArmor]
      }
      , {
        bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Legendary],
        armorTypes: [ArmorType.None, ArmorType.LightArmor, ArmorType.MediumArmor]
      }
    ],
    bonusToTrainedSkills: ATTRIBUTE_TRAINED_SKILL_BONUS
  } as AttributeModel
};

