import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import { TableHeadLabel } from './TableLabel';
import TableHeadCell from './TableHeadCell';
import { useAppState } from '../../../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import type { Tab, Mode } from '../../../../../types';

type TableHeadRowProps = {
  mode: Mode;
};

export function PLTableHeadRow({ mode }: Pick<TableHeadRowProps, 'mode'>) {
  return (
    <>
      <TableHeadCell mode={mode} sortableKey="revenue">
        営業収入
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="expense">
        営業費用
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="op_profit">
        営業利益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="no_rev">
        営業外収益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="no_exp">
        営業外費用
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="ordinary_profit">
        経常利益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="sp_rev">
        特別利益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="sp_exp">
        特別損失
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="profit_before_tax">
        税引前
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="tax">
        法人税等
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="profit">
        当期純利益
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="related_revenue">
        (関連法人)
      </TableHeadCell>
    </>
  );
}

export function BSTableHeadRow({ mode }: Pick<TableHeadRowProps, 'mode'>) {
  return (
    <>
      <TableHeadCell mode={mode} sortableKey="assets">
        総資産
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="curr_assets">
        流動資産
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="fixed_assets">
        固定資産等
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="liabilities">
        総負債
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="curr_liabilities">
        流動負債
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="fixed_liabilities">
        固定負債
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="net_worth">
        純資産
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="capital_stock">
        資本金
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="capital_surplus">
        資本剰余金等
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="retained_earnings">
        利益剰余金
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="profit">
        (当期純利益)
      </TableHeadCell>
    </>
  );
}

export function RevenueTableHeadRow({ mode }: Pick<TableHeadRowProps, 'mode'>) {
  return (
    <>
      <TableHeadCell mode={mode} sortableKey="revenue">
        営業収入
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="sponsor">
        スポンサー
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="ticket">
        入場料
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="broadcast">
        配分金
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="academy_rev">
        アカデミー関連
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="goods_rev">
        物販
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="other_revs">
        その他
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="related_revenue">
        (関連法人)
      </TableHeadCell>
    </>
  );
}

export function ExpenseTableHeadRow({ mode }: Pick<TableHeadRowProps, 'mode'>) {
  return (
    <>
      <TableHeadCell mode={mode} sortableKey="expense">
        営業費用
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="salary">
        チーム人件費
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="game_exp">
        試合関連
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="team_exp">
        トップチーム運営
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="academy_exp">
        アカデミー運営
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="women_exp">
        女子チーム運営
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="goods_exp">
        物販関連
      </TableHeadCell>
      <TableHeadCell mode={mode}>販売費</TableHeadCell>
      <TableHeadCell mode={mode}>一般管理費</TableHeadCell>
    </>
  );
}

export function AttdTableHeadRow({ mode }: Pick<TableHeadRowProps, 'mode'>) {
  const { displayFullAttd } = useAppState();
  return (
    <>
      <TableHeadCell mode={mode} sortableKey="ticket">
        入場料収入
      </TableHeadCell>
      <TableHeadCell mode={mode}>リーグホーム数</TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="average_attd">
        リーグ戦平均
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="league_attd">
        リーグ戦入場者数
      </TableHeadCell>
      {displayFullAttd ? (
        <>
          <TableHeadCell mode={mode}>リーグカップ入場者数</TableHeadCell>
          <TableHeadCell mode={mode}>ACL入場者数</TableHeadCell>
          <TableHeadCell mode={mode}>PO入場者数</TableHeadCell>
          <TableHeadCell mode={mode}>セカンド入場者数</TableHeadCell>
        </>
      ) : null}
      <TableHeadCell mode={mode}>ホーム試合数</TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="all_attd">
        年間入場者数
      </TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="unit_price">
        客単価
      </TableHeadCell>
    </>
  );
}

function TableHeadRow({ mode }: TableHeadRowProps) {
  const { tab } = useAppState();
  const tableHeadLabels = (currentTab: Tab) => {
    if (currentTab === 'pl') return <PLTableHeadRow mode={mode} />;
    if (currentTab === 'bs') return <BSTableHeadRow mode={mode} />;
    if (currentTab === 'revenue') return <RevenueTableHeadRow mode={mode} />;
    if (currentTab === 'expense') return <ExpenseTableHeadRow mode={mode} />;
    return <AttdTableHeadRow mode={mode} />;
  };

  return (
    <TableRow>
      <TableHeadLabel mode={mode} />
      <TableHeadCell mode={mode}>所属</TableHeadCell>
      <TableHeadCell mode={mode} sortableKey="rank">
        順位
      </TableHeadCell>
      {tableHeadLabels(tab)}
    </TableRow>
  );
}

export default TableHeadRow;
