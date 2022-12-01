import { useStaticQuery, graphql } from 'gatsby';
import type { Year } from '../../../types';

type AllYearsQueryData = {
  allYear: {
    edges: {
      node: Pick<Year, 'id' | 'year' | 'href'>;
    }[];
  };
};

export default function useAllYears() {
  const data = useStaticQuery<AllYearsQueryData>(graphql`
    {
      allYear {
        edges {
          node {
            id
            year
            href
          }
        }
      }
    }
  `);
  return data.allYear.edges;
}
