import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Jumbotron, Section, Article, PanelLink } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import Seo from '../components/Seo';
import PostList from '../components/PostList';
import { AdInSectionDividerOne } from '../components/Ads';
import Layout from '../layout';
import type { MdxPostListFragment, MdxPostByYear } from '../../types';

type PostsByClubPageData = {
  allMdxPost: {
    nodes: MdxPostListFragment[];
  };
};
type PostsByClubPageContext = MdxPostByYear & {
  previous: MdxPostByYear | null;
  next: MdxPostByYear | null;
};

function PostsByClubTemplate({ data, pageContext }: PageProps<PostsByClubPageData, PostsByClubPageContext>) {
  const { allMdxPost } = data;
  const { totalCount, year, previous, next } = pageContext;

  return (
    <Layout title={`${year}年の記事一覧`}>
      <Jumbotron maxWidth="md" component="header">
        <Typography variant="h5" component="h2" gutterBottom>
          {year}年の記事一覧
        </Typography>
        <Typography>{totalCount} posts</Typography>
      </Jumbotron>
      <Section component="main">
        <Article maxWidth="md">
          <PostList posts={allMdxPost.nodes} />
        </Article>
      </Section>
      <Section>
        <PageNavigationContainer>
          <PageNavigationItem href={next?.basePath ?? '#'} disabled={!next}>
            <Typography variant="body2">{next?.year}年の記事一覧</Typography>
          </PageNavigationItem>
          <PageNavigationItem href={previous?.basePath ?? '#'} disabled={!previous} right>
            <Typography variant="body2">{previous?.year}年の記事一覧</Typography>
          </PageNavigationItem>
        </PageNavigationContainer>
      </Section>
      <AdInSectionDividerOne />
      <Section>
        <Container maxWidth="md" disableGutters>
          <PanelLink href="/posts/archive/" disableBorder disableMargin>
            記事アーカイブへ
          </PanelLink>
        </Container>
      </Section>
    </Layout>
  );
}

export default PostsByClubTemplate;

export function Head({ pageContext }: HeadProps<PostsByClubPageData, PostsByClubPageContext>) {
  const { year } = pageContext;
  return <Seo title={`${year}年の記事一覧`} />;
}

export const query = graphql`
  query PostsByYear($gte: Date!, $lt: Date!, $draft: Boolean) {
    allMdxPost(filter: { date: { gte: $gte, lt: $lt }, draft: { ne: $draft } }, sort: [{ date: DESC }, { lastmod: DESC }, { slug: DESC }]) {
      nodes {
        ...mdxPostList
      }
    }
  }
`;
