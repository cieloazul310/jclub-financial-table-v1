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
import { Tab, Mode, DatumBrowser } from '../../../types';

type FinancialTableProps = {
  edges: { node: DatumBrowser }[];
  mode: Mode;
  tab: Tab;
};

function FinancialTable({ edges, mode, tab }: FinancialTableProps) {
  const stateEdges = useStateEdges(edges, mode);
  const id = useTableId(tab);
  return (
    <TableContainer sx={{ flexGrow: 1 }} component={Paper}>
      <Table id={id} sx={{ minWidth: 1000, scrollSnapType: 'both mandatory' }} size="small" stickyHeader>
        <TableHead>
          <TableHeadRow mode={mode} tab={tab} />
        </TableHead>
        <TableBody>
          {stateEdges.map((edge, index) => (
            <TableBodyRow key={edge.node.id ?? index} edge={edge} mode={mode} tab={tab} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FinancialTable;
