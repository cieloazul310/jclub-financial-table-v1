import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { ArticleTitle, SubParagraph } from '@cieloazul310/gatsby-theme-aoi';
import { muiComponents } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import Shortcodes from '../Shortcodes';
import type { DocsQueryData } from '../../../types';

type DocContainerProps = {
  mdx: DocsQueryData['mdx'];
};

function DocContainer({ mdx }: DocContainerProps) {
  const { frontmatter, body } = mdx;
  const { title, lastmod } = frontmatter;
  return (
    <MDXProvider components={{ ...muiComponents, ...Shortcodes }}>
      <ArticleTitle>{title}</ArticleTitle>
      <MDXRenderer>{body}</MDXRenderer>
      {lastmod ? <SubParagraph>最終更新日: {lastmod}</SubParagraph> : null}
    </MDXProvider>
  );
}

export default DocContainer;
