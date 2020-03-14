type FilterOptions = "Is equal to" | "Is not equal to"
  | "Starts with" | "Contains" | "Does not contain"
  | "Ends with";

type CompareOptions = "And" | "Or";
interface Column {
  id: string |Record<string,string>;
  category: string |Record<string,string>;
  name: string | Record<string,string>
}
type FilterFormValues = {
  filter1By: FilterOptions;
  filter1Value: string;
  filter2By: FilterOptions;
  filter2Value: string;
  compareValue: CompareOptions;
  column?: keyof Column | ((elem: Column) => string);
};

function op(b1: boolean, operator, b2: boolean): boolean {
  return operator === "And" ? b1 && b2 : b1 || b2;
}

function propf(prop, row) {
  if (typeof prop === "function") return prop(row);
  else return row[prop];
}
const filterRows = (rows: Column[],filterValues: FilterFormValues): Column[] => {
  let rowsToFilter = rows;
  let prop: keyof Column | ((elem) => string) = filterValues.column;
  if (!filterValues.filter1Value) {
    return rowsToFilter;
  }
  const operand2 = (
    filterBy: FilterOptions,
    row: Column,
    op: string
  ): boolean => {
    let values = {
      "Is equal to": function() {
        return filterValues.filter2Value
          ? propf(prop, row).toLowerCase() ===
              filterValues.filter2Value.toLowerCase()
          : op === "And"? true : false;
      },
      "Is not equal to": function() {
        return filterValues.filter2Value
          ? propf(prop, row).toLowerCase() !==
              filterValues.filter2Value.toLowerCase()
          : op === "And"
          ? true
          : false;
      },
      "Starts with": function() {
        return filterValues.filter2Value
          ? propf(prop, row)
              .toLowerCase()
              .startsWith(filterValues.filter2Value.toLowerCase())
          : op === "And"
          ? true
          : false;
      },
      'Contains': function() {
        return filterValues.filter2Value
          ? propf(prop, row)
              .toLowerCase()
              .includes(filterValues.filter2Value.toLowerCase())
          : op === "And"
          ? true
          : false;
      },
      "Does not contain": function() {
        return filterValues.filter2Value
          ? !propf(prop, row)
              .toLowerCase()
              .includes(filterValues.filter2Value.toLowerCase())
          : op === "And"
          ? true
          : false;
      },
      "Ends with": function() {
        return filterValues.filter2Value
          ? propf(prop, row)
              .toLowerCase()
              .endsWith(filterValues.filter2Value.toLowerCase())
          : op === "And"
          ? true
          : false;
      }
    };
    return values[filterBy]();
  };

  const operand1 = (filterBy: FilterOptions, row: Column): boolean => {
    let values = {
      "Is equal to": function() {
        return (
          propf(prop, row).toLowerCase() ===
          filterValues.filter1Value.toLowerCase()
        );
      },
      "Is not equal to": function() {
        return (
          propf(prop, row).toLowerCase() !==
          filterValues.filter1Value.toLowerCase()
        );
      },
      "Starts with": function() {
        return propf(prop, row)
          .toLowerCase()
          .startsWith(filterValues.filter1Value.toLowerCase());
      },
      'Contains': function() {
        return propf(prop, row)
          .toLowerCase()
          .includes(filterValues.filter1Value.toLowerCase());
      },
      "Does not contain": function() {
        return !propf(prop, row)
          .toLowerCase()
          .includes(filterValues.filter1Value.toLowerCase());
      },
      "Ends with": function() {
        return propf(prop, row)
          .toLowerCase()
          .endsWith(filterValues.filter1Value.toLowerCase());
      }
    };
    return values[filterBy]();
  };

  return rowsToFilter.filter(row =>
    op(
      operand1(filterValues.filter1By, row),
      filterValues.compareValue,
      operand2(filterValues.filter2By, row, filterValues.compareValue)
    )
  );
};

module.exports = filterRows;

