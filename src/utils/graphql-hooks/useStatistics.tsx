import { useStaticQuery, graphql } from 'gatsby';
import { YearBrowser, Statistics } from '../../../types';

type StatisticQueryData = {
  allYear: {
    edges: {
      node: Pick<YearBrowser, 'year' | 'categories' | 'stats'>;
    }[];
  };
};

function useStatistics(): {
  j1: Statistics[];
  j2: Statistics[];
  j3: Statistics[];
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
  const j1 = allYear.edges.map(({ node }) => ({
    year: node.year,
    category: 'J1',
    ...node.stats.J1,
  }));
  const j2 = allYear.edges.map(({ node }) => ({
    year: node.year,
    category: 'J2',
    ...node.stats.J2,
  }));
  const j3 = allYear.edges
    .filter(({ node }) => node.categories.includes('J3'))
    .map(({ node }) => ({
      year: node.year,
      category: 'J3',
      ...node.stats.J3,
    })) as Statistics[];
  return { j1, j2, j3 };
}

export default useStatistics;
