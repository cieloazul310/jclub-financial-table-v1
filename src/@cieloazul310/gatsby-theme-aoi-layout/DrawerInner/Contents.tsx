import * as React from 'react';
import { withPrefix } from 'gatsby';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation } from '@reach/router';
import { ListItemAppLink } from '@cieloazul310/gatsby-theme-aoi';
import DrawerLinks from './DrawerLinks';

import menu, { Menu } from '../menu';

type ContentsItemProps = Menu & {
  currentPathname: string;
};

function ContentsItem({ title, path, icon, currentPathname }: ContentsItemProps) {
  return (
    <ListItemAppLink href={path} selected={currentPathname === withPrefix(path)} role="menuitem">
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemAppLink>
  );
}

function Contents() {
  const { pathname } = useLocation();
  return (
    <>
      <DrawerLinks />
      <List subheader={<ListSubheader>コンテンツ</ListSubheader>} role="menu">
        {menu.map(({ title, path, icon }) => (
          <ContentsItem key={title} title={title} path={path} currentPathname={pathname} icon={icon} />
        ))}
      </List>
    </>
  );
}

export default Contents;
