import { ThemePoint } from './theme-point';
import {ThemeType} from "./theme-type.enum";
import {ThemeStrength} from "./theme-strength.enum";

describe('test the ThemePoint class', () => {
  it('should create an instance', () => {
    expect(new ThemePoint(ThemeType.Magic)).toBeTruthy();
  });

  it('should be able to get the strength of a theme point', () => {
    let tp = new ThemePoint(ThemeType.Combat);
    expect(tp.getStrength()).toEqual(ThemeStrength.None);
    tp = new ThemePoint(ThemeType.Magic, ThemeStrength.Greater);
    expect(tp.getStrength()).toEqual(ThemeStrength.Greater);
    tp = new ThemePoint(ThemeType.General, ThemeStrength.Greater);
    expect(tp.getStrength()).toEqual(ThemeStrength.Minor);
  });

  it('should be able to get the type', () => {
    const tp = new ThemePoint(ThemeType.Stealth);
    expect(tp.getType()).toEqual(ThemeType.Stealth);
  });

  it('should be able to set a new strength', () => {
    const tp = new ThemePoint(ThemeType.Magic);
    tp.setStrength(ThemeStrength.Greater);
    expect(tp.getStrength()).toEqual(ThemeStrength.Greater);
  });
});
