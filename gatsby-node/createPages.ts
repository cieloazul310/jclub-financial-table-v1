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
    query {
      allClub {
        edges {
          node {
            slug
            href
            short_name
            name
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

  allClub.edges
    .map((data) => ({ ...data, mode: 'club' }))
    .forEach(({ node }, index, arr) => {
      const previous = index !== 0 ? arr[index - 1] : null;
      const next = index !== arr.length - 1 ? arr[index + 1] : null;

      createPage({
        path: node.href,
        component: path.resolve(`./src/templates/club.tsx`),
        context: {
          previous,
          next,
          slug: node.slug,
        },
      });
    });

  allYear.edges
    .map((data) => ({ ...data, mode: 'year' }))
    .forEach(({ node }, index, arr) => {
      const previous = index !== 0 ? arr[index - 1] : null;
      const next = index !== arr.length - 1 ? arr[index + 1] : null;

      createPage({
        path: node.href,
        component: path.resolve(`./src/templates/year.tsx`),
        context: {
          previous,
          next,
          year: node.year,
          prevYear: previous?.node.year ?? null,
        },
      });
    });
}
