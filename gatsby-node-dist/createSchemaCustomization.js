"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function valuesToStats(data) {
    const values = data.sort((a, b) => a - b);
    const totalCount = values.length;
    const sum = values.reduce((accum, curr) => accum + curr, 0);
    const average = Math.round(sum / totalCount);
    return { values, totalCount, average };
}
function createStats(data, key) {
    if (key === 'average_attd') {
        const values = data.map(({ league_attd, league_games }) => Math.round(league_attd / league_games));
        return valuesToStats(values);
    }
    if (key === 'unit_price') {
        const values = data
            .filter(({ ticket }) => ticket !== null)
            .map(({ ticket, all_attd }) => Math.round(((ticket ?? 0) * 1000000) / all_attd));
        return valuesToStats(values);
    }
    const values = data.filter((datum) => datum[key] !== null).map((datum) => datum[key] ?? 0);
    return valuesToStats(values);
}
function entriesToStats(entries, categories) {
    const item = categories.map((category) => {
        const data = Array.from(entries).filter((datum) => datum.category === category);
        return {
            [category]: {
                revenue: createStats(data, 'revenue'),
                expense: createStats(data, 'expense'),
                net_worth: createStats(data, 'net_worth'),
                sponsor: createStats(data, 'sponsor'),
                ticket: createStats(data, 'ticket'),
                broadcast: createStats(data, 'broadcast'),
                salary: createStats(data, 'salary'),
                unit_price: createStats(data, 'unit_price'),
                average_attd: createStats(data, 'average_attd'),
            },
        };
    });
    return item.reduce((accum, curr) => ({ ...accum, ...curr }), {});
}
async function createSchemaCustomization({ actions, schema }) {
    const { createTypes } = actions;
    createTypes(`
    type Club implements Node @dontInfer {
      id: String!
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
    }
    type Year implements Node @dontInfer {
      id: String!
      year: Int!
      href: String!
      categories: [String!]!
      data: [Data]!
    }
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
    type YearStats {
      J1: Stats!
      J2: Stats!
      J3: Stats
    }
    type Stats {
      revenue: StatsValues!
      expense: StatsValues!
      net_worth: StatsValues!
      sponsor: StatsValues!
      ticket: StatsValues!
      broadcast: StatsValues!
      salary: StatsValues!
      average_attd: StatsValues!
      unit_price: StatsValues!
    }
    type StatsValues {
      values: [Int]!
      totalCount: Int!
      average: Int!
    }
  `);
    createTypes(schema.buildObjectType({
        name: `Data`,
        fields: {
            average_attd: {
                type: `Int!`,
                resolve: (source) => {
                    return Math.round(source.league_attd / source.league_games);
                },
            },
            unit_price: {
                type: `Int`,
                resolve: (source) => {
                    if (!source.ticket)
                        return null;
                    return Math.round((source.ticket * 1000000) / source.all_attd);
                },
            },
            previousData: {
                type: `Data`,
                resolve: async (source, args, context, info) => {
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
    }));
    createTypes(schema.buildObjectType({
        name: `Club`,
        fields: {
            data: {
                type: `[Data]!`,
                resolve: async (source, args, context, info) => {
                    const { entries } = await context.nodeModel.findAll({
                        type: `Data`,
                        query: {
                            filter: { slug: { eq: source.slug } },
                            sort: { fields: ['year'], order: ['ASC'] },
                        },
                    });
                    return entries;
                },
            },
        },
    }));
    createTypes(schema.buildObjectType({
        name: `Year`,
        fields: {
            data: {
                type: `[Data]!`,
                resolve: async (source, args, context, info) => {
                    const { entries } = await context.nodeModel.findAll({
                        type: `Data`,
                        query: {
                            filter: { year: { eq: source.year } },
                            sort: { fields: ['revenue', 'profit'], order: ['DESC', 'DESC'] },
                        },
                    });
                    return entries;
                },
            },
            stats: {
                type: `YearStats!`,
                resolve: async (source, args, context, info) => {
                    const { entries } = await context.nodeModel.findAll({
                        type: `Data`,
                        query: {
                            filter: { year: { eq: source.year } },
                        },
                    });
                    return entriesToStats(entries, source.categories);
                },
            },
        },
    }));
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
exports.default = createSchemaCustomization;
