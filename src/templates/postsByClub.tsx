import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Jumbotron, Section, Article, PanelLink } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import Seo from '../components/Seo';
import PostList from '../components/PostList';
import { AdInSectionDividerTwo } from '../components/Ads';
import Layout from '../layout';
import type { Club, MdxPostListFragment } from '../../types';

type PostsByClubPageData = {
  allMdxPost: {
    nodes: MdxPostListFragment[];
  };
  club: Pick<Club, 'name' | 'href'>;
};
type PageContext = {
  club: string;
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
  basePath: string;
  totalCount: number;
};

function PostsByClubTemplate({ data, pageContext }: PageProps<PostsByClubPageData, PageContext>) {
  const { allMdxPost, club } = data;
  const { numPages, currentPage, basePath, totalCount } = pageContext;

  return (
    <Layout title={`${club.name}の記事一覧`}>
      <Jumbotron maxWidth="md" component="header">
        <Typography variant="h5" component="h2" gutterBottom>
          {club.name}の記事一覧 ({currentPage}/{numPages})
        </Typography>
        <Typography>{totalCount} posts</Typography>
      </Jumbotron>
      <Section component="main">
        <Article maxWidth="md">
          <PostList posts={allMdxPost.nodes} />
        </Article>
      </Section>
      <Section>
        <Container maxWidth="md" disableGutters>
          <PanelLink href={club.href} disableBorder disableMargin>
            {club.name}の経営情報一覧
          </PanelLink>
        </Container>
      </Section>
      {currentPage !== 1 || currentPage !== numPages ? (
        <Section component="nav">
          <PageNavigationContainer>
            <PageNavigationItem href={currentPage === 2 ? `${basePath}/` : `${basePath}/${currentPage - 1}/`} disabled={currentPage === 1}>
              <Typography variant="body2">{currentPage - 1}</Typography>
            </PageNavigationItem>
            <PageNavigationItem href={`${basePath}/${currentPage + 1}`} disabled={currentPage === numPages} right>
              <Typography variant="body2">{currentPage + 1}</Typography>
            </PageNavigationItem>
          </PageNavigationContainer>
        </Section>
      ) : null}
      <AdInSectionDividerTwo />
      <Section>
        <Container maxWidth="md" disableGutters>
          <PanelLink href="/posts/" disableBorder disableMargin>
            記事一覧へ
          </PanelLink>
        </Container>
      </Section>
    </Layout>
  );
}

export default PostsByClubTemplate;

export function Head({ data }: HeadProps<PostsByClubPageData>) {
  const { club } = data;
  return <Seo title={`${club.name}の記事一覧`} />;
}

export const query = graphql`
  query PostsByClub($slug: String!, $skip: Int!, $limit: Int!, $draft: Boolean) {
    allMdxPost(
      filter: { club: { elemMatch: { slug: { eq: $slug } } }, draft: { ne: $draft } }
      sort: [{ date: DESC }, { lastmod: DESC }, { slug: DESC }]
      limit: $limit
      skip: $skip
    ) {
      nodes {
        ...mdxPostList
      }
    }
    club(slug: { eq: $slug }) {
      name
      href
    }
  }
`;
