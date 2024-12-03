import * as React from "react";
import TableRow, { TableRowProps } from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import Diff from "./diff";

type SummaryTableRowProps = Omit<TableRowProps, "children"> & {
  label: string;
  val: number | string;
  diff?: number | string;
  emphasizedIfMinus?: boolean;
};

function SummaryTableRow({
  label,
  val,
  diff,
  emphasizedIfMinus = false,
  ...props
}: SummaryTableRowProps) {
  const { palette } = useTheme();
  const minusColor =
    palette.mode === "light" ? palette.error.dark : palette.error.light;
  const isMinus = React.useMemo(() => {
    if (typeof val === "number") return val < 0;
    const firstCharacter = val.slice(0, 1);
    return firstCharacter === "-" || firstCharacter === "▲";
  }, [val]);
  const displayValue = React.useMemo(() => {
    if (!isMinus) return val;
    return `▲${val.toString().slice(1)}`;
  }, [val, isMinus]);

  return (
    <TableRow {...props}>
      <TableCell
        component="th"
        scope="row"
        align="right"
        sx={{ fontWeight: "bold" }}
      >
        {label}
      </TableCell>
      <TableCell
        align="right"
        sx={{ color: emphasizedIfMinus && isMinus ? minusColor : undefined }}
      >
        {displayValue}
      </TableCell>
      {diff ? (
        <TableCell align="right">
          <Diff>{diff}</Diff>
        </TableCell>
      ) : (
        <TableCell />
      )}
    </TableRow>
  );
}

export default SummaryTableRow;
