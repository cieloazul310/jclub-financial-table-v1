import * as React from "react";
import { graphql, type PageProps } from "gatsby";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  Jumbotron,
  Section,
  Article,
  Paragraph,
  useSiteMetadata,
  AppLink,
} from "@cieloazul310/gatsby-theme-aoi";
import type { MdxPostListFragment } from "types";
import Layout from "@/layout";
import Seo from "@/components/seo";
import GridItemMenu from "@/components/grid-item-menu";
import PostList from "@/components/post-list";
import { J1Link, J2Link, J3Link } from "@/components/links/category-link";
import YearsLink from "@/components/links/years-link";
import AttributionDoc from "@/components/article/attribution";
import { AdInSectionDividerOne } from "@/components/ads";

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
      <div>
        <Jumbotron maxWidth="md" component="header">
          <Typography variant="h5" component="h2" gutterBottom>
            {title}
          </Typography>
          <Paragraph>{description}</Paragraph>
        </Jumbotron>
        {/*
        <Jumbotron maxWidth="md" bgcolor="primary.dark" height={40}>
          <AppLink href="/year/2023/" color="inherit">
            <Typography variant="h6" component="h3" color="inherit">
              2023年度決算(本発表版)を更新しました
            </Typography>
          </AppLink>
        </Jumbotron>
        */}
      </div>
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
            <GridItemMenu
              title="経営情報の見方"
              href="/docs"
              description="経営情報の項目と用語の簡易な解説"
            />
            <GridItemMenu
              title="項目別表示"
              href="/series"
              description="営業収入や入場者数など特定の項目を、縦軸にクラブ、横軸に年度で表したページ"
            />
            <GridItemMenu
              title="データダウンロード"
              href="/download"
              description="データをJSONやCSV形式でダウンロードできるページ"
            />
          </Grid>
        </Article>
      </Section>
      <Section>
        <Article maxWidth="md">
          <PostList
            posts={allMdxPost.nodes}
            title="最新の記事"
            more={{ href: "/posts/", title: "記事一覧" }}
          />
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
    allMdxPost(
      filter: { draft: { ne: true } }
      sort: [{ date: DESC }, { lastmod: DESC }, { slug: DESC }]
      limit: 5
    ) {
      nodes {
        ...mdxPostList
      }
    }
  }
`;
