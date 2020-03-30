import {ThemeStrength} from "./theme-strength.enum";
import {ThemeType} from "./theme-type.enum";

export class ThemePoint {
  constructor(private type: ThemeType, private strength: ThemeStrength = ThemeStrength.None) {
    this.setStrength(strength);
  }

  getType(): ThemeType {
    return this.type;
  }

  getStrength(): ThemeStrength {
    return this.strength;
  }

  setStrength(strength: ThemeStrength) {
    if (this.type === ThemeType.General && strength > ThemeStrength.Minor) {
      this.strength = ThemeStrength.Minor;
    } else {
      this.strength = strength;
    }
  }


}
