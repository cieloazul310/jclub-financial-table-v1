import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import TemplateLayout from '../layout/TemplateLayout';
import Seo from '../components/Seo';
import SummarySection from '../components/Summary';
import NavigationSection from '../components/Navigation';
import FigureSection from '../components/Figure';
import ArticleSection from '../components/Article';
import { AdInSectionDividerOne } from '../components/Ads';
import type { Club, Datum, MdxPost } from '../../types';

export type ClubPageData = {
  club: Omit<Club, 'data' | 'posts'>;
  previous: Pick<Club, 'name' | 'href'> | null;
  next: Pick<Club, 'name' | 'href'> | null;
  allData: {
    nodes: Datum[];
  };
  allMdxPost: {
    nodes: Pick<MdxPost, 'title' | 'slug' | 'date'>[];
  };
};
export type ClubPageContext = {
  previous: string | null;
  next: string | null;
};

function ClubTemplate({ data }: PageProps<ClubPageData, ClubPageContext>) {
  const { club, previous, next, allMdxPost } = data;

  return (
    <TemplateLayout
      title={`${club.name}の経営情報`}
      headerTitle={`${club.name}`}
      previous={previous ? { to: previous.href, title: previous.name } : null}
      next={next ? { to: next.href, title: next.name } : null}
    >
      <FigureSection nodes={data.allData.nodes} mode="club" />
      <SummarySection mode="club" nodes={data.allData.nodes} item={data.club} prevYear={null} posts={allMdxPost.nodes} />
      <NavigationSection
        mode="club"
        item={data.club}
        previous={previous ? { to: previous.href, title: previous.name } : null}
        next={next ? { to: next.href, title: next.name } : null}
      />
      <AdInSectionDividerOne />
      <ArticleSection />
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

export function Head({ data }: HeadProps<ClubPageData>) {
  const { club } = data;

  return (
    <Seo
      title={`${club.name}の経営情報`}
      description={`${club.fullname}の年度別経営情報一覧。損益計算書・貸借対照表・営業収入・営業費用・入場者数を項目ごとに時系列表示。`}
    />
  );
}

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
    allData(filter: { slug: { eq: $slug } }, sort: { year: ASC }) {
      nodes {
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
    allMdxPost(
      filter: { club: { elemMatch: { slug: { eq: $slug } } }, draft: { ne: $draft } }
      sort: [{ date: DESC }, { lastmod: DESC }]
      limit: 5
    ) {
      nodes {
        slug
        title
        date(formatString: "YYYY年MM月DD日")
      }
    }
  }
`;
