import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import type { Year } from '../../../types';

type AllYearsQueryData = {
  allYear: {
    nodes: Pick<Year, 'id' | 'year' | 'href'>[];
  };
};

export default function useAllYears(sort?: 'asc' | 'desc') {
  const data = useStaticQuery<AllYearsQueryData>(graphql`
    {
      allYear(sort: { year: ASC }) {
        nodes {
          id
          year
          href
        }
      }
    }
  `);
  return React.useMemo(() => {
    if (!sort || sort === 'asc') return data.allYear.nodes;
    return [...data.allYear.nodes].sort((a, b) => b.year - a.year);
  }, [data, sort]);
}
