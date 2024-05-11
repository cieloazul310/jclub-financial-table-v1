import * as React from "react";
import {
  Seo as DefaultSeo,
  type SeoProps as DefaultSeoProps,
} from "@cieloazul310/gatsby-theme-aoi";
import ogImage from "../images/ogp.png";

function Seo({ image, ...props }: DefaultSeoProps) {
  const ogImageUrl = image ?? ogImage;
  return <DefaultSeo image={ogImageUrl} {...props} />;
}

export default Seo;
