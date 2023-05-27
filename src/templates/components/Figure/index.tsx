import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import NoSsr from '@mui/material/NoSsr';
import FigureToolbar from './Toolbar';
import FinancialTable from './Table';
import FinancialCard from './Card';
import { useAppState } from '../../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import type { Mode, AllDataFieldsFragment } from '../../../../types';

function Fallback() {
  return (
    <Box minHeight="calc(100vh - 128px)" flexGrow={1} display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" />
    </Box>
  );
}

type FigureSectionProps = {
  nodes: (AllDataFieldsFragment & {
    previousData: AllDataFieldsFragment | null;
  })[];
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
          flexDirection: { xs: 'column-reverse', sm: 'column' },
          height: isYearTable ? { xs: 'calc(100vh - 128px)', sm: 'calc(100vh - 64px)' } : undefined,
        }}
      >
        <FigureToolbar mode={mode} />
        <NoSsr fallback={<Fallback />}>
          <Box flexGrow={1} overflow="auto" display="flex">
            {listMode ? <FinancialCard nodes={nodes} mode={mode} /> : <FinancialTable nodes={nodes} mode={mode} />}
          </Box>
        </NoSsr>
      </Container>
    </section>
  );
}

export default FigureSection;
