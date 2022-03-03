import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FigureWrapper from './Wrapper';

function UnitPrice() {
  return (
    <FigureWrapper caption="客単価と入場者数の関係">
      <Box width={1} display="flex" height={280}>
        <Box display="flex" flexDirection="column" flex={1}>
          <Box flex={6}>
            <Typography variant="caption">客単価</Typography>
          </Box>
          <Box flex={1} display="flex" justifyContent="flex-end">
            <Typography variant="caption">0</Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" flex={6}>
          <Box flex={6} sx={{ borderLeft: 1, borderBottom: 1, borderColor: 'text.secondary' }}>
            a
          </Box>
          <Box flex={1} display="flex" justifyContent="flex-end">
            <Typography variant="caption">入場者数</Typography>
          </Box>
        </Box>
      </Box>
    </FigureWrapper>
  );
}

export default UnitPrice;
