import * as path from 'path';
import { CreatePagesArgs } from 'gatsby';
import { Club, Year } from '../types';

type GraphQLResult = {
  allClub: {
    edges: {
      node: Pick<Club, 'slug' | 'href'>;
    }[];
  };
  allYear: {
    edges: {
      node: Pick<Year, 'year' | 'href'>;
    }[];
  };
};

export default async function createPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const { createPage } = actions;
  const result = await graphql<GraphQLResult>(`
    {
      allClub {
        edges {
          node {
            slug
            href
          }
        }
      }
      allYear(sort: { fields: year, order: ASC }) {
        edges {
          node {
            year
            href
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  if (!result.data) throw new Error('There are no data');
  const { allClub, allYear } = result.data;

  allClub.edges.forEach(({ node }, index) => {
    const previous = index !== 0 ? allClub.edges[index - 1] : null;
    const next = index !== allClub.edges.length - 1 ? allClub.edges[index + 1] : null;

    createPage({
      path: node.href,
      component: path.resolve(`./src/templates/club.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        previous,
        next,
        slug: node.slug,
      },
    });
  });

  allYear.edges.forEach(({ node }, index) => {
    const previous = index !== 0 ? allYear.edges[index - 1] : null;
    const next = index !== allYear.edges.length - 1 ? allClub.edges[index + 1] : null;

    createPage({
      path: node.href,
      component: path.resolve(`./src/templates/year.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        previous,
        next,
        year: node.year,
      },
    });
  });
}
