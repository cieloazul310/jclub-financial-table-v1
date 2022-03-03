import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { SectionDivider } from '@cieloazul310/gatsby-theme-aoi';
import TemplateLayout from '../layout/TemplateLayout';
import Summary from '../components/Summary';
import Figure from '../components/Figure';
import ArticleSection from '../components/Article';
import { AdInSectionDividerOne } from '../components/Ads';
import { ClubPageData, ClubPageContext } from '../../types';

function ClubTemplate({ data, pageContext }: PageProps<ClubPageData, ClubPageContext>) {
  const { club } = data;
  const { previous, next } = pageContext;

  return (
    <TemplateLayout
      title={`${club.name}の経営情報`}
      headerTitle={`${club.name}`}
      description={`${club.fullname}の年度別経営情報一覧。損益計算書・貸借対照表・営業収入・営業費用・入場者数を項目ごとに時系列表示。`}
      pageContext={pageContext}
    >
      <Figure edges={data.allData.edges} mode="club" />
      <SectionDivider />
      <Summary mode="club" edges={data.allData.edges} item={data.club} previous={previous} next={next} prevYear={null} />
      <AdInSectionDividerOne />
      <ArticleSection />
    </TemplateLayout>
  );
}

export default ClubTemplate;

export const query = graphql`
  query ClubTemplate($slug: String!) {
    club(slug: { eq: $slug }) {
      id
      short_name
      name
      fullname
      category
      slug
      href
      company
      hometown
      area
      settlement
      relatedCompanies
    }
    allData(filter: { slug: { eq: $slug } }, sort: { fields: year, order: ASC }) {
      edges {
        node {
          ...generalFields
          ...seasonResultFields
          ...plFields
          ...bsFields
          ...revenueFields
          ...expenseFields
          ...attdFields
          previousData {
            ...generalFields
            ...seasonResultFields
            ...plFields
            ...bsFields
            ...revenueFields
            ...expenseFields
            ...attdFields
          }
        }
      }
    }
  }
`;
