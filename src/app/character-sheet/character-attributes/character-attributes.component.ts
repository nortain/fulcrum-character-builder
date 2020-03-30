import {Component, OnInit} from '@angular/core';
import {AttributeName} from "../../shared/attribute/attribute-name.enum";
import {AttributeStrength} from "../../shared/attribute/attribute-strength.enum";
import {DropdownValueObject} from "../../shared/ui/dropdown/dropdown-value-object";
import {AttributeService} from "../../shared/attribute/attribute.service";

@Component({
  selector: 'fulcrum-character-attributes',
  templateUrl: './character-attributes.component.html',
  styleUrls: ['./character-attributes.component.css']
})
export class CharacterAttributesComponent implements OnInit {
  attributes: string[];
  attributeStrength: DropdownValueObject[];
  constructor(private attributeService: AttributeService) {
  }

  ngOnInit() {
    this.attributeStrength = this.attributeService.getArrayOfDropdownValueObjectsFromEnum(AttributeStrength, true);
    this.attributes = this.attributeService.getEnumAsArrayOfStrings(AttributeName, true);
  }

}
