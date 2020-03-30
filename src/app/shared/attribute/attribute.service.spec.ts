import {TestBed, inject} from '@angular/core/testing';

import {AttributeService} from './attribute.service';
import {AttributeName} from "./attribute-name.enum";
import {AttributeStrength} from "./attribute-strength.enum";

describe('AttributeService', () => {
  let attributeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttributeService]
    });
  });

  beforeEach(inject([AttributeService], (svc: AttributeService) => {
    attributeService = svc;
  }));

  it('should be created', inject([AttributeService], (service: AttributeService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to get all enums as an array', function () {
    const attributes = AttributeName;
    expect(attributeService.getEnumAsArrayOfStrings(attributes, true).length).toBe(8);
    expect(attributeService.getEnumAsArrayOfStrings(AttributeStrength).length).toBe(5);
    expect(attributeService.getEnumAsArrayOfStrings(AttributeStrength)[4]).toBe(AttributeStrength[4]);
  });

  it('should be able to get a colleciton of dropdown values from a standard enum', function () {
    const result = attributeService.getArrayOfDropdownValueObjectsFromEnum(AttributeStrength);
    expect(result.length).toBe(5);
    expect(result[3].value).toEqual(3);
    expect(result[3].label).toEqual("Epic");

  });

  it('should be able to format the value for attributes', () => {
    const result = attributeService.getArrayOfDropdownValueObjectsFromEnum(AttributeStrength, true);
    expect(result[0].label).toBe("Normal (0)");
  });

  it('should be able to get the theme point strength', () => {
    const result = attributeService.getThemePointStrength(false, 0);
    expect(result.length).toBe(4);
  });

  it('should be able to get theme point strength when 2 values assigned to other themes', () => {
    const result = attributeService.getThemePointStrength(false, 2);
    expect(result.length).toBe(3);
  });

  it('should always return a non-empty array when getting the theme points strength', () => {
    const result = attributeService.getThemePointStrength(false, 4);
    expect(result.length).toBe(1);
  });

  it('should return a length of 3 when getting the strength of the general theme if 2 points are assigned else where', () => {
    const result = attributeService.getThemePointStrength(true, 3);
    expect(result.length).toBe(2);
  });

  it('should be able to build an array as a dropdown array', () => {
    const testInput = ["a", "b", "c"];
    const output = attributeService.buildArrayAsDropdownArray(testInput);
    expect(output.length).toEqual(3);
    expect(output[0].value).toBe("a");
  });

});
