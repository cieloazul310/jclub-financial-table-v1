import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';

type TableCoreProps = {
  id: string;
  children: React.ReactNode;
};

function TableCore({ id, children }: TableCoreProps) {
  return (
    <TableContainer sx={{ flexGrow: 1 }} component={Paper}>
      <Table id={id} sx={{ minWidth: 1000, scrollSnapType: 'both mandatory' }} size="small" stickyHeader>
        {children}
      </Table>
    </TableContainer>
  );
}

export default TableCore;
