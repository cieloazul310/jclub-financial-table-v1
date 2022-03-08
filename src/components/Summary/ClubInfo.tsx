import * as React from 'react';
import { ExternalLink, ArticleTitle, Ul, Li } from '@cieloazul310/gatsby-theme-aoi';
import Chart from '../Chart';
import { ClubBrowser, DatumBrowser } from '../../../types';

type ClubInfoProps = {
  club: Omit<ClubBrowser, 'data'>;
  edges: {
    node: DatumBrowser;
  }[];
};

function ClubInfo({ club, edges }: ClubInfoProps) {
  return (
    <>
      <ArticleTitle>{club.name}</ArticleTitle>
      {edges.length > 2 ? <Chart edges={edges} /> : null}
      <Ul>
        <Li>正式名称: {club.fullname}</Li>
        <Li>法人名: {club.company}</Li>
        <Li>所属カテゴリ: {club.category}</Li>
        <Li>ホームタウン: {club.hometown}</Li>
        <Li>活動区域: {club.area}</Li>
        {club.settlement ? (
          <Li>
            経営情報: <ExternalLink href={club.settlement}>{decodeURIComponent(club.settlement)}</ExternalLink>
          </Li>
        ) : null}
        {club.relatedCompanies ? <Li>関連する法人: {club.relatedCompanies.join(', ')}</Li> : null}
      </Ul>
    </>
  );
}

export default ClubInfo;
