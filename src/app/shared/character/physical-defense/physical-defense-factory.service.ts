import {PhysicalDefenseType} from "./physical-defense-type.enum";
import {Field} from "../../field/field";
import {Armor} from "../../armor/armor";
import {ArmorType} from "../../armor/armor-type.enum";
import {BaseDefenses, DefenseModel} from "./defense-model";
import {Injectable} from "@angular/core";
import {AbilityModel} from "../../ability-power/ability-model";

@Injectable({
  providedIn: 'root'
})
export class PhysicalDefenseFactoryService {



  constructor() {
  }


  getNewPhysicalDefense(): DefenseModel {
    const model = new DefenseModel();
    return model;
  }


  /**
   * pass in a string name and a bonus value to set that value to the field object under the given name.  If a bonus needs to be removed just pass in the value of 0 along with the name of the bonus and it'll be set to 0.
   * @param {string} bonusName
   * @param {number} bonusValue
   * @param {boolean} isForAD is to say if we are setting a bonus for active defense or for passive defense
   */
  setBonusForDefense(defense: DefenseModel, bonusName: string, bonusValue: number, isForAD: boolean) {
    if (isForAD) {
      defense.activeDefenseBonus.addVal[bonusName] = bonusValue;
    } else {
      defense.passiveDefenseBonus.addVal[bonusName] = bonusValue;
    }
  }

  /**
   * This will clear all bonuses for physical defense.
   */
  clearAllBonusForDefense(defense: DefenseModel) {
    defense.activeDefenseBonus.clearAll();
    defense.passiveDefenseBonus.clearAll();
  }

  /** TODO need to go through talents and eventually knacks to see how they might change the default active/passive categories
   *
   */
  getActiveDefenses(defense: DefenseModel, talents: Array<AbilityModel>): Array<PhysicalDefenseType> {
    return defense.defenses.activeDefenses;
  }

  getPassiveDefenses(defense: DefenseModel): Array<PhysicalDefenseType> {
    return defense.defenses.passiveDefenses;
  }

  getPassiveDefensiveValue(defense: DefenseModel): number {
    let baseValue = defense.armor.getPassiveDefense();
    baseValue += defense.passiveDefenseBonus.value();
    return baseValue;
  }

  getActiveDefensiveValue(defense: DefenseModel): number {
    let baseValue = defense.armor.getActiveDefense();
    baseValue += defense.activeDefenseBonus.value();
    return baseValue;
  }

  getStartingTemporaryHitPoints(defense: DefenseModel): number {
    return defense.armor.getTemporaryHitPoints();
  }

  moveToActive(defense: DefenseModel, type: PhysicalDefenseType) {
    const index = defense.defenses.passiveDefenses.indexOf(type);
    if (index !== -1) {
      defense.defenses.passiveDefenses.splice(index, 1);
      defense.defenses.activeDefenses.push(type);
    }
  }

  moveToPassive(defense: DefenseModel, type: PhysicalDefenseType) {
    const index = defense.defenses.activeDefenses.indexOf(type);
    if (index !== -1) {
      defense.defenses.activeDefenses.splice(index, 1);
      defense.defenses.passiveDefenses.push(type);
    }
  }

  equipArmor(defense: DefenseModel, armor: Armor) {
    defense.armor = armor;
  }
}
