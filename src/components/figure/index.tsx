import * as React from 'react';
import Container from '@mui/material/Container';
import SwipeableViews from 'react-swipeable-views';
import FigureToolbar from './Toolbar';
import FinancialTable from '../tables';
// import FinancialList from '../list';
import FinancialCard from '../Card';
import { useAppState } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import tabs from '../../utils/tabs';
import { Mode, Tab, DatumBrowser } from '../../../types';

type FigureProps = {
  edges: {
    node: DatumBrowser;
  }[];
  mode: Mode;
  tab: Tab;
  onChangeTabIndex: (index: number) => void;
};

function Figure({ edges, mode, tab, onChangeTabIndex }: FigureProps) {
  const { listMode } = useAppState();
  const tableOrList = (tabItem: Tab) => {
    if (tabItem !== tab) return null;
    return listMode ? <FinancialCard edges={edges} tab={tab} mode={mode} /> : <FinancialTable edges={edges} mode={mode} tab={tab} />;
  };

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{
        overflowY: 'auto',
        // height: mode === 'year' ? 'calc(100vh - 106px)' : undefined
      }}
    >
      <FigureToolbar tab={tab} mode={mode} />
      <div>
        {tabs.map((t) => (
          <div key={t} role="tabpanel" hidden={t !== tab}>
            {tableOrList(t)}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Figure;
