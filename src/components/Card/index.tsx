import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { PLCardValues, BSCardValues, RevenueCardValues } from './CardValues';

import { DatumBrowser, PL, Tab } from '../../../types';

function cardTitle(tab: Tab) {
  if (tab === 'pl') return '損益計算書 (P/L)';
  if (tab === 'bs') return '貸借対照表 (B/S)';
  if (tab === 'revenue') return '営業収入';
  if (tab === 'expense') return '営業費用';
  return '入場者数';
}
/*
function cardValues<T>(tab: Tab) {
  if (tab === 'pl') return <PLCardValues />;
  if (tab === 'bs') return '貸借対照表 (B/S)';
  if (tab === 'revenue') return '営業収入';
  if (tab === 'expense') return '営業費用';
  return '入場者数';
}
*/

type CardProps<T> = {
  edge: {
    node: T;
  };
  previous: {
    node: T;
  } | null;
  tab: Tab;
};

function Card({ edge, previous, tab }: CardProps<DatumBrowser>) {
  return (
    <MuiCard>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {edge.node.year}年 {edge.node.category} {edge.node.rank}位
        </Typography>
        <Typography variant="h5" component="div">
          {edge.node.fullname}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {cardTitle(tab)}
        </Typography>
        <Typography component="ul">
          {tab === 'pl' ? <PLCardValues edge={edge} previous={previous} /> : <BSCardValues edge={edge} previous={previous} />}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">前年へ</Button>
        <Button size="small">翌年へ</Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;
