import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell, { type TableCellProps } from "@mui/material/TableCell";
import { useAppState } from "@appState/AppStateContext";
import type {
  Tab,
  Mode,
  General,
  PL,
  BS,
  Revenue,
  Expense,
  Attd,
  AllDataFieldsFragment,
} from "types";
import CategoryLabel from "@/components/category-label";
import val from "@/utils/val";
import { TableBodyLabel } from "./label";

type DataTableCellProps = {
  value: number | null;
  emphasized?: boolean;
  separator?: boolean;
  strong?: boolean;
  red?: boolean;
} & Omit<TableCellProps, "children">;

function DataTableCell({
  value,
  emphasized = false,
  strong = false,
  separator = false,
  red = false,
  ...props
}: DataTableCellProps) {
  return (
    <TableCell
      align={props.align ?? "right"}
      sx={{
        color:
          red && typeof value === "number" && value < 0
            ? "error.main"
            : undefined,
        borderRight: 1,
        borderColor: "divider",
        bgcolor: ({ palette }) => {
          if (!emphasized) return undefined;
          return palette.mode === "light" ? "grey.100" : "background.paper";
        },
        fontWeight: strong || emphasized ? "bold" : undefined,
      }}
      {...props}
    >
      {val(value, separator)}
    </TableCell>
  );
}
DataTableCell.defaultProps = {
  emphasized: false,
  strong: false,
  separator: false,
  red: false,
};

type TableRowProps<T> = {
  node: Pick<General, "year"> & T;
};

export function PLTableRow({ node }: TableRowProps<PL>) {
  return (
    <>
      <DataTableCell value={node.revenue} strong />
      <DataTableCell value={node.expense} strong />
      <DataTableCell value={node.op_profit} emphasized />
      <DataTableCell value={node.no_rev} />
      <DataTableCell value={node.no_exp} />
      <DataTableCell value={node.ordinary_profit} emphasized />
      <DataTableCell value={node.sp_rev} />
      <DataTableCell value={node.sp_exp} />
      <DataTableCell value={node.profit_before_tax} emphasized />
      <DataTableCell value={node.tax} />
      <DataTableCell value={node.profit} emphasized />
      <DataTableCell value={node.related_revenue} />
    </>
  );
}

export function BSTableRow({ node }: TableRowProps<BS>) {
  return (
    <>
      <DataTableCell value={node.assets} emphasized />
      <DataTableCell value={node.curr_assets} />
      <DataTableCell value={node.fixed_assets} />
      <DataTableCell value={node.liabilities} emphasized />
      <DataTableCell value={node.curr_liabilities} />
      <DataTableCell value={node.fixed_liabilities} />
      <DataTableCell value={node.net_worth} emphasized red />
      <DataTableCell value={node.capital_stock} />
      <DataTableCell value={node.capital_surplus} />
      <DataTableCell value={node.retained_earnings} />
      <DataTableCell value={node.profit} />
    </>
  );
}

export function RevenueTableRow({ node }: TableRowProps<Revenue>) {
  const otherRevs = (year: number) => {
    if (year <= 2010)
      return (
        <DataTableCell value={node.other_revs} align="center" colSpan={4} />
      );
    if (year <= 2015)
      return (
        <>
          <DataTableCell value={node.academy_rev} align="center" />
          <DataTableCell value={node.other_revs} align="center" colSpan={3} />
        </>
      );
    if (year <= 2021)
      return (
        <>
          <DataTableCell value={node.academy_rev} align="center" />
          <DataTableCell value={node.goods_rev} align="center" />
          <DataTableCell value={node.other_revs} colSpan={2} align="center" />
        </>
      );
    return (
      <>
        <DataTableCell value={node.academy_rev} align="center" />
        <DataTableCell value={node.goods_rev} align="center" />
        <DataTableCell value={node.women_rev} align="center" />
        <DataTableCell value={node.other_revs} align="center" />
      </>
    );
  };

  return (
    <>
      <DataTableCell value={node.revenue} emphasized />
      <DataTableCell value={node.sponsor} />
      <DataTableCell value={node.ticket} />
      <DataTableCell value={node.broadcast} />
      {otherRevs(node.year)}
      <DataTableCell value={node.related_revenue} />
    </>
  );
}

