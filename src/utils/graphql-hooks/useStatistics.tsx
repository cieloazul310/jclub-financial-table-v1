import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import type { Year, Statistics } from "types";

type StatisticQueryData = {
  allYear: {
    nodes: Pick<Year, "year" | "categories" | "stats">[];
  };
};

function useStatistics(): {
  J1: Statistics[];
  J2: Statistics[];
  J3: Statistics[];
} {
  const { allYear } = useStaticQuery<StatisticQueryData>(graphql`
    {
      allYear(sort: { year: ASC }) {
        nodes {
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
  `);
  return React.useMemo(() => {
    const J1 = allYear.nodes.map((node) => ({
      year: node.year,
      category: "J1",
      ...node.stats.J1,
    }));
    const J2 = allYear.nodes.map((node) => ({
      year: node.year,
      category: "J2",
      ...node.stats.J2,
    }));
    const J3 = allYear.nodes
      .filter((node) => node.categories.includes("J3"))
      .map((node) => ({
        year: node.year,
        category: "J3",
        ...node.stats.J3,
      })) as Statistics[];

    return { J1, J2, J3 };
  }, [allYear]);
}

export default useStatistics;
