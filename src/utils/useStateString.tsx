import { useAppState } from "@appState/AppStateContext";
import type { SortableKeys } from "types";
import useDictionary from "./graphql-hooks/useDictionary";

type SortStateString = {
  field: string | null | undefined;
  sortKey: SortableKeys;
  sortType: string;
};

export function useSortStateString(): SortStateString {
  const { sortAsc, sortKey } = useAppState();
  const dictionary = useDictionary();

  const field = dictionary[sortKey];

  const rankSort = sortAsc ? "高い順" : "低い順";
  const valueSort = sortAsc ? "少ない順" : "多い順";
  const sortType = sortKey === "rank" ? rankSort : valueSort;

  return {
    field,
    sortKey,
    sortType,
  };
}

export function useFilterStateString(): string {
  const { filterCategories } = useAppState();

  return `フィルタ: ${
    filterCategories.length === 4
      ? "なし"
      : filterCategories
          .map((category) => (category === "others" ? "その他" : category))
          .join(",")
  }`;
}

export default function useStateString(): {
  sortString: SortStateString;
  filterString: string;
} {
  const sortString = useSortStateString();
  const filterString = useFilterStateString();
  return { sortString, filterString };
}
