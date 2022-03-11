import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import { TableBodyLabel } from './TableLabel';
import { CategoryLabel } from '../CategoryAvatar';
import { useAppState } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import val from '../../utils/val';
import { Tab, Mode, DatumBrowser, General, PL, BS, Revenue, Expense, AttdBrowser } from '../../../types';

type DataTableCellProps = {
  value: number | null;
  emphasized?: boolean;
  separator?: boolean;
  strong?: boolean;
  red?: boolean;
} & Omit<TableCellProps, 'children'>;

function DataTableCell({ value, emphasized = false, strong = false, separator = false, red = false, ...props }: DataTableCellProps) {
  return (
    <TableCell
      align={props.align ?? 'right'}
      sx={{
        color: red && typeof value === 'number' && value < 0 ? 'error.main' : undefined,
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: ({ palette }) => {
          if (!emphasized) return undefined;
          return palette.mode === 'light' ? 'grey.100' : 'background.paper';
        },
        fontWeight: strong || emphasized ? 'bold' : undefined,
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
  edge: {
    node: Pick<General, 'year'> & T;
  };
};

export function PLTableRow({ edge }: TableRowProps<PL>) {
  const { node } = edge;
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

export function BSTableRow({ edge }: TableRowProps<BS>) {
  const { node } = edge;
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

export function RevenueTableRow({ edge }: TableRowProps<Revenue>) {
  const { node } = edge;
  const otherRevs = (year: number) => {
    if (year <= 2010) return <DataTableCell value={node.other_revs} align="center" colSpan={3} />;
    if (year <= 2015)
      return (
        <>
          <DataTableCell value={node.academy_rev} align="center" />
          <DataTableCell value={node.other_revs} align="center" colSpan={2} />
        </>
      );
    return (
      <>
        <DataTableCell value={node.academy_rev} align="center" />
        <DataTableCell value={node.goods_rev} align="center" />
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

export function ExpenseTableRow({ edge }: TableRowProps<Expense>) {
  const { node } = edge;
  const expenseData = (year: number) => {
    if (year <= 2005 && !node.salary)
      return (
        <>
          <DataTableCell value={node.general_exp} align="center" colSpan={7} />
          <DataTableCell value={node.sga} align="center" />
        </>
      );
    if (year <= 2010)
      return (
        <>
          <DataTableCell value={node.salary} />
          <DataTableCell value={node.manage_exp} align="center" colSpan={6} />
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

export function AttdTableRow({ edge }: TableRowProps<AttdBrowser>) {
  const { node } = edge;
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
  edge: {
    node: Omit<DatumBrowser, 'previousData'>;
  };
  mode: Mode;
  index: number;
  selected?: boolean;
};

function TableBodyRow({ index, mode, edge, selected = false }: TableBodyRowProps) {
  const { tab } = useAppState();
  const rowData = (currentTab: Tab) => {
    if (currentTab === 'pl') return <PLTableRow edge={edge} />;
    if (currentTab === 'bs') return <BSTableRow edge={edge} />;
    if (currentTab === 'revenue') return <RevenueTableRow edge={edge} />;
    if (currentTab === 'expense') return <ExpenseTableRow edge={edge} />;
    return <AttdTableRow edge={edge} />;
  };

  return (
    <TableRow selected={selected} hover>
      <TableBodyLabel mode={mode} edge={edge} index={index} />
      <TableCell sx={{ fontSize: 'body2.fontSize', color: 'text.secondary', width: 80 }} align="center" padding="none">
        <CategoryLabel category={edge.node.category ?? ''} />
      </TableCell>
      <TableCell
        sx={{
          fontWeight: edge.node.elevation ? 'bold' : undefined,
          width: 80,
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          color: ({ palette }) => {
            if (edge.node.elevation === '昇格') return palette.mode === 'light' ? 'success.main' : 'success.light';
            if (edge.node.elevation === '降格') return palette.mode === 'light' ? 'error.main' : 'error.light';
            return undefined;
          },
        }}
        align="center"
        padding="none"
      >
        {edge.node.rank}
      </TableCell>
      {rowData(tab)}
    </TableRow>
  );
}

TableBodyRow.defaultProps = {
  selected: undefined,
};

export default TableBodyRow;
