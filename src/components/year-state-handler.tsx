import * as React from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Checkbox from "@mui/material/Checkbox";
import { useAppState, useDispatch } from "@appState/AppStateContext";
import type { FilterCategory } from "@appState/AppState";

function YearStateHandler() {
  const { filterCategories } = useAppState();
  const dispatch = useDispatch();
  const toggleCategory = (category: FilterCategory) => () => {
    dispatch({ type: "TOGGLE_FILTERCATEGORY", category });
  };
  return (
    <List subheader={<ListSubheader>年別フィルタ</ListSubheader>}>
      <ListItem disablePadding>
        <ListItemButton onClick={toggleCategory("J1")}>
          <ListItemText primary="J1" />
          <ListItemSecondaryAction>
            <Checkbox
              checked={filterCategories.includes("J1")}
              onClick={toggleCategory("J1")}
            />
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={toggleCategory("J2")}>
          <ListItemText primary="J2" />
          <ListItemSecondaryAction>
            <Checkbox
              checked={filterCategories.includes("J2")}
              onClick={toggleCategory("J2")}
            />
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={toggleCategory("J3")}>
          <ListItemText primary="J3" />
          <ListItemSecondaryAction>
            <Checkbox
              checked={filterCategories.includes("J3")}
              onClick={toggleCategory("J3")}
            />
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={toggleCategory("others")}>
          <ListItemText primary="その他" />
          <ListItemSecondaryAction>
            <Checkbox
              checked={filterCategories.includes("others")}
              onClick={toggleCategory("others")}
            />
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default YearStateHandler;
