import { CreateSchemaCustomizationArgs, Node } from 'gatsby';
import { GraphQLFieldResolver, GraphQLResolveInfo, GraphQLObjectType } from 'gatsby/graphql';
// import { GatsbyIterable,} from 'gatsby/dist/datastore/common/iterable';
import { GatsbyGraphQLContext } from '../graphql';
import { MdxBare, MdxPostBare } from '../../types';

function mdxResolverPassthrough(fieldName: string): GraphQLFieldResolver<MdxBare & Node, GatsbyGraphQLContext> {
  return async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`) as GraphQLObjectType<MdxBare & Node, GatsbyGraphQLContext>;
    const mdxNode = context.nodeModel.getNodeById<MdxBare & Node>({
      id: source.parent as string,
    });
    const resolver = type?.getFields()[fieldName].resolve;
    if (!resolver) return {};
    const result = await resolver(mdxNode ?? {}, args, context, {
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
      body: String!
      excerpt: String!
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
          resolve: (source: MdxPostBare) => {
            return source.lastmod ?? source.date;
          },
        },
        club: {
          type: `[Club]`,
          resolve: async (source: MdxPostBare, args: unknown, context: GatsbyGraphQLContext) => {
            if (!source.club) return null;
            const { entries } = await context.nodeModel.findAll({
              type: `Club`,
              query: {
                filter: { short_name: { in: source.club } },
              },
            });
            return entries;
            /*
            const club = await context.nodeModel.findOne({
              type: `Club`,
              query: {
                filter: { short_name: { eq: source.club } },
              },
            });
            return club;
            */
          },
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140,
            },
            truncate: {
              type: `Boolean`,
              defaultValue: true,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
      },
    })
  );
}
