import * as React from "react";
import { Section, Article, H2 } from "@cieloazul310/gatsby-theme-aoi";
import type { Year } from "types";
import Stats from "../stats";

type YearSummaryProps = {
  year: Pick<Year, "year" | "stats">;
  prevYear: Pick<Year, "stats"> | null;
};

function YearSummary({ year, prevYear }: YearSummaryProps) {
  return (
    <Section>
      <Article maxWidth="md">
        <H2>{year.year}年</H2>
        <Stats year={year} prevYear={prevYear} />
      </Article>
    </Section>
  );
}

export default YearSummary;
