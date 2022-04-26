import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
import { ExternalLink, SubParagraph } from '@cieloazul310/gatsby-theme-aoi';
import { DrawerPageNavigation } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import DrawerTop from './DrawerTop';
import DrawerMenu from './DrawerMenu';
import DrawerLinks from './DrawerLinks';
import StateHandler from './StateHandler';
import ThemeHandler from './ThemeHandler';
import DrawerShare from './DrawerShare';

type DrawerInnerProps = {
  title?: string;
  previous?: { to: string; title: string } | null;
  next?: { to: string; title: string } | null;
  onCloseIconClick: () => void;
};

function DrawerInner({ title, next, previous, onCloseIconClick }: DrawerInnerProps) {
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
      </div>
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <DrawerTop title={title} />
        <Divider />
        {previous || next ? <DrawerPageNavigation previous={previous} next={next} /> : null}
        <Divider />
        <DrawerLinks />
        <DrawerMenu />
        <Divider />
        <StateHandler />
        <ThemeHandler />
        <DrawerShare title={title} />
        <Divider />
        <Box sx={{ py: 8, px: 2 }}>
          <footer>
            <strong>Jクラブ経営情報ポータル</strong>
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
  previous: undefined,
  next: undefined,
};

export default DrawerInner;
