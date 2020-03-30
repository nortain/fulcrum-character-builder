export enum MagicType {
  Overview = "Overview",
  FeatureBonus = "FeatureBonus",
  GeneralFeature = "GeneralFeature",
  ImplementKnacks = "ImplementKnacks",
  ImplementKnacksData = "ImplementKnacksData",
  AdrenalinePowers = "AdrenalinePowers",
  PowerPointAbilities = "PowerPointAbilities",
  SpecialPowers = "SpecialPowers",
  ImplementAttack = "ImplementAttack",
  Spells = "Spells"
}

/**
 * Type checked to make sure we return either a spell, spell[] or SpecialPower which is a name with spell[]
 */
export enum SpellSelectionType {
  Spells = "Spells",
  ImplementAttack = "ImplementAttack",
  SpecialPowers = "SpecialPowers",
  AdrenalinePowers = "AdrenalinePowers",
  PowerPointAbilities = "PowerPointAbilities",
}
