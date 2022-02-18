import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import val from '../../utils/val';
import { DatumBrowser, General, PL, BS, Revenue } from '../../../types';

type CardValueProps<T> = {
  label: string;
  property: keyof T;
  // eslint-disable-next-line react/require-default-props
  separator?: boolean;
  // eslint-disable-next-line react/require-default-props
  emphasized?: boolean;
  // eslint-disable-next-line react/require-default-props
  strong?: boolean;
};

function diffIcon(diffval: number | null) {
  if (!diffval) return null;
  return diffval > 0 ? <ArrowDropUpIcon color="success" /> : <ArrowDropDownIcon color="error" />;
}

function CardValueCore<T>(
  edge: {
    node: T & General;
  },
  prev: {
    node: T & General;
  } | null
) {
  return function CardValue({ label, property, emphasized = false, strong = false, separator = false }: CardValueProps<T>) {
    const value = edge.node[property];
    const prevValue = prev?.node[property] ?? null;
    if (typeof value !== 'number') return null;
    const diffval = value && prevValue && typeof prevValue === 'number' ? value - prevValue : null;

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
        }}
      >
        <Box flexGrow={1}>{label}</Box>
        <Typography sx={{ fontWeight: emphasized || strong ? 'bold' : undefined }} component="span">
          {val(value, separator)}
        </Typography>
        <Typography sx={{ width: '4em' }} color="text.secondary" textAlign="right" component="span">
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
  previous: {
    node: T & General;
  } | null;
};

export function PLCardValues<T extends PL>({ edge, previous }: CardValuesProps<T>) {
  const CardValue = CardValueCore(edge, previous);
  return (
    <Typography component="ul">
      <CardValue label="営業収入" property="revenue" strong />
      <CardValue label="営業費用" property="expense" strong />
      <CardValue label="営業利益" property="op_profit" emphasized />
      <CardValue label="営業外収入" property="no_rev" />
      <CardValue label="営業外費用" property="no_exp" />
      <CardValue label="経常利益" property="ordinary_profit" emphasized />
      <CardValue label="特別利益" property="sp_rev" />
      <CardValue label="特別損失" property="sp_exp" />
      <CardValue label="税引前当期利益" property="profit_before_tax" emphasized />
      <CardValue label="法人税および住民税等" property="tax" />
      <CardValue label="当期純利益" property="profit" emphasized />
      <CardValue label="関連する法人の営業収入" property="related_revenue" />
    </Typography>
  );
}

export function BSCardValues<T extends BS>({ edge, previous }: CardValuesProps<T>) {
  const CardValue = CardValueCore(edge, previous);
  return (
    <Typography component="ul">
      <CardValue label="総資産(資産の部)" property="assets" emphasized />
      <CardValue label="流動資産" property="curr_assets" />
      <CardValue label="固定資産等" property="fixed_assets" />
      <CardValue label="総負債(負債の部)" property="liabilities" emphasized />
      <CardValue label="流動負債" property="curr_liabilities" />
      <CardValue label="固定負債" property="fixed_liabilities" />
      <CardValue label="純資産(資本の部)" property="net_worth" emphasized />
      <CardValue label="資本金" property="capital_stock" />
      <CardValue label="資本剰余金" property="capital_surplus" emphasized />
      <CardValue label="利益剰余金" property="retained_earnings" />
      <CardValue label="当期純利益" property="profit" />
    </Typography>
  );
}

export function RevenueCardValues<T extends Revenue>({ edge, previous }: CardValuesProps<T>) {
  const CardValue = CardValueCore(edge, previous);
  return (
    <Typography component="ul">
      <CardValue label="営業収入" property="revenue" emphasized />
      <CardValue label="広告料収入" property="sponsor" />
      <CardValue label="入場料収入" property="ticket" />
      <CardValue label="Jリーグ配分金" property="broadcast" />
      <CardValue label="アカデミー関連収入" property="academy_rev" />
      <CardValue label="物販関連収入" property="goods_rev" />
      <CardValue label="その他収入" property="other_revs" />
      <CardValue label="関連する法人の営業収入" property="related_revenue" />
    </Typography>
  );
}
