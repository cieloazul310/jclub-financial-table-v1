import * as React from 'react';
import TableCell, { type TableCellProps } from '@mui/material/TableCell';
import { useAppState, useDispatch } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import type { Mode, SortableKeys } from '../../../types';

type TableHeadCellProps = Omit<TableCellProps, 'align'> & {
  mode: Mode;
  sortableKey?: SortableKeys;
};

function TableHeadCell({ sortableKey, mode, children, ...props }: TableHeadCellProps) {
  const { sortKey } = useAppState();
  const sortable = mode === 'year' && !!sortableKey;
  const selected = mode === 'year' && sortKey === sortableKey;
  const dispatch = useDispatch();

  const onClick = () => {
    if (!sortable) return;
    if (selected) {
      dispatch({ type: 'TOGGLE_SORTASC' });
    } else {
      dispatch({ type: 'CHANGE_SORTKEY', sortKey: sortableKey });
    }
  };

  return (
    <TableCell
      sx={{
        fontWeight: 'bold',
        fontSize: 'caption.fontSize',
        py: 1,
        px: 0.5,
        lineHeight: 1.2,
        minWidth: '6em',
        color: () => {
          if (!sortable) return 'text.secondary';
          return selected ? 'secondary.main' : 'text.primary';
        },
        cursor: sortable ? 'pointer' : undefined,
        '&:hover': {
          textDecoration: sortable ? 'underline' : undefined,
        },
      }}
      align="center"
      role="button"
      tabIndex={0}
      onClick={onClick}
      {...props}
    >
      {children}
    </TableCell>
  );
}

TableHeadCell.defaultProps = {
  sortableKey: undefined,
};

export default TableHeadCell;
