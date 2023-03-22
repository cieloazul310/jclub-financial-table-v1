import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import Typography from '@mui/material/Typography';
import { Section, Article } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import Layout from '../../layout';
import Seo from '../../components/Seo';
import YearSummary from './Summary';
import { YearsLink } from '../../components/Links';
import Tab from '../components/Tab';
import FigureSection from '../components/Figure';
import { AdInSectionDividerOne } from '../../components/Ads';
import type { Year, AllDataFieldsFragment } from '../../../types';

export type YearPageData = {
  year: Pick<Year, 'id' | 'year' | 'href' | 'categories' | 'stats'>;
  right: Pick<Year, 'year' | 'href'> | null;
  left: Pick<Year, 'year' | 'href' | 'stats'> | null;
  allData: {
    nodes: (AllDataFieldsFragment & { previousData: AllDataFieldsFragment })[];
  };
};
export type YearPageContext = {
  right: number | null;
  left: number | null;
};

function YearTemplate({ data }: PageProps<YearPageData, YearPageContext>) {
  const { year, right, left } = data;
  const pageNavigation = React.useMemo(
    () => (
      <Section>
        <PageNavigationContainer>
          <PageNavigationItem href={left?.href ?? '#'} disabled={!left}>
            <Typography variant="body2">{left?.year}</Typography>
          </PageNavigationItem>
          <PageNavigationItem href={right?.href ?? '#'} disabled={!right} right>
            <Typography variant="body2">{right?.year}</Typography>
          </PageNavigationItem>
        </PageNavigationContainer>
      </Section>
    ),
    [left, right]
  );

  return (
    <Layout
      title={`${year.year}年Jクラブ経営情報`}
      appBarPosition="relative"
      right={right ? { href: right.href, title: `${right.year}年度`, secondaryText: 'Next' } : null}
      left={left ? { href: left.href, title: `${left.year}年度`, secondaryText: 'Previous' } : null}
      tabs={<Tab />}
      tabSticky
    >
      <FigureSection nodes={data.allData.nodes} mode="year" />
      {pageNavigation}
      <YearSummary year={year} prevYear={left} />
      <Section>
        <Article maxWidth="md">
          <YearsLink />
        </Article>
      </Section>
      <AdInSectionDividerOne />
      {pageNavigation}
    </Layout>
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
  query YearTemplate($year: Int!, $right: Int, $left: Int) {
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
    right: year(year: { eq: $right }) {
      year
      href
    }
    left: year(year: { eq: $left }) {
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
    allData(filter: { year: { eq: $year } }, sort: { revenue: DESC }) {
      nodes {
        ...allDataFields
        previousData {
          ...allDataFields
        }
      }
    }
  }
`;
