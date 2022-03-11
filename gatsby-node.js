// export { createPages, createResolvers, createSchemaCustomization, sourceNodes } from './gatsby-node/index';
const { createPages, createResolvers, createSchemaCustomization, sourceNodes } = require('./gatsby-node-dist');

exports.createPages = createPages;
exports.createResolvers = createResolvers;
exports.createSchemaCustomization = createSchemaCustomization;
exports.sourceNodes = sourceNodes;
