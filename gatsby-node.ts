import type { CreateWebpackConfigArgs } from 'gatsby';

export { createPages, createResolvers, createSchemaCustomization, onCreateNode, sourceNodes } from './gatsby/gatsby-node';

/**
 * @patch
 * https://github.com/gatsbyjs/gatsby/issues/36899
 */
export function onCreateWebpackConfig({ actions, stage }: CreateWebpackConfigArgs) {
  if (stage === `develop` || stage === `develop-html`) {
    actions.setWebpackConfig({
      cache: false,
    });
  }
}
