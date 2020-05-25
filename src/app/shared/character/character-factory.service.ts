import {Injectable} from '@angular/core';
import {CharacterModel} from "./character-model";
import {AttributeFactoryService} from "../attribute/attribute-factory.service";
import {Field} from "../field/field";

@Injectable({
  providedIn: 'root'
})
export class CharacterFactoryService {

  constructor(private attributeFactoryService: AttributeFactoryService) {
  }

  initializeCharacter(): CharacterModel {
    const character: CharacterModel = {
      ...new CharacterModel(),
      attributes: this.attributeFactoryService.initializeAllAttributes()
    };
    return character;
  }
}
