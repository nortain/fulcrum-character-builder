export enum FieldType {
  addVal = "addVal", // adds a value
  replaceVal = "replaceVal", // replaces the base value with a replacement value
  preMultiply = "preMultiply", // multiplies numbers with the base/replaced values before added values
  postMultiply = "postMultiply" // multplies numbers after addVal had been added to the base/replaced values
}
