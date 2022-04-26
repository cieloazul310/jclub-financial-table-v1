import { CreateSchemaCustomizationArgs } from 'gatsby';
import { GatsbyGraphQLContext } from '../graphql';
import { Club, DatumNode, MdxPost } from '../../types';

export default async function createClubSchema({ actions, schema }: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;

  createTypes(`
    type Club implements Node @dontInfer {
      id: String!
      index: Int!
      slug: String!
      href: String!
      name: String!
      fullname: String!
      short_name: String!
      company: String!
      category: String!
      hometown: String!
      area: String!
      settlement: String
      relatedCompanies: [String]
      data: [Data]!
      posts: PostsByClub!
    }
    type PostsByClub {
      entries: [MdxPost]!
      totalCount: Int!
    }
  `);

  createTypes(
    schema.buildObjectType({
      name: `Club`,
      fields: {
        data: {
          type: `[Data]!`,
          resolve: async (source: Club, args, context: GatsbyGraphQLContext) => {
            const { entries } = await context.nodeModel.findAll<DatumNode>({
              type: `Data`,
              query: {
                filter: { slug: { eq: source.slug } },
                sort: { fields: ['year'], order: ['ASC'] },
              },
            });
            return entries;
          },
        },
        posts: {
          type: `PostsByClub!`,
          resolve: async (source: Club, args: unknown, context: GatsbyGraphQLContext) => {
            return context.nodeModel.findAll<MdxPost>({
              type: `MdxPost`,
              query: {
                filter: { club: { short_name: { eq: source.short_name } } },
                sort: { fields: ['date'], order: ['DESC'] },
              },
            });
          },
        },
      },
    })
  );
}
