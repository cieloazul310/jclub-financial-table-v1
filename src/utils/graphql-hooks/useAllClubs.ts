import { useStaticQuery, graphql } from "gatsby";
import type { Club } from "types";

type AllClubsQueryData = {
  allClub: {
    nodes: Pick<
      Club,
      | "id"
      | "slug"
      | "href"
      | "name"
      | "short_name"
      | "fullname"
      | "category"
      | "company"
      | "period"
      | "hometown"
      | "website"
      | "settlement"
      | "realatedCompanies"
      | "annotation"
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
          period
          hometown
          website
          settlement
          relatedCompanies
          annotation
        }
      }
    }
  `);
  return data.allClub.nodes;
}
