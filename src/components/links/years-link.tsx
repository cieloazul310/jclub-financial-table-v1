import * as React from "react";
import { useIsMobile } from "@cieloazul310/gatsby-theme-aoi";
import useAllYears from "@/utils/graphql-hooks/useAllYears";
import LinksCore from "./links-core";

function YearsLink() {
  const isMobile = useIsMobile();
  const years = useAllYears(isMobile ? "desc" : "asc");
  const items = years.map(({ id, year, href }) => ({
    id,
    href,
    label: `${year}年度`,
    label_short: year.toString(),
  }));

  return <LinksCore title="年度別経営情報" items={items} />;
}

export default YearsLink;
