import * as React from 'react';
import { Section, SectionDivider, Article } from '@cieloazul310/gatsby-theme-aoi';
import { useAppState } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { PLDoc, BSDoc, RevenueDoc, ExpenseDoc, AttdDoc, AttributionDoc } from '../../components/docs';

function DocTab() {
  const { tab } = useAppState();
  if (tab === 'pl') return <PLDoc />;
  if (tab === 'bs') return <BSDoc />;
  if (tab === 'revenue') return <RevenueDoc />;
  if (tab === 'expense') return <ExpenseDoc />;
  return <AttdDoc />;
}

function MainTab() {
  return (
    <section>
      <Section>
        <Article maxWidth="md">
          <article>
            <DocTab />
          </article>
        </Article>
      </Section>
      <SectionDivider />
      <Section>
        <Article maxWidth="md">
          <AttributionDoc />
        </Article>
      </Section>
    </section>
  );
}

export default MainTab;
