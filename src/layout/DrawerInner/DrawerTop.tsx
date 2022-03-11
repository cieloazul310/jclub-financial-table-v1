import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppLink, useSiteMetadata } from '@cieloazul310/gatsby-theme-aoi';

type DrawerTopProps = {
  title?: string;
};

function DrawerTop({ title }: DrawerTopProps) {
  const siteTitle = useSiteMetadata().title;
  return (
    <Box height={140} p={2} display="flex" flexDirection="column" justifyContent="center">
      {title ? (
        <Typography variant="body2" gutterBottom>
          <AppLink to="/" color="inherit">
            {siteTitle}
          </AppLink>
        </Typography>
      ) : null}
      <Typography variant="body1">
        <strong>{title ?? siteTitle}</strong>
      </Typography>
    </Box>
  );
}

DrawerTop.defaultProps = {
  title: undefined,
};

export default DrawerTop;
