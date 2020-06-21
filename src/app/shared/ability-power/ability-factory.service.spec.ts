import {TestBed} from '@angular/core/testing';

import {AbilityFactoryService} from './ability-factory.service';
import {AbilityType} from "./ability-type.enum";
import {AbilityBonus} from "./ability-bonus.enum";
import {AbilityModel, IAbilityBonus} from "./ability-model";
import {Level} from "../character/level.enum";
import {PhysicalDefenseFactoryService} from "../character/physical-defense/physical-defense-factory.service";
import {AttributeStrength} from "../attribute/attribute-enums/attribute-strength.enum";
import {TalentStrength} from "./talent/talent-strength.enum";
import {ActionType} from "../action/action-type.enum";

describe('AbilityFactoryService', () => {
  let service: AbilityFactoryService;
  let defenseService: PhysicalDefenseFactoryService;
  let simpleTalent: AbilityModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbilityFactoryService);
    defenseService = TestBed.inject(PhysicalDefenseFactoryService);
    simpleTalent = getSimpleTalent();

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


  // TODO write tests around doing things with complex talent
  it('should be get a talent that allows your MD to become your AD', () => {

  });


  function getSimpleTalent(): AbilityModel {
    return service.getNewAbility("Healing Specialization", AbilityType.Talent,
      ActionType.Passive,
      [{requirementType: AbilityBonus.Universal, requirementValue: TalentStrength.Lesser}], {
        briefDescription: "Increase the amount of Healing granted by actions with the healing keyword by $Healing.",
        fullDescription: "Increase the amount of Healing granted by actions with the healing keyword by 1.  Increase by 1 at level 6."
      }, [{bonusType: AbilityBonus.Healing, value: {minBonus: 1, maxBonus: 2}}]);
  }

  function getComplexTalent(): AbilityModel {
    const activeAbility =
      {
        ...new AbilityModel(),
        name: "Deflection",
        abilityType: AbilityType.Ability,
        abilityAction: ActionType.Free,
        abilityCost: null,
        abilityDescription: {
          briefDescription: "Reduce the damage of an attack against AD by $DamageResist.  If the attack is a burst or range attack the reduction becomes  $DamageResist",
          fullDescription: "Reduce the damage of an attack against AD by 4 + level / 3.  If the attack is a burst or range attack the reduction becomes  5 + level / 2"
        },
        mechanicalBonus: [
          {bonusType: AbilityBonus.DamageResist, value: {minBonus: 4, maxBonus: 7}},
          {bonusType: AbilityBonus.DamageResist, value: {minBonus: 5, maxBonus: 10}}
        ]
      } as AbilityModel;


    const complexAbility = service.getNewAbility(
      "Missile Parry",
      AbilityType.Talent,
      ActionType.Passive,
      [{requirementType: AbilityBonus.Combat, requirementValue: TalentStrength.Greater}],
      {
        briefDescription: "Your MD becomes your AD. Increase your critical resistance by $CriticalResist.  Gain the ability Deflection",
        fullDescription: "Your MD becomes your AD. Increase your critical resistance by 1.  Increase this bonus to 2 at level 6.  Gain the ability Deflection.\n" +
          "Deflection (Lesser Ability):  Free.  Reduce the damage of an attack against AD by 4 + level / 3.  If the attack is a burst or range attack the reduction becomes  5 + level / 2."
      },
      [{bonusType: AbilityBonus.CriticalResist, value: {minBonus: 1, maxBonus: 2}}],
      [{requirementType: AbilityBonus.Agility, requirementValue: AttributeStrength.Heroic}],
      activeAbility
    );

    return complexAbility;
  }
});
