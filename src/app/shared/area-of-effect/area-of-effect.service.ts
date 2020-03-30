import {Injectable} from '@angular/core';
import {AreaOfEffect} from "./area-of-effect";

@Injectable()
export class AreaOfEffectService {

  constructor() {
  }

  displayAOE(aoe: AreaOfEffect): string {
    return aoe.type + " " + aoe.numberOfTargets + " in " + aoe.range;
  }

}
