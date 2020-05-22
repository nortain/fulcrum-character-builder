import {ThemeType} from "../theme-points/theme-type.enum";
import {Field} from "../field/field";
import {AttributeType} from "../attribute/attribute-type.enum";

export class SkillModel {
  themeType: ThemeType;
  attributeType: AttributeType;
  value: Field;
}
