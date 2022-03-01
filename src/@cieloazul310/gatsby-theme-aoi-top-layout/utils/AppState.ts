import { Category, SortableKeys, Tab } from '../../../../types';

export type FilterCategory = Category | 'others';

export interface AppState {
  sortKey: SortableKeys;
  sortAsc: boolean;
  filterCategories: FilterCategory[];
  displayFullAttd: boolean;
  listMode: boolean;
  tab: Tab;
}

export const initialAppState: AppState = {
  sortKey: 'revenue',
  sortAsc: false,
  filterCategories: ['J1', 'J2', 'J3', 'others'],
  displayFullAttd: false,
  listMode: false,
  tab: 'pl',
};

export function useInitialAppState(isMobile: boolean): AppState {
  return {
    ...initialAppState,
    listMode: isMobile,
  };
}

export type Action =
  | { type: 'TOGGLE_FULL_ATTD' }
  | { type: 'CHANGE_SORTKEY'; sortKey: SortableKeys }
  | { type: 'TOGGLE_SORTASC' }
  | { type: 'TOGGLE_FILTERCATEGORY'; category: FilterCategory }
  | { type: 'TOGGLE_LISTMODE' }
  | { type: 'SET_TAB'; tab: Tab }
  | { type: 'RESET' };

export default function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'TOGGLE_FULL_ATTD':
      return {
        ...state,
        displayFullAttd: !state.displayFullAttd,
      };
    case 'CHANGE_SORTKEY':
      return {
        ...state,
        sortKey: action.sortKey,
        sortAsc: action.sortKey === 'rank',
      };
    case 'TOGGLE_SORTASC':
      return {
        ...state,
        sortAsc: !state.sortAsc,
      };
    case 'TOGGLE_FILTERCATEGORY':
      return {
        ...state,
        filterCategories: state.filterCategories.includes(action.category)
          ? state.filterCategories.filter((category) => category !== action.category)
          : [...state.filterCategories, action.category],
      };
    case 'TOGGLE_LISTMODE':
      return {
        ...state,
        listMode: !state.listMode,
      };
    case 'SET_TAB':
      return {
        ...state,
        tab: action.tab,
      };
    case 'RESET': {
      const isMobile = window.matchMedia('(max-width: 600px)').matches;
      return {
        ...initialAppState,
        listMode: isMobile,
      };
    }
    default:
      throw new Error();
  }
}
