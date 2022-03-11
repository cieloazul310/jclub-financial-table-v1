import * as React from 'react';
import { Section, Article } from '@cieloazul310/gatsby-theme-aoi';
import ClubInfo from './ClubInfo';
import YearInfo from './YearInfo';
import useIsClub from '../../utils/useIsClub';

import { Mode, DatumBrowser, ClubBrowser, YearBrowser } from '../../../types';

type SummarySectionProps<T extends Mode> = {
  mode: T;
  edges: {
    node: DatumBrowser;
  }[];
  item: T extends 'club' ? Omit<ClubBrowser, 'data'> : Omit<YearBrowser, 'data'>;
  prevYear: T extends 'year' ? Pick<YearBrowser, 'stats'> | null : null;
};

function SummarySection<T extends Mode>({ mode, edges, item, prevYear }: SummarySectionProps<T>) {
  const isClub = useIsClub<Omit<ClubBrowser, 'data'>>(mode);
  return (
    <section>
      <Section>
        <Article maxWidth="md">
          {isClub(item) ? <ClubInfo club={item} edges={edges} /> : <YearInfo year={item} prevYear={prevYear} />}
        </Article>
      </Section>
    </section>
  );
}

export default SummarySection;
