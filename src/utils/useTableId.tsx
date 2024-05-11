import { useLocation } from "@reach/router";
import { useAppState } from "@appState/AppStateContext";

export default function useTableId() {
  const { tab } = useAppState();
  const { pathname } = useLocation();
  return `${pathname.split("/").join("")}${tab}`;
}
