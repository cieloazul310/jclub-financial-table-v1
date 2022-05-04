import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Jumbotron, Section, SectionDivider, Article, PanelLink } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import PostList from '../components/PostList';
import { AdInSectionDividerOne } from '../components/Ads';
import Layout from '../layout';
import { MdxPost } from '../../types';

type PostsByClubPageData = {
  allMdxPost: {
    edges: {
      node: Pick<MdxPost, 'title' | 'date' | 'slug'>;
    }[];
  };
};
type PageContext = {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
  basePath: string;
  totalCount: number;
};

function AllPostsTemplate({ data, pageContext }: PageProps<PostsByClubPageData, PageContext>) {
  const { allMdxPost } = data;
  const { numPages, currentPage, basePath, totalCount } = pageContext;

  return (
    <Layout title="記事一覧">
      <Jumbotron maxWidth="md">
        <Typography variant="h5" component="h2" gutterBottom>
          記事一覧 ({currentPage}/{numPages})
        </Typography>
        <Typography>{totalCount} posts</Typography>
      </Jumbotron>
      <SectionDivider />
      <Section>
        <Article maxWidth="md">
          <PostList posts={allMdxPost.edges} />
        </Article>
      </Section>
      {currentPage !== 1 || currentPage !== numPages ? (
        <>
          <SectionDivider />
          <Section>
            <PageNavigationContainer>
              <PageNavigationItem to={currentPage === 2 ? `${basePath}/` : `${basePath}/${currentPage - 1}/`} disabled={currentPage === 1}>
                <Typography variant="body2">Newer</Typography>
              </PageNavigationItem>
              <PageNavigationItem to={`${basePath}/${currentPage + 1}/`} disabled={currentPage === numPages} next>
                <Typography variant="body2">Older</Typography>
              </PageNavigationItem>
            </PageNavigationContainer>
          </Section>
        </>
      ) : null}
      <AdInSectionDividerOne />
      <Section>
        <Container maxWidth="md" disableGutters>
          <PanelLink to="/posts/archive/" disableBorder disableMargin>
            記事アーカイブへ
          </PanelLink>
        </Container>
      </Section>
    </Layout>
  );
}

export default AllPostsTemplate;

export const query = graphql`
  query AllPosts($skip: Int!, $limit: Int!, $draft: Boolean) {
    allMdxPost(
      filter: { draft: { ne: $draft } }
      sort: { fields: [date, lastmod, slug], order: [DESC, DESC, DESC] }
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
  }
`;
