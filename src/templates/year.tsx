import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { SectionDivider } from '@cieloazul310/gatsby-theme-aoi';
import TemplateLayout from '../layout/TemplateLayout';
import SummarySection from '../components/Summary';
import NavigationSection from '../components/Navigation';
import FigureSection from '../components/Figure';
import ArticleSection from '../components/Article';
import { AdInSectionDividerOne } from '../components/Ads';
import { YearPageData, YearPageContext } from '../../types';

function YearTemplate({ data }: PageProps<YearPageData, YearPageContext>) {
  const { year, previous, next } = data;

  return (
    <TemplateLayout
      title={`${year.year}年Jクラブ経営情報`}
      description={`${year.year}年のJクラブ経営情報一覧。各Jクラブの損益計算書・貸借対照表・営業収入・営業費用・入場者数を項目ごとに表示。`}
      previous={previous ? { to: previous.href, title: `${previous.year}年度` } : null}
      next={next ? { to: next.href, title: `${next.year}年度` } : null}
    >
      <FigureSection edges={data.allData.edges} mode="year" />
      <SectionDivider />
      <SummarySection mode="year" edges={data.allData.edges} item={data.year} prevYear={previous} posts={null} />
      <SectionDivider />
      <NavigationSection
        mode="year"
        item={data.year}
        previous={previous ? { to: previous.href, title: `${previous.year}年度` } : null}
        next={next ? { to: next.href, title: `${next.year}年度` } : null}
      />
      <AdInSectionDividerOne />
      <ArticleSection />
      <SectionDivider />
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
