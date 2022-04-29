import * as React from 'react';
import Typography from '@mui/material/Typography';

export function Green({ children }: React.PropsWithChildren<unknown>) {
  return (
    <Typography variant="inherit" fontSize="inherit" color="success.main" component="span">
      {children}
    </Typography>
  );
}

export function Red({ children }: React.PropsWithChildren<unknown>) {
  return (
    <Typography variant="inherit" fontSize="inherit" color="error.main" component="span">
      {children}
    </Typography>
  );
}
