import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Section, SectionDivider, Article } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import { CategoryLink, YearsLink } from '../Links';
import useIsClub from '../../utils/useIsClub';

import { Mode, ClubBrowser, YearBrowser } from '../../../types';

type NavigationSectionProps<T extends Mode> = {
  mode: T;
  item: T extends 'club' ? Omit<ClubBrowser, 'data' | 'posts'> : Omit<YearBrowser, 'data'>;
  previous: { to: string; title: string } | null;
  next: { to: string; title: string } | null;
};

function NavigationSection<T extends Mode>({ mode, item, previous, next }: NavigationSectionProps<T>) {
  const isClub = useIsClub<Omit<ClubBrowser, 'data'>>(mode);
  return (
    <section>
      <Section>
        <Article maxWidth="md">{isClub(item) ? <CategoryLink category={item.category} /> : <YearsLink />}</Article>
      </Section>
      <SectionDivider />
      <Section>
        <PageNavigationContainer>
          <PageNavigationItem to={previous?.to ?? '#'} disabled={!previous}>
            <Typography variant="body2">{previous?.title}</Typography>
          </PageNavigationItem>
          <PageNavigationItem to={next?.to ?? '#'} next disabled={!next}>
            <Typography variant="body2">{next?.title}</Typography>
          </PageNavigationItem>
        </PageNavigationContainer>
      </Section>
    </section>
  );
}

export default NavigationSection;
