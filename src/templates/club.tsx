import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import TemplateLayout, { ClubPageData, ClubPageContext } from '../layout/TemplateLayout';

function ClubTemplate({ data, pageContext }: PageProps<ClubPageData, ClubPageContext>) {
  const { club } = data;
  return (
    <TemplateLayout
      mode="club"
      title={`${club.name}の経営情報`}
      headerTitle={`${club.name}`}
      description={`${club.fullname}の年度別経営情報一覧。損益計算書・貸借対照表・営業収入・営業費用・入場者数を項目ごとに時系列表示。`}
      data={data}
      pageContext={pageContext}
    />
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
        }
      }
    }
  }
`;
