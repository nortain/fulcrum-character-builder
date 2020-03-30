import {Armor} from "./armor";
import {ArmorType} from "./armor-type.enum";
import {ThemePoint} from "../theme-points/theme-point";
import {ThemeStrength} from "../theme-points/theme-strength.enum";
import {ThemePointsContainer} from "../theme-points/theme-points-container";
import {ThemeType} from "../theme-points/theme-type.enum";

describe('Testing armor class in all of its awesomeness', () => {
  let none, caster, light, medium, heavy: Armor;
  beforeEach(() => {
    none = new Armor(ArmorType.None);
    caster = new Armor(ArmorType.CasterArmor);
    light = new Armor(ArmorType.LightArmor);
    medium = new Armor(ArmorType.MediumArmor);
    heavy = new Armor(ArmorType.HeavyArmor);
  });

  it('should be able to create an armor class', () => {
    expect(none).toBeDefined();
    expect(none).not.toBeNull();
  });

  it('should have a name or default to a name if one is not provided', () => {
    expect(none.name).toBe("None");
    const name = "EPIC ARMOR";
    const epicArmor = new Armor(ArmorType.HeavyArmor, name);
    expect(epicArmor.name).toBe(name);
  });

  it('should be able to get active defense', () => {
    expect(none.getActiveDefense()).toEqual(11);
    expect(heavy.getActiveDefense()).toEqual(14);
  });

  it('should be able to get passive defense', () => {
    expect(none.getPassiveDefense()).toEqual(10);
    expect(heavy.getPassiveDefense()).toEqual(13);
  });

  it('should be able to get critical damage reduction', () => {
    expect(none.getCritReduction()).toEqual(0);
    expect(heavy.getCritReduction()).toEqual(3);
    expect(light.getCritReduction()).toEqual(1);
    expect(medium.getCritReduction()).toEqual(2);
  });

  it('should be able to get max movement', () => {
    expect(none.getMaxMovement().maxMovement).toEqual(10);
    expect(none.getMaxMovement().movementPenalty).toEqual(0);
    expect(heavy.getMaxMovement().maxMovement).toEqual(6);
    expect(light.getMaxMovement().movementPenalty).toEqual(0);
    expect(medium.getMaxMovement().maxMovement).toEqual(7);
  });

  it('should expect to get caster penalties', () => {
    const theme = new ThemePointsContainer(
      ThemeStrength.Greater,
      ThemeStrength.Greater,
      ThemeStrength.Greater,
      ThemeStrength.Greater
    );
    expect(caster.getCasterPenalty(theme)).toEqual(0);
    expect(heavy.getCasterPenalty(theme)).toEqual(6);
    expect(medium.getCasterPenalty(theme)).toEqual(4);
    expect(light.getCasterPenalty(theme)).toEqual(2);
  });

  it('should be able to get the skill penalties', () => {
    expect(caster.getSkillPenalty()).toEqual(0);
    expect(heavy.getSkillPenalty()).toEqual(2);
    expect(medium.getSkillPenalty()).toEqual(1);
  });

  it('should be able to figure out what armors require 3 theme points in magic', () => {
    expect(caster.requiresThreeMagic()).toBeTruthy();
    expect(light.requiresThreeMagic()).toBeFalsy();
    expect(heavy.requiresThreeMagic()).toBeFalsy();
  });

  it('should be able to figure out what armors require training', () => {
    expect(caster.requiresTraining()).toBeFalsy();
    expect(light.requiresTraining()).toBeFalsy();
    expect(heavy.requiresTraining()).toBeTruthy();
  });
});
