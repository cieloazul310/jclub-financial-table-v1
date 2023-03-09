import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { Jumbotron, Section, Article, PanelLink, ListItemLink } from '@cieloazul310/gatsby-theme-aoi';
import Layout from '../../layout';
import Seo from '../../components/Seo';
import type { MdxPostByYear } from '../../../types';

type ArchivePageData = {
  allMdxPostByYears: Pick<MdxPostByYear, 'basePath' | 'year' | 'totalCount'>[];
};

function ArchivePage({ data }: PageProps<ArchivePageData>) {
  const { allMdxPostByYears } = data;

  return (
    <Layout title="記事アーカイブ">
      <Jumbotron maxWidth="md" component="header">
        <Typography variant="h5" component="h2" gutterBottom>
          記事アーカイブ
        </Typography>
      </Jumbotron>
      <Section component="main">
        <Article maxWidth="md">
          <List>
            {allMdxPostByYears.map(({ basePath, year, totalCount }, index) => (
              <ListItemLink
                key={basePath}
                href={basePath}
                primaryText={`${year}年`}
                secondaryText={`${totalCount} posts`}
                divider={index !== allMdxPostByYears.length - 1}
              />
            ))}
          </List>
        </Article>
      </Section>
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

export default ArchivePage;

export function Head() {
  return <Seo title="記事アーカイブ" />;
}

export const query = graphql`
  {
    allMdxPostByYears {
      basePath
      totalCount
      year
    }
  }
`;
