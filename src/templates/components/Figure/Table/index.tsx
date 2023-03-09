import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableHeadRow from './TableHeadRow';
import TableBodyRow from './TableBodyRow';
import useStateEdges from '../../../../utils/useStateEdges';
import useTableId from '../../../../utils/useTableId';
import { Mode, AllDataFieldsFragment } from '../../../../../types';

type FinancialTableProps = {
  nodes: AllDataFieldsFragment[];
  mode: Mode;
};

function FinancialTable({ nodes, mode }: FinancialTableProps) {
  const stateEdges = useStateEdges(nodes, mode);
  const id = useTableId();
  return (
    <TableContainer
      sx={{
        flexGrow: 1,
        scrollSnapType: 'both mandatory',
      }}
      component={Paper}
    >
      <Table id={id} size="small" sx={{ minWidth: 1000 }} stickyHeader>
        <TableHead>
          <TableHeadRow mode={mode} />
        </TableHead>
        <TableBody>
          {stateEdges.map((node, index) => (
            <TableBodyRow key={node.id ?? index} node={node} mode={mode} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FinancialTable;
