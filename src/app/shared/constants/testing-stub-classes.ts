import {STARTING_MOVEMENT} from "./constants";
import {mockCharacter} from "./testing-constants";
import {RaceType} from "../character/race/race-type.enum";

export class CharacterFactoryServiceStub {
  getSpeed() {
    return STARTING_MOVEMENT;
  }

  getNewCharacter(name?: string, race?: RaceType) {
    return mockCharacter(name, race);
  }
}

export class AttributeFactoryServiceStub {

}

export class RaceFactoryServiceStub {

}
