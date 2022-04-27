import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Jumbotron, Section, SectionDivider, Article, PanelLink } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import PostList from '../components/PostList';
import { AdInSectionDividerTwo } from '../components/Ads';
import Layout from '../layout';
import { ClubBrowser, MdxPost } from '../../types';

type PostsByClubPageData = {
  allMdxPost: {
    edges: {
      node: Pick<MdxPost, 'title' | 'date' | 'slug'>;
    }[];
  };
  club: Pick<ClubBrowser, 'name' | 'href'>;
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
      <Jumbotron maxWidth="md">
        <Typography variant="h5" component="h2" gutterBottom>
          {club.name}の記事一覧 ({currentPage}/{numPages})
        </Typography>
        <Typography>{totalCount} posts</Typography>
      </Jumbotron>
      <SectionDivider />
      <Section>
        <Article maxWidth="md">
          <PostList posts={allMdxPost.edges} />
        </Article>
      </Section>
      <SectionDivider />
      <Section>
        <Container maxWidth="md" disableGutters>
          <PanelLink to={club.href} disableBorder disableMargin>
            {club.name}の経営情報一覧
          </PanelLink>
        </Container>
      </Section>
      {currentPage !== 1 || currentPage !== numPages ? (
        <>
          <SectionDivider />
          <Section>
            <PageNavigationContainer>
              <PageNavigationItem to={currentPage === 2 ? `${basePath}/` : `${basePath}/${currentPage - 1}/`} disabled={currentPage === 1}>
                <Typography variant="body2">{currentPage - 1}</Typography>
              </PageNavigationItem>
              <PageNavigationItem to={`${basePath}/${currentPage + 1}`} disabled={currentPage === numPages} next>
                <Typography variant="body2">{currentPage + 1}</Typography>
              </PageNavigationItem>
            </PageNavigationContainer>
          </Section>
        </>
      ) : null}
      <AdInSectionDividerTwo />
      <Section>
        <Container maxWidth="md" disableGutters>
          <PanelLink to="/posts/" disableBorder disableMargin>
            記事一覧へ
          </PanelLink>
        </Container>
      </Section>
    </Layout>
  );
}

export default PostsByClubTemplate;

export const query = graphql`
  query PostsByClub($slug: String!, $skip: Int!, $limit: Int!, $draft: Boolean) {
    allMdxPost(
      filter: { club: { slug: { eq: $slug } }, draft: { ne: $draft } }
      sort: { fields: [date, lastmod], order: [DESC, DESC] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          date(formatString: "YYYY年MM月DD日")
          slug
        }
      }
    }
    club(slug: { eq: $slug }) {
      name
      href
    }
  }
`;
