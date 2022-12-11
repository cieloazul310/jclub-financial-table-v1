import * as React from 'react';
import TableCell, { type TableCellProps } from '@mui/material/TableCell';
import ButtonBase from '@mui/material/ButtonBase';
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
        py: 1,
        px: 0.5,
        lineHeight: 1.2,
        fontSize: 'caption.fontSize',
        minWidth: '6em',
      }}
      align="center"
      {...props}
    >
      <ButtonBase
        disableRipple
        sx={{
          fontSize: 'inherit',
          fontWeight: 'bold',
          color: () => {
            if (!sortable) return 'text.secondary';
            return selected ? 'secondary.main' : 'text.primary';
          },
          '&:hover': {
            textDecoration: sortable ? 'underline' : undefined,
          },
        }}
        onClick={onClick}
      >
        {children}
      </ButtonBase>
    </TableCell>
  );
}

TableHeadCell.defaultProps = {
  sortableKey: undefined,
};

export default TableHeadCell;
