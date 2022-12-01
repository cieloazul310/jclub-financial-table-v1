import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { ArticleTitle } from '@cieloazul310/gatsby-theme-aoi';
import { muiComponents } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import type { DocsQueryData } from '../../../types';

type DocContainerProps = {
  mdx: DocsQueryData['mdx'];
};

function DocContainer({ mdx }: DocContainerProps) {
  const { frontmatter, body } = mdx;
  return (
    <MDXProvider components={muiComponents}>
      <ArticleTitle>{frontmatter.title}</ArticleTitle>
      <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
  );
}

export default DocContainer;
