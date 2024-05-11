import * as React from "react";
import { mdxComponents } from "@cieloazul310/gatsby-theme-aoi";
import Attribution from "docs/attribution.mdx";
import DocContainer from "./doc-container";
import shortcodes from "../shortcodes";

function AttributionDoc() {
  return (
    <DocContainer title="データについて">
      <Attribution components={{ ...mdxComponents, ...shortcodes }} />
    </DocContainer>
  );
}

export default AttributionDoc;
