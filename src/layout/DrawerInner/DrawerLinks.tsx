import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItemAppLink } from '@cieloazul310/gatsby-theme-aoi';

import { useClubsByCategory, useAllYears } from '../../utils/graphql-hooks';
import type { Club } from '../../../types';

type CategoryLinksProps = {
  title: string;
  clubs: { node: Pick<Club, 'href' | 'short_name' | 'name'> }[];
};

export function CategoryLinks({ title, clubs }: CategoryLinksProps) {
  const storaged = typeof window === 'object' ? sessionStorage.getItem(`${title}Open`) : null;
  const initialOpen = storaged ? (JSON.parse(storaged) as boolean) : false;
  const [open, setOpen] = React.useState(initialOpen);
  const toggleOpen = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    sessionStorage.setItem(`${title}Open`, JSON.stringify(open));
  }, [title, open]);

  return (
    <>
      <ListItem button onClick={toggleOpen}>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {clubs.map(({ node }, index) => (
            <ListItemAppLink key={node.short_name ?? index} button to={node.href}>
              <ListItemText primary={node.name} />
            </ListItemAppLink>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export function YearsLinks() {
  const years = useAllYears();
  const storaged = typeof window === 'object' ? sessionStorage.getItem('yearsOpen') : null;
  const initialOpen = storaged ? (JSON.parse(storaged) as boolean) : false;
  const [open, setOpen] = React.useState(initialOpen);
  const toggleOpen = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    sessionStorage.setItem('yearsOpen', JSON.stringify(open));
  }, [open]);

  return (
    <>
      <ListItem button onClick={toggleOpen}>
        <ListItemText primary="年度別" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {years.map(({ node }) => (
            <ListItemAppLink key={node.id} button to={node.href}>
              <ListItemText primary={node.year} />
            </ListItemAppLink>
          ))}
        </List>
      </Collapse>
    </>
  );
}

function DrawerLinks() {
  const { j1, j2, j3 } = useClubsByCategory();
  return (
    <List subheader={<ListSubheader>経営情報</ListSubheader>}>
      <CategoryLinks title="J1" clubs={j1.edges} />
      <CategoryLinks title="J2" clubs={j2.edges} />
      <CategoryLinks title="J3" clubs={j3.edges} />
      <YearsLinks />
    </List>
  );
}

export default DrawerLinks;
