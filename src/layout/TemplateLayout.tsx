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

import SEO from './SEO';
import AppBarInner from './AppBarInner';
import DrawerInner from './DrawerInner';
import SummaryTabPane from './MobileTabPane/Summary';
import FigureTabPane from './MobileTabPane/Figure';
// import ArticleTabPane from './MobileTabPane/Article';
import SettingsTabPane from './MobileTabPane/Settings';
import Footer from './Footer';
import BottomNavigation from './BottomNavigation';

import useIsMobile from '../utils/useIsMobile';
import tabs from '../utils/tabs';
import { Mode, Tab, MobileTab, YearPageData, YearPageContext, ClubPageData, ClubPageContext } from '../../types';

type TemplateLayoutProps<T extends Mode> = {
  mode: T;
  title: string;
  headerTitle?: string;
  description?: string;
  data: T extends 'club' ? ClubPageData : YearPageData;
  pageContext: T extends 'club' ? ClubPageContext : YearPageContext;
};

function isClub<T extends Mode>(data: ClubPageData | YearPageData, mode: T): data is ClubPageData {
  return mode === 'club';
}

function getItem<T extends Mode>(data: T extends 'club' ? ClubPageData : YearPageData, mode: T) {
  if (isClub(data, mode)) return data.club;
  return data.year;
}

function TemplateLayout<T extends Mode>({ mode, title, headerTitle, description, data, pageContext }: TemplateLayoutProps<T>) {
  const storaged = typeof window === 'object' ? sessionStorage.getItem('jclubTab-experimental') : null;
  const initialTabs = storaged ? JSON.parse(storaged) : {};

  const isMobile = useIsMobile();
  const trigger = useScrollTriger();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [mobileTab, setMobileTab] = React.useState<MobileTab>(initialTabs.mobileTab ?? 'figure');
  const [tab, setTab] = React.useState<Tab>(initialTabs.tab ?? 'pl');
  const { previous, next } = pageContext;
  const item = getItem<T>(data, mode);

  React.useEffect(() => {
    if (typeof window === 'object') {
      sessionStorage.setItem(
        'jclubTab-experimental',
        JSON.stringify({
          tab,
          mobileTab,
        })
      );
    }
  }, [mobileTab, tab]);

  const handleDrawer = (newValue: boolean | undefined = undefined) => {
    return () => setDrawerOpen(newValue ?? !drawerOpen);
  };
  const handleTab = (_: React.ChangeEvent<unknown>, newValue: string) => {
    if (newValue !== 'pl' && newValue !== 'bs' && newValue !== 'revenue' && newValue !== 'expense' && newValue !== 'attd') return;
    setTab(newValue);
  };
  const handleMobileTab = (_: React.ChangeEvent<unknown>, newValue: string) => {
    if (newValue === 'summary' || newValue === 'figure' || newValue === 'article' || newValue === 'settings') {
      setMobileTab(newValue);
    }
  };
  const onChangeTabIndex = (index: number) => {
    setTab(tabs[index]);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingTop: { xs: '56px', sm: '64px' },
        paddingBottom: { xs: '56px', sm: 0 },
      }}
    >
      <SEO title={title} description={description} />
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <AppBarInner title={headerTitle ?? title} onLeftButtonClick={handleDrawer()} previous={previous} next={next} />
        </AppBar>
      </Slide>
      <Slide appear={false} direction="down" in={!isMobile || mobileTab === 'figure' || mobileTab === 'article'}>
        <Box
          component="nav"
          sx={{
            position: 'sticky',
            top: trigger ? 0 : { xs: '56px', sm: '64px' },
            bgcolor: 'background.paper',
            zIndex: (theme) => theme.zIndex.appBar - 1,
            boxShadow: 1,
            transition: (theme) => theme.transitions.create('top', { delay: 100 }),
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
      </Slide>
      <main>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <FigureTabPane mobileTab={mobileTab} edges={data.allData.edges} mode={mode} tab={tab} onChangeTabIndex={onChangeTabIndex} />
          <SummaryTabPane mobileTab={mobileTab} mode={mode} edges={data.allData.edges} item={item} previous={previous} next={next} />
          <SettingsTabPane mobileTab={mobileTab} />
          {/*
          <FigureTabPane mobileTab={mobileTab} data={data} mode={mode} tab={tab} onChangeTabIndex={onChangeTabIndex} />
          <ArticleTabPane data={data} mobileTab={mobileTab} tab={tab} mode={mode} onChangeTabIndex={onChangeTabIndex} />
          <SettingsTabPane mobileTab={mobileTab} />
          */}
        </Box>
      </main>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Footer />
      </Box>
      <Box
        component="nav"
        sx={{
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          width: '100%',
          bottom: 0,
          zIndex: 'appBar',
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <BottomNavigation value={mobileTab} onChange={handleMobileTab} />
      </Box>
      <Box
        sx={{
          position: 'fixed',
          right: (theme) => theme.spacing(2),
          bottom: (theme) => ({ xs: `calc(${theme.spacing(2)} + 56px)`, sm: theme.spacing(2) }),
          zIndex: (theme) => theme.zIndex.appBar - 1,
        }}
      >
        <Tooltip title="メニュー">
          <Fab color="secondary" onClick={handleDrawer()}>
            <MenuIcon />
          </Fab>
        </Tooltip>
      </Box>
      <SwipeableDrawer open={drawerOpen} onClose={handleDrawer(false)} onOpen={handleDrawer(true)}>
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
