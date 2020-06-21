import {PhysicalDefenseType} from "./physical-defense-type.enum";
import {Armor} from "../../armor/armor";
import {ArmorType} from "../../armor/armor-type.enum";
import {PhysicalDefenseFactoryService} from "./physical-defense-factory.service";
import {TestBed} from "@angular/core/testing";
import {DefenseModel} from "./defense-model";


describe('DefenseFactoryService', () => {
  let defenseService: PhysicalDefenseFactoryService;
  let defense: DefenseModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhysicalDefenseFactoryService
      ]
    });
    defenseService = TestBed.inject<PhysicalDefenseFactoryService>(PhysicalDefenseFactoryService);
    defense = defenseService.getNewPhysicalDefense();
  });


  it('should create an instance', () => {
    expect(defenseService).toBeTruthy();
    expect(defense).toBeTruthy();
  });

  it('should be able to move a defensive type from active to passive', () => {
    expect(defense.defenses.activeDefenses.length).toEqual(0);
    defenseService.moveToActive(defense, PhysicalDefenseType.Unarmed);

    expect(defense.defenses.activeDefenses).toContain(PhysicalDefenseType.Unarmed);
  });

  it('should be able to move a defensive type from active to passive', () => {
    defenseService.moveToActive(defense, PhysicalDefenseType.Missile);
    expect(defense.defenses.activeDefenses.length).toEqual(1);
    defenseService.moveToPassive(defense, PhysicalDefenseType.Missile);
    expect(defense.defenses.activeDefenses.length).toEqual(0);
  });

  it('should not be able to move the same defense from the same array twice', () => {
    defenseService.moveToActive(defense, PhysicalDefenseType.Zone);
    defenseService.moveToActive(defense, PhysicalDefenseType.Zone);
    expect(defense.defenses.activeDefenses.length).toEqual(1);
  });

  it('should be able to get a value for active defenses', () => {
    expect(defenseService.getActiveDefensiveValue(defense)).toEqual(11);
  });

  it('should be able to get a value for passive defenses', () => {
    expect(defenseService.getPassiveDefensiveValue(defense)).toEqual(10);
  });

  it('should be able to add and remove a bonus to a characters active defense', () => {
    defenseService.setBonusForDefense(defense, "awesome", 1, true);
    expect(defenseService.getActiveDefensiveValue(defense)).toEqual(12);
    defenseService.setBonusForDefense(defense, "awesome", 0, true);
    expect(defenseService.getActiveDefensiveValue(defense)).toEqual(11);
  });

  it('should be able to add and remove a bonus from a characters passive defense', () => {
    defenseService.setBonusForDefense(defense, "awesome", 1, false);
    expect(defenseService.getPassiveDefensiveValue(defense)).toEqual(11);
    defenseService.setBonusForDefense(defense, "awesome", 0, false);
    expect(defenseService.getPassiveDefensiveValue(defense)).toEqual(10);
  });

  it('should be able to change armor types', () => {
    defenseService.equipArmor(defense, new Armor(ArmorType.HeavyArmor));
    expect(defenseService.getActiveDefensiveValue(defense)).toEqual(14);
  });

  it('should be able to get starting THP for armor', () => {
    expect(defenseService.getStartingTemporaryHitPoints(defense)).toEqual(0);
    defenseService.equipArmor(defense, new Armor(ArmorType.HeavyArmor));
    expect(defenseService.getStartingTemporaryHitPoints(defense)).toEqual(3);
    defenseService.equipArmor(defense, new Armor(ArmorType.LightArmor));
    expect(defenseService.getStartingTemporaryHitPoints(defense)).toEqual(1);
  });
});



