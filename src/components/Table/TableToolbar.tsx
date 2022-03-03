import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useUnitString from '../../utils/useUnitString';
import useStateString from '../../utils/useStateString';
import { Mode, Tab } from '../../../types';

type TableToolbarProps = {
  mode: Mode;
  tab: Tab;
};

function TableToolbar({ mode, tab }: TableToolbarProps) {
  const unitString = useUnitString(tab);
  const { sortString, filterString } = useStateString();
  return (
    <Box sx={{ height: 48, py: 0, px: 0.5, display: 'flex', flexDirection: 'row-reverse' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
        <Typography variant="caption">{unitString}</Typography>
      </Box>
      {mode === 'year' ? (
        <Box sx={{ display: 'flex', flexDirection: 'column-reverse', flexGrow: 1 }}>
          <Typography variant="caption">{sortString}</Typography>
          <Typography variant="caption">{filterString}</Typography>
        </Box>
      ) : null}
    </Box>
  );
}

export default TableToolbar;
