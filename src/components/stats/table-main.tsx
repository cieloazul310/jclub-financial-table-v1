import * as React from "react";
import { useAppState } from "@appState/AppStateContext";
import type { Year } from "types";
import TableMainPL from "./pl";
import TableMainBS from "./bs";
import TableMainRevenue from "./revenue";
import TableMainExpense from "./expense";
import TableMainAttd from "./attd";

type TableMainProps = {
  year: Pick<Year, "year" | "stats">;
  prevYear: Pick<Year, "stats"> | null;
};

function TableMain({ year, prevYear }: TableMainProps) {
  const { tab } = useAppState();
  if (tab === "pl") return <TableMainPL year={year} prevYear={prevYear} />;
  if (tab === "bs") return <TableMainBS year={year} prevYear={prevYear} />;
  if (tab === "revenue")
    return <TableMainRevenue year={year} prevYear={prevYear} />;
  if (tab === "expense")
    return <TableMainExpense year={year} prevYear={prevYear} />;
  return <TableMainAttd year={year} prevYear={prevYear} />;
}

export default TableMain;
