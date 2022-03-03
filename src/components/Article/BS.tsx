import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import DocContainer from './DocContainer';
import { DocsQueryData } from '../../../types';

function BSDoc() {
  const { mdx } = useStaticQuery<DocsQueryData>(graphql`
    query {
      mdx(frontmatter: { id: { eq: "bs" } }) {
        body
        frontmatter {
          title
        }
      }
    }
  `);
  return <DocContainer mdx={mdx} />;
}

export default BSDoc;
