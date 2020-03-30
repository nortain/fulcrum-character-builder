import { Injectable } from '@angular/core';
import {ActionType} from "./action-type.enum";

@Injectable()
export class ActionService {

  constructor() { }


  getActionAsString(actionType: ActionType): string {
    return ActionType[actionType];
  }

}
