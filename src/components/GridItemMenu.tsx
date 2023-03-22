import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AppLink, Paragraph } from '@cieloazul310/gatsby-theme-aoi';

type GridItemMenuProps = React.PropsWithChildren<{
  href: string;
  title: string;
  description?: string;
}>;

function GridItemMenu({ href, title, description, children }: GridItemMenuProps) {
  return (
    <Grid item xs={12} sm={6} component="article">
      <Typography variant="h6" component="h3" gutterBottom>
        <AppLink href={href} color="inherit">
          {title}
        </AppLink>
      </Typography>
      {description ? <Paragraph>{description}</Paragraph> : null}
      {children}
    </Grid>
  );
}

GridItemMenu.defaultProps = {
  description: undefined,
};

export default GridItemMenu;
