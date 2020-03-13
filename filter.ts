type FilterOptions =
  | "Is equal to"
  | "Is not equal to"
  | "Starts with"
  | "Contains"
  | "Does not contain"
  | "Ends with";

type CompareOptions = "And" | "Or";
interface Column {
  id: string;
  category: string;
  name: string
}
type FilterFormValues = {
  filter1By: FilterOptions;
  filter1Value: string;
  filter2By: FilterOptions;
  filter2Value: string;
  compareValue: CompareOptions;
  column?: keyof Column;
};

function op(b1:boolean, operator, b2:boolean) :boolean{
  return operator === "And" ? b1 && b2 : b1 || b2;
}
const filterRows = (
  rows: Column[],
  filterValues: FilterFormValues
): Column[] => {
  let rowsToFilter = rows;
  let column: keyof Column = filterValues.column;

  if (!filterValues.filter1Value) {
    return rowsToFilter;
  }
  const b2 = (x:string, row:Column,op:string):boolean => {
    let b = {
      "Is equal to": function(row) {
        return filterValues.filter2Value
          ? row[column].toLowerCase() ===
              filterValues.filter2Value.toLowerCase()
          : (op==="And"?true :false);
      },
      "Is not equal to": function(row) {
        return filterValues.filter2Value
          ? row[column].toLowerCase() !==
              filterValues.filter2Value.toLowerCase()
          : op==="And"?true :false;
      },
      "Starts with": function(row) {
        return filterValues.filter2Value
          ? row[column]
              .toLowerCase()
              .startsWith(filterValues.filter2Value.toLowerCase())
          : op==="And"?true :false;
      },
      'Contains': function(row) {
        return filterValues.filter2Value
          ? row[column]
              .toLowerCase()
              .includes(filterValues.filter2Value.toLowerCase())
          : op==="And"?true :false;
      },
      "Does not contain": function(row) {
        return filterValues.filter2Value
          ? !row[column]
              .toLowerCase()
              .includes(filterValues.filter2Value.toLowerCase())
          : op==="And"?true :false;
      },
      "Ends with": function(row) {
        return filterValues.filter2Value
          ? row[column]
              .toLowerCase()
              .endsWith(filterValues.filter2Value.toLowerCase())
          : op==="And"?true :false;
      }
    };
    return b[x](row);
  };

  const b1 = (x:string, row:Column):boolean => {
    let b = {
      "Is equal to": function(row) {
        return (
          row[column].toLowerCase() === filterValues.filter1Value.toLowerCase()
        );
      },
      "Is not equal to": function(row) {
        return (
          row[column].toLowerCase() !== filterValues.filter1Value.toLowerCase()
        );
      },
      "Starts with": function(row) {
        return row[column]
          .toLowerCase()
          .startsWith(filterValues.filter1Value.toLowerCase());
      },
      'Contains': function(row) {
        return row[column]
          .toLowerCase()
          .includes(filterValues.filter1Value.toLowerCase());
      },
      "Does not contain": function(row) {
        return !row[column]
          .toLowerCase()
          .includes(filterValues.filter1Value.toLowerCase());
      },
      "Ends with": function(row) {
        return row[column]
          .toLowerCase()
          .endsWith(filterValues.filter1Value.toLowerCase());
      }
    };
    return b[x](row);
  };

  return rowsToFilter.filter(row =>
     op(
      b1(filterValues.filter1By, row),
      filterValues.compareValue,
      b2(filterValues.filter2By, row,filterValues.compareValue)
    )
  );
};

module.exports = filterRows;
