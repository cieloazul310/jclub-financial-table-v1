import * as React from "react";
import type { Year } from "types";
import TableSet from "./table-set";

type TableMainExpenseProps = {
  year: Pick<Year, "year" | "stats">;
  prevYear: Pick<Year, "stats"> | null;
};

function TableMainExpense({ year, prevYear }: TableMainExpenseProps) {
  return (
    <>
      <TableSet
        title="営業費用"
        statsKey="expense"
        year={year}
        prevYear={prevYear}
      />
      <TableSet
        title="チーム人件費"
        statsKey="salary"
        year={year}
        prevYear={prevYear}
      />
    </>
  );
}

export default TableMainExpense;
