import { useStaticQuery, graphql } from 'gatsby';
import type { Year } from '../../../types';

type AllYearsQueryData = {
  allYear: {
    nodes: Pick<Year, 'id' | 'year' | 'href'>[];
  };
};

export default function useAllYears() {
  const data = useStaticQuery<AllYearsQueryData>(graphql`
    {
      allYear {
        nodes {
          id
          year
          href
        }
      }
    }
  `);
  return data.allYear.nodes;
}
