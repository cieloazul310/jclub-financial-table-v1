import type { CreateSchemaCustomizationArgs } from 'gatsby';
import type { GatsbyGraphQLContext } from '../graphql';
import type { Datum } from '../../../types';

export default async function createDataSchema({ actions, schema }: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;

  createTypes(`
    type Data implements Node @dontInfer {
      id: String!
      name: String!
      slug: String!
      fullname: String!
      year: Int!
      category: String!
      license: String
      rank: Int!
      points: Int!
      ppg: Float!
      elevation: String
      revenue: Int!
      expense: Int!
      op_profit: Int!
      no_rev: Int
      no_exp: Int
      ordinary_profit: Int!
      sp_rev: Int
      sp_exp: Int
      profit_before_tax: Int
      tax: Int
      profit: Int!
      curr_assets: Int
      fixed_assets: Int
      assets: Int
      curr_liabilities: Int
      fixed_liabilities: Int
      liabilities: Int
      net_worth: Int
      capital_stock: Int
      capital_surplus: Int
      retained_earnings: Int
      profit: Int!
      revenue: Int!
      sponsor: Int
      ticket: Int
      broadcast: Int
      academy_rev: Int
      goods_rev: Int
      other_revs: Int
      related_revenue: Int
      expense: Int!
      salary: Int
      manage_exp: Int
      general_exp: Int
      game_exp: Int
      team_exp: Int
      academy_exp: Int
      women_exp: Int
      goods_exp: Int
      sga: Int
      league_attd: Int!
      league_games: Int!
      leaguecup_attd: Int
      leaguecup_games: Int
      po_attd: Int
      po_games: Int
      acl_attd: Int
      acl_games: Int
      second_attd: Int
      second_games: Int
      all_attd: Int!
      all_games: Int!
      average_attd: Int!
      unit_price: Int
      previousData: Data
    }
  `);

  createTypes(
    schema.buildObjectType({
      name: `Data`,
      fields: {
        average_attd: {
          type: `Int!`,
          resolve: (source: Datum<'bare'>) => Math.round(source.league_attd / source.league_games),
        },
        unit_price: {
          type: `Int`,
          resolve: (source: Datum<'bare'>) => {
            if (!source.ticket) return null;
            return Math.round((source.ticket * 1000000) / source.all_attd);
          },
        },
        previousData: {
          type: `Data`,
          resolve: async (source: Datum<'bare'>, args, context: GatsbyGraphQLContext) => {
            const node = await context.nodeModel.findOne({
              type: `Data`,
              query: {
                filter: { year: { eq: source.year - 1 }, slug: { eq: source.slug } },
              },
            });
            return node;
          },
        },
      },
    })
  );
}
