import type { SortableKeys } from "types";

export const generalFields = [
  "fullname",
  "license",
  "rank",
  "points",
  "ppg",
  "elevation",
];
export const plFields: SortableKeys[] = [
  "revenue",
  "expense",
  "op_profit",
  "no_rev",
  "no_exp",
  "ordinary_profit",
  "sp_rev",
  "sp_exp",
  "profit_before_tax",
  "tax",
  "profit",
  "related_revenue",
];
export const bsFields: SortableKeys[] = [
  "assets",
  "curr_assets",
  "fixed_assets",
  "liabilities",
  "curr_liabilities",
  "fixed_liabilities",
  "net_worth",
  "capital_stock",
  "capital_surplus",
  "retained_earnings",
];
export const revenueFields: SortableKeys[] = [
  "sponsor",
  "ticket",
  "broadcast",
  "academy_rev",
  "women_rev",
  "goods_rev",
  "other_revs",
];
export const expenseFields: SortableKeys[] = [
  "salary",
  "game_exp",
  "team_exp",
  "academy_exp",
  "women_exp",
  "goods_exp",
  "other_cost",
  "manage_exp",
  "sga",
];
export const attdFields: SortableKeys[] = [
  "all_attd",
  "all_games",
  "average_attd",
  "unit_price",
  "league_attd",
  "league_games",
  "leaguecup_attd",
  "leaguecup_games",
  "po_attd",
  "po_games",
  "acl_attd",
  "acl_games",
  "second_attd",
  "second_games",
];

export const allSortableFields = [
  ...plFields,
  ...bsFields,
  ...revenueFields,
  ...expenseFields,
  ...attdFields,
];
export const allFields = [...generalFields, ...allSortableFields];
