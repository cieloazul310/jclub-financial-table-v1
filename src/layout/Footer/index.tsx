import * as React from 'react';
import Box from '@mui/material/Box';
import { Article } from '@cieloazul310/gatsby-theme-aoi';
import FooterLinks from './FooterLinks';
import Copyrights from './Copyrights';
// import { ContentBasis } from '../../components/Basis';
// import { AdInFooter } from '../../components/Ads';

function Footer() {
  return (
    <Box sx={{ py: 4, bgcolor: 'grey.900', color: 'grey.200' }}>
      <Article maxWidth="lg">
        <FooterLinks />
      </Article>
      {/*
        <ContentBasis>
          <AdInFooter />
        </ContentBasis>
        <ContentBasis>
        */}
      <Article maxWidth="lg">
        <Copyrights />
      </Article>
    </Box>
  );
}

export default Footer;
