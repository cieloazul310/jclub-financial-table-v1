import * as React from 'react';
import { Section, Article, AppLink, H2, Ul, Li } from '@cieloazul310/gatsby-theme-aoi';

import Chart from '../components/Chart';
import { AllDataFieldsFragment, Club } from '../../../types';

type ClubSummaryProps = {
  nodes: AllDataFieldsFragment[];
  club: Pick<Club, 'name' | 'fullname' | 'company' | 'category' | 'hometown' | 'settlement' | 'relatedCompanies'>;
};

function ClubSummary({ nodes, club }: ClubSummaryProps) {
  return (
    <Section component="section">
      <Article maxWidth="md">
        <H2>{club.name}</H2>
        {nodes.length > 2 ? <Chart nodes={nodes} /> : null}
        <Ul>
          <Li>正式名称: {club.fullname}</Li>
          <Li>法人名: {club.company}</Li>
          <Li>所属カテゴリ: {club.category}</Li>
          <Li>ホームタウン: {club.hometown}</Li>
          {club.settlement ? (
            <Li>
              経営情報: <AppLink href={club.settlement}>{decodeURIComponent(club.settlement)}</AppLink>
            </Li>
          ) : null}
          {club.relatedCompanies ? <Li>関連する法人: {club.relatedCompanies.join(', ')}</Li> : null}
        </Ul>
      </Article>
    </Section>
  );
}

export default ClubSummary;
