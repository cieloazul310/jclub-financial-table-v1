import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppState, useDispatch } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import val from '../../utils/val';
import { General, PL, BS, Revenue, Expense, AttdBrowser, Mode } from '../../../types';

type CardValueProps<T> = {
  label: string;
  property: keyof T;
  // eslint-disable-next-line react/require-default-props
  separator?: boolean;
  // eslint-disable-next-line react/require-default-props
  emphasized?: boolean;
  // eslint-disable-next-line react/require-default-props
  strong?: boolean;
  // eslint-disable-next-line react/require-default-props
  inset?: boolean;
};

function diffIcon(diffval: number | null) {
  if (!diffval) return null;
  return diffval > 0 ? <ArrowDropUpIcon color="success" /> : <ArrowDropDownIcon color="error" />;
}

function CardValueCore<T>(
  edge: {
    node: T & General;
  },
  prev: T | null,
  mode: Mode
) {
  return function CardValue({ label, property, emphasized = false, strong = false, separator = false, inset = false }: CardValueProps<T>) {
    const { sortKey } = useAppState();
    const dispatch = useDispatch();
    const value = edge.node[property];
    const prevValue = prev?.[property] ?? null;
    if (typeof value !== 'number') return null;
    const diffval = typeof prevValue === 'number' ? value - prevValue : null;
    const selected = mode === 'year' && sortKey === property;
    const sortable = mode === 'year';
    const onClick = () => {
      if (!sortable) return;
      if (selected) {
        dispatch({ type: 'TOGGLE_SORTASC' });
      } else {
        dispatch({ type: 'CHANGE_SORTKEY', sortKey: property });
      }
    };

    return (
      <Box
        sx={{
          p: 0.5,
          bgcolor: ({ palette }) => {
            if (!emphasized) return undefined;
            return palette.mode === 'light' ? 'grey.100' : 'grey.800';
          },
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          fontSize: 'body2.fontSize',
        }}
      >
        <Box
          sx={{
            pl: inset ? 2 : undefined,
            flexGrow: 1,
            color: selected ? 'secondary.main' : 'inherit',
            '&:hover': {
              textDecoration: mode === 'year' ? 'underline' : undefined,
              cursor: mode === 'year' ? 'pointer' : undefined,
            },
          }}
          role="button"
          tabIndex={0}
          onClick={onClick}
        >
          {label}
        </Box>
        <Typography
          sx={{ fontWeight: emphasized || strong || selected ? 'bold' : undefined }}
          component="span"
          color={property === 'net_worth' && value < 0 ? 'error.main' : undefined}
        >
          {val(value, separator)}
        </Typography>
        <Typography
          sx={{ width: '6em', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
          color="text.secondary"
          component="span"
        >
          {diffIcon(diffval)}
          {diffval ? val(Math.abs(diffval), separator ?? false) : null}
        </Typography>
      </Box>
    );
  };
}

type CardValuesProps<T> = {
  edge: {
    node: T & General;
  };
  previous: T | null;
  mode: Mode;
};

export function PLCardValues<T extends PL>({ edge, previous, mode }: CardValuesProps<T>) {
  const CardValue = CardValueCore(edge, previous, mode);
  return (
    <>
      <CardValue label="営業収入" property="revenue" strong />
      <CardValue label="営業費用" property="expense" strong />
      <CardValue label="営業利益" property="op_profit" emphasized />
      <CardValue label="営業外収入" property="no_rev" inset />
      <CardValue label="営業外費用" property="no_exp" inset />
      <CardValue label="経常利益" property="ordinary_profit" emphasized />
      <CardValue label="特別利益" property="sp_rev" inset />
      <CardValue label="特別損失" property="sp_exp" inset />
      <CardValue label="税引前当期利益" property="profit_before_tax" emphasized />
      <CardValue label="法人税および住民税等" property="tax" inset />
      <CardValue label="当期純利益" property="profit" emphasized />
      <CardValue label="(関連する法人の営業収入)" property="related_revenue" />
    </>
  );
}

export function BSCardValues<T extends BS>({ edge, previous, mode }: CardValuesProps<T>) {
  const CardValue = CardValueCore(edge, previous, mode);
  return (
    <>
      <CardValue label="資産の部" property="assets" emphasized />
      <CardValue label="流動資産" property="curr_assets" inset />
      <CardValue label="固定資産等" property="fixed_assets" inset />
      <CardValue label="負債の部" property="liabilities" emphasized />
      <CardValue label="流動負債" property="curr_liabilities" inset />
      <CardValue label="固定負債" property="fixed_liabilities" inset />
      <CardValue label="純資産の部" property="net_worth" emphasized />
      <CardValue label="資本金" property="capital_stock" inset />
      <CardValue label="資本剰余金等" property="capital_surplus" inset />
      <CardValue label="利益剰余金" property="retained_earnings" inset />
      <CardValue label="(当期純利益)" property="profit" inset />
    </>
  );
}

export function RevenueCardValues<T extends Revenue>({ edge, previous, mode }: CardValuesProps<T>) {
  const CardValue = CardValueCore(edge, previous, mode);
  return (
    <>
      <CardValue label="営業収入" property="revenue" emphasized />
      <CardValue label="スポンサー収入" property="sponsor" inset />
      <CardValue label="入場料収入" property="ticket" inset />
      <CardValue label="Jリーグ配分金" property="broadcast" inset />
      <CardValue label="アカデミー関連収入" property="academy_rev" inset />
      <CardValue label="物販関連収入" property="goods_rev" inset />
      <CardValue label="その他収入" property="other_revs" inset />
      <CardValue label="(関連する法人の営業収入)" property="related_revenue" />
    </>
  );
}

export function ExpenseCardValues<T extends Expense>({ edge, previous, mode }: CardValuesProps<T>) {
  const CardValue = CardValueCore(edge, previous, mode);
  return (
    <>
      <CardValue label="営業費用" property="expense" emphasized />
      <CardValue label="チーム人件費" property="salary" inset />
      <CardValue label="事業費(チーム人件費を除く)" property="manage_exp" inset />
      <CardValue label="試合関連経費" property="game_exp" inset />
      <CardValue label="トップチーム運営経費" property="team_exp" inset />
      <CardValue label="アカデミー関連経費" property="academy_exp" inset />
      <CardValue label="女子チーム運営経費" property="women_exp" inset />
      <CardValue label="物販関連費" property="goods_exp" inset />
      <CardValue label="販売費および一般管理費" property="sga" inset />
    </>
  );
}

export function AttdCardValues<T extends AttdBrowser>({ edge, previous, mode }: CardValuesProps<T>) {
  const CardValue = CardValueCore(edge, previous, mode);
  return (
    <>
      <CardValue label="入場料収入" property="ticket" emphasized />
      <CardValue label="リーグ戦平均入場者数" property="average_attd" strong separator />
      <CardValue label="客単価" property="unit_price" strong />
      <CardValue label="年間総入場者数" property="all_attd" separator emphasized />
      <CardValue label="リーグ戦" property="league_attd" inset separator />
      <CardValue label="リーグカップ" property="leaguecup_attd" inset separator />
      <CardValue label="ACL" property="acl_attd" inset separator />
      <CardValue label="プレーオフ" property="po_attd" inset separator />
      <CardValue label="U-23" property="second_attd" inset separator />
      <CardValue label="年間ホームゲーム数" property="all_games" emphasized />
      <CardValue label="リーグ戦" property="league_games" inset />
      <CardValue label="リーグカップ" property="leaguecup_games" inset />
      <CardValue label="ACL" property="acl_games" inset />
      <CardValue label="プレーオフ" property="po_games" inset />
      <CardValue label="U-23" property="second_games" inset />
    </>
  );
}
