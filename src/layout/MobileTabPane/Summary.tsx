import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Section, SectionDivider, Article, ArticleTitle } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import ClubInfo from '../../components/ClubInfo';
import YearInfo from '../../components/YearInfo';
import { CategoryLink, YearsLink } from '../../components/links';
import useNeighbors from '../../utils/useNeighbors';

import { Mode, DatumBrowser, ClubBrowser, YearBrowser, ClubPageNeighbor, YearPageNeighbor } from '../../../types';

type SummaryTabProps<T extends Mode> = {
  mode: T;
  edges: {
    node: DatumBrowser;
  }[];
  item: Omit<ClubBrowser, 'data'> | Omit<YearBrowser, 'data'>;
  previous: ClubPageNeighbor | YearPageNeighbor;
  next: ClubPageNeighbor | YearPageNeighbor;
  prevYear: Pick<YearBrowser, 'stats'> | null;
};

function isClub<T extends Mode>(item: Omit<ClubBrowser, 'data'> | Omit<YearBrowser, 'data'>, mode: T): item is Omit<ClubBrowser, 'data'> {
  return mode === 'club';
}

function Summary<T extends Mode>({ mode, edges, item, previous, next, prevYear }: SummaryTabProps<T>) {
  const neighbors = useNeighbors({ previous, next });
  return (
    <section>
      <Section>
        <Article maxWidth="md">
          <ArticleTitle>概要</ArticleTitle>
          {isClub(item, mode) ? <ClubInfo club={item} edges={edges} /> : <YearInfo year={item} prevYear={prevYear} />}
        </Article>
      </Section>
      <SectionDivider />
      <Section>
        <Article maxWidth="md">{isClub(item, mode) ? <CategoryLink category={item.category} /> : <YearsLink />}</Article>
      </Section>
      <SectionDivider />
      <Section>
        <PageNavigationContainer>
          <PageNavigationItem to={neighbors.previous?.to ?? '#'} disabled={!neighbors.previous}>
            <Typography variant="body2">{neighbors.previous?.title}</Typography>
          </PageNavigationItem>
          <PageNavigationItem to={neighbors.next?.to ?? '#'} next disabled={!neighbors.next}>
            <Typography variant="body2">{neighbors.next?.title}</Typography>
          </PageNavigationItem>
        </PageNavigationContainer>
      </Section>
    </section>
  );
}

export default Summary;