export function ExpenseTableRow({ node }: TableRowProps<Expense>) {
  const expenseData = (year: number) => {
    if (year <= 2005 && !node.salary)
      return (
        <>
          <DataTableCell value={node.general_exp} align="center" colSpan={8} />
          <DataTableCell value={node.sga} align="center" />
        </>
      );
    if (year <= 2010)
      return (
        <>
          <DataTableCell value={node.salary} />
          <DataTableCell value={node.manage_exp} align="center" colSpan={7} />
          <DataTableCell value={node.sga} align="center" />
        </>
      );
    if (year <= 2015)
      return (
        <>
          <DataTableCell value={node.salary} />
          <DataTableCell value={node.game_exp} />
          <DataTableCell value={node.team_exp} />
          <DataTableCell value={node.academy_exp} />
          <DataTableCell value={node.women_exp} />
          <DataTableCell value={node.sga} align="center" colSpan={4} />
        </>
      );
    if (year <= 2021)
      return (
        <>
          <DataTableCell value={node.salary} />
          <DataTableCell value={node.game_exp} />
          <DataTableCell value={node.team_exp} />
          <DataTableCell value={node.academy_exp} />
          <DataTableCell value={node.women_exp} />
          <DataTableCell value={node.goods_exp} />
          <DataTableCell value={node.sga} align="center" colSpan={3} />
        </>
      );

    return (
      <>
        <DataTableCell value={node.salary} />
        <DataTableCell value={node.game_exp} />
        <DataTableCell value={node.team_exp} />
        <DataTableCell value={node.academy_exp} />
        <DataTableCell value={node.women_exp} />
        <DataTableCell value={node.goods_exp} />
        <DataTableCell value={node.other_cost} />
        <DataTableCell value={node.sga} align="center" colSpan={2} />
      </>
    );
  };

  return (
    <>
      <DataTableCell value={node.expense} emphasized />
      {expenseData(node.year)}
    </>
  );
}

export function AttdTableRow({ node }: TableRowProps<Attd>) {
  const { displayFullAttd } = useAppState();
  return (
    <>
      <DataTableCell value={node.ticket} emphasized />
      <DataTableCell value={node.league_games} />
      <DataTableCell value={node.average_attd} emphasized separator />
      <DataTableCell value={node.league_attd} separator />
      {displayFullAttd ? (
        <>
          <DataTableCell value={node.leaguecup_attd} separator />
          <DataTableCell value={node.acl_attd} separator />
          <DataTableCell value={node.po_attd} separator />
          <DataTableCell value={node.second_attd} separator />
        </>
      ) : null}
      <DataTableCell value={node.all_games} />
      <DataTableCell value={node.all_attd} emphasized separator />
      <DataTableCell value={node.unit_price} separator />
    </>
  );
}

type TableBodyRowProps = {
  node: AllDataFieldsFragment;
  mode: Mode;
  index: number;
  selected?: boolean;
};

function TableBodyRow({
  index,
  mode,
  node,
  selected = false,
}: TableBodyRowProps) {
  const { tab } = useAppState();
  const rowData = (currentTab: Tab) => {
    if (currentTab === "pl") return <PLTableRow node={node} />;
    if (currentTab === "bs") return <BSTableRow node={node} />;
    if (currentTab === "revenue") return <RevenueTableRow node={node} />;
    if (currentTab === "expense") return <ExpenseTableRow node={node} />;
    return <AttdTableRow node={node} />;
  };

  return (
    <TableRow selected={selected} hover>
      <TableBodyLabel mode={mode} node={node} index={index} />
      <TableCell
        sx={{ fontSize: "body2.fontSize", color: "text.secondary", width: 80 }}
        align="center"
        padding="none"
      >
        <CategoryLabel category={node.category ?? ""} />
      </TableCell>
      <TableCell
        sx={{
          fontWeight: node.elevation ? "bold" : undefined,
          width: 80,
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          color: ({ palette }) => {
            if (node.elevation === "昇格")
              return palette.mode === "light"
                ? "success.main"
                : "success.light";
            if (node.elevation === "降格")
              return palette.mode === "light" ? "error.main" : "error.light";
            return undefined;
          },
        }}
        align="center"
        padding="none"
      >
        {node.rank}
      </TableCell>
      {rowData(tab)}
    </TableRow>
  );
}

TableBodyRow.defaultProps = {
  selected: undefined,
};

export default TableBodyRow;
