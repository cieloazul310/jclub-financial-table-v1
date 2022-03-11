import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useAppState } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';

function useChartTitle() {
  const { tab } = useAppState();
  if (tab === 'bs') return '資産の部、負債の部、純資産の部推移';
  if (tab === 'expense') return 'チーム人件費推移';
  if (tab === 'attd') return '平均入場者数推移';

  return '営業収入推移';
}

function ChartTitle() {
  const title = useChartTitle();
  return (
    <Typography variant="subtitle1" align="center">
      {title}
    </Typography>
  );
}

export default ChartTitle;
