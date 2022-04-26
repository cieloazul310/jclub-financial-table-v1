import { CreateSchemaCustomizationArgs } from 'gatsby';
import { GatsbyGraphQLContext } from '../graphql';
import { Datum } from '../../types';

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
          resolve: (source: Datum) => {
            return Math.round(source.league_attd / source.league_games);
          },
        },
        unit_price: {
          type: `Int`,
          resolve: (source: Datum) => {
            if (!source.ticket) return null;
            return Math.round((source.ticket * 1000000) / source.all_attd);
          },
        },
        previousData: {
          type: `Data`,
          resolve: async (source: Datum, args, context: GatsbyGraphQLContext) => {
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

  createTypes(`
    type Dict {
      name: String!
      fullname: String!
      id: String!
      year: String!
      category: String!
      license: String!
      rank: String!
      points: String!
      ppg: String!
      elevation: String!
      revenue: String!
      sponsor: String!
      ticket: String!
      broadcast: String!
      academy_rev: String!
      goods_rev: String!
      other_revs: String!
      expense: String!
      salary: String!
      manage_exp: String!
      general_exp: String!
      game_exp: String!
      team_exp: String!
      academy_exp: String!
      women_exp: String!
      goods_exp: String!
      sga: String!
      op_profit: String!
      no_rev: String!
      no_exp: String!
      ordinary_profit: String!
      sp_rev: String!
      sp_exp: String!
      profit_before_tax: String!
      related_revenue: String!
      tax: String!
      profit: String!
      curr_assets: String!
      fixed_assets: String!
      assets: String!
      curr_liabilities: String!
      fixed_liabilities: String!
      liabilities: String!
      capital_stock: String!
      capital_surplus: String!
      retained_earnings: String!
      net_worth: String!
      league_attd: String!
      league_games: String!
      leaguecup_attd: String!
      leaguecup_games: String!
      po_attd: String!
      po_games: String!
      acl_attd: String!
      acl_games: String!
      second_attd: String!
      second_games: String!
      all_attd: String!
      all_games: String!
      average_attd: String!
      unit_price: String!
    }
  `);
}
