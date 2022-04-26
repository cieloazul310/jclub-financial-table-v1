import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { Jumbotron, Section, SectionDivider, Article, PanelLink, ListItemLink } from '@cieloazul310/gatsby-theme-aoi';
import Layout from '../../layout';
import { MdxPostByYear } from '../../../types';

type ArchivePageData = {
  allMdxPostByYears: Pick<MdxPostByYear, 'basePath' | 'year' | 'totalCount'>[];
};

function ArchivePage({ data }: PageProps<ArchivePageData>) {
  const { allMdxPostByYears } = data;

  return (
    <Layout title="記事アーカイブ">
      <Jumbotron maxWidth="md">
        <Typography variant="h5" component="h2" gutterBottom>
          記事アーカイブ
        </Typography>
      </Jumbotron>
      <SectionDivider />
      <Section>
        <Article maxWidth="md">
          <List>
            {allMdxPostByYears.map(({ basePath, year, totalCount }, index) => (
              <ListItemLink
                key={basePath}
                to={basePath}
                primaryText={`${year}年`}
                secondaryText={`${totalCount} posts`}
                divider={index !== allMdxPostByYears.length - 1}
              />
            ))}
          </List>
        </Article>
      </Section>
      <SectionDivider />
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

export default ArchivePage;

export const query = graphql`
  {
    allMdxPostByYears {
      basePath
      totalCount
      year
    }
  }
`;
