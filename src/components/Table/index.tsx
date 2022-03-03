import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
// import TableCore from './TableCore';
import TableHeadRow from './TableHeadRow';
import TableBodyRow from './TableBodyRow';
import useStateEdges from '../../utils/useStateEdges';
import useTableId from '../../utils/useTableId';
import { Mode, DatumBrowser } from '../../../types';

type FinancialTableProps = {
  edges: { node: DatumBrowser }[];
  mode: Mode;
};

function FinancialTable({ edges, mode }: FinancialTableProps) {
  const stateEdges = useStateEdges(edges, mode);
  const id = useTableId();
  return (
    <TableContainer
      sx={{
        flexGrow: 1,
        scrollSnapType: 'both mandatory',
        /* 
        maxHeight: mode === 'year' ? 'calc(100vh - 106px)' : undefined,
        */
      }}
      component={Paper}
    >
      <Table id={id} size="small" sx={{ minWidth: 1000 }} stickyHeader>
        <TableHead>
          <TableHeadRow mode={mode} />
        </TableHead>
        <TableBody>
          {stateEdges.map((edge, index) => (
            <TableBodyRow key={edge.node.id ?? index} edge={edge} mode={mode} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FinancialTable;
