import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
import { ExternalLink, SubParagraph, useSiteMetadata } from '@cieloazul310/gatsby-theme-aoi';
import { DrawerPageNavigation } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import DrawerMenu from './DrawerMenu';
import DrawerLinks from './DrawerLinks';
import StateHandler from './StateHandler';
import ThemeHandler from './ThemeHandler';
import DrawerShare from './DrawerShare';
import useNeighbors from '../../utils/useNeighbors';
import { ClubPageNeighbor, YearPageNeighbor } from '../../../types';

type DrawerInnerProps = {
  title?: string;
  next?: ClubPageNeighbor | YearPageNeighbor;
  previous?: ClubPageNeighbor | YearPageNeighbor;
  drawerContents?: React.ReactNode;
  onCloseIconClick: () => void;
};

function DrawerInner({ title, next, previous, drawerContents, onCloseIconClick }: DrawerInnerProps) {
  const siteTitle = useSiteMetadata().title;
  const neighbors = useNeighbors({ previous, next });
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
        {drawerContents}
        {drawerContents ? <Divider /> : null}
      </div>
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {previous || next ? <DrawerPageNavigation previous={neighbors.previous} next={neighbors.next} /> : null}
        <Divider />
        <DrawerLinks />
        <DrawerMenu />
        <Divider />
        <StateHandler />
        <ThemeHandler />
        <DrawerShare title={title} />
        <Box sx={{ py: 8, px: 2 }}>
          <footer>
            <strong>Jクラブ経営情報2005-2019</strong>
            <SubParagraph>
              © {new Date().getFullYear()} cieloazul310 All rights reserved. Built with
              {` `}
              <ExternalLink color="inherit" href="https://www.gatsbyjs.org">
                Gatsby
              </ExternalLink>
            </SubParagraph>
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
