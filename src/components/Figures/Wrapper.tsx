import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type FigureWrapperProps = {
  children: React.ReactNode;
  caption?: string;
};

function FigureWrapper({ children, caption }: FigureWrapperProps) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" px={1} py={2} mx={0} my={2} component="figure">
      <Paper sx={{ width: 1, maxWidth: 'sm', px: 2, pt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {children}
        {caption ? (
          <Typography variant="caption" display="flex" justifyContent="center" p={1} component="figcaption">
            {caption}
          </Typography>
        ) : null}
      </Paper>
    </Box>
  );
}

FigureWrapper.defaultProps = {
  caption: undefined,
};

export default FigureWrapper;
