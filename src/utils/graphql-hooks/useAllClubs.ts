import { useStaticQuery, graphql } from 'gatsby';
import type { ClubNode } from '../../../types';

type AllClubsQueryData = {
  allClub: {
    edges: {
      node: Pick<
        ClubNode,
        | 'id'
        | 'slug'
        | 'href'
        | 'name'
        | 'short_name'
        | 'fullname'
        | 'category'
        | 'company'
        | 'hometown'
        | 'realatedCompanies'
        | 'settlement'
      >;
    }[];
  };
};

export default function useAllClubs() {
  const data = useStaticQuery<AllClubsQueryData>(graphql`
    {
      allClub {
        edges {
          node {
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
    }
  `);
  return data.allClub.edges;
}
