import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import DocContainer from './DocContainer';
import type { DocsQueryData } from '../../../types';

function AttributionDoc() {
  const { mdx } = useStaticQuery<DocsQueryData>(graphql`
    query {
      mdx(frontmatter: { id: { eq: "data" } }) {
        body
        frontmatter {
          title
        }
      }
    }
  `);
  return <DocContainer mdx={mdx} />;
}

export default AttributionDoc;
