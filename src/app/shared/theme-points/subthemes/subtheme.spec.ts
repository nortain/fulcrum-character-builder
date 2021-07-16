import {ThemeStrength} from "../theme-strength.enum";
import {SubthemeType} from "./subtheme-types.enum";
import {Subtheme} from "./subtheme";
import {Level} from "../../character/level.enum";
import {SubthemeBonus} from "./subtheme-bonus.enum";
import {Spell} from "../../spells/spell";

describe('Subtheme', () => {
  let combat, stealth, magic;
  beforeEach(() => {
    combat = new Subtheme(SubthemeType.WeaponSpecialization, ThemeStrength.Minor);
    stealth = new Subtheme(SubthemeType.FindWeakness, ThemeStrength.Minor);
    magic = new Subtheme(SubthemeType.SpellWarden, ThemeStrength.Minor);
  });
  it('should create an instance', () => {
    expect(new Subtheme(SubthemeType.WeaponSpecialization, ThemeStrength.None)).toBeTruthy();
  });

  it('should be able to get themeStrength', () => {
    expect(combat.themeStrength).toEqual(ThemeStrength.Minor);
  });

  it('should limit theme strength to max', () => {
    magic = new Subtheme(SubthemeType.SpellWarden, ThemeStrength.Greater);
    expect(magic.themeStrength).toEqual(ThemeStrength.Minor);
  });

  it('should be able to get unique magic Id and name', () => {
    expect(magic.getSubthemeFormattedName()).toEqual("Spell Warden");
    magic = new Subtheme(SubthemeType.Druid, ThemeStrength.Greater);
    expect(magic.getSubthemeFormattedName()).toEqual("Druid");
  });

  it('should be able to get bonus for weapon specialization', () => {
    expect(combat.getBonus(Level.One, SubthemeBonus.BonusDamage)).toEqual(2);
    combat = new Subtheme(SubthemeType.WeaponSpecialization, ThemeStrength.Greater);
    expect(combat.getBonus(Level.Three, SubthemeBonus.BonusDamage)).toEqual(10);
  });

  it('should be able to get bonus for Find Weakness', () => {
    expect(stealth.getBonus(Level.Two, SubthemeBonus.Agile)).toEqual(5);
    stealth = new Subtheme(SubthemeType.FindWeakness, ThemeStrength.Greater);
    expect(stealth.getBonus(Level.Four, SubthemeBonus.Agile)).toEqual(22);
    stealth = new Subtheme(SubthemeType.FindWeakness, ThemeStrength.Lesser);
    expect(stealth.getBonus(Level.Six, SubthemeBonus.Balanced)).toEqual(15);
  });

  it('should be able to get bonus for protector', () => {
    combat = new Subtheme(SubthemeType.Protector, ThemeStrength.Greater);
    expect(combat.getBonus(Level.Three, SubthemeBonus.ProtectorAura)).toEqual(24);
    expect(combat.getBonus(Level.Five, SubthemeBonus.RecoveryValueBonus)).toEqual(4);
    expect(combat.getBonus(Level.Seven, SubthemeBonus.Thorns)).toEqual(10);
  });

  it('should be able to get bonus for juggernaut', () => {
    combat = new Subtheme(SubthemeType.Juggernaut, ThemeStrength.Greater);
    expect(combat.getBonus(Level.Four, SubthemeBonus.TempHp)).toEqual(5);
    expect(combat.getBonus(Level.Six, SubthemeBonus.DamageResist)).toEqual(2);
  });

  it('should be able to get bonus for Riposte', () => {
    stealth = new Subtheme(SubthemeType.Duelist, ThemeStrength.Greater);
    expect(stealth.getBonus(Level.Five, SubthemeBonus.RiposteAura)).toEqual(16);
    expect(stealth.getBonus(Level.Seven, SubthemeBonus.IsolationDamage)).toEqual(10);
  });

  it('should be able to get bonus for evasion', () => {
    stealth = new Subtheme(SubthemeType.Evasion, ThemeStrength.Lesser);
    expect(stealth.getBonus(Level.Six, SubthemeBonus.ActiveDefense)).toEqual(1);
    expect(stealth.getBonus(Level.Eight, SubthemeBonus.CriticalDamageReduction)).toEqual(3);
  });

  it('should return 0 for a bonus if the wrong optional parameter or none at all is passed in for something that needs it', () => {
    stealth = new Subtheme(SubthemeType.Duelist, ThemeStrength.Lesser);
    expect(stealth.getBonus(Level.Nine, SubthemeBonus.TempHp)).toEqual(0);
    expect(magic.getBonus(Level.Three, SubthemeBonus.ProtectorAura)).toEqual(0);
  });

  it('should find a solution for casters.', () => {
    const spells = magic.getSpellList();
    const result = [{...new Spell()}];
    expect(spells).toEqual(result);
    expect(stealth.getSpellList()).toBeNull();
  });
});
