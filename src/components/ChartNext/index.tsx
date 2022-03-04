import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppState } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';

import { DatumBrowser } from '../../../types';

type ChartProps = {
  edges: {
    node: Omit<DatumBrowser, 'previousData'>;
  }[];
};

function Chart({ edges }: ChartProps) {
  const { tab } = useAppState();
  const barWidth = 20;
  const padding = 0.4;
  const width = (barWidth + barWidth * padding) * (edges.length + 1);
  const height = 360;
  const max = edges.reduce((accum, { node }) => Math.max(accum, node.revenue), 0);
  const maxValue = Math.round(max / 100) * 100;

  return (
    <Box maxWidth="md">
      <Box width={1} height={height} display="flex">
        <Box flexShrink={0} width="4em" height={1} bgcolor="grey.200" display="flex" flexDirection="column">
          <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="flex-end">
            <Box display="flex" height={300} flexDirection="column-reverse" justifyContent="space-evenly" alignItems="end">
              {Array.from({ length: maxValue / 100 }, (_, i) => (i + 1) * 100).map((value) => (
                <Typography variant="caption" key={value.toString()}>
                  {value}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box flexShrink={0} height={24} />
        </Box>
        <Box flexGrow={1} width={barWidth + barWidth * padding} height={1} bgcolor="grey.100" display="flex" overflow="auto">
          {edges.map(({ node }) => (
            <Box display="flex" flexDirection="column" key={node.year.toString()}>
              <Box flex={6} display="flex" flexDirection="column" justifyContent="flex-end">
                <Box height={300} display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center">
                  <Box width={barWidth} height={300 * (node.revenue / maxValue)} bgcolor="success.main" />
                </Box>
              </Box>
              <Box flexShrink={0} height={24}>
                <Typography variant="caption">{node.year}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Chart;
