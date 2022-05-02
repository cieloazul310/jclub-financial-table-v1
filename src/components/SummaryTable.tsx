import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

type SummaryTableProps = {
  disableDiff?: boolean;
  children: React.ReactNode;
};

function SummaryTable({ children, disableDiff = false }: SummaryTableProps) {
  return (
    <Box my={4}>
      <Paper elevation={0} variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right" component="th" scope="col">
                  項目
                </TableCell>
                <TableCell component="th" align="right" scope="col">
                  数値
                </TableCell>
                {!disableDiff ? (
                  <TableCell component="th" align="right" scope="col">
                    前年比
                  </TableCell>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

SummaryTable.defaultProps = {
  disableDiff: false,
};

export default SummaryTable;
