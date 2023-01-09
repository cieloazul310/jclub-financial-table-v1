import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import DocContainer from './DocContainer';
import type { DocsQueryData } from '../../../types';

function RevenueDoc() {
  const { mdx } = useStaticQuery<DocsQueryData>(graphql`
    query {
      mdx(frontmatter: { id: { eq: "revenue" } }) {
        body
        frontmatter {
          title
          lastmod(formatString: "YYYY年MM月DD日")
        }
      }
    }
  `);
  return <DocContainer mdx={mdx} />;
}

export default RevenueDoc;
