import {AttributeModel} from "../attribute/attribute-model";
import {Field} from "../field/field";
import {MagicDefense} from "./magic-defense/magic-defense";
import {PhysicalDefenseFactoryService} from "./physical-defense/physical-defense-factory.service";

import {Weapon} from "../weapon/weapon";
import {Level} from "./level.enum";
import {ThemePointsContainer} from "../theme-points/theme-points-container";
import {SubthemeContainer} from "../theme-points/subthemes/subtheme-container";
import {Armor} from "../armor/armor";
import {SkillModel} from "../skill/skill-model";
import {Spell} from "../spells/spell";
import {RaceModel} from "./race/race-model";
import {StartingCharacterMagicDefense} from "../constants/constants";
import {AttributeName} from "../attribute/attribute-enums/attribute-name.enum";
import {WeaponCategory} from "../weapon/weapon-category.enum";
import {DefenseModel} from "./physical-defense/defense-model";

export class CharacterModel {
  attributes: Map<AttributeName, AttributeModel>;

  level: Level;
  name: string;

  race: RaceModel; // holds recial passive and active abilities, applies modifiers and determines vision
  themePoints: ThemePointsContainer;
  subThemes: SubthemeContainer; // holds martial subthemes, knacks, weapon style, spells

  // top fields
  hitPoints: Field;
  startingTemporaryHitpoints: Field;
  recoveryValue: Field;
  movement: Field;
  initiative: Field;
  mana: Field;
  recoveryPoints: Field;
  adrenalinePoints: Field;
  powerPoints: Field;
  criticalResist: Field;
  startingDamageResist: Field;
  damageResist: Field;

  features: Array<string>;
  abilities: Array<string>;
  passives: Array<string>;
  powers: Array<string>;


  skills: Array<SkillModel>;
  talents: Array<Field>; // todo make this a talentModel to hold all talent information


  // defenses

  magicDefense: StartingCharacterMagicDefense;
  physicalDefense: DefenseModel;

  selectedWeaponCategory: WeaponCategory;
  weapons: Array<Weapon>;
  spells: Array<Spell>;
}
