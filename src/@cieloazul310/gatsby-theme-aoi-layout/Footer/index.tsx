import * as React from "react";
import Box from "@mui/material/Box";
import { Article } from "@cieloazul310/gatsby-theme-aoi";
import { AdInFooter } from "@/components/ads";
import FooterLinks from "./FooterLinks";
import Copyrights from "./Copyrights";

function Footer() {
  return (
    <Box sx={{ py: 4, bgcolor: "grey.900", color: "grey.200" }}>
      <Article maxWidth="lg">
        <FooterLinks />
      </Article>
      <Article maxWidth="lg">
        <AdInFooter />
      </Article>
      <Article maxWidth="lg">
        <Copyrights />
      </Article>
    </Box>
  );
}

export default Footer;
