import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import { useTheme } from '@mui/material/styles';
import Diff from './Diff';
import val from '../utils/val';

type SimpleTableProps = {
  cols: string[];
  rows: string[];
  data: number[][];
  unit?: string;
  disableUnit?: boolean;
  customUnits?: (string | null)[];
  emphasizedRows?: number[];
  emphasizedColsIfMinus?: number[];
  diff?: boolean;
  diffLabel?: string;
  separator?: boolean;
};

function SimpleTable({
  cols,
  rows,
  data,
  unit,
  disableUnit = false,
  customUnits,
  emphasizedRows = [],
  emphasizedColsIfMinus = [],
  diff,
  diffLabel,
  separator = false,
}: SimpleTableProps) {
  const { palette } = useTheme();
  const minusColor = palette.mode === 'light' ? palette.error.dark : palette.error.light;
  const diffData = React.useMemo(() => {
    return data[data.length - 1].map((value, index) => value - data[data.length - 2][index]);
  }, [data]);

  return (
    <Box my={4}>
      <Paper elevation={0} variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                  {disableUnit ? '' : `(単位: ${unit ?? '百万円'})`}
                </TableCell>
                {cols.map((label) => (
                  <TableCell key={label} component="th" align="right" scope="col" sx={{ lineHeight: 'inherit' }}>
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((label, rowIndex) => (
                <TableRow key={label} selected={emphasizedRows.includes(rowIndex + 1)}>
                  <TableCell
                    align="right"
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: emphasizedRows.includes(rowIndex + 1) ? 'bold' : undefined,
                    }}
                  >
                    {label}
                  </TableCell>
                  {data[rowIndex].map((value, colIndex) => (
                    <TableCell
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${rowIndex}-${colIndex}`}
                      align="right"
                      sx={{
                        fontWeight: emphasizedRows.includes(rowIndex + 1) ? 'bold' : undefined,
                        color: emphasizedColsIfMinus.includes(colIndex + 1) && value < 0 ? minusColor : undefined,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {val(value, separator)}
                      {customUnits?.[colIndex]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            {diff ? (
              <TableFooter>
                <TableRow>
                  <TableCell align="right">{diffLabel ?? '差分'}</TableCell>
                  {diffData.map((value, colIndex) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <TableCell key={`diff-${colIndex}`} align="right" sx={{ whiteSpace: 'nowrap' }}>
                      <Diff>{val(value, separator)}</Diff>
                      {customUnits?.[colIndex]}
                    </TableCell>
                  ))}
                </TableRow>
              </TableFooter>
            ) : null}
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

SimpleTable.defaultProps = {
  unit: undefined,
  disableUnit: false,
  customUnits: undefined,
  emphasizedRows: [],
  emphasizedColsIfMinus: [],
  diff: undefined,
  diffLabel: undefined,
  separator: false,
};

export default SimpleTable;
