import { TestBed } from '@angular/core/testing';

import { CharacterFactoryService } from './character-factory.service';

describe('CharacterFactoryService', () => {
  let service: CharacterFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
