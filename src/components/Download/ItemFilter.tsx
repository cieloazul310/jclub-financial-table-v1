import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAllYears, useClubsByCategory } from '../../utils/graphql-hooks';
import type { ClubBrowser } from '../../../types';

type ClubListByCategoryProps = Pick<ItemFilterProps, 'clubsFilter' | 'setClubsFilter'> & {
  clubs: {
    edges: {
      node: Pick<ClubBrowser, 'name' | 'slug'>;
    }[];
  };
  title: string;
};

function ClubListByCategory({ clubs, title, clubsFilter, setClubsFilter }: ClubListByCategoryProps) {
  const slugs = clubs.edges.map(({ node }) => node.slug);
  const allSelected = slugs.every((slug) => clubsFilter.includes(slug));
  const allEmpty = !slugs.some((slug) => clubsFilter.includes(slug));
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const onClick = (item: string) => () => {
    setClubsFilter(clubsFilter.includes(item) ? clubsFilter.filter((slug) => slug !== item) : [...clubsFilter, item]);
  };
  const setAll = () => {
    setClubsFilter(Array.from(new Set([...clubsFilter, ...slugs])));
  };
  const clearAll = () => {
    setClubsFilter(clubsFilter.filter((slug) => !slugs.includes(slug)));
  };

  return (
    <>
      <ListItem button onClick={toggleOpen}>
        <ListItemIcon>
          <Checkbox checked={!allEmpty} indeterminate={!allSelected && !allEmpty} edge="start" color="secondary" disableRipple />
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open}>
        <ListItem button onClick={setAll}>
          <ListItemText primary="全て選択" />
        </ListItem>
        <ListItem button onClick={clearAll}>
          <ListItemText primary="全て解除" />
        </ListItem>
        {clubs.edges.map(({ node }) => (
          <ListItem key={node.slug} button dense onClick={onClick(node.slug)}>
            <ListItemIcon>
              <Checkbox checked={clubsFilter.includes(node.slug)} edge="start" color="secondary" disableRipple />
            </ListItemIcon>
            <ListItemText primary={node.name} />
          </ListItem>
        ))}
      </Collapse>
    </>
  );
}

type ClubListProps = Pick<ItemFilterProps, 'clubsFilter' | 'setClubsFilter'>;

function ClubList({ clubsFilter, setClubsFilter }: ClubListProps) {
  const { j1, j2, j3 } = useClubsByCategory();
  const slugs = [...j1.edges, ...j2.edges, ...j3.edges].map(({ node }) => node.slug ?? '');
  const setAllClub = () => {
    setClubsFilter(slugs);
  };
  const clearAllClub = () => {
    setClubsFilter([]);
  };
  return (
    <List subheader={<ListSubheader>クラブ</ListSubheader>}>
      <ListItem button onClick={setAllClub}>
        <ListItemText primary="全て選択" />
      </ListItem>
      <ListItem button onClick={clearAllClub}>
        <ListItemText primary="全て解除" />
      </ListItem>
      <ClubListByCategory clubs={j1} title="J1" clubsFilter={clubsFilter} setClubsFilter={setClubsFilter} />
      <ClubListByCategory clubs={j2} title="J2" clubsFilter={clubsFilter} setClubsFilter={setClubsFilter} />
      <ClubListByCategory clubs={j3} title="J3" clubsFilter={clubsFilter} setClubsFilter={setClubsFilter} />
    </List>
  );
}

type YearsListProps = Pick<ItemFilterProps, 'yearsFilter' | 'setYearsFilter'>;

