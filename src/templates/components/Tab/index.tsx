import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import { useAppState, useDispatch } from '../../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';

function Tab() {
  const { tab } = useAppState();
  const dispatch = useDispatch();
  const handleTab = (_: React.ChangeEvent<unknown>, newValue: string) => {
    if (tab === newValue) return;
    if (newValue !== 'pl' && newValue !== 'bs' && newValue !== 'revenue' && newValue !== 'expense' && newValue !== 'attd') return;
    dispatch({ type: 'SET_TAB', tab: newValue });
  };

  return (
    <Box component="nav" bgcolor="background.paper" flexGrow={1}>
      <Tabs value={tab} variant="scrollable" indicatorColor="secondary" textColor="secondary" scrollButtons="auto" onChange={handleTab}>
        <MuiTab label="損益計算書" value="pl" wrapped />
        <MuiTab label="貸借対照表" value="bs" wrapped />
        <MuiTab label="営業収入" value="revenue" wrapped />
        <MuiTab label="営業費用" value="expense" wrapped />
        <MuiTab label="入場者数" value="attd" wrapped />
      </Tabs>
    </Box>
  );
}

export default Tab;
