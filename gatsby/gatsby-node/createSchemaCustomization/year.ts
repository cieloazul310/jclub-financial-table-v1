import type { CreateSchemaCustomizationArgs } from 'gatsby';
import type { GatsbyIterable } from 'gatsby/dist/datastore/common/iterable';
import type { GatsbyGraphQLContext } from '../graphql';
import type { Year, Datum, Category, SortableKeys } from '../../../types';

function valuesToStats(data: { name: string; value: number }[]) {
  const values = data.sort((a, b) => a.value - b.value);
  const totalCount = values.length;
  const sum = values.reduce((accum, curr) => accum + curr.value, 0);
  const average = Math.round(sum / totalCount);

  return { values, totalCount, average };
}

function createStats(data: Datum<'node'>[], key: SortableKeys) {
  if (key === 'average_attd') {
    const values = data.map(({ league_attd, league_games, name }) => ({ name, value: Math.round(league_attd / league_games) }));
    return valuesToStats(values);
  }
  if (key === 'unit_price') {
    const values = data
      .filter(({ ticket }) => ticket !== null)
      .map(({ ticket, all_attd, name }) => ({ name, value: Math.round(((ticket ?? 0) * 1000000) / all_attd) }));
    return valuesToStats(values);
  }
  const values = data.filter((datum) => datum[key] !== null).map((datum) => ({ name: datum.name, value: datum[key] ?? 0 }));
  return valuesToStats(values);
}

function entriesToStats(entries: GatsbyIterable<Datum<'node'>>, categories: Category[]) {
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

export default async function createYearSchema({ actions, schema }: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;

  createTypes(`
    type Year implements Node @dontInfer {
      id: String!
      year: Int!
      href: String!
      categories: [String!]!
      data: [Data]!
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
      values: [StatsValuesItem]!
      totalCount: Int!
      average: Int!
    }
    type StatsValuesItem {
      name: String!
      value: Int!
    }
  `);

  createTypes(
    schema.buildObjectType({
      name: `Year`,
      fields: {
        data: {
          type: `[Data]!`,
          resolve: async (source: Year, args, context: GatsbyGraphQLContext) => {
            const { entries } = await context.nodeModel.findAll<Datum<'node'>>({
              type: `Data`,
              query: {
                filter: { year: { eq: source.year } },
                sort: { revenue: 'DESC', profit: 'DESC' },
              },
            });
            return entries;
          },
        },
        stats: {
          type: `YearStats!`,
          resolve: async (source: Year, args, context: GatsbyGraphQLContext) => {
            const { entries } = await context.nodeModel.findAll<Datum<'node'>>({
              type: `Data`,
              query: {
                filter: { year: { eq: source.year } },
              },
            });
            return entriesToStats(entries, source.categories);
          },
        },
      },
    })
  );
}
