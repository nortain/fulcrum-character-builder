import { TestBed, inject } from '@angular/core/testing';

import { AreaOfEffectService } from './area-of-effect.service';
import {mockAreaOfEffect} from "../constants/testing-constants";

describe('AreaOfEffectService', () => {
  let aoeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaOfEffectService]
    });
  });

  beforeEach(inject([AreaOfEffectService], (svc: AreaOfEffectService) => {
    aoeService = svc;
  }));

  it('should be created', inject([AreaOfEffectService], (service: AreaOfEffectService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to display an area of effect', () => {
    const mock = "Zone 2 in 10";
    expect(aoeService.displayAOE(mockAreaOfEffect())).toBe(mock);

  });
});
