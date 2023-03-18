import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ButtonBase from '@mui/material/ButtonBase';
import { AppLink } from '@cieloazul310/gatsby-theme-aoi';
import { useAppState, useDispatch } from '../../../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import CategoryLabel from '../../../../components/CategoryAvatar';
import { PLCardValues, BSCardValues, RevenueCardValues, ExpenseCardValues, AttdCardValues } from './CardValues';

import type { AllDataFieldsFragment, Mode, General, SeasonResult } from '../../../../../types';

type CardItemProps<T extends Mode> = {
  node: AllDataFieldsFragment;
  previous: Omit<AllDataFieldsFragment, keyof General | keyof SeasonResult> | null;
  mode: T;
  index: number;
  length: number;
};

function CardItem<T extends Mode>({ node, previous, mode, index, length }: CardItemProps<T>) {
  const { tab, sortKey } = useAppState();
  const dispatch = useDispatch();

  const cardTitle = React.useMemo(() => {
    if (tab === 'pl') return '損益計算書 (P/L)';
    if (tab === 'bs') return '貸借対照表 (B/S)';
    if (tab === 'revenue') return '営業収入';
    if (tab === 'expense') return '営業費用';
    return '入場者数';
  }, [tab]);

  const cardValues = React.useMemo(() => {
    if (tab === 'pl') return <PLCardValues node={node} previous={previous} mode={mode} />;
    if (tab === 'bs') return <BSCardValues node={node} previous={previous} mode={mode} />;
    if (tab === 'revenue') return <RevenueCardValues node={node} previous={previous} mode={mode} />;
    if (tab === 'expense') return <ExpenseCardValues node={node} previous={previous} mode={mode} />;
    return <AttdCardValues node={node} previous={previous} mode={mode} />;
  }, [tab]);

  const onRankClick = () => {
    if (sortKey === 'rank') {
      dispatch({ type: 'TOGGLE_SORTASC' });
    } else {
      dispatch({ type: 'CHANGE_SORTKEY', sortKey: 'rank' });
    }
  };

  return (
    <MuiCard sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ fontSize: 14 }} gutterBottom display="flex" alignItems="center">
          <CategoryLabel category={node.category} />
          <Typography component="span" flexGrow={1} color="text.secondary" ml={1} display="flex" alignItems="center">
            <ButtonBase
              sx={{
                fontSize: 'inherit',
                color: mode === 'year' && sortKey === 'rank' ? 'secondary.main' : 'inherit',
                '&:hover': {
                  textDecoration: mode === 'year' ? 'underline' : undefined,
                  cursor: mode === 'year' ? 'pointer' : undefined,
                },
              }}
              disableRipple
              disabled={mode === 'club'}
              onClick={onRankClick}
            >
              {mode === 'club' ? node.name : `${node.year}年`}
              {` ${node.category} ${node.rank}位`}
            </ButtonBase>
            {node.elevation ? (
              <Typography component="span" ml={1} color={node.elevation === '昇格' ? 'success.main' : 'error.main'}>
                {node.elevation}
              </Typography>
            ) : null}
          </Typography>
          {mode === 'year' ? (
            <Typography component="span" fontWeight="bold">
              {(index + 1).toString()} / {length}
            </Typography>
          ) : null}
        </Typography>
        <Typography variant="h6" component="div">
          <AppLink color="inherit" href={mode === 'club' ? `/year/${node.year}/` : `/club/${node.slug}/`}>
            {mode === 'club' ? `${node.year}年度決算` : node.fullname}
          </AppLink>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {cardTitle}
        </Typography>
        <Typography component="ul" p={0} sx={{ flexGrow: 1, overflow: 'auto', flexShrink: 1, minHeihgt: 0 }}>
          {cardValues}
        </Typography>
      </CardContent>
    </MuiCard>
  );
}

export default CardItem;
