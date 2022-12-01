import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import type { YearBrowser, Statistics } from '../../../types';

type StatisticQueryData = {
  allYear: {
    edges: {
      node: Pick<YearBrowser, 'year' | 'categories' | 'stats'>;
    }[];
  };
};

function useStatistics(): {
  J1: Statistics[];
  J2: Statistics[];
  J3: Statistics[];
} {
  const { allYear } = useStaticQuery<StatisticQueryData>(graphql`
    query {
      allYear(sort: { fields: year, order: ASC }) {
        edges {
          node {
            year
            categories
            stats {
              J1 {
                ...allStats
              }
              J2 {
                ...allStats
              }
              J3 {
                ...allStats
              }
            }
          }
        }
      }
    }
  `);
  return React.useMemo(() => {
    const J1 = allYear.edges.map(({ node }) => ({
      year: node.year,
      category: 'J1',
      ...node.stats.J1,
    }));
    const J2 = allYear.edges.map(({ node }) => ({
      year: node.year,
      category: 'J2',
      ...node.stats.J2,
    }));
    const J3 = allYear.edges
      .filter(({ node }) => node.categories.includes('J3'))
      .map(({ node }) => ({
        year: node.year,
        category: 'J3',
        ...node.stats.J3,
      })) as Statistics[];

    return { J1, J2, J3 };
  }, [allYear]);
}

export default useStatistics;
