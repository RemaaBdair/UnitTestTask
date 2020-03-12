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

});
