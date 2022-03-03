import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import DocContainer from './DocContainer';
import { DocsQueryData } from '../../../types';

function RevenueDoc() {
  const { mdx } = useStaticQuery<DocsQueryData>(graphql`
    query {
      mdx(frontmatter: { id: { eq: "revenue" } }) {
        body
        frontmatter {
          title
        }
      }
    }
  `);
  return <DocContainer mdx={mdx} />;
}

export default RevenueDoc;
