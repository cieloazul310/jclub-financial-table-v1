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
import Summary from './MobileTabPane/Summary';
import Figure from './MobileTabPane/Figure';
import ArticleSection from './MobileTabPane/Article';
import Footer from './Footer';

import useIsMobile from '../utils/useIsMobile';
import { useAppState, useDispatch } from '../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { Mode, YearPageData, YearPageContext, ClubPageData, ClubPageContext } from '../../types';

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
function getPrevYear<T extends Mode>(data: T extends 'club' ? ClubPageData : YearPageData, mode: T) {
  if (isClub(data, mode)) return null;
  return data.prevYear;
}

function TemplateLayout<T extends Mode>({ mode, title, headerTitle, description, data, pageContext }: TemplateLayoutProps<T>) {
  const { tab } = useAppState();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const trigger = useScrollTriger();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { previous, next } = pageContext;
  const item = getItem<T>(data, mode);
  const prevYear = getPrevYear<T>(data, mode);

  const handleDrawer = (newValue: boolean | undefined = undefined) => {
    return () => setDrawerOpen(newValue ?? !drawerOpen);
  };
  const handleTab = (_: React.ChangeEvent<unknown>, newValue: string) => {
    if (tab === newValue) return;
    if (newValue !== 'pl' && newValue !== 'bs' && newValue !== 'revenue' && newValue !== 'expense' && newValue !== 'attd') return;

    dispatch({ type: 'SET_TAB', tab: newValue });
  };

  const tabPanel = React.useMemo(() => {
    return (
      <Tabs value={tab} variant="scrollable" indicatorColor="secondary" textColor="secondary" scrollButtons="auto" onChange={handleTab}>
        <MuiTab label="損益計算書" value="pl" wrapped />
        <MuiTab label="貸借対照表" value="bs" wrapped />
        <MuiTab label="営業収入" value="revenue" wrapped />
        <MuiTab label="営業費用" value="expense" wrapped />
        <MuiTab label="入場者数" value="attd" wrapped />
      </Tabs>
    );
  }, [tab, handleTab]);

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
      <Slide appear={false} direction="down" in={!isMobile}>
        <Box
          component="nav"
          sx={{
            display: { xs: 'none', sm: 'block' },
            position: 'sticky',
            top: trigger ? 0 : { xs: '56px', sm: '64px' },
            bgcolor: 'background.paper',
            zIndex: (theme) => theme.zIndex.appBar - 1,
            boxShadow: 1,
            transition: (theme) => theme.transitions.create('top', { delay: 100 }),
          }}
        >
          {tabPanel}
        </Box>
      </Slide>
      <main>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Figure edges={data.allData.edges} mode={mode} />
          <SectionDivider />
          <Summary mode={mode} edges={data.allData.edges} item={item} previous={previous} next={next} prevYear={prevYear} />
          <SectionDivider />
          <ArticleSection />
        </Box>
      </main>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <SectionDivider />
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
          bgcolor: 'background.default',
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        {tabPanel}
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
