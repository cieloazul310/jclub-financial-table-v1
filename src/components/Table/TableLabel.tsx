import * as React from 'react';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import { AppLink } from '@cieloazul310/gatsby-theme-aoi';
import { Mode, General } from '../../../types';

const sxProps = {
  theadLabel: {
    fontWeight: 'bold',
    fontSize: 'caption.fontSize',
    py: 1,
    px: 0.5,
    zIndex: 3,
  },
  tbodyLabel: {
    fontWeight: 'bold',
    zIndex: 2,
    bgcolor: 'background.default',
  },
};

type TableCellLabelProps = {
  mode: Mode;
} & TableCellProps;

function TableCellLabel({ mode, sx, children, ...props }: TableCellLabelProps) {
  return (
    <TableCell
      sx={{
        position: 'sticky',
        left: mode === 'club' ? 0 : 36,
        minWidth: '8em',
        width: 100,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        ...sx,
      }}
      {...props}
    >
      {children}
    </TableCell>
  );
}

function TableCellIndex({ children, sx, ...props }: TableCellProps) {
  return (
    <TableCell
      sx={{
        position: 'sticky',
        left: 0,
        width: 36,
        minWidth: 36,
        padding: 0.5,
        ...sx,
      }}
      {...props}
    >
      {children}
    </TableCell>
  );
}

type TableHeadLabelProps = {
  mode: Mode;
};

export function TableHeadLabel({ mode }: TableHeadLabelProps) {
  return mode === 'club' ? (
    <TableCellLabel mode={mode} sx={sxProps.theadLabel} align="center">
      年
    </TableCellLabel>
  ) : (
    <>
      <TableCellIndex sx={sxProps.theadLabel} align="right">
        i
      </TableCellIndex>
      <TableCellLabel
        mode={mode}
        sx={{
          fontWeight: 'bold',
          fontSize: 'caption.fontSize',
          py: 1,
          px: 0.5,
          zIndex: 3,
        }}
        align="center"
      >
        クラブ
      </TableCellLabel>
    </>
  );
}

interface TableBodyLabelProps {
  mode: Mode;
  index: number;
  edge: {
    node: Pick<General, 'name' | 'slug' | 'year'>;
  };
}

export function TableBodyLabel({ mode, index, edge }: TableBodyLabelProps) {
  const { node } = edge;
  return mode === 'club' ? (
    <TableCellLabel mode={mode} sx={sxProps.tbodyLabel} component="th" scope="row" align="center">
      <AppLink to={`/year/${node.year}/`} color="inherit">
        {node.year}
      </AppLink>
    </TableCellLabel>
  ) : (
    <>
      <TableCellIndex sx={sxProps.tbodyLabel} component="th" scope="row" align="right">
        {index + 1}
      </TableCellIndex>
      <TableCellLabel mode={mode} sx={sxProps.tbodyLabel} component="th" scope="row" align="right">
        <AppLink to={`/club/${node.slug}/`} color="inherit">
          {node.name}
        </AppLink>
      </TableCellLabel>
    </>
  );
}
