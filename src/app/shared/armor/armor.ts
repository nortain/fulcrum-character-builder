import {ArmorType} from "./armor-type.enum";
import {
  ACTIVE_DEFENSE, CASTER_PENALTY, CRITICAL_REDUCTION, MAX_MOVEMENT, PASSIVE_DEFENSE, REQUIRES_THREE_MAGIC, REQUIRES_TRAINING,
  SKILL_PENALTY
} from "../constants/constants";
import {MaxMovement} from "./max-movement";
import {ThemePointsContainer} from "../theme-points/theme-points-container";

export class Armor {

  constructor(public type: ArmorType, public name?: string) {
    if (!name) {
      this.name = ArmorType[this.type];
    }
  }

  getActiveDefense(): number {
    return ACTIVE_DEFENSE[this.type];
  }

  getPassiveDefense(): number {
    return PASSIVE_DEFENSE[this.type];
  }

  requiresTraining(): boolean {
    return REQUIRES_TRAINING[this.type];
  }

  requiresThreeMagic(): boolean {
    return REQUIRES_THREE_MAGIC[this.type];
  }

  getCritReduction(): number {
    return CRITICAL_REDUCTION[this.type];
  }

  /**
   * returns the number of power points the wearer of this armor would lose, if any
   * */
  getCasterPenalty(themePoints: ThemePointsContainer): number {
    let penValue = themePoints.magic.getStrength() - CASTER_PENALTY[this.type];
    if (penValue > 0) {
      penValue *= 2;
    } else {
      penValue = 0;
    }
    return penValue;
  }

  getSkillPenalty(): number {
    return SKILL_PENALTY[this.type];
  }

  getMaxMovement(): MaxMovement {
    return MAX_MOVEMENT[this.type];
  }

  getTemporaryHitPoints(): number {
    const thp = this.type - 1;
    return thp < 0 ? 0 : thp;
  }
}
