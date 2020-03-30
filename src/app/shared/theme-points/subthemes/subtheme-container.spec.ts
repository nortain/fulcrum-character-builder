import {SubthemeContainer} from './subtheme-container';
import {mockThemePoints} from "../../constants/testing-constants";
import {Subtheme} from "./subtheme";
import {SubthemeType} from "./subtheme-types.enum";
import {ThemeStrength} from "../theme-strength.enum";
import {ThemePointsContainer} from "../theme-points-container";
import {getSubthemeObject} from "../../constants/subtheme/subtheme-constants";


describe('SubthemeContainer', () => {
  let st;
  beforeEach(() => {
    st = new SubthemeContainer(mockThemePoints());
  });
  it('should create an instance', () => {
    expect(new SubthemeContainer(mockThemePoints())).toBeTruthy();
  });

  it('should be able to get available subthemes', () => {
    expect(st.getAvailableSubthemePoints("combat")).toEqual(1);
    st.combat = [new Subtheme(SubthemeType.Juggernaut, ThemeStrength.Minor)];
    expect(st.getAvailableSubthemePoints("combat")).toEqual(0);
    expect(st.getAvailableSubthemePoints("stealth")).toEqual(1);
    st.stealth = [new Subtheme(SubthemeType.Riposte, ThemeStrength.Greater)];
    expect(st.getAvailableSubthemePoints("stealth")).toEqual(-1);
    expect(st.getAvailableSubthemePoints("magic")).toEqual(1);
    st.magic = new Subtheme(SubthemeType.Magent, ThemeStrength.Minor);
    expect(st.getAvailableSubthemePoints("magic")).toEqual(0);

  });

  it('should be able to get the subthemeStrengh of all assigned combat themes', () => {
    st.combat = [new Subtheme(SubthemeType.WeaponSpecialization, ThemeStrength.Minor)];
    expect(st.getSubthemeStrength("combat")).toEqual(ThemeStrength.Minor);
    st.combat = [new Subtheme(SubthemeType.WeaponSpecialization, ThemeStrength.Minor),
      new Subtheme(SubthemeType.Protector, ThemeStrength.Greater)];
    expect(st.getSubthemeStrength("combat")).toEqual(ThemeStrength.Greater);
  });

  it('should be able to assign subthemes', () => {
    const sub = new Subtheme(SubthemeType.Evasion, ThemeStrength.Minor);
    st.assignSubtheme(sub);
    expect(st.getSubthemeStrength("stealth")).toEqual(ThemeStrength.Minor);
  });

  it('should not be able to assign more subtheme strength than available theme points', () => {
    const ele = new Subtheme(SubthemeType.Elementalist, ThemeStrength.Greater);
    const ward = new Subtheme(SubthemeType.SpellWarden, ThemeStrength.Minor);
    st.assignSubtheme(ele);
    expect(st.getSubthemeStrength("magic")).toEqual(0);
    st.assignSubtheme(ward);
    expect(st.getSubthemeStrength("magic")).toEqual(1);
  });

  it('should be able to assign the same subtheme twice and have the first be replaced by the 2nd', () => {
    const pro = new Subtheme(SubthemeType.Protector, ThemeStrength.Minor);
    const pro2 = new Subtheme(SubthemeType.Protector, ThemeStrength.Lesser);
    st = new SubthemeContainer(new ThemePointsContainer(3, 0, 0, 1));
    st.assignSubtheme(pro);
    st.assignSubtheme(pro2);
    expect(st.getSubthemeStrength("combat")).toEqual(2);
  });

  it('shoudld be able to assign the same magic subtheme and have the first value replaced by the second', () => {
    const magent = new Subtheme(SubthemeType.Magent, ThemeStrength.Minor);
    const warden = new Subtheme(SubthemeType.SpellWarden, ThemeStrength.Minor);
    st.assignSubtheme(magent);
    expect(st.getSubthemeStrength("magic")).toEqual(1);
    st.assignSubtheme(warden);
    expect(st.getSubthemeStrength("magic")).toEqual(1);
    expect(st.magic).toEqual(warden);
  });

  it('should be able to build a subtheme object correctly', () => {
    const so = st.buildSubthemeObject();
    const mock = getSubthemeObject(1);
    expect(so.combat).toEqual(mock.combat);
    expect(so.stealth).toEqual(mock.stealth);
    expect(so.magic).toEqual(mock.magic);
  });

  it('should be able ot build a sub theme object for various inputs', () => {
    st = new SubthemeContainer(new ThemePointsContainer(2, 0, 2, 0));
    const mock = getSubthemeObject(2);
    let so = st.buildSubthemeObject();
    expect(so.combat).toEqual(mock.combat);
    expect(so.stealth.length).toEqual(0);
    expect(so.magic).toEqual(mock.magic);

    st = new SubthemeContainer(new ThemePointsContainer(3, 0, 0, 1));
    const pro = new Subtheme(SubthemeType.Protector, ThemeStrength.Lesser);
    st.assignSubtheme(pro);
    const newSo = st.buildSubthemeObject();
    expect(newSo).toEqual({
      combat: [so.combat[0], pro, so.combat[2]],
      stealth: [],
      magic: []
    });

    st = new SubthemeContainer(new ThemePointsContainer(1, 2, 0, 1));
    so = st.buildSubthemeObject();
    const prot_minor = new Subtheme(SubthemeType.Protector, ThemeStrength.Minor);
    const ripo_minor = new Subtheme(SubthemeType.Riposte, ThemeStrength.Minor);
    st.assignSubtheme(prot_minor);
    st.assignSubtheme(ripo_minor);
    const newerSo = st.buildSubthemeObject();
    expect(newerSo).toEqual({
      combat: [so.combat[0], prot_minor, so.combat[2]],
      stealth: [so.stealth[0], ripo_minor, so.stealth[2]],
      magic: []
    });
  });

});
