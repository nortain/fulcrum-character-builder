import {TestBed} from '@angular/core/testing';
import {AttributeFactoryService} from "./attribute-factory.service";
import {AttributeName} from "./attribute-name.enum";
import {AttributeStrength} from "./attribute-strength.enum";
import {AttributeModel} from "./attribute-model";
import {WeaponCategory} from "../weapon/weapon-category.enum";
import {Level} from "../character/level.enum";


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
    expect(bra.attributeStrength).toEqual(AttributeStrength.Normal);
  });

  // it('should confirm that certain attributes give a skill bonus while others do not', () => {
  //   const vitality = makeAttribute(AttributeName.Vitality, AttributeStrength.Legendary);
  //   expect(vitality.hasSkillBonus()).toBeFalsy();
  // });

  // it('should be able to get skill bonus', () => {
  //   expect(bra.getSkillBonus()).toEqual(0);
  // });

  // it('should be able to get skill bonus heroic brawn', () => {
  //   attribute = makeAttribute(AttributeName.Brawn, AttributeStrength.Heroic);
  //   expect(bra.getSkillBonus()).toEqual(2);
  // });

  // it('should have skill bonus of 4 with legendary brawn but 0 with legendary vitality', () => {
  //   attribute = makeAttribute(AttributeName.Brawn, AttributeStrength.Legendary);
  //   expect(bra.getSkillBonus()).toEqual(4);
  //   attribute = makeAttribute(AttributeName.Vitality, AttributeStrength.Legendary);
  //   expect(bra.getSkillBonus()).toEqual(0);
  // });

  // it('should be able to determine if an attribute is defensive', () => {
  //   expect(bra(MagicDefenseType.Fortitude)).toBeFalsy();
  // });
  //
  // it('should be able to get magic defense for attributes that have magic defense', () => {
  //   attribute = vit;
  //   expect(attribute.getMagicDefense(MagicDefenseType.Fortitude)).toEqual(5);
  //   attribute = int;
  //   expect(attribute.getMagicDefense(MagicDefenseType.Reflex)).toEqual(3);
  // });

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
    expect(service.getAttackDamageBonus(pre, WeaponCategory.Hybrid, Level.Six).modifierOfDice.value()).toEqual(6);
  });
  //
  // it('should be able to determine which attributes are defensive and which are offensive', () => {
  //   expect(vit.hasDamageBonus()).toBeFalsy();
  //   expect(bra.hasDamageBonus()).toBeTruthy();
  // });
  //
  // it('should show that a defensive stat does not get a damage bonus', () => {
  //   expect(vit.hasDamageBonus()).toBeFalsy();
  //   expect(vit.getPrimaryDamage()).toEqual(0);
  //   expect(vit.getSecondaryDamage()).toEqual(0);
  // });
  //
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
    return service.getNewAttribute(name);
  }
});
