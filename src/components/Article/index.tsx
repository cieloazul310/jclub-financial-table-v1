import * as React from 'react';
import { Section, Article } from '@cieloazul310/gatsby-theme-aoi';
import { useAppState } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { AdInSectionDividerTwo } from '../Ads';
import PLDoc from './PL';
import BSDoc from './BS';
import RevenueDoc from './Revenue';
import ExpenseDoc from './Expense';
import AttdDoc from './Attd';
import AttributionDoc from './Attribution';

function ArticleTab() {
  const { tab } = useAppState();
  if (tab === 'pl') return <PLDoc />;
  if (tab === 'bs') return <BSDoc />;
  if (tab === 'revenue') return <RevenueDoc />;
  if (tab === 'expense') return <ExpenseDoc />;
  return <AttdDoc />;
}

function ArticleSection() {
  return (
    <section>
      <Section>
        <Article maxWidth="md">
          <article>
            <ArticleTab />
          </article>
        </Article>
      </Section>
      <AdInSectionDividerTwo />
      <Section>
        <Article maxWidth="md">
          <article>
            <AttributionDoc />
          </article>
        </Article>
      </Section>
    </section>
  );
}

export default ArticleSection;
