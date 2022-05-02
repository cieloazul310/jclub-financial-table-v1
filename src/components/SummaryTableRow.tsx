import * as React from 'react';
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import Diff from './Diff';

type SummaryTableRowProps = Omit<TableRowProps, 'children'> & {
  label: string;
  val: number | string;
  diff?: number | string;
  emphasizedIfMinus?: boolean;
};

function SummaryTableRow({ label, val, diff, emphasizedIfMinus, ...props }: SummaryTableRowProps) {
  const { palette } = useTheme();
  const minusColor = palette.mode === 'light' ? palette.error.dark : palette.error.light;
  const isMinus = React.useMemo(() => {
    if (typeof val === 'number') return val < 0;
    return val.slice(0, 1) === '-';
  }, [val]);

  return (
    <TableRow {...props}>
      <TableCell component="th" scope="row" align="right" sx={{ fontWeight: 'bold' }}>
        {label}
      </TableCell>
      <TableCell align="right" sx={{ color: emphasizedIfMinus && isMinus ? minusColor : undefined }}>
        {val}
      </TableCell>
      {diff ? (
        <TableCell align="right">
          <Diff>{diff}</Diff>
        </TableCell>
      ) : null}
    </TableRow>
  );
}

SummaryTableRow.defaultProps = {
  diff: undefined,
  emphasizedIfMinus: undefined,
};

export default SummaryTableRow;
