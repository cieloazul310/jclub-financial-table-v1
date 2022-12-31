import { useStaticQuery, graphql } from 'gatsby';
import type { ClubBrowser } from '../../../types';

type UseClubsByCategoryQueryData = {
  j1: {
    edges: {
      node: Pick<ClubBrowser, 'id' | 'href' | 'name' | 'short_name' | 'slug'>;
    }[];
  };
  j2: {
    edges: {
      node: Pick<ClubBrowser, 'id' | 'href' | 'name' | 'short_name' | 'slug'>;
    }[];
  };
  j3: {
    edges: {
      node: Pick<ClubBrowser, 'id' | 'href' | 'name' | 'short_name' | 'slug'>;
    }[];
  };
};

export default function useClubsByCategory() {
  const data = useStaticQuery<UseClubsByCategoryQueryData>(graphql`
    {
      j1: allClub(filter: { category: { eq: "J1" } }, sort: { fields: index, order: ASC }) {
        edges {
          node {
            id
            slug
            href
            name
            short_name
          }
        }
      }
      j2: allClub(filter: { category: { eq: "J2" } }, sort: { fields: index, order: ASC }) {
        edges {
          node {
            id
            slug
            href
            name
            short_name
          }
        }
      }
      j3: allClub(filter: { category: { eq: "J3" } }, sort: { fields: index, order: ASC }) {
        edges {
          node {
            id
            slug
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
