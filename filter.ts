type FilterOptions =
  | "Is equal to"
  | "Is not equal to"
  | "Starts with"
  | "Contains"
  | "Does not contain"
  | "Ends with";

type CompareOptions = "And" | "Or";
interface Column<T> {
  id: T;
  category: T;
  name: T;
}
type FilterFormValues = {
  filter1By: FilterOptions;
  filter1Value: string;
  filter2By: FilterOptions;
  filter2Value: string;
  compareValue: CompareOptions;
  column?: string | ((elem) => string);
};

function op(b1: boolean, operator, b2: boolean): boolean {
  return operator === "And" ? b1 && b2 : b1 || b2;
}

function propf(prop, row) {
  if (typeof prop === "function") return prop(row);
  else return row[prop];
}
function filterRows<T>(
  rows: Column<T>[],
  filterValues: FilterFormValues
): Column<T>[] {
  let rowsToFilter = rows;
  let prop: string | ((elem) => string) = filterValues.column;
  if (!filterValues.filter1Value) {
    return rowsToFilter;
  }
  const operand = (
    filterBy: FilterOptions,
    filterValue: string,
    row: Column<T>,
    op?: string
  ): boolean => {
    let values = {
      "Is equal to": function() {
        return filterValue
          ? propf(prop, row).toLowerCase() === filterValue.toLowerCase()
          : op === "And"
          ? true
          : false;
      },
      "Is not equal to": function() {
        return filterValue
          ? propf(prop, row).toLowerCase() !== filterValue.toLowerCase()
          : op === "And"
          ? true
          : false;
      },
      "Starts with": function() {
        return filterValue
          ? propf(prop, row)
              .toLowerCase()
              .startsWith(filterValue.toLowerCase())
          : op === "And"
          ? true
          : false;
      },
      Contains: function() {
        return filterValue
          ? propf(prop, row)
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          : op === "And"
          ? true
          : false;
      },
      "Does not contain": function() {
        return filterValue
          ? !propf(prop, row)
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          : op === "And"
          ? true
          : false;
      },
      "Ends with": function() {
        return filterValue
          ? propf(prop, row)
              .toLowerCase()
              .endsWith(filterValue.toLowerCase())
          : op === "And"
          ? true
          : false;
      }
    };
    if(typeof propf(prop, row) ==='string')
    return values[filterBy]();
    else
    return false
  };

  return rowsToFilter.filter(row =>
    op(
      operand(filterValues.filter1By, filterValues.filter1Value, row),
      filterValues.compareValue,
      operand(
        filterValues.filter2By,
        filterValues.filter2Value,
        row,
        filterValues.compareValue
      )
    )
  );
}

module.exports = filterRows;
