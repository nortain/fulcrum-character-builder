/**
 * This enumeration represents all bonuses that can be supplied by attributes.  This is used in conjunction with the starting character attributes class that can use a generic function to calculate a particular bonus using this strongly typed enum
 */
// TODO delete me if no longer needed
export enum AttributeBonus {
  SkillBonus = "getSkillBonus",
  MagicDefense = "getMagicDefense",
  PrimaryDamage = "getPrimaryDamage",
  SecondaryDamage = "getSecondaryDamage",
  HitPointBonus = "getHitPointBonus",
  TemporaryHitPointBonus = "getTemporaryHitPointBonus",
  CritDieBonus = "getCritDieBonus",
  InitiativeBonus = "getInitiativeBonus",
  ArmorBonus = "getArmorBonus",
  TrainedSkillBonus = "getTrainedSkillBonus",
  RecoveryBonus = "getRecoveryBonus",
  PowerPointBonus = "getPowerPointBonus",
  SpeedBonus = "getSpeedBonus"
}
