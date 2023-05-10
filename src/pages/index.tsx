import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Jumbotron, Section, Article, Paragraph, useSiteMetadata } from '@cieloazul310/gatsby-theme-aoi';
import Layout from '../layout';
import Seo from '../components/Seo';
import GridItemMenu from '../components/GridItemMenu';
import PostList from '../components/PostList';
import { J1Link, J2Link, J3Link, YearsLink } from '../components/Links';
import AttributionDoc from '../components/Article/Attribution';
import { AdInSectionDividerOne } from '../components/Ads';
import type { MdxPostListFragment } from '../../types';

type IndexPageQueryData = {
  allMdxPost: {
    nodes: MdxPostListFragment[];
  };
};

function IndexPage({ data }: PageProps<IndexPageQueryData>) {
  const { allMdxPost } = data;
  const { title, description } = useSiteMetadata();
  return (
    <Layout title={title}>
      <Jumbotron maxWidth="md" component="header">
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <Paragraph>{description}</Paragraph>
      </Jumbotron>
      {/*
        <Jumbotron maxWidth="md" bgcolor={palette.mode === 'light' ? 'primary.light' : 'primary.dark'} height={40}>
        <AppLink href="/year/2021/" color="inherit">
          <Typography variant="h6" component="h3" color="inherit">
            2021年度決算(完全版)を更新しました
          </Typography>
        </AppLink>
      </Jumbotron>
      */}
      <Section>
        <Article maxWidth="md" py={2}>
          <Grid container spacing={2} component="nav">
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3" gutterBottom>
                J1
              </Typography>
              <J1Link />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3" gutterBottom>
                J2
              </Typography>
              <J2Link />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3" gutterBottom>
                J3
              </Typography>
              <J3Link />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3" gutterBottom>
                年度別
              </Typography>
              <YearsLink />
            </Grid>
            <GridItemMenu title="経営情報の見方" href="/docs" description="経営情報の項目と用語の簡易な解説" />
            <GridItemMenu
              title="項目別表示"
              href="/series"
              description="営業収入や入場者数など特定の項目を、縦軸にクラブ、横軸に年度で表したページ"
            />
            <GridItemMenu title="データダウンロード" href="/download" description="データをJSONやCSV形式でダウンロードできるページ" />
          </Grid>
        </Article>
      </Section>
      <Section>
        <Article maxWidth="md">
          <PostList posts={allMdxPost.nodes} title="最新の記事" more={{ href: '/posts/', title: '記事一覧' }} />
        </Article>
      </Section>
      <AdInSectionDividerOne />
      <Section>
        <Article maxWidth="md">
          <AttributionDoc />
        </Article>
      </Section>
    </Layout>
  );
}
export default IndexPage;

export function Head() {
  return <Seo />;
}

export const query = graphql`
  query IndexPage {
    allMdxPost(filter: { draft: { ne: true } }, sort: [{ date: DESC }, { lastmod: DESC }, { slug: DESC }], limit: 5) {
      nodes {
        ...mdxPostList
      }
    }
  }
`;
