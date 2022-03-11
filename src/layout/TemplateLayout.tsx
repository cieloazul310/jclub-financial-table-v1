import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import Slide from '@mui/material/Slide';
import useScrollTriger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import { SectionDivider } from '@cieloazul310/gatsby-theme-aoi';

import SEO from './SEO';
import AppBarInner from './AppBarInner';
import DrawerInner from './DrawerInner';
import Footer from './Footer';

import { useAppState, useDispatch } from '../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { Mode, YearPageContext, ClubPageContext } from '../../types';

const iOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

type TemplateLayoutProps<T extends Mode> = {
  title: string;
  headerTitle?: string;
  description?: string;
  pageContext: T extends 'club' ? ClubPageContext : YearPageContext;
  children: React.ReactNode;
};

function TemplateLayout<T extends Mode>({ children, title, headerTitle, description, pageContext }: TemplateLayoutProps<T>) {
  const { tab } = useAppState();
  const dispatch = useDispatch();
  const trigger = useScrollTriger();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { previous, next } = pageContext;

  const handleDrawer = (newValue: boolean | undefined = undefined) => {
    return () => setDrawerOpen(newValue ?? !drawerOpen);
  };
  const handleTab = (_: React.ChangeEvent<unknown>, newValue: string) => {
    if (tab === newValue) return;
    if (newValue !== 'pl' && newValue !== 'bs' && newValue !== 'revenue' && newValue !== 'expense' && newValue !== 'attd') return;

    dispatch({ type: 'SET_TAB', tab: newValue });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingTop: { xs: '56px', sm: '112px' },
        paddingBottom: { xs: '48px', sm: 0 },
      }}
    >
      <SEO title={title} description={description} />
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <AppBarInner title={headerTitle ?? title} onLeftButtonClick={handleDrawer()} previous={previous} next={next} />
        </AppBar>
      </Slide>
      <main>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>{children}</Box>
      </main>
      <Box>
        <SectionDivider />
        <Footer />
      </Box>
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          width: 1,
          top: { xs: 'unset', sm: trigger ? 0 : '64px' },
          bottom: { xs: 0, sm: 'unset' },
          bgcolor: 'background.paper',
          borderColor: 'divider',
          zIndex: (theme) => theme.zIndex.appBar - 1,
          boxShadow: 1,
          transition: (theme) => theme.transitions.create(['top', 'bottom'], { delay: 100 }),
        }}
      >
        <Tabs value={tab} variant="scrollable" indicatorColor="secondary" textColor="secondary" scrollButtons="auto" onChange={handleTab}>
          <MuiTab label="損益計算書" value="pl" wrapped />
          <MuiTab label="貸借対照表" value="bs" wrapped />
          <MuiTab label="営業収入" value="revenue" wrapped />
          <MuiTab label="営業費用" value="expense" wrapped />
          <MuiTab label="入場者数" value="attd" wrapped />
        </Tabs>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          right: (theme) => theme.spacing(2),
          bottom: (theme) => ({ xs: `calc(${theme.spacing(2)} + 56px)`, sm: theme.spacing(2) }),
          zIndex: (theme) => theme.zIndex.appBar - 1,
          opacity: 0.4,
          transition: (theme) => theme.transitions.create('opacity'),
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <Tooltip title="メニュー">
          <Fab color="secondary" onClick={handleDrawer()}>
            <MenuIcon />
          </Fab>
        </Tooltip>
      </Box>
      <SwipeableDrawer
        open={drawerOpen}
        onClose={handleDrawer(false)}
        onOpen={handleDrawer(true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <DrawerInner title={headerTitle ?? title} previous={previous} next={next} onCloseIconClick={handleDrawer(false)} />
      </SwipeableDrawer>
    </Box>
  );
}

TemplateLayout.defaultProps = {
  headerTitle: undefined,
  description: undefined,
};

export default TemplateLayout;
