import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FigureWrapper from './Wrapper';

function BSFigure() {
  return (
    <FigureWrapper caption="貸借対照表の略図">
      <Box sx={{ border: 1, borderColor: 'text.primary' }} display="flex" width={1} height={280}>
        <Box sx={{ borderRight: 1, borderColor: 'text.primary', width: 1 / 2 }} display="flex" flexDirection="column" flexGrow={1}>
          <Box display="flex" flex={3} flexDirection="column" justifyContent="center" alignItems="center">
            <Typography variant="body2">流動資産</Typography>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flex={1}>
            <Typography variant="body2">固定資産等</Typography>
          </Box>
        </Box>
        <Box sx={{ width: 1 / 2 }} display="flex" flexDirection="column" flexGrow={1}>
          <Box sx={{ borderBottom: 1, borderColor: 'text.primary' }} display="flex" flexDirection="column" flex={2}>
            <Box display="flex" flex={3} flexDirection="column" justifyContent="center" alignItems="center">
              <Typography variant="body2">流動負債</Typography>
            </Box>
            <Divider />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flex={1}>
              <Typography variant="body2">固定負債</Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" flex={1}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flex={2}>
              <Typography variant="body2">資本金</Typography>
            </Box>
            <Divider />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flex={1}>
              <Typography variant="body2">資本剰余金等</Typography>
            </Box>
            <Divider />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flex={1}>
              <Typography variant="body2">利益剰余金</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </FigureWrapper>
  );
}

export default BSFigure;
