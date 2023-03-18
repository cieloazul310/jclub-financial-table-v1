import type { CreateSchemaCustomizationArgs } from 'gatsby';
import type { GraphQLFieldResolver, GraphQLResolveInfo, GraphQLObjectType } from 'gatsby/graphql';
// import { GatsbyIterable,} from 'gatsby/dist/datastore/common/iterable';
import type { GatsbyGraphQLContext } from '../graphql';
import type { Mdx, MdxPost } from '../../../types';

function mdxResolverPassthrough(fieldName: string): GraphQLFieldResolver<Mdx<'node'>, GatsbyGraphQLContext> {
  return async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`) as GraphQLObjectType<Mdx<'node'>, GatsbyGraphQLContext>;
    const mdxNode = context.nodeModel.getNodeById<Mdx<'node'>>({
      id: source.parent as string,
    });
    const resolver = type?.getFields()[fieldName].resolve;
    if (!resolver) return {};
    if (!mdxNode) return {};
    const result = await resolver(mdxNode, args, context, {
      fieldName,
    } as GraphQLResolveInfo);
    return result;
  };
}

export default async function createDataSchema({ actions, schema }: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;

  createTypes(`
    type MdxPost implements Node @dontInfer {
      title: String!
      slug: String!
      date: Date! @dateformat
      lastmod: Date! @dateformat
      club: [Club]
      draft: Boolean!
      excerpt: String
    }
    type MdxPostByYear {
      id: String!
      year: String!
      basePath: String!
      gte: String!
      lt: String!
      totalCount: Int!
    }
  `);

  createTypes(
    schema.buildObjectType({
      name: `MdxPost`,
      fields: {
        lastmod: {
          type: `Date!`,
          resolve: (source: MdxPost<'node'>) => source.lastmod ?? source.date,
        },
        club: {
          type: `[Club]`,
          resolve: async (source: MdxPost<'node'>, args: unknown, context: GatsbyGraphQLContext) => {
            if (!source.club) return null;
            const { entries } = await context.nodeModel.findAll({
              type: `Club`,
              query: {
                filter: { short_name: { in: source.club } },
              },
            });
            return entries;
          },
        },
        excerpt: {
          type: `String`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
      },
    })
  );
}
