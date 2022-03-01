import * as React from 'react';
import Container from '@mui/material/Container';
import FigureToolbar from './Toolbar';
import FinancialTable from '../tables';
import FinancialCard from '../Card';
import { useAppState } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { Mode, DatumBrowser } from '../../../types';

type FigureProps = {
  edges: {
    node: DatumBrowser;
  }[];
  mode: Mode;
};

function Figure({ edges, mode }: FigureProps) {
  const { listMode } = useAppState();

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{
        overflowY: 'auto',
      }}
    >
      <FigureToolbar mode={mode} />
      <div>{listMode ? <FinancialCard edges={edges} mode={mode} /> : <FinancialTable edges={edges} mode={mode} />}</div>
    </Container>
  );
}

export default Figure;
