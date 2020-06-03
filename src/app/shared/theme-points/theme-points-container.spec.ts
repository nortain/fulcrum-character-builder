import {ThemePointsContainer} from "./theme-points-container";
import {ThemeType} from "./theme-type.enum";
import {ThemeStrength} from "./theme-strength.enum";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";
import {Level} from "../character/level.enum";

describe('', () => {
  let thc: ThemePointsContainer;
  beforeEach(() => {
    thc = new ThemePointsContainer();
  });

  it('should be able to make theme points container', () => {
    expect(thc).toBeDefined();
  });

  it('should be able to figure out how many theme points are assigned', () => {
    expect(thc.getTotalThemePoints()).toEqual(0);
    thc.stealth.setStrength(ThemeStrength.Lesser);
    expect(thc.getTotalThemePoints()).toEqual(2);
    thc.general.setStrength(ThemeStrength.Lesser);
    expect(thc.getTotalThemePoints()).toEqual(3);
    expect(thc.getTotalThemePoints(2)).toEqual(1);
  });

  it('should be able to return which magical defense when they are tied', () => {
    expect(thc.getStrongestThemePoints()).toContain(ThemeType.Combat);
    expect(thc.getStrongestThemePoints()).toContain(ThemeType.Stealth);
    expect(thc.getStrongestThemePoints()).toContain(ThemeType.Magic);
    expect(thc.getStrongestThemePoints()).not.toContain(ThemeType.General);
  });

  it('should be able to get the top 2 magic bonus defenses when only 2 are tied', () => {
    thc.magic.setStrength(ThemeStrength.Lesser);
    thc.stealth.setStrength(ThemeStrength.Lesser);
    expect(thc.getStrongestThemePoints()).toContain(ThemeType.Stealth);
    expect(thc.getStrongestThemePoints()).not.toContain(ThemeType.Combat);
  });

  it('should be able to determine which magic bonus has the most strength and therefore gets the bonus magical defense', () => {
    thc.magic.setStrength(ThemeStrength.Minor);
    expect(thc.getStrongestThemePoints()).toContain(ThemeType.Magic);
    expect(thc.getStrongestThemePoints()).not.toContain(ThemeType.Stealth);
  });

  it('should be able to say, given its theme points which magic defense gets a bonus', () => {
    expect(thc.getDefensiveBonus()).toContain(MagicDefenseType.Fortitude);
    expect(thc.getDefensiveBonus()).toContain(MagicDefenseType.Reflex);
    expect(thc.getDefensiveBonus()).toContain(MagicDefenseType.Will);
    thc.magic.setStrength(ThemeStrength.Lesser);
    expect(thc.getDefensiveBonus()).not.toContain(MagicDefenseType.Fortitude);
    expect(thc.getDefensiveBonus()).not.toContain(MagicDefenseType.Reflex);
    expect(thc.getDefensiveBonus()).toContain(MagicDefenseType.Will);
  });

  it('should be able to get other theme points', () => {
    thc.combat.setStrength(ThemeStrength.Minor);
    thc.stealth.setStrength(ThemeStrength.Minor);
    thc.magic.setStrength(ThemeStrength.None);
    expect(thc.getOtherThemePoints("combat")).toEqual(1);
    expect(thc.getOtherThemePoints("magic")).toEqual(2);
    expect(thc.getOtherThemePoints("stealth")).toEqual(1);
  });

  it('should be able to get bonus hit points given a level', () => {
    expect(thc.getHitPointBonus(Level.One)).toEqual(23);
    thc.combat.setStrength(ThemeStrength.Lesser);
    expect(thc.getHitPointBonus(Level.One)).toEqual(27);
    thc.stealth.setStrength(ThemeStrength.Minor);
    expect(thc.getHitPointBonus(Level.One)).toEqual(28);
  });
});
