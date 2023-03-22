import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import Container from '@mui/material/Container';
import { Seo, Jumbotron, Section, Article, PanelLink, mdxComponents } from '@cieloazul310/gatsby-theme-aoi';
import shortcodes from '../components/Shortcodes';
import Layout from '../layout';

type DocsTemplateData = {
  mdx: {
    frontmatter: {
      title: string;
    };
  };
};

type DocsTemplatePageContext = {
  slug: string;
};

function DocsTemplate({ data, children }: PageProps<DocsTemplateData, DocsTemplatePageContext>) {
  const { title } = data.mdx.frontmatter;
  return (
    <Layout title={title}>
      <Jumbotron title={title} maxWidth="md" component="header" />
      <Section component="main">
        <Article maxWidth="md">
          <MDXProvider components={{ ...mdxComponents, ...shortcodes }}>{children}</MDXProvider>
        </Article>
      </Section>
      <Section>
        <Container maxWidth="md" disableGutters>
          <PanelLink disableBorder disableMargin href="/docs">
            経営情報の見方
          </PanelLink>
        </Container>
      </Section>
    </Layout>
  );
}

export default DocsTemplate;

export function Head({ data }: HeadProps<DocsTemplateData, DocsTemplatePageContext>) {
  const { title } = data.mdx.frontmatter;
  return <Seo title={title} />;
}

export const query = graphql`
  query Docs($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
    }
  }
`;
