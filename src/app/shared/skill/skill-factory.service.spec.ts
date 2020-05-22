import { TestBed } from '@angular/core/testing';

import { SkillFactoryService } from './skill-factory.service';

describe('SkillFactoryService', () => {
  let service: SkillFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
