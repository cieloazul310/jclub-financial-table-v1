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
import type { MdxPostListFragment } from '../../types';

type AllPostsTemplateData = {
  allMdxPost: {
    nodes: MdxPostListFragment[];
  };
};
type AllPostsTemplateContext = {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
  basePath: string;
  totalCount: number;
};

function AllPostsTemplate({ data, pageContext }: PageProps<AllPostsTemplateData, AllPostsTemplateContext>) {
  const { allMdxPost } = data;
  const { numPages, currentPage, basePath, totalCount } = pageContext;

  return (
    <Layout title="記事一覧">
      <Jumbotron maxWidth="md" component="header">
        <Typography variant="h5" component="h2" gutterBottom>
          記事一覧 ({currentPage}/{numPages})
        </Typography>
        <Typography>{totalCount} posts</Typography>
      </Jumbotron>
      <Section component="main">
        <Article maxWidth="md">
          <PostList posts={allMdxPost.nodes} />
        </Article>
      </Section>
      {currentPage !== 1 || currentPage !== numPages ? (
        <Section component="nav">
          <PageNavigationContainer>
            <PageNavigationItem href={currentPage === 2 ? `${basePath}/` : `${basePath}/${currentPage - 1}/`} disabled={currentPage === 1}>
              <Typography variant="body2">Newer</Typography>
            </PageNavigationItem>
            <PageNavigationItem href={`${basePath}/${currentPage + 1}/`} disabled={currentPage === numPages} right>
              <Typography variant="body2">Older</Typography>
            </PageNavigationItem>
          </PageNavigationContainer>
        </Section>
      ) : null}
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

export default AllPostsTemplate;

export function Head({ pageContext }: HeadProps<AllPostsTemplateData, AllPostsTemplateContext>) {
  const { numPages, currentPage } = pageContext;
  const title = `記事一覧 (${currentPage}/${numPages})`;
  return <Seo title={title} />;
}

export const query = graphql`
  query AllPosts($skip: Int!, $limit: Int!, $draft: Boolean) {
    allMdxPost(filter: { draft: { ne: $draft } }, sort: [{ date: DESC }, { lastmod: DESC }, { slug: DESC }], limit: $limit, skip: $skip) {
      nodes {
        ...mdxPostList
      }
    }
  }
`;
