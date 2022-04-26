import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { SectionDivider } from '@cieloazul310/gatsby-theme-aoi';
import TemplateLayout from '../layout/TemplateLayout';
import SummarySection from '../components/Summary';
import NavigationSection from '../components/Navigation';
import FigureSection from '../components/Figure';
import ArticleSection from '../components/Article';
import { AdInSectionDividerOne } from '../components/Ads';
import { ClubPageData, ClubPageContext } from '../../types';

function ClubTemplate({ data }: PageProps<ClubPageData, ClubPageContext>) {
  const { club, previous, next, allMdxPost } = data;

  return (
    <TemplateLayout
      title={`${club.name}の経営情報`}
      headerTitle={`${club.name}`}
      description={`${club.fullname}の年度別経営情報一覧。損益計算書・貸借対照表・営業収入・営業費用・入場者数を項目ごとに時系列表示。`}
      previous={previous ? { to: previous.href, title: previous.name } : null}
      next={next ? { to: next.href, title: next.name } : null}
    >
      <FigureSection edges={data.allData.edges} mode="club" />
      <SectionDivider />
      <SummarySection mode="club" edges={data.allData.edges} item={data.club} prevYear={null} posts={allMdxPost.edges} />
      <SectionDivider />
      <NavigationSection
        mode="club"
        item={data.club}
        previous={previous ? { to: previous.href, title: previous.name } : null}
        next={next ? { to: next.href, title: next.name } : null}
      />
      <AdInSectionDividerOne />
      <ArticleSection />
      <SectionDivider />
      <NavigationSection
        mode="club"
        item={data.club}
        previous={previous ? { to: previous.href, title: previous.name } : null}
        next={next ? { to: next.href, title: next.name } : null}
      />
    </TemplateLayout>
  );
}

export default ClubTemplate;

export const query = graphql`
  query ClubTemplate($slug: String!, $previous: String, $next: String, $draft: Boolean) {
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
    previous: club(slug: { eq: $previous }) {
      href
      name
    }
    next: club(slug: { eq: $next }) {
      href
      name
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
    allMdxPost(
      filter: { club: { slug: { eq: $slug } }, draft: { ne: $draft } }
      sort: { fields: [date, lastmod], order: [DESC, DESC] }
      limit: 5
    ) {
      edges {
        node {
          slug
          title
          date(formatString: "YYYY年MM月DD日")
        }
      }
    }
  }
`;
