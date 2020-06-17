import {TestBed} from '@angular/core/testing';

import {AbilityFactoryService} from './ability-factory.service';
import {AbilityType} from "./ability-type.enum";
import {ValueRange} from "../attribute/attribute-constants/attribute-constants";
import {AbilityBonus} from "./ability-bonus.enum";
import {AbilityModel} from "./ability-model";
import {Level} from "../character/level.enum";

describe('AbilityFactoryService', () => {
  let service: AbilityFactoryService;
  let simpleTalent: AbilityModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbilityFactoryService);
    simpleTalent = service.getNewAbility("Healing Specialization", AbilityType.Talents, {
      briefDescription: "Increase the amount of Healing granted by actions with the healing keyword by $Healing.",
      fullDescription: "Increase the amount of Healing granted by actions with the healing keyword by 1.  Increase by 1 at level 6."
    }, [{bonusType: AbilityBonus.Healing, value: {minBonus: 1, maxBonus: 2}}]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to create an ability', () => {
    expect(simpleTalent).toBeTruthy();
  });

  it('should be able to print out a value with level range based values', () => {
    expect(service.printOutFullDescription(simpleTalent)).toEqual(simpleTalent.abilityDescription.fullDescription);
    let result = service.printOutBriefDescription(simpleTalent, Level.Five);
    expect(result).toBe("Increase the amount of Healing granted by actions with the healing keyword by 1.");
    result = service.printOutBriefDescription(simpleTalent, Level.Six);
    expect(result).toBe("Increase the amount of Healing granted by actions with the healing keyword by 2.");
  });
});
