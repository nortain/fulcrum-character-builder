import {TestBed} from '@angular/core/testing';
import {AttributeFactoryService} from "./attribute-factory.service";
import {AttributeName} from "./attribute-name.enum";
import {AttributeStrength} from "./attribute-strength.enum";
import {AttributeModel} from "./attribute-model";
import {WeaponCategory} from "../weapon/weapon-category.enum";
import {Level} from "../character/level.enum";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";


fdescribe('AttributeFactoryService', () => {
  let service: AttributeFactoryService;
  let bra: AttributeModel, vit: AttributeModel, rea: AttributeModel, sd: AttributeModel, int: AttributeModel, attribute: AttributeModel, qu: AttributeModel, agi: AttributeModel, pre: AttributeModel;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttributeFactoryService]
    });

    service = TestBed.inject<AttributeFactoryService>(AttributeFactoryService);
    attribute = makeAttribute(AttributeName.Brawn);
    bra = makeAttribute(AttributeName.Brawn);
    vit = makeAttribute(AttributeName.Vitality);
    rea = makeAttribute(AttributeName.Reasoning);
    sd = makeAttribute(AttributeName.SelfDiscipline);
    int = makeAttribute(AttributeName.Intuition);
    qu = makeAttribute(AttributeName.Quickness);
    agi = makeAttribute(AttributeName.Agility);
    pre = makeAttribute(AttributeName.Presence);
  });


  it('should make the attribute class', () => {
    expect(bra).toBeDefined();
  });

  it('should return an empty object', () => {
    const item = service.getNewAttribute(null);
    expect(item).toBeTruthy();
    expect(item.attributeStrength).toBeFalsy();
    expect(item.attributeName).toBeFalsy();
  });

  it('attribute can have a name', () => {
    expect(bra.attributeName).toEqual(AttributeName.Brawn);
  });

  it('should have strength 0 by default', () => {
    const testAttribute = service.getNewAttribute(AttributeName.Presence);
    expect(testAttribute.attributeStrength).toEqual(AttributeStrength.Normal);
  });

  it('should confirm that certain attributes give a skill bonus while others do not', () => {
    expect(service.getSkillBonus(bra, AttributeName.Brawn)).toEqual(5);
    expect(service.getSkillBonus(qu, AttributeName.Quickness)).toEqual(0);
    expect(service.getSkillBonus(bra, AttributeName.Agility)).toEqual(0);
    expect(service.getSkillBonus(int, AttributeName.Reasoning)).toEqual(5);
    expect(service.getSkillBonus(int, AttributeName.Vitality)).toEqual(0);
  });

  it('should change skill bonus as strength changes', () => {
    expect(service.getSkillBonus(agi, AttributeName.Agility)).toEqual(5);
    agi.attributeStrength = AttributeStrength.Champion;
    expect(service.getSkillBonus(agi, AttributeName.Agility)).toEqual(3);
  });

  it('should be able to determine if an attribute is defensive', () => {
    expect(service.getMagicDefense(bra, MagicDefenseType.Fortitude)).toEqual(0);
    expect(service.getMagicDefense(vit, MagicDefenseType.Fortitude)).toEqual(5);
    expect(service.getMagicDefense(agi, MagicDefenseType.Reflex)).toEqual(0);
  });

  it('should provide magic defense only for the type of md it gives', () => {
    expect(service.getMagicDefense(qu, MagicDefenseType.Reflex)).toEqual(5);
    expect(service.getMagicDefense(qu, MagicDefenseType.Will)).toEqual(0);
  });

  it('should determine that intution gives defense to all kinds of magic', () => {
    expect(service.getMagicDefense(int, MagicDefenseType.Reflex)).toEqual(3);
    expect(service.getMagicDefense(int, MagicDefenseType.Fortitude)).toEqual(3);
    expect(service.getMagicDefense(int, MagicDefenseType.Will)).toEqual(3);
  });

  it('should show that magic defense changes based on strength', () => {
    expect(service.getMagicDefense(int, MagicDefenseType.Reflex)).toEqual(3);
    int.attributeStrength = AttributeStrength.Heroic;
    expect(service.getMagicDefense(int, MagicDefenseType.Reflex)).toEqual(1);
  });

  it('should be able to get damage for legendary brawn', () => {
    bra.attributeStrength = AttributeStrength.Legendary;
    expect(service.getAttackDamageBonus(bra, WeaponCategory.Heavy, Level.One).modifierOfDice.value()).toEqual(5);
    expect(service.getAttackDamageBonus(bra, WeaponCategory.Heavy, Level.Ten).modifierOfDice.value()).toEqual(13);
  });

  it('should be able to get balanced damage for champion brawn', () => {
    bra.attributeStrength = AttributeStrength.Champion;
    expect(service.getAttackDamageBonus(bra, WeaponCategory.Balanced, Level.One).modifierOfDice.value()).toEqual(3);
    expect(service.getAttackDamageBonus(bra, WeaponCategory.Balanced, Level.Ten).modifierOfDice.value()).toEqual(8);
  });

  it('should be able to get damage for epic presence', () => {
    pre.attributeStrength = AttributeStrength.Epic;
    expect(service.getAttackDamageBonus(pre, WeaponCategory.Presence, Level.Three).modifierOfDice.value()).toEqual(5);
    expect(service.getAttackDamageBonus(pre, WeaponCategory.Hybrid, Level.Six).printRoll()).toEqual(6);
  });


  it('should show that a defensive stat does not get a damage bonus', () => {
    Object.keys(WeaponCategory).map(key => {
      expect(service.getAttackDamageBonus(vit, WeaponCategory[key], Level.Six).modifierOfDice.value()).toEqual(0);
    });
  });

  // TODO work on implemented getting critical
  // it('should show bonus critical dice for legendary offensive attributes only', () => {
  //   expect(bra.getCritDieBonus(1)).toEqual(1);
  //   expect(attribute.getCritDieBonus(1)).toEqual(0);
  //   expect(vit.getCritDieBonus(1)).toEqual(0);
  //   expect(bra.getCritDieBonus(10)).toEqual(3);
  //   expect(bra.getCritDieBonus(6)).toEqual(2);
  // });
  //
  // it('should be able to show how many bonus hit points it gives', () => {
  //   expect(service.getHitPointBonus(1)).toEqual(12);
  //   expect(vit.getHitPointBonus(10)).toEqual(36);
  //   expect(bra.getHitPointBonus(10)).toEqual(0);
  //   expect(qu.getHitPointBonus(1)).toEqual(5);
  //   expect(sd.getHitPointBonus(1)).toEqual(4);
  //   expect(int.getHitPointBonus(1)).toEqual(0);
  // });
  //
  // it('should be able to show how many bonus thp an attribute has', () => {
  //   expect(int.getTemporaryHitPointBonus(1)).toEqual(5);
  //   expect(int.getTemporaryHitPointBonus(10)).toEqual(15);
  //   expect(qu.getTemporaryHitPointBonus(1)).toEqual(0);
  //   expect(bra.getTemporaryHitPointBonus(1)).toEqual(0);
  // });
  //
  // it('should be able to get bonus recoveries', () => {
  //   expect(vit.getRecoveryBonus()).toEqual(1);
  //   expect(qu.getRecoveryBonus()).toEqual(0);
  // });
  //
  // it('should be able to get bonus initiative', () => {
  //   expect(qu.getInitiativeBonus()).toEqual(10);
  //   expect(int.getInitiativeBonus()).toEqual(8);
  //   expect(bra.getInitiativeBonus()).toEqual(0);
  // });

  // it('should be able to get speed bonus', () => {
  //   expect(agi.getSpeedBonus()).toEqual(1);
  //   attribute = makeAttribute(AttributeName.Agility, AttributeStrength.Champion);
  //   expect(attribute.getSpeedBonus()).toEqual(0);
  // });

  // it('should be able to get power point bonus', () => {
  //   expect(rea.getPowerPointBonus()).toEqual(1);
  //   expect(sd.getPowerPointBonus()).toEqual(4);
  //   expect(bra.getPowerPointBonus()).toEqual(0);
  // });

  // it('should be able to get armor bonus', () => {
  //   let armor = new Armor(ArmorType.LightArmor);
  //   expect(bra.getArmorBonus(armor)).toEqual(0);
  //   expect(qu.getArmorBonus(armor)).toEqual(1);
  //   attribute = makeAttribute(AttributeName.Quickness, AttributeStrength.Champion);
  //   expect(attribute.getArmorBonus(armor)).toEqual(0);
  //   expect(sd.getArmorBonus(armor)).toEqual(0);
  //   armor = new Armor(ArmorType.CasterArmor);
  //   expect(sd.getArmorBonus(armor)).toEqual(1);
  // });

  // it('should be reasonable to say that you shoudld get an armor bonus if you are unarmored as well as wearing light armor', function () {
  //   const armor = new Armor(ArmorType.None);
  //   expect(qu.getArmorBonus(armor)).toEqual(1);
  // });

  // it('should be able to get trained skill bonus', () => {
  //   expect(bra.getTrainedSkillBonus()).toEqual(0);
  //   expect(qu.getTrainedSkillBonus()).toEqual(2);
  //   expect(vit.getTrainedSkillBonus()).toEqual(2);
  //   expect(sd.getTrainedSkillBonus()).toEqual(2);
  //   attribute = makeAttribute(AttributeName.Quickness, AttributeStrength.Champion);
  //   expect(attribute.getTrainedSkillBonus()).toEqual(1);
  // });

  function makeAttribute(name?: AttributeName): AttributeModel {
    if (!name) {
      name = AttributeName.Brawn;
    }
    return service.getNewAttribute(name, AttributeStrength.Legendary);
  }
});
