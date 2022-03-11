import * as React from 'react';
import Box from '@mui/material/Box';
import { H4 } from '@cieloazul310/gatsby-theme-aoi';
import StatsTable from './StatsTable';
import { Category, YearStats } from '../../../types';

type StatsItemProps = {
  category: Category;
  stats: YearStats;
  prevStats: YearStats | null;
};

function StatsItem({ category, stats, prevStats }: StatsItemProps) {
  return (
    <Box>
      <H4>
        {category} {stats.revenue.totalCount}クラブ
      </H4>
      <StatsTable stats={stats} prevStats={prevStats} />
    </Box>
  );
}

export default StatsItem;
