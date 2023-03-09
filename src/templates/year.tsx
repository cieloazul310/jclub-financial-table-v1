import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import TemplateLayout from '../layout/TemplateLayout';
import Seo from '../components/Seo';
import SummarySection from '../components/Summary';
import NavigationSection from '../components/Navigation';
import FigureSection from '../components/Figure';
import ArticleSection from '../components/Article';
import { AdInSectionDividerOne } from '../components/Ads';
import type { Year, Datum } from '../../types';

export type YearPageData = {
  year: Omit<Year, 'data'>;
  previous: Pick<Year, 'year' | 'href' | 'stats'> | null;
  next: Pick<Year, 'year' | 'href'> | null;
  allData: {
    nodes: Datum[];
  };
};
export type YearPageContext = {
  previous: number | null;
  next: number | null;
};

function YearTemplate({ data }: PageProps<YearPageData, YearPageContext>) {
  const { year, previous, next } = data;

  return (
    <TemplateLayout
      title={`${year.year}年Jクラブ経営情報`}
      previous={previous ? { to: previous.href, title: `${previous.year}年度` } : null}
      next={next ? { to: next.href, title: `${next.year}年度` } : null}
    >
      <FigureSection nodes={data.allData.nodes} mode="year" />
      <SummarySection mode="year" nodes={data.allData.nodes} item={data.year} prevYear={previous} posts={null} />
      <NavigationSection
        mode="year"
        item={data.year}
        previous={previous ? { to: previous.href, title: `${previous.year}年度` } : null}
        next={next ? { to: next.href, title: `${next.year}年度` } : null}
      />
      <AdInSectionDividerOne />
      <ArticleSection />
      <NavigationSection
        mode="year"
        item={data.year}
        previous={previous ? { to: previous.href, title: `${previous.year}年度` } : null}
        next={next ? { to: next.href, title: `${next.year}年度` } : null}
      />
    </TemplateLayout>
  );
}

export default YearTemplate;

export function Head({ data }: HeadProps<YearPageData>) {
  const { year } = data;
  return (
    <Seo
      title={`${year.year}年Jクラブ経営情報`}
      description={`${year.year}年のJクラブ経営情報一覧。各Jクラブの損益計算書・貸借対照表・営業収入・営業費用・入場者数を項目ごとに表示。`}
    />
  );
}

export const query = graphql`
  query YearTemplate($year: Int!, $previous: Int, $next: Int) {
    year(year: { eq: $year }) {
      id
      year
      href
      categories
      stats {
        J1 {
          ...allStats
        }
        J2 {
          ...allStats
        }
        J3 {
          ...allStats
        }
      }
    }
    previous: year(year: { eq: $previous }) {
      year
      href
      stats {
        J1 {
          ...allStats
        }
        J2 {
          ...allStats
        }
        J3 {
          ...allStats
        }
      }
    }
    next: year(year: { eq: $next }) {
      year
      href
    }
    allData(filter: { year: { eq: $year } }, sort: { revenue: DESC }) {
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
  }
`;
