import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import type { Year } from '../../../../types';

type TableClubsProps = {
  year: Pick<Year, 'year' | 'stats'>;
};

function TableClubs({ year }: TableClubsProps) {
  const { stats } = year;
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        クラブ数
      </TableCell>
      <TableCell align="right">{stats.J1.revenue.totalCount}</TableCell>
      <TableCell align="right">{stats.J2.revenue.totalCount}</TableCell>
      {year.year >= 2014 ? <TableCell align="right">{stats.J3?.revenue.totalCount}</TableCell> : null}
    </TableRow>
  );
}

export default TableClubs;
