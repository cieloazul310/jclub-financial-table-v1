import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

type LoaderProps = {
  height?: number;
};

function Loader({ height = 120 }: LoaderProps) {
  return (
    <Box
      sx={{
        height,
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}

Loader.defaultProps = {
  height: 120,
};

export default Loader;
