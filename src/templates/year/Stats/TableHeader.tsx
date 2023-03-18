import * as React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

type TableHeaderProps = {
  year: number;
};

function TableHeader({ year }: TableHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell component="th">項目</TableCell>
        <TableCell component="th" scope="column" align="center">
          J1
        </TableCell>
        <TableCell component="th" scope="column" align="center">
          J2
        </TableCell>
        {year >= 2014 ? (
          <TableCell component="th" scope="column" align="center">
            J3
          </TableCell>
        ) : null}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
