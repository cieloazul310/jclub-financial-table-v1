import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { PLCardValues, BSCardValues, RevenueCardValues, ExpenseCardValues, AttdCardValues } from './CardValues';

import { DatumBrowser, Tab } from '../../../types';

function cardTitle(tab: Tab) {
  if (tab === 'pl') return '損益計算書 (P/L)';
  if (tab === 'bs') return '貸借対照表 (B/S)';
  if (tab === 'revenue') return '営業収入';
  if (tab === 'expense') return '営業費用';
  return '入場者数';
}

type CardItemProps<T> = {
  edge: {
    node: T;
  };
  previous: {
    node: T;
  } | null;
  tab: Tab;
  handleChangeIndex: (index: number) => void;
  index: number;
};

function CardItem({ edge, previous, tab, handleChangeIndex, index }: CardItemProps<DatumBrowser>) {
  const back = () => {
    handleChangeIndex(index - 1);
  };
  const forward = () => {
    handleChangeIndex(index + 1);
  };

  function cardValues() {
    if (tab === 'pl') return <PLCardValues edge={edge} previous={previous} />;
    if (tab === 'bs') return <BSCardValues edge={edge} previous={previous} />;
    if (tab === 'revenue') return <RevenueCardValues edge={edge} previous={previous} />;
    if (tab === 'expense') return <ExpenseCardValues edge={edge} previous={previous} />;
    return <AttdCardValues edge={edge} previous={previous} />;
  }
  return (
    <MuiCard sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {edge.node.year}年 {edge.node.category} {edge.node.rank}位
          {edge.node.elevation ? (
            <Typography component="span" ml={1} color={edge.node.elevation === '昇格' ? 'success.main' : 'error.main'}>
              {edge.node.elevation}
            </Typography>
          ) : null}
        </Typography>
        <Typography variant="h5" component="div">
          {edge.node.fullname}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {cardTitle(tab)}
        </Typography>
        <Typography component="ul" p={0} sx={{ flexGrow: 1, overflow: 'auto', flexShrink: 1, minHeihgt: 0 }}>
          {cardValues()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={back} disabled={index === 0}>
          前年度へ
        </Button>
        <Button size="small" onClick={forward}>
          次年度へ
        </Button>
      </CardActions>
    </MuiCard>
  );
}

export default CardItem;
