import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import type { Year, StatsValues } from "types";
import Diff from "@/components/diff";
import TableSet from "./table-set";
import useHasJ3 from "./useHasJ3";

type TableCellCountProps = {
  statsValues: StatsValues;
  prev: StatsValues | undefined;
};

function TableCellCount({ statsValues, prev }: TableCellCountProps) {
  const totalCount = statsValues.values.filter(({ value }) => value < 0).length;
  const diff = React.useMemo(() => {
    if (!prev) return null;
    const prevTotalCount = prev.values.filter(({ value }) => value < 0).length;
    return (
      <span>
        <Diff>{totalCount - prevTotalCount}</Diff>
        クラブ
      </span>
    );
  }, [totalCount, prev]);

  return (
    <TableCell align="right">
      <strong>{totalCount}クラブ</strong>
      <br />
      {diff}
    </TableCell>
  );
}

type TableMainBSProps = {
  year: Pick<Year, "year" | "stats">;
  prevYear: Pick<Year, "stats"> | null;
};

function TableMainBS({ year, prevYear }: TableMainBSProps) {
  const hasJ3 = useHasJ3(year.stats.J3?.net_worth);
  return (
    <>
      <TableSet
        title="純資産"
        statsKey="net_worth"
        year={year}
        prevYear={prevYear}
      />
      <TableRow>
        <TableCell component="th" scope="row">
          債務超過
        </TableCell>
        <TableCellCount
          statsValues={year.stats.J1.net_worth}
          prev={prevYear?.stats.J1.net_worth}
        />
        <TableCellCount
          statsValues={year.stats.J2.net_worth}
          prev={prevYear?.stats.J2.net_worth}
        />
        {hasJ3 ? (
          <TableCellCount
            statsValues={year.stats.J1.net_worth}
            prev={prevYear?.stats.J1.net_worth}
          />
        ) : null}
      </TableRow>
    </>
  );
}

export default TableMainBS;
