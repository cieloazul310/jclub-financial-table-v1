import * as React from 'react';
/*
import { MDXProvider } from '@mdx-js/react';
import { ArticleTitle, SubParagraph } from '@cieloazul310/gatsby-theme-aoi';
import { muiComponents } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import Shortcodes from '../Shortcodes';
import type { DocsQueryData } from '../../../types';
*/

type DocContainerProps = {
  // mdx: DocsQueryData['mdx'];
  children: React.ReactNode;
};

function DocContainer({ children }: DocContainerProps) {
  /*
  const { frontmatter, body } = mdx;
  const { title, lastmod } = frontmatter;
  return (
    <MDXProvider components={{ ...muiComponents, ...Shortcodes }}>
      <ArticleTitle>{title}</ArticleTitle>
      {children}
      {lastmod ? <SubParagraph>最終更新日: {lastmod}</SubParagraph> : null}
    </MDXProvider>
  );
  */
  return children;
}

export default DocContainer;
