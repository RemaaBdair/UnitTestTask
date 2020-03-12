let filterRowss = require("../filter.ts");
const col1: Column = {
  id: "red",
  category: "cat1",
  name: "col1"
};
const col2: Column = {
  id: "blue",
  category: "cat1",
  name: "col2"
};

describe("filter", () => {
  test("should expect empty array when an empty array is passed", () => {
    let fv: FilterFormValues = {
      filter1By: undefined,
      filter1Value: "red",
      filter2By: "Is equal to",
      filter2Value: "red",
      compareValue: "Or"
    };
    expect(filterRowss([], fv)).toStrictEqual([]);
  });

  test("should expect same rows parameter when no filter1Value of filterValues", () => {
    let fv: FilterFormValues = {
      filter1By: undefined,
      filter1Value: "red",
      filter2By: "Is equal to",
      filter2Value: "red",
      compareValue: "Or"
    };
    expect(filterRowss([col1, col2], fv)).toStrictEqual([col1, col2]);
  });
  test("should expect [] when filter1By= is equal to and filter2by= is equal to and compareValue is And with different filterValues", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Is equal to",
      filter2Value: "blue",
      compareValue: "And",
    column:'id'
      };
    expect(filterRowss([col1, col2], fv)).toStrictEqual([]);
  });
  test("should expect [col1,col2] when filter1By= is equal to and filter2by= is equal to and compareValue is Or with different filterValues", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Is equal to",
      filter2Value: "blue",
      compareValue: "Or",
    column:'id'
      };
    expect(filterRowss([col1, col2], fv)).toStrictEqual([col1,col2]);
  });
  test("should expect [] when filter1By= is equal to and filter2by= is equal to and compareValue is And with no filter2Value", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Is equal to",
      filter2Value: undefined,
      compareValue: "And",
    column:'id'
      };
    expect(filterRowss([col1, col2], fv)).toStrictEqual([col1]);
  });/** */
 
  
});


