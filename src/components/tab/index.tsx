import * as React from "react";
import { useAppState, useDispatch } from "@appState/AppStateContext";
import TabStyle from "./tab-style";

function Tab() {
  const { tab } = useAppState();
  const dispatch = useDispatch();
  const handleTab = (_: React.ChangeEvent<unknown>, newValue: string) => {
    if (tab === newValue) return;
    if (
      newValue !== "pl" &&
      newValue !== "bs" &&
      newValue !== "revenue" &&
      newValue !== "expense" &&
      newValue !== "attd"
    )
      return;
    dispatch({ type: "SET_TAB", tab: newValue });
  };

  return <TabStyle tab={tab} onChange={handleTab} />;
}

export default Tab;
