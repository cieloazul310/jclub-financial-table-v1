import { useStaticQuery, graphql } from 'gatsby';
import { ClubNode } from '../../../types';

type UseClubsByCategoryQueryData = {
  j1: {
    edges: {
      node: Pick<ClubNode, 'id' | 'href' | 'name' | 'short_name'>;
    }[];
  };
  j2: {
    edges: {
      node: Pick<ClubNode, 'id' | 'href' | 'name' | 'short_name'>;
    }[];
  };
  j3: {
    edges: {
      node: Pick<ClubNode, 'id' | 'href' | 'name' | 'short_name'>;
    }[];
  };
};

export default function useClubsByCategory() {
  const data = useStaticQuery<UseClubsByCategoryQueryData>(graphql`
    {
      j1: allClub(filter: { category: { eq: "J1" } }) {
        edges {
          node {
            id
            href
            name
            short_name
          }
        }
      }
      j2: allClub(filter: { category: { eq: "J2" } }) {
        edges {
          node {
            id
            href
            name
            short_name
          }
        }
      }
      j3: allClub(filter: { category: { eq: "J3" } }) {
        edges {
          node {
            id
            href
            name
            short_name
          }
        }
      }
    }
  `);
  return data;
}
