import * as React from 'react';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppState } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import type { YearStats } from '../../../types';

function diffIcon(diffval: number | null) {
  if (!diffval) return null;
  return diffval > 0 ? <ArrowDropUpIcon color="success" /> : <ArrowDropDownIcon color="error" />;
}

function valToOku(value: number, abs?: boolean) {
  const oku = abs ? Math.abs(value / 100) : value / 100;
  return oku.toFixed(2);
}

type StatsRowProps = {
  label: string;
  value: number;
  prev: number | undefined | null;
  unit?: string;
  disableOku?: boolean;
};

function StatsRow({ label, value, prev, disableOku = false, unit = '億円' }: StatsRowProps) {
  const diff = typeof prev === 'number' ? value - prev : null;
  return (
    <TableRow>
      <TableCell component="th">{label}</TableCell>
      <TableCell align="right">
        {!disableOku ? valToOku(value) : value}
        {unit}
      </TableCell>
      <TableCell align="right">
        {diff ? (
          <Typography component="span" variant="inherit" width={1} display="flex" alignItems="center" justifyContent="flex-end">
            {diffIcon(diff)}
            {!disableOku ? valToOku(diff, true) : Math.abs(diff)}
            {unit}
          </Typography>
        ) : null}
      </TableCell>
    </TableRow>
  );
}

StatsRow.defaultProps = {
  unit: '億円',
  disableOku: false,
};

type StatsTableProps = {
  stats: YearStats;
  prevStats: YearStats | null;
};

function StatsTable({ stats, prevStats }: StatsTableProps) {
  const { tab } = useAppState();
  function row() {
    if (tab === 'bs')
      return (
        <>
          <StatsRow label="純資産平均" value={stats.net_worth.average} prev={prevStats?.net_worth.average} />
          <StatsRow
            label="債務超過クラブ数"
            value={stats.net_worth.values.filter((val) => val < 0).length}
            prev={prevStats?.net_worth.values.filter((val) => val < 0).length}
            disableOku
            unit="クラブ"
          />
        </>
      );
    if (tab === 'revenue')
      return (
        <>
          <StatsRow label="営業収入平均" value={stats.revenue.average} prev={prevStats?.revenue.average} />
          <StatsRow label="広告料収入平均" value={stats.sponsor.average} prev={prevStats?.sponsor.average} />
          <StatsRow label="入場料収入平均" value={stats.ticket.average} prev={prevStats?.ticket.average} />
          <StatsRow label="Jリーグ配分金平均" value={stats.broadcast.average} prev={prevStats?.broadcast.average} />
        </>
      );
    if (tab === 'expense')
      return (
        <>
          <StatsRow label="営業費用平均" value={stats.expense.average} prev={prevStats?.expense.average} />
          <StatsRow label="チーム人件費平均" value={stats.salary.average} prev={prevStats?.salary.average} />
          <StatsRow
            label="平均チーム人件費比率"
            value={Math.round((stats.salary.average / stats.expense.average) * 100)}
            prev={prevStats ? Math.round((prevStats.salary.average / prevStats.expense.average) * 100) : null}
            unit="%"
            disableOku
          />
        </>
      );
    if (tab === 'attd')
      return (
        <>
          <StatsRow label="入場料収入平均" value={stats.ticket.average} prev={prevStats?.ticket.average} />
          <StatsRow
            label="リーグ平均観客数"
            value={stats.average_attd.average}
            prev={prevStats?.average_attd.average}
            unit="人"
            disableOku
          />
          <StatsRow label="客単価平均" value={stats.unit_price.average} prev={prevStats?.unit_price.average} unit="円" disableOku />
        </>
      );
    return (
      <>
        <StatsRow label="営業収入平均" value={stats.revenue.average} prev={prevStats?.revenue.average} />
        <StatsRow label="営業費用平均" value={stats.expense.average} prev={prevStats?.expense.average} />
      </>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableBody>{row()}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default StatsTable;
