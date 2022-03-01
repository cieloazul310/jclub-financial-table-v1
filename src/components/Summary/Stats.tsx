import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import { YearBrowser } from '../../../types';
import StatsItem from './StatsItem';

type StatsProps = {
  year: Omit<YearBrowser, 'data'>;
  prevYear: Pick<YearBrowser, 'stats'> | null;
};

function Stats({ year, prevYear }: StatsProps) {
  const { categories } = year;
  return (
    <Box>
      <Tabs sx={{ display: { xs: 'block', sm: 'none' } }}>
        {categories.map((category) => (
          <MuiTab label={category} key={category} />
        ))}
      </Tabs>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StatsItem stats={year.stats.J1} prevStats={prevYear?.stats.J1 ?? null} category="J1" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatsItem stats={year.stats.J2} prevStats={prevYear?.stats.J2 ?? null} category="J2" />
        </Grid>
        {year.stats.J3 ? (
          <Grid item xs={12} sm={6}>
            <StatsItem stats={year.stats.J3} prevStats={prevYear?.stats.J3 ?? null} category="J3" />
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
}

export default Stats;
