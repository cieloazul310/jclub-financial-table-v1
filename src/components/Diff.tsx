import * as React from 'react';
import Typography from '@mui/material/Typography';
import { UpIcon, DownIcon } from '../icons';

type DiffProps = {
  children: string | number;
};

function Diff({ children }: DiffProps) {
  const { val, icon } = React.useMemo(() => {
    if (typeof children === 'number') {
      const value = Math.abs(children);
      if (children === 0) return { val: value, type: 'even', icon: null };
      return {
        val: value,
        type: children > 0 ? 'plus' : 'minus',
        icon:
          children > 0 ? (
            <UpIcon color="success" aria-label="plus" fontSize="small" />
          ) : (
            <DownIcon color="error" aria-label="minus" fontSize="small" />
          ),
      };
    }

    const first = children.slice(0, 1);
    if (children === '0') return { val: children, icon: null };

    const value = children.slice(1);
    if (first === '-') return { val: value, icon: <DownIcon color="error" aria-label="minus" fontSize="small" /> };
    if (first === '+') return { val: value, icon: <UpIcon color="success" aria-label="plus" fontSize="small" /> };

    return { val: children, icon: <UpIcon color="success" aria-label="plus" fontSize="small" /> };
  }, [children]);

  return (
    <Typography
      variant="inherit"
      component="span"
      sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', whiteSpace: 'nowrap', verticalAlign: 'bottom' }}
    >
      {icon}
      {val}
    </Typography>
  );
}

export default Diff;
