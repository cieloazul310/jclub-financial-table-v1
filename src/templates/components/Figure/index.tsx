import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tab from './Tab';
import FigureToolbar from './Toolbar';
import FinancialTable from './Table';
import FinancialCard from './Card';
import { useAppState } from '../../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import type { Mode, AllDataFieldsFragment } from '../../../../types';

type FigureSectionProps = {
  nodes: AllDataFieldsFragment[];
  mode: Mode;
};

function FigureSection({ nodes, mode }: FigureSectionProps) {
  const { listMode } = useAppState();
  const isYearTable = !listMode && mode === 'year';

  return (
    <section>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          height: isYearTable ? { xs: 'calc(100vh - 128px)', sm: 'calc(100vh - 64px)' } : undefined,
        }}
      >
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'column', md: 'row' }} bgcolor="background.paper">
          <Tab />
          <FigureToolbar mode={mode} />
        </Box>
        <Box flexGrow={1} overflow="auto" display="flex">
          {listMode ? <FinancialCard nodes={nodes} mode={mode} /> : <FinancialTable nodes={nodes} mode={mode} />}
        </Box>
      </Container>
    </section>
  );
}

export default FigureSection;
