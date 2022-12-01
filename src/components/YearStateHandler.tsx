import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Checkbox from '@mui/material/Checkbox';
import { useAppState, useDispatch } from '../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import type { FilterCategory } from '../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppState';

function YearStateHandler() {
  const { filterCategories } = useAppState();
  const dispatch = useDispatch();
  const toggleCategory = (category: FilterCategory) => () => {
    dispatch({ type: 'TOGGLE_FILTERCATEGORY', category });
  };
  return (
    <List subheader={<ListSubheader>年別フィルタ</ListSubheader>}>
      <ListItem button onClick={toggleCategory('J1')}>
        <ListItemText primary="J1" />
        <ListItemSecondaryAction>
          <Checkbox checked={filterCategories.includes('J1')} onClick={toggleCategory('J1')} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button onClick={toggleCategory('J2')}>
        <ListItemText primary="J2" />
        <ListItemSecondaryAction>
          <Checkbox checked={filterCategories.includes('J2')} onClick={toggleCategory('J2')} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button onClick={toggleCategory('J3')}>
        <ListItemText primary="J3" />
        <ListItemSecondaryAction>
          <Checkbox checked={filterCategories.includes('J3')} onClick={toggleCategory('J3')} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button onClick={toggleCategory('others')}>
        <ListItemText primary="その他" />
        <ListItemSecondaryAction>
          <Checkbox checked={filterCategories.includes('others')} onClick={toggleCategory('others')} />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

export default YearStateHandler;
