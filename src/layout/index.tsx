import * as React from 'react';
import { Layout as AoiLayout, type LayoutProps as AoiLayoutProps } from '@cieloazul310/gatsby-theme-aoi';
import { DrawerPageNavigation } from '@cieloazul310/gatsby-theme-aoi-blog-components';

type LayoutProps = AoiLayoutProps<{
  left?: { href: string; title: string; secondaryText?: string } | null;
  right?: { href: string; title: string; secondaryText?: string } | null;
}>;

function Layout({
  children,
  componentViewports = { fab: 'lgDown', swipeableDrawer: 'lgDown' },
  disableBottomNav = true,
  appBarPosition = 'fixed',
  drawerContents,
  left,
  right,
  ...props
}: LayoutProps) {
  const customDrawerContents = React.useMemo(() => {
    if (drawerContents) return drawerContents;
    if (!left && !right) return null;
    return <DrawerPageNavigation left={left} right={right} />;
  }, [left, right]);

  return (
    <AoiLayout
      componentViewports={componentViewports}
      drawerContents={customDrawerContents}
      appBarPosition={appBarPosition}
      left={left}
      right={right}
      disableBottomNav={disableBottomNav}
      {...props}
    >
      {children}
    </AoiLayout>
  );
}

Layout.defaultProps = {
  title: undefined,
  headerTitle: undefined,
  headerLeft: undefined,
  headerRight: undefined,
};

export default Layout;
