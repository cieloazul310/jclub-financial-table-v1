import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useSocialShare } from '@cieloazul310/gatsby-theme-aoi';

type DrawerShareProps = {
  title?: string;
};

function DrawerShare({ title }: DrawerShareProps) {
  const twitterUrl = useSocialShare('twitter', title);
  const fbUrl = useSocialShare('facebook');
  return (
    <List subheader={<ListSubheader>共有</ListSubheader>}>
      <ListItem component="a" button href={twitterUrl} target="_blank" rel="noopener noreferrer">
        <ListItemIcon>
          <TwitterIcon />
        </ListItemIcon>
        <ListItemText primary="Twitterで共有" />
      </ListItem>
      <ListItem component="a" button href={fbUrl} target="_blank" rel="noopener noreferrer">
        <ListItemIcon>
          <FacebookIcon />
        </ListItemIcon>
        <ListItemText primary="Facebookでシェア" />
      </ListItem>
    </List>
  );
}

DrawerShare.defaultProps = {
  title: undefined,
};

export default DrawerShare;
