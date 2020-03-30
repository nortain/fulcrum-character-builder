import { TestBed, inject } from '@angular/core/testing';

import { ActionService } from './action.service';
import {ActionType} from "./action-type.enum";

describe('ActionService', () => {
  let actionService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionService]
    });
  });

  beforeEach(inject([ActionService], (svc: ActionService) => {
    actionService = svc;
  }));

  it('should be created', inject([ActionService], (service: ActionService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to convert an action type into a string', () => {
    expect(actionService.getActionAsString(ActionType.Standard)).toEqual("Standard");
  });

});
