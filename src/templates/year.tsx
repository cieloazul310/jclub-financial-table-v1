import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import TemplateLayout, { YearPageData, YearPageContext } from '../layout/TemplateLayout';

function YearTemplate({ data, pageContext }: PageProps<YearPageData, YearPageContext>) {
  const { year } = data;

  return (
    <TemplateLayout
      mode="year"
      title={`${year.year}年Jクラブ経営情報`}
      description={`${year.year}年のJクラブ経営情報一覧。各Jクラブの損益計算書・貸借対照表・営業収入・営業費用・入場者数を項目ごとに表示。`}
      data={data}
      pageContext={pageContext}
    />
  );
}

export default YearTemplate;

export const query = graphql`
  query YearTemplate($year: Int!) {
    year(year: { eq: $year }) {
      id
      year
      href
      categories
    }
    allData(filter: { year: { eq: $year } }, sort: { fields: revenue, order: DESC }) {
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
