import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Jumbotron, Section, SectionDivider, Article, PanelLink } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import PostList from '../components/PostList';
import { AdInSectionDividerOne } from '../components/Ads';
import Layout from '../layout';
import { MdxPost, MdxPostByYear } from '../../types';

type PostsByClubPageData = {
  allMdxPost: {
    edges: {
      node: Pick<MdxPost, 'title' | 'date' | 'slug'>;
    }[];
  };
};
type PageContext = MdxPostByYear & {
  previous: MdxPostByYear | null;
  next: MdxPostByYear | null;
};

function PostsByClubTemplate({ data, pageContext }: PageProps<PostsByClubPageData, PageContext>) {
  const { allMdxPost } = data;
  const { totalCount, year, previous, next } = pageContext;

  return (
    <Layout title={`${year}年の記事一覧`}>
      <Jumbotron maxWidth="md">
        <Typography variant="h5" component="h2" gutterBottom>
          {year}年の記事一覧
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
        <PageNavigationContainer>
          <PageNavigationItem to={next?.basePath ?? '#'} disabled={!next}>
            <Typography variant="body2">{next?.year}年の記事一覧</Typography>
          </PageNavigationItem>
          <PageNavigationItem to={previous?.basePath ?? '#'} disabled={!previous} next>
            <Typography variant="body2">{previous?.year}年の記事一覧</Typography>
          </PageNavigationItem>
        </PageNavigationContainer>
      </Section>
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

export default PostsByClubTemplate;

export const query = graphql`
  query PostsByYear($gte: Date!, $lt: Date!, $draft: Boolean) {
    allMdxPost(filter: { date: { gte: $gte, lt: $lt }, draft: { ne: $draft } }, sort: { fields: [date, lastmod], order: [DESC, DESC] }) {
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
