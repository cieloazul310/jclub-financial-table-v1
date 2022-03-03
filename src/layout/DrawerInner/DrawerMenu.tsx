import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { HomeIcon, SeriesIcon, DownloadIcon } from '../../icons';

function DrawerMenu() {
  return (
    <List subheader={<ListSubheader>コンテンツ</ListSubheader>}>
      <ListItem button component={GatsbyLink} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="トップページ" />
      </ListItem>
      <ListItem button component={GatsbyLink} to="/series/">
        <ListItemIcon>
          <SeriesIcon />
        </ListItemIcon>
        <ListItemText primary="項目別表示" />
      </ListItem>
      <ListItem button component={GatsbyLink} to="/download/">
        <ListItemIcon>
          <DownloadIcon />
        </ListItemIcon>
        <ListItemText primary="データダウンロード" />
      </ListItem>
    </List>
  );
}

export default DrawerMenu;
