import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import type { Tab } from "types";

type TabStyleProps = {
  tab: Tab;
  onChange: (event: React.ChangeEvent<unknown>, newValue: string) => void;
};

function TabStyle({ tab, onChange }: TabStyleProps) {
  return (
    <Box component="nav" bgcolor="background.paper" flexGrow={1}>
      <Tabs
        value={tab}
        variant="scrollable"
        indicatorColor="secondary"
        textColor="secondary"
        scrollButtons="auto"
        onChange={onChange}
      >
        <MuiTab label="損益計算書" value="pl" wrapped />
        <MuiTab label="貸借対照表" value="bs" wrapped />
        <MuiTab label="営業収入" value="revenue" wrapped />
        <MuiTab label="営業費用" value="expense" wrapped />
        <MuiTab label="入場者数" value="attd" wrapped />
      </Tabs>
    </Box>
  );
}

export default TabStyle;
