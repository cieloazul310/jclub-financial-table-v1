import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useAppState, useDispatch } from "@appState/AppStateContext";
import type { Mode } from "types";
import useUnitString from "@/utils/useUnitString";
import { useSortStateString } from "@/utils/useStateString";
import { TableIcon, ListIcon } from "@/icons";
import CopyButton from "./copy-button";
import FilterButton from "./filter-button";

type FigureToolbarProps = {
  mode: Mode;
};

function FigureToolbar({ mode }: FigureToolbarProps) {
  const { listMode, tab } = useAppState();
  const dispatch = useDispatch();
  const unitString = useUnitString(tab);
  const { field, sortType } = useSortStateString();
  const toggleListMode = () => {
    dispatch({ type: "TOGGLE_LISTMODE" });
  };
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "row",
        flexShrink: 0,
        minHeight: "48px",
      }}
    >
      <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center", pr: 2 }}>
        <Tooltip title={`テーブル表示${!listMode ? "中" : ""}`}>
          <span>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleListMode}
              disabled={!listMode}
            >
              <TableIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={`リスト表示${listMode ? "中" : ""}`}>
          <span>
            <IconButton
              onClick={toggleListMode}
              color="inherit"
              disabled={listMode}
            >
              <ListIcon />
            </IconButton>
          </span>
        </Tooltip>
        <FilterButton disabled={mode === "club"} />
        <CopyButton disabled={listMode} />
      </Box>
      <Box
        sx={{
          pb: "2px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {mode === "year" ? (
          <Typography variant="body2" component="span">
            <strong>{field}</strong> {sortType}
          </Typography>
        ) : null}
        <Typography variant="caption">{unitString}</Typography>
      </Box>
    </Box>
  );
}

export default FigureToolbar;
