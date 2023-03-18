import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { alpha } from '@mui/material/styles';
import useHasJ3 from './useHasJ3';
import valToOku from '../../../utils/valToOku';
import Diff from '../../../components/Diff';
import type { Year, YearStats, StatsValues } from '../../../../types';

type TableCellAverageProps = {
  statsValues: StatsValues;
  prev: StatsValues | undefined;
  oku?: boolean;
  unit?: string;
};

function TableCellAverage({ statsValues, prev, oku = true, unit = '億円' }: TableCellAverageProps) {
  const diff = React.useMemo(() => {
    if (!prev) return null;
    const diffValue = oku ? valToOku(statsValues.average - prev.average) : statsValues.average - prev.average;
    return (
      <span>
        <Diff>{diffValue}</Diff>
        {unit}
      </span>
    );
  }, [statsValues, prev]);
  const value = oku ? valToOku(statsValues.average) : statsValues.average;
  return (
    <TableCell align="right">
      <strong>
        {value}
        {unit}
      </strong>
      <br />
      {diff}
    </TableCell>
  );
}

TableCellAverage.defaultProps = {
  oku: true,
  unit: '億円',
};

type TableCellValueProps = {
  statsValues: StatsValues;
  mode: 'min' | 'max';
  oku?: boolean;
  unit?: string;
};

function TableCellValue({ statsValues, mode, oku = true, unit = '億円' }: TableCellValueProps) {
  const { values } = statsValues;
  const index = mode === 'min' ? 0 : values.length - 1;
  const item = values[index];
  const value = oku ? valToOku(item.value) : item.value;

  return (
    <TableCell align="right">
      {item.name}
      <br />
      {value}
      {unit}
    </TableCell>
  );
}

TableCellValue.defaultProps = {
  oku: true,
  unit: '億円',
};

type TableSetProps = {
  title: string;
  statsKey: keyof YearStats;
  year: Pick<Year, 'year' | 'stats'>;
  prevYear: Pick<Year, 'stats'> | null;
  oku?: boolean;
  unit?: string;
};

function TableSet({ title, statsKey, year, prevYear, oku, unit }: TableSetProps) {
  const J1 = year.stats.J1[statsKey];
  const J2 = year.stats.J2[statsKey];
  const J3 = year.stats.J3?.[statsKey];
  const hasJ3 = useHasJ3(J3);
  const colSpan = hasJ3 ? 4 : 3;

  return (
    <>
      <TableRow>
        <TableCell
          component="th"
          colSpan={colSpan}
          sx={{ bgcolor: ({ palette }) => alpha(palette.primary.dark, palette.action.hoverOpacity) }}
        >
          {title}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row" sx={{ pl: 4 }}>
          平均
        </TableCell>
        <TableCellAverage statsValues={J1} prev={prevYear?.stats.J1[statsKey]} oku={oku} unit={unit} />
        <TableCellAverage statsValues={J2} prev={prevYear?.stats.J2[statsKey]} oku={oku} unit={unit} />
        {hasJ3 ? <TableCellAverage statsValues={J3} prev={prevYear?.stats.J3?.[statsKey]} oku={oku} unit={unit} /> : null}
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row" sx={{ pl: 4 }}>
          最大
        </TableCell>
        <TableCellValue statsValues={J1} mode="max" oku={oku} unit={unit} />
        <TableCellValue statsValues={J2} mode="max" oku={oku} unit={unit} />
        {hasJ3 ? <TableCellValue statsValues={J3} mode="max" oku={oku} unit={unit} /> : null}
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row" sx={{ pl: 4 }}>
          最小
        </TableCell>
        <TableCellValue statsValues={J1} mode="min" oku={oku} unit={unit} />
        <TableCellValue statsValues={J2} mode="min" oku={oku} unit={unit} />
        {hasJ3 ? <TableCellValue statsValues={J3} mode="min" oku={oku} unit={unit} /> : null}
      </TableRow>
    </>
  );
}

TableSet.defaultProps = {
  oku: undefined,
  unit: undefined,
};

export default TableSet;
