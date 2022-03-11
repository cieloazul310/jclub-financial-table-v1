"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
async function createPages({ graphql, actions, reporter }) {
    const { createPage } = actions;
    const result = await graphql(`
    {
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
    if (!result.data)
        throw new Error('There are no data');
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
                // Data passed to context is available
                // in page queries as GraphQL variables.
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
                // Data passed to context is available
                // in page queries as GraphQL variables.
                previous,
                next,
                year: node.year,
                prevYear: previous?.node.year ?? null,
            },
        });
    });
}
exports.default = createPages;
