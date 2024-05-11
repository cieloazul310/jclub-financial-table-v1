import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAppState, useDispatch } from "@appState/AppStateContext";
import type { FilterCategory } from "@appState/AppState";

type FilterButtonProps = {
  disabled: boolean;
};

function FilterButton({ disabled }: FilterButtonProps) {
  const { filterCategories } = useAppState();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleCategory = (category: FilterCategory) => () => {
    dispatch({ type: "TOGGLE_FILTERCATEGORY", category });
  };

  return (
    <>
      <Tooltip title="フィルタ">
        <span>
          <IconButton
            onClick={handleClick}
            color={filterCategories.length === 4 ? "inherit" : "primary"}
            disabled={disabled}
          >
            <FilterListIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={toggleCategory("J1")}>
          <ListItemIcon>
            {filterCategories.includes("J1") ? <CheckIcon /> : <RemoveIcon />}
          </ListItemIcon>
          J1
        </MenuItem>
        <MenuItem onClick={toggleCategory("J2")}>
          <ListItemIcon>
            {filterCategories.includes("J2") ? <CheckIcon /> : <RemoveIcon />}
          </ListItemIcon>
          J2
        </MenuItem>
        <MenuItem onClick={toggleCategory("J3")}>
          <ListItemIcon>
            {filterCategories.includes("J3") ? <CheckIcon /> : <RemoveIcon />}
          </ListItemIcon>
          J3
        </MenuItem>
        <MenuItem onClick={toggleCategory("others")}>
          <ListItemIcon>
            {filterCategories.includes("others") ? (
              <CheckIcon />
            ) : (
              <RemoveIcon />
            )}
          </ListItemIcon>
          JFL・地域
        </MenuItem>
      </Menu>
    </>
  );
}

export default FilterButton;
