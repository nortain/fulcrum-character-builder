import { TestBed } from '@angular/core/testing';

import { RaceFactoryService } from './race-factory.service';

describe('RaceFactoryService', () => {
  let service: RaceFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaceFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
