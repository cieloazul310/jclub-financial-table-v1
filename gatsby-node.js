// eslint-disable-next-line import/no-extraneous-dependencies
require('ts-node').register();

exports.createSchemaCustomization = require('./gatsby-node/index').createSchemaCustomization;

exports.sourceNodes = require('./gatsby-node/index').sourceNodes;

// exports.onCreateNode = require('./gatsby-node/index').onCreateNode;

exports.createResolvers = require('./gatsby-node/index').createResolvers;

exports.createPages = require('./gatsby-node/index').createPages;

/*
const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allClubsYaml {
        edges {
          node {
            slug
          }
          previous {
            slug
            name
          }
          next {
            slug
            name
          }
        }
      }
      allYearsYaml(sort: { fields: year }) {
        edges {
          node {
            id
            categories
            year
          }
          next {
            year
          }
          previous {
            year
          }
        }
      }
    }
  `);
  const { allClubsYaml, allYearsYaml } = result.data;

  allClubsYaml.edges.forEach(({ node, previous, next }) => {
    createPage({
      path: `/club/${node.slug}`,
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

  allYearsYaml.edges.forEach(({ node, previous, next }) => {
    createPage({
      path: `/year/${node.year}`,
      component: path.resolve(`./src/templates/year.tsx`),
      context: {
        previous,
        next,
        year: node.year,
      },
    });
  });
};
*/
