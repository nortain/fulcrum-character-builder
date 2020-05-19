import {AttributeModel} from "./attribute-model";
import {AttributeName} from "../../attribute/attribute-name.enum";
import {AttributeType} from "../../attribute/attribute-type.enum";

export function getVitality(): AttributeModel {
  return {
    ...new AttributeModel(),
    attributeName: AttributeName.Vitality,
    attributeType: AttributeType.PhysicalDefensive,

  };
}
