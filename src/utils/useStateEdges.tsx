import * as React from "react";
import { useAppState } from "@appState/AppStateContext";
import { FilterCategory } from "@appState/AppState";
import type { SortableKeys, Mode, Datum, AllDataFieldsFragment } from "types";

function getCategory({ category }: Pick<Datum, "category">): FilterCategory {
  return category !== "J1" && category !== "J2" && category !== "J3"
    ? "others"
    : category;
}

export function getRank(data: Pick<Datum, "category" | "rank">): number {
  const addition = (category: string) => {
    if (category === "J1") return 0;
    if (category === "J2") return 100;
    if (category === "J3") return 200;
    if (category === "JFL") return 300;
    return 400;
  };
  return addition(data.category) + data.rank;
}

export function useFilteredData<
  T extends AllDataFieldsFragment = AllDataFieldsFragment,
>(nodes: T[], mode: Mode) {
  const { filterCategories } = useAppState();
  return React.useMemo(
    () =>
      mode === "club"
        ? nodes
        : nodes.filter((node) => filterCategories.includes(getCategory(node))),
    [nodes, mode, filterCategories],
  );
}

export function getValue(
  node: Pick<Datum, SortableKeys | "category">,
  sortKey: SortableKeys,
): number {
  if (sortKey === "rank") return getRank(node);
  if (sortKey === "unit_price")
    return (node.ticket ?? 1) / (node.all_attd ?? 1);
  if (sortKey === "average_attd")
    return (node.league_attd ?? 1) / (node.league_games ?? 1);
  return node[sortKey] ?? 1;
}

export function useSortedData<
  T extends AllDataFieldsFragment = AllDataFieldsFragment,
>(nodes: T[], mode: Mode) {
  const { sortKey, sortAsc } = useAppState();
  return React.useMemo(
    () =>
      mode === "club"
        ? nodes
        : [...nodes].sort(
            (a, b) =>
              (sortAsc ? 1 : -1) *
              (getValue(a, sortKey) - getValue(b, sortKey)),
          ),
    [mode, nodes, sortKey, sortAsc],
  );
}

export function useSortedValue<
  T extends AllDataFieldsFragment = AllDataFieldsFragment,
>(node: T): string {
  const { sortKey } = useAppState();
  if (sortKey === "unit_price") {
    return node.ticket && node.all_attd
      ? `${Math.round((node.ticket * 1000000) / node.all_attd)}円`
      : "-";
  }
  if (sortKey === "average_attd") {
    return node.league_attd && node.league_games
      ? `${Math.round(node.league_attd / node.league_games)}人`
      : "-";
  }
  if (sortKey === "rank" && node.category && node.rank)
    return `${node.category} ${node.rank}位`;
  if (sortKey === "league_attd" || sortKey === "all_attd")
    return `${node[sortKey]}人`;
  if (node[sortKey]) return `${((node[sortKey] ?? 1) / 100).toFixed(2)}億円`;
  return "-";
}

export function useStateEdges<
  T extends AllDataFieldsFragment = AllDataFieldsFragment,
>(nodes: T[], mode: Mode) {
  const filtered = useFilteredData(nodes, mode);
  const sorted = useSortedData(filtered, mode);
  return sorted;
}