function YearsList({ yearsFilter, setYearsFilter }: YearsListProps) {
  const allYears = useAllYears().map(({ node }) => node.year);
  const toggleYear = (newYear: number) => () => {
    setYearsFilter(yearsFilter.includes(newYear) ? yearsFilter.filter((year) => year !== newYear) : [...yearsFilter, newYear]);
  };
  const setAllYears = () => {
    setYearsFilter(allYears);
  };
  const clearAllYears = () => {
    setYearsFilter([]);
  };
  return (
    <List subheader={<ListSubheader>年度</ListSubheader>}>
      <ListItem button onClick={setAllYears}>
        <ListItemText primary="全て選択" />
      </ListItem>
      <ListItem button onClick={clearAllYears}>
        <ListItemText primary="全て解除" />
      </ListItem>
      {allYears.map((year) => (
        <ListItem key={year.toString()} button onClick={toggleYear(year)}>
          <ListItemIcon>
            <Checkbox checked={yearsFilter.includes(year)} edge="start" color="secondary" disableRipple />
          </ListItemIcon>
          <ListItemText primary={year} />
        </ListItem>
      ))}
    </List>
  );
}

type CategoriesListProps = Pick<ItemFilterProps, 'categoriesFilter' | 'setCategoriesFilter'>;

function CategoriesList({ categoriesFilter, setCategoriesFilter }: CategoriesListProps) {
  const allCategories = ['J1', 'J2', 'J3', 'others'];
  const toggleCategory = (item: string) => () => {
    setCategoriesFilter(
      categoriesFilter.includes(item) ? categoriesFilter.filter((category) => category !== item) : [...categoriesFilter, item]
    );
  };
  const setAllCategories = () => {
    setCategoriesFilter(allCategories);
  };
  const clearAllCategories = () => {
    setCategoriesFilter([]);
  };
  return (
    <List subheader={<ListSubheader>カテゴリ</ListSubheader>}>
      <ListItem button onClick={setAllCategories}>
        <ListItemText primary="全て選択" />
      </ListItem>
      <ListItem button onClick={clearAllCategories}>
        <ListItemText primary="全て解除" />
      </ListItem>
      <ListItem button onClick={toggleCategory('J1')}>
        <ListItemIcon>
          <Checkbox checked={categoriesFilter.includes('J1')} edge="start" color="secondary" disableRipple />
        </ListItemIcon>
        <ListItemText primary="J1" />
      </ListItem>
      <ListItem button onClick={toggleCategory('J2')}>
        <ListItemIcon>
          <Checkbox checked={categoriesFilter.includes('J2')} edge="start" color="secondary" disableRipple />
        </ListItemIcon>
        <ListItemText primary="J2" />
      </ListItem>
      <ListItem button onClick={toggleCategory('J3')}>
        <ListItemIcon>
          <Checkbox checked={categoriesFilter.includes('J3')} edge="start" color="secondary" disableRipple />
        </ListItemIcon>
        <ListItemText primary="J3" />
      </ListItem>
      <ListItem button onClick={toggleCategory('others')}>
        <ListItemIcon>
          <Checkbox checked={categoriesFilter.includes('others')} edge="start" color="secondary" disableRipple />
        </ListItemIcon>
        <ListItemText primary="その他" />
      </ListItem>
    </List>
  );
}

type ItemFilterProps = {
  clubsFilter: string[];
  setClubsFilter: React.Dispatch<React.SetStateAction<string[]>>;
  yearsFilter: number[];
  setYearsFilter: React.Dispatch<React.SetStateAction<number[]>>;
  categoriesFilter: string[];
  setCategoriesFilter: React.Dispatch<React.SetStateAction<string[]>>;
};

function ItemFilter({ clubsFilter, yearsFilter, categoriesFilter, setClubsFilter, setYearsFilter, setCategoriesFilter }: ItemFilterProps) {
  return (
    <>
      <ClubList clubsFilter={clubsFilter} setClubsFilter={setClubsFilter} />
      <Divider />
      <YearsList yearsFilter={yearsFilter} setYearsFilter={setYearsFilter} />
      <Divider />
      <CategoriesList categoriesFilter={categoriesFilter} setCategoriesFilter={setCategoriesFilter} />
    </>
  );
}

export default ItemFilter;
