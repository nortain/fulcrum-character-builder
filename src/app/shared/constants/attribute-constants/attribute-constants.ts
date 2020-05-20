import {AttributeModel} from "../../attribute/attribute-model";
import {AttributeName} from "../../attribute/attribute-name.enum";

import {AgilityAttributePicks, BrawnAttributePicks, PresenceAttributePicks, ReasoningAttributePicks} from "./selected-bonus-groups";
import {AttributeStrength} from "../../attribute/attribute-strength.enum";
import {WeaponCategory} from "../../weapon/weapon-category.enum";
import {ArmorType} from "../../armor/armor-type.enum";



const PRESS_TEXT = "When you press a foe after hitting you may choose the square they withdraw to as if you had performed a Tactical Rush, or you can displace a large foe.  This can not place the creature into Hazardous or Deadly terrain";

const INITATIVE_TEXT = "Gain a bonus move action when rolling two odd numbers for initiative";

export class ValueRange {
  min: number;
  max: number;
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
          {min: 0, max: 0},
          {min: 2, max: 5},
          {min: 4, max: 10},
          {min: 4, max: 10},
          {min: 5, max: 12.5},
        ]
      },
      {
        category: WeaponCategory.Balanced,
        range: [
          {min: 0, max: 0},
          {min: 2, max: 5},
          {min: 3, max: 7.5},
          {min: 4, max: 10},
          {min: 5, max: 12.5},
        ]
      }], // end damage
    bonusToBrawnSkills: ATTRIBUTE_SKILL_BONUS,
    selectedBonusPicks: {
      typeOfPick: [
        {
          ...new BrawnAttributePicks()
        }, {
          ...new BrawnAttributePicks()
        }, {
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
              minBonus: 1, maxBonus: 3, pressText: PRESS_TEXT
            },
            bonusToEmpoweredAndCrit: {
              minEmpoweredBonus: 1, maxEmpoweredBonus: 3,
              minCritBonus: 1, maxCritBonus: 3
            },
            bonusToProtectorAura: {
              minBonus: 4, maxBonus: 10
            }
          }
        }, {
          ...new BrawnAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              numberOfPicks: 2,
            }
          ],
          selections: {
            bonusToEmpoweredAndAggressivePress: {
              minBonus: 2, maxBonus: 5, pressText: PRESS_TEXT, pickValue: 2
            },
            bonusToEmpowered: {
              pickValue: 2,
              minBonus: 3,
              maxBonus: 8
            },
            bonusToEmpoweredAndCrit: {
              minEmpoweredBonus: 1, maxEmpoweredBonus: 3,
              minCritBonus: 1, maxCritBonus: 2
            },
            bonusToProtectorAura: {
              minBonus: 4, maxBonus: 10
            }
          }
        }, {
          ...new BrawnAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              numberOfPicks: 3,
            }
          ],
          selections: {
            bonusToEmpoweredAndAggressivePress: {
              minBonus: 2, maxBonus: 5, pressText: PRESS_TEXT, pickValue: 2
            },
            bonusToEmpowered: {
              pickValue: 2,
              minBonus: 3,
              maxBonus: 8
            },
            bonusToEmpoweredAndCrit: {
              minEmpoweredBonus: 1, maxEmpoweredBonus: 3,
              minCritBonus: 1, maxCritBonus: 2
            },
            bonusToProtectorAura: {
              minBonus: 4, maxBonus: 10
            }
          }
        }
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
          {min: 0, max: 0},
          {min: 2, max: 5},
          {min: 4, max: 10},
          {min: 4, max: 10},
          {min: 5, max: 12.5},
        ]
      },
      {
        category: WeaponCategory.Balanced,
        range: [
          {min: 0, max: 0},
          {min: 2, max: 5},
          {min: 3, max: 7.5},
          {min: 4, max: 10},
          {min: 5, max: 12.5},
        ]
      }], // end damage
    bonusToAgilitySkills: ATTRIBUTE_SKILL_BONUS,
    selectedBonusPicks: {
      typeOfPick: [
        {
          ...new AgilityAttributePicks()
        }, {
          ...new AgilityAttributePicks()
        }, {
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
            bonusToCrit: {
              minBonus: 3, maxBonus: 8,
            },
            bonusToSpeedAndCrit: {
              bonusToSpeed: 1,
              minBonusToCrit: 1,
              maxBonusToCrit: 3,
              maxPicks: 2
            },
            bonusToDualist: {
              minBonus: 1, maxBonus: 3
            },
            bonusToFindWeakness: {
              minBonus: 2, maxBonus: 5
            }
          }
        }, {
          ...new AgilityAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              numberOfPicks: 2,
            }
          ],
          selections: {
            bonusToCrit: {
              minBonus: 3, maxBonus: 8,
            },
            bonusToSpeedAndCrit: {
              bonusToSpeed: 1,
              minBonusToCrit: 1,
              maxBonusToCrit: 3,
              maxPicks: 2
            },
            bonusToDualist: {
              minBonus: 1, maxBonus: 3
            },
            bonusToFindWeakness: {
              minBonus: 2, maxBonus: 5
            }
          }
        }, {
          ...new AgilityAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              numberOfPicks: 3,
            }
          ],
          selections: {
            bonusToCrit: {
              minBonus: 3, maxBonus: 8,
            },
            bonusToSpeedAndCrit: {
              bonusToSpeed: 1,
              minBonusToCrit: 1,
              maxBonusToCrit: 3,
              maxPicks: 2
            },
            bonusToDualist: {
              minBonus: 1, maxBonus: 3
            },
            bonusToFindWeakness: {
              minBonus: 2, maxBonus: 5
            }
          }
        }
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
          {min: 0, max: 0},
          {min: 2, max: 5},
          {min: 4, max: 10},
          {min: 5, max: 12},
          {min: 6, max: 15},
        ]
      },
      {
        category: WeaponCategory.Hybrid,
        range: [
          {min: 0, max: 0},
          {min: 2, max: 5},
          {min: 3, max: 7.5},
          {min: 3, max: 7.5},
          {min: 6, max: 15},
        ]
      }], // end damage
    bonusToCrit:
      {
        category: WeaponCategory.Hybrid,
        range: [
          {min: 0, max: 0},
          {min: 0, max: 0},
          {min: 1, max: 3},
          {min: 1, max: 3},
          {min: 0, max: 0},
        ]
      },
    bonusToReasoningSkills: ATTRIBUTE_SKILL_BONUS,
    selectedBonusPicks: {
      typeOfPick: [
        { // normal
          ...new ReasoningAttributePicks()
        }, { // heroic
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
            bonusToCrit: {minBonus: 2, maxBonus: 5},
            bonusToEmpowered: {minBonus: 1, maxBonus: 2.5}
          }
        }, { // champion
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
            bonusToCrit: {minBonus: 2, maxBonus: 5},
            bonusToEmpowered: {minBonus: 1, maxBonus: 2.5}
          }
        }, { // EPIC
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
            bonusToEmpoweredAndCrit: {
              minBonusToCrit: 1, maxBonusToCrit: 2.5, minEmpoweredBonus: 1, maxEmpoweredBonus: 2.5
            },
            bonusToCrit: {minBonus: 3, maxBonus: 7.5}
          }
        }, { // legendary
          ...new ReasoningAttributePicks(),
          requiredHybridAttributeStrength: [
            {
              numberOfPicks: 3,
            }
          ],
          selections: {
            bonusToCrit: {
              minBonus: 3, maxBonus: 7.5,
            },
            bonusToEmpowered: {
              minBonus: 1, maxBonus: 2.5
            }
          }
        }
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
          {min: 0, max: 0},
          {min: 2, max: 5},
          {min: 4, max: 10},
          {min: 4, max: 10},
          {min: 4, max: 10},
        ]
      },
      {
        category: WeaponCategory.Hybrid,
        range: [
          {min: 0, max: 0},
          {min: 2, max: 5},
          {min: 2, max: 5},
          {min: 3, max: 7.5},
          {min: 4, max: 10},
        ]
      }], // end damage
    bonusToCrit:
      {
        category: WeaponCategory.Hybrid,
        range: [
          {min: 0, max: 0},
          {min: 0, max: 0},
          {min: 1, max: 3},
          {min: 1, max: 3},
          {min: 0, max: 0},
        ]
      },
    bonusToPresenceSkills: ATTRIBUTE_SKILL_BONUS,
    selectedBonusPicks: {
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
              movementBonus: 1
            },
            friendlyMovement: {
              movementBonus: 1
            },
            bonusToHitWithEnvironmentAttacks: {
              bonusToHit: 1
            },
            convertAttackDamageIntoGlobal: {
              minBonus: 1, maxBonus: 2.5
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
              movementBonus: 1, maxPicks: 2
            },
            friendlyMovement: {
              movementBonus: 1, maxPicks: 2
            },
            bonusToHitWithEnvironmentAttacks: {
              bonusToHit: 1, maxPicks: 2
            },
            convertAttackDamageIntoGlobal: {
              minBonus: 1, maxBonus: 2.5
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
              movementBonus: 1, maxPicks: 2
            },
            friendlyMovement: {
              movementBonus: 1, maxPicks: 2
            },
            bonusToHitWithEnvironmentAttacks: {
              bonusToHit: 1, maxPicks: 2
            },
            convertAttackDamageIntoGlobal: {
              minBonus: 1, maxBonus: 2.5
            },
            bonusToGlobalDamageAndPenaltyToCrit: {
              minBonus: 1, maxBonus: 2.5, pickValue: 2
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
              movementBonus: 1, maxPicks: 2
            },
            friendlyMovement: {
              movementBonus: 1, maxPicks: 2
            },
            bonusToHitWithEnvironmentAttacks: {
              bonusToHit: 1, maxPicks: 2
            },
            convertAttackDamageIntoGlobal: {
              minBonus: 1, maxBonus: 2.5, maxPicks: 4
            },
            bonusToGlobalDamageAndPenaltyToCrit: {
              minBonus: 1, maxBonus: 2.5, pickValue: 2, maxPicks: 1
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
      {min: 0, max: 0},
      {min: 4, max: 10},
      {min: 8, max: 20},
      {min: 10, max: 25},
      {min: 14, max: 35},
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
      {min: 0, max: 0},
      {min: 2, max: 5},
      {min: 4, max: 10},
      {min: 5, max: 13},
      {min: 7, max: 18},
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
      {min: 0, max: 0},
      {min: 2, max: 5},
      {min: 4, max: 10},
      {min: 5, max: 13},
      {min: 7, max: 18},
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
      {min: 0, max: 0},
      {min: 2, max: 5},
      {min: 4, max: 10},
      {min: 5, max: 13},
      {min: 7, max: 18},
    ],
    bonusToAd: [{
      bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Normal],
      armorTypes: [ArmorType.LightArmor, ArmorType.MediumArmor]
    },
      {
        bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Heroic],
        armorTypes: [ArmorType.LightArmor, ArmorType.MediumArmor]
      },
      {
        bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Champion],
        armorTypes: [ArmorType.LightArmor, ArmorType.MediumArmor]
      },
      {
        bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Epic],
        armorTypes: [ArmorType.LightArmor, ArmorType.MediumArmor]
      }
      , {
        bonusValue: ATTRIBUTE_BONUS_TO_AD[AttributeStrength.Legendary],
        armorTypes: [ArmorType.LightArmor, ArmorType.MediumArmor]
      }
    ],
    bonusToTrainedSkills: ATTRIBUTE_TRAINED_SKILL_BONUS
  } as AttributeModel
};

