import * as React from 'react';
import Figure from '../../components/figure';
import { Mode, DatumBrowser } from '../../../types';

type FigureTabProps = {
  edges: {
    node: DatumBrowser;
  }[];
  mode: Mode;
};

function FigureTab({ edges, mode }: FigureTabProps) {
  return (
    <section>
      <Figure edges={edges} mode={mode} />
    </section>
  );
}

export default FigureTab;
