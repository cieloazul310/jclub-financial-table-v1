import { useStaticQuery, graphql } from 'gatsby';
import type { Club } from '../../../types';

type AllClubsQueryData = {
  allClub: {
    nodes: Pick<
      Club,
      'id' | 'slug' | 'href' | 'name' | 'short_name' | 'fullname' | 'category' | 'company' | 'hometown' | 'realatedCompanies' | 'settlement'
    >[];
  };
};

export default function useAllClubs() {
  const data = useStaticQuery<AllClubsQueryData>(graphql`
    {
      allClub {
        nodes {
          id
          slug
          href
          name
          short_name
          fullname
          category
          company
          hometown
          relatedCompanies
          settlement
        }
      }
    }
  `);
  return data.allClub.nodes;
}
