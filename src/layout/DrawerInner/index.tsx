import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
import { useSiteMetadata } from '@cieloazul310/gatsby-theme-aoi';
import DrawerNavigation from './DrawerNavigation';
import DrawerMenu from './DrawerMenu';
import DrawerLinks from './DrawerLinks';
import StateHandler from './StateHandler';
import ThemeHandler from './ThemeHandler';
import DrawerShare from './DrawerShare';
import { SitePageContextNext, SitePageContextPrevious } from '../../../graphql-types';

type DrawerInnerProps = {
  title?: string;
  next?: SitePageContextNext | null;
  previous?: SitePageContextPrevious | null;
  drawerContents?: React.ReactNode;
  onCloseIconClick: () => void;
};

function DrawerInner({ title, next, previous, drawerContents, onCloseIconClick }: DrawerInnerProps) {
  const siteTitle = useSiteMetadata().title;
  return (
    <Box sx={{ width: 280, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 0, minHeight: (theme) => theme.mixins.toolbar.minHeight }}>
          <Tooltip title="閉じる">
            <IconButton edge="start" onClick={onCloseIconClick}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider />
        <Box p={2}>
          <Typography variant="body1">
            <strong>{title ?? siteTitle}</strong>
          </Typography>
        </Box>
        <DrawerNavigation next={next} previous={previous} />
        <Divider />
      </div>
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {drawerContents}
        {drawerContents ? <Divider /> : null}
        <Divider />
        <DrawerLinks />
        <DrawerMenu />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Divider />
          <StateHandler />
          <ThemeHandler />
        </Box>
        <DrawerShare title={title} />
        <Box sx={{ py: 8, px: 2, color: 'text.secondary', fontSize: 'caption' }}>
          <footer>
            <strong>Jクラブ経営情報2005-2019</strong>
            <p>
              © {new Date().getFullYear()} cieloazul310 All rights reserved. Built with
              {` `}
              <MuiLink color="inherit" href="https://www.gatsbyjs.org" target="_blank" rel="noopener noreferrer">
                Gatsby
              </MuiLink>
            </p>
          </footer>
        </Box>
      </Box>
    </Box>
  );
}

DrawerInner.defaultProps = {
  title: undefined,
  next: undefined,
  previous: undefined,
  drawerContents: undefined,
};

export default DrawerInner;
