import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Section, SectionDivider, Article } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import { CategoryLink, YearsLink } from '../Links';
import useNeighbors from '../../utils/useNeighbors';
import useIsClub from '../../utils/useIsClub';

import { Mode, ClubBrowser, YearBrowser, ClubPageNeighbor, YearPageNeighbor } from '../../../types';

type NavigationSectionProps<T extends Mode> = {
  mode: T;
  item: T extends 'club' ? Omit<ClubBrowser, 'data'> : Omit<YearBrowser, 'data'>;
  previous: T extends 'club' ? ClubPageNeighbor : YearPageNeighbor;
  next: T extends 'club' ? ClubPageNeighbor : YearPageNeighbor;
};

function NavigationSection<T extends Mode>({ mode, item, previous, next }: NavigationSectionProps<T>) {
  const neighbors = useNeighbors({ previous, next });
  const isClub = useIsClub<Omit<ClubBrowser, 'data'>>(mode);
  return (
    <section>
      <Section>
        <Article maxWidth="md">{isClub(item) ? <CategoryLink category={item.category} /> : <YearsLink />}</Article>
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

export default NavigationSection;
