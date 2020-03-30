import {Spell} from "./spell";
import {SpellPathTypes} from "./enums/spell-path-type.enum";

export class SpellPath {
  overview: string;
  ability: string[];
  power: Spell;
  selectedCoreFeature: Spell;
  coreFeatureChoices: Spell[];
  spellCount: number;
  implementAttack: {};

  constructor(name: SpellPathTypes) {

  }

  chooseFeature(name: string) {
    for (const feature of this.coreFeatureChoices) {
      if (feature.name === name) {
        this.selectedCoreFeature = feature;
      }
    }
  }

  bonusToSpells(spellType) { }

  bonusToAttributes(attribute: string, strength: number, useAttributeBonus: boolean) { }
}
