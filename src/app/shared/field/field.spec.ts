import {Field} from './field';
import {Precision} from "./precision.enum";
import {FieldType} from "./field-type.enum";

/**Example usage of fields:
  let f = new Field(3);
  f.value() //3
  f.addVal["sword"] = 4;
  f.value() // 3 + 4 = 7
  f.preMultiply["skills"] = 2;
  f.value() // 3 * 2 + 4 = 10
  f.replaceVal["sword"] = 10;
  f.value() // 3 * 2 + 10 = 16
  */
describe('Field', () => {
  let ff;
  beforeEach(() => {
    ff = Field;
  });

  it('should create an instance', () => {
    expect(new Field(0)).toBeTruthy();
  });

  it('testing construction of the field class', function () {
    const item = new ff();
    expect(item).toBeDefined();
  });

  it('should be able to replace an existing value', function () {
    const weapon = new ff(2);
    weapon.addVal['madSkillz'] = 3;
    expect(weapon.value()).toEqual(5);
    weapon.replaceVal['madSkillz'] = 8;
    expect(weapon.value()).toEqual(11);
  });

  it('should sum two values together and equal the correct result', function () {
    const weaponBonus = new ff(0);
    weaponBonus.addVal['skill'] = 3;
    weaponBonus.addVal['talent'] = 3;
    expect(weaponBonus.value()).toEqual(6);
    weaponBonus.replaceVal['buff'] = 1;
    expect(weaponBonus.value()).toEqual(7);
    weaponBonus.replaceVal['buff'] = -1;
    expect(weaponBonus.value()).toEqual(5);
  });

  it('should multiple numbers before adding them... whatever that means', function () {
    let attackBonus = new ff(0);
    attackBonus.preMultiply['stud'] = 3;
    attackBonus.addVal['regularAttack'] = 2;
    expect(attackBonus.value()).toEqual(2);
    attackBonus = new ff(3);
    attackBonus.preMultiply['score'] = 3;
    expect(attackBonus.value()).toEqual(9);
  });

  it('should multiple numbers after adding them', function () {
    const bonus = new ff(2);
    bonus.postMultiply['swordSkill'] = 2;
    bonus.addVal['strength'] = 6;
    bonus.addVal['race'] = 2;
    expect(bonus.value()).toEqual(20);
  });

  it('should remember if a value was intended to be multipled or added', function () {
    const bonus = new ff(3);
    bonus.preMultiply['missile'] = 2;
    bonus.addVal['fast'] = 3;
    bonus.replaceVal['missile'] = 3;
    expect(bonus.value()).toEqual(9);
    bonus.preMultiply['missile'] = 3;
    expect(bonus.value()).toEqual(12);
  });

  it('should use half multiple to multiply numbers by 1/2 the given number', function () {
    const bonus = new ff(3);
    bonus.postMultiply["sword"] = 3;
    bonus.addVal["cloak"] = 5;
    expect(bonus.value()).toEqual(24);

  });

  it('should be able to return a value with varying degrees of precision', function () {
    const bonus = new ff(50.565);
    expect(bonus.value(0, Precision.OneHalf)).toEqual(50.5);
    expect(bonus.value(0, Precision.OneFourth)).toEqual(50.5);
    expect(bonus.value(0, Precision.Percentile)).toEqual(50.56);
    bonus.addVal['cool'] = 10.5;
    expect(bonus.value()).toEqual(61);

  });

  it('should be able to get a value for just a specific category... hopefully', function () {
    const bonus = new ff(0);
    bonus.addVal["item"] = 3;
    expect(bonus.addVal["item"]).toBe(3);
  });

  it('should prove that filters work', function () {
    const bonus = new ff(3);
    bonus.addVal['ui'] = 4;
    bonus.addVal['sword'] = 6;
    expect(bonus.value('ui')).toEqual(3 + 4);

    bonus.replaceVal['ui'] = 10;

    expect(bonus.value('ui')).toEqual(10 + 4); // seems confusing as hell, this changes the original variable value without affecting any other addVal or things... but whatever

    bonus.preMultiply['ninja'] = 2;
    expect(bonus.value('ninja')).toEqual(6);

    bonus.postMultiply['two'] = 8;
    expect(bonus.value('two')).toEqual(24);


  });

  it('should be able to detect ui changes when they are made by the ui', function () {
    const bonus = new ff(10);
    bonus.addVal['item1'] = 8;
    bonus.addVal['item1'] = 4; // overwrite the previous addVal, works
    expect(bonus.value()).toEqual(14);

    bonus.addVal['ui'] = 14;
    expect(bonus.isDifferentFrom('ui')).toBeTruthy();

    bonus.addVal['ui'] = 0;
    expect(bonus.isDifferentFrom('ui')).toBeFalsy();
  });

  it('should be able to clearField out a property, cause like that\'s important for resetting shit', function () {
    const item: Field = new ff(3);
    expect(item.value()).toEqual(3);
    item.addVal['crap'] = 4;
    expect(item.value()).toEqual(7);
    item.preMultiply['moreCrap'] = 5;
    expect(item.value()).toEqual(19);
    item.clearField(FieldType.addVal);
    expect(item.value()).toEqual(15);
  });

  it('should be able to clearField all properties', function () {
    const item = new ff(3);
    item.addVal['crap'] = 2;
    item.replaceVal['stuff'] = 5;
    item.preMultiply['uber'] = 4;
    item.postMultiply['i am cool'] = 12;
    expect(item.value()).toEqual(264);
    item.clearAll();
    expect(item.value()).toEqual(3);
  });

  it('shoudld be able to handle strings... maybe', function () {
    const item = new ff("bob");
    expect(item.baseValue).toBe("bob");
    item.defaultValue = "bobmoe";
    expect(item.defaultValue).toBe("bobmoe");
    expect(item.value()).toBe("bob");
  });


});
