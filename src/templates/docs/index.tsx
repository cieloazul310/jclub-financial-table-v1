import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import Container from '@mui/material/Container';
import { Seo, Jumbotron, Section, Article, PanelLink, mdxComponents } from '@cieloazul310/gatsby-theme-aoi';
import { AdInSectionDividerOne } from '../../components/Ads';
import shortcodes from '../../components/Shortcodes';
import DocsMenu from './DocsMenu';
import Layout from '../../layout';

type DocsTemplateData = {
  mdx: {
    frontmatter: {
      title: string;
    };
  };
  next: {
    frontmatter: {
      title: string;
    };
    fields: {
      slug: string;
    };
  } | null;
};

type DocsTemplatePageContext = {
  slug: string;
  next: string | null;
};

function DocsTemplate({ data, children }: PageProps<DocsTemplateData, DocsTemplatePageContext>) {
  const { title } = data.mdx.frontmatter;
  return (
    <Layout title={title} drawerContents={<DocsMenu />} componentViewports={{ swipeableDrawer: 'smDown' }}>
      <Jumbotron title={title} maxWidth="md" component="header" />
      <Section component="main">
        <Article maxWidth="md">
          <MDXProvider components={{ ...mdxComponents, ...shortcodes }}>{children}</MDXProvider>
        </Article>
      </Section>
      {data.next ? (
        <Section>
          <Container maxWidth="md" disableGutters>
            <PanelLink disableBorder disableMargin href={data.next.fields.slug}>
              {data.next.frontmatter.title}
            </PanelLink>
          </Container>
        </Section>
      ) : null}
      <Section>
        <Container maxWidth="md" disableGutters>
          <DocsMenu />
        </Container>
      </Section>
      <AdInSectionDividerOne />
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
  query Docs($slug: String!, $next: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
    }
    next: mdx(fields: { slug: { eq: $next, regex: "/docs/" } }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`;
