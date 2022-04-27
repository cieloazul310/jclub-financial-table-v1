import * as React from 'react';
import Typography from '@mui/material/Typography';
import { UpIcon, DownIcon } from '../icons';

type DiffProps = {
  children: string | number;
};

function Diff({ children }: DiffProps) {
  const { val, plus }: { val: string | number; plus: boolean } = React.useMemo(() => {
    if (typeof children === 'number') {
      return { val: Math.abs(children), plus: children > 0 };
    }
    const first = children.slice(0, 1);
    if (first === '-') return { val: children.slice(1), plus: false };
    if (first === '+') return { val: children.slice(1), plus: true };
    return { val: children, plus: true };
  }, [children]);

  return (
    <Typography
      variant="inherit"
      component="span"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', whiteSpace: 'nowrap' }}
    >
      {plus ? (
        <UpIcon color="success" aria-label="plus" fontSize="small" />
      ) : (
        <DownIcon color="error" aria-label="minus" fontSize="small" />
      )}
      {val}
    </Typography>
  );
}

export default Diff;
