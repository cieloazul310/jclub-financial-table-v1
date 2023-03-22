import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import Typography from '@mui/material/Typography';
import { Section, Article } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import Layout from '../../layout';
import Seo from '../../components/Seo';
import PostList from '../../components/PostList';
import { CategoryLink } from '../../components/Links';
import Tab from '../components/Tab';
import FigureSection from '../components/Figure';
import ClubSummary from './Summary';
import { AdInSectionDividerOne } from '../../components/Ads';
import type { Club, AllDataFieldsFragment, MdxPost } from '../../../types';

export type ClubPageData = {
  club: Pick<
    Club,
    'id' | 'short_name' | 'name' | 'fullname' | 'category' | 'slug' | 'href' | 'company' | 'hometown' | 'settlement' | 'relatedCompanies'
  >;
  left: Pick<Club, 'name' | 'href'> | null;
  right: Pick<Club, 'name' | 'href'> | null;
  allData: {
    nodes: (AllDataFieldsFragment & { previousData: AllDataFieldsFragment })[];
  };
  allMdxPost: {
    nodes: Pick<MdxPost, 'title' | 'slug' | 'date'>[];
  };
};
export type ClubPageContext = {
  left: string | null;
  right: string | null;
};

function ClubTemplate({ data }: PageProps<ClubPageData, ClubPageContext>) {
  const { club, left, right, allMdxPost, allData } = data;
  const pageNavigation = React.useMemo(
    () => (
      <Section component="nav">
        <PageNavigationContainer>
          <PageNavigationItem href={left?.href ?? '#'} disabled={!left}>
            <Typography variant="body2">{left?.name}</Typography>
          </PageNavigationItem>
          <PageNavigationItem href={right?.href ?? '#'} disabled={!right} right>
            <Typography variant="body2">{right?.name}</Typography>
          </PageNavigationItem>
        </PageNavigationContainer>
      </Section>
    ),
    [left, right]
  );

  return (
    <Layout
      title={`${club.name}の経営情報`}
      // headerTitle={`${club.name}`}
      appBarPosition="relative"
      left={left ? { href: left.href, title: left.name, secondaryText: 'Previous' } : null}
      right={right ? { href: right.href, title: right.name, secondaryText: 'Next' } : null}
      tabs={<Tab />}
      tabSticky
    >
      <FigureSection nodes={allData.nodes} mode="club" />
      {pageNavigation}
      <ClubSummary club={club} nodes={allData.nodes} />
      {allMdxPost.nodes.length ? (
        <Section component="section">
          <Article maxWidth="md">
            <PostList posts={allMdxPost.nodes} title="最新の記事" more={{ href: `${club.href}posts/`, title: `${club.name}の記事一覧` }} />
          </Article>
        </Section>
      ) : null}
      <Section component="section">
        <Article maxWidth="md">
          <CategoryLink category={club.category} />
        </Article>
      </Section>
      <AdInSectionDividerOne />
      {pageNavigation}
    </Layout>
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
  query ClubTemplate($slug: String!, $left: String, $right: String, $draft: Boolean) {
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
    left: club(slug: { eq: $left }) {
      href
      name
    }
    right: club(slug: { eq: $right }) {
      href
      name
    }
    allData(filter: { slug: { eq: $slug } }, sort: { year: ASC }) {
      nodes {
        ...allDataFields
        previousData {
          ...allDataFields
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
