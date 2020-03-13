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
  test("should expect [col1] when filter1By= is equal to and filter2by= is equal to and compareValue is And with no filter2Value", () => {
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
  test("should expect [col1] when filter1By= is equal to and filter2by= is equal to and compareValue is Or with no filter2Value", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Is equal to",
      filter2Value: undefined,
      compareValue: "Or",
    column:'id'
      };
    expect(filterRowss([col1, col2], fv)).toStrictEqual([col1]);
  });/**+1 */
  test("should expect [] when filter1By= is equal to and filter2by= is not equal to and compareValue is And with same filterValues", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Is not equal to",
      filter2Value: "red",
      compareValue: "And",
    column:'id'
      };
    expect(filterRowss([col1, col2], fv)).toStrictEqual([]);
  });
  test("should expect [col1,col2] when filter1By= is equal to and filter2by= is not equal to and compareValue is Or with same filterValues", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Is not equal to",
      filter2Value: "red",
      compareValue: "Or",
    column:'id'
      };
    expect(filterRowss([col1, col2], fv)).toStrictEqual([col1,col2]);
  });
  test("should expect [col1] when filter1By= is equal to and filter2by= Starts with and compareValue is And", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Starts with",
      filter2Value: "r",
      compareValue: "And",
    column:'id'
      };
    expect(filterRowss([col1,col2], fv)).toStrictEqual([col1]);
  });
  test("should expect [col1,col2] when filter1By= is equal to and filter2by= Starts with and compareValue is Or", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Starts with",
      filter2Value: "b",
      compareValue: "Or",
    column:'id'
      };
    expect(filterRowss([col1,col2], fv)).toStrictEqual([col1,col2]);
  });
  test("should expect [] when filter1By= is equal to and filter2by= Contains and compareValue is And", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Contains",
      filter2Value: "b",
      compareValue: "And",
    column:'id'
      };
    expect(filterRowss([col1,col2], fv)).toStrictEqual([]);
  });
  test("should expect [col1,col2] when filter1By= is equal to and filter2by= Contains and compareValue is Or", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Contains",
      filter2Value: "b",
      compareValue: "Or",
    column:'id'
      };
    expect(filterRowss([col1,col2], fv)).toStrictEqual([col1,col2]);
  });
  test("should expect [col1] when filter1By= is equal to and filter2by= Does not contain and compareValue is And", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Does not contain",
      filter2Value: "b",
      compareValue: "And",
    column:'id'
      };
    expect(filterRowss([col1,col2], fv)).toStrictEqual([col1]);
  });
  test("should expect [col1,col2] when filter1By= is equal to and filter2by= Does not contains and compareValue is Or", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Does not contain",
      filter2Value: "r",
      compareValue: "Or",
    column:'id'
      };
    expect(filterRowss([col1,col2], fv)).toStrictEqual([col1,col2]);
  });
  test("should expect [col1] when filter1By= is equal to and filter2by= Ends with and compareValue is And", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Ends with",
      filter2Value: "d",
      compareValue: "And",
    column:'id'
      };
    expect(filterRowss([col1,col2], fv)).toStrictEqual([col1]);
  });
  test("should expect [col1,col2] when filter1By= is equal to and filter2by= Ends with and compareValue is Or", () => {
    let fv: FilterFormValues = {
      filter1By: "Is equal to",
      filter1Value: "red",
      filter2By: "Ends with",
      filter2Value: "e",
      compareValue: "Or",
    column:'id'
      };
    expect(filterRowss([col1,col2], fv)).toStrictEqual([col1,col2]);
  });
  test("should expect [col2] when filter1By= Is not equal to and filter2by= is equal to and compareValue is And with different filterValues", () => {
    let fv: FilterFormValues = {
      filter1By: "Is not equal to",
      filter1Value: "red",
      filter2By: "Is equal to",
      filter2Value: "blue",
      compareValue: "And",
    column:'id'
      };
    expect(filterRowss([col1, col2], fv)).toStrictEqual([col2]);
  });
  test("should expect [col2] when filter1By= Is not equal to and filter2by= is equal to and compareValue is Or with different filterValues", () => {
    let fv: FilterFormValues = {
      filter1By: "Is not equal to",
      filter1Value: "red",
      filter2By: "Is equal to",
      filter2Value: "blue",
      compareValue: "Or",
    column:'id'
      };
    expect(filterRowss([col1, col2], fv)).toStrictEqual([col2]);
  });
  test("should expect [col2] when filter1By= Is not equal to and filter2by= is equal to and compareValue is And with no filter2Value", () => {
    let fv: FilterFormValues = {
      filter1By: "Is not equal to",
      filter1Value: "red",
      filter2By: "Is equal to",
      filter2Value: undefined,
      compareValue: "And",
    column:'id'
      };
    expect(filterRowss([col1, col2], fv)).toStrictEqual([col2]);
  });/** */
});


