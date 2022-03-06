import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CategoryLabel } from '../CategoryAvatar';
import { useAppState } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';

import { DatumBrowser } from '../../../types';

function useMax(values: number[]) {
  const max = values.reduce((accum, curr) => Math.max(accum, curr), 0);
  return Math.ceil(max / 1000) * 1000;
}

type AxisYProps = {
  min: number;
  max: number;
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
};

function AxisY({ min, max, width, height, padding }: AxisYProps) {
  return (
    <Box flexShrink={0} width={padding.left} height={1} display="flex" flexDirection="column">
      <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="flex-end">
        <Box
          display="flex"
          height={height - padding.top - padding.bottom}
          borderColor="divider"
          borderRight={1}
          flexDirection="column-reverse"
          justifyContent="space-evenly"
          alignItems="end"
        >
          {Array.from({ length: max / 100 }, (_, i) => (i + 1) * 100).map((value) => (
            <Typography variant="caption" key={value.toString()} pr={1}>
              {value}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box flexShrink={0} height={padding.bottom} display="flex" justifyContent="flex-end">
        <Typography variant="caption" pr={1}>
          {min}
        </Typography>
      </Box>
    </Box>
  );
}

type ChartProps = {
  edges: {
    node: Omit<DatumBrowser, 'previousData'>;
  }[];
};

function Chart({ edges }: ChartProps) {
  const { tab } = useAppState();
  const height = 360;
  const padding = { top: 20, right: 20, bottom: 40, left: 46 };
  const graphHeight = height - padding.top - padding.bottom;
  const barWidth = 28;
  const barPadding = 0.4;
  const width = padding.left + padding.right + (barWidth + barWidth * barPadding) * edges.length;
  const max = useMax(edges.map(({ node }) => node.revenue));

  return (
    <Box>
      <Box maxWidth="md">
        <Box height={height} display="flex" bgcolor="grey.200">
          <AxisY min={0} max={max} width={width} height={height} padding={padding} />
          <Box flexGrow={1} maxWidth={width - padding.left} height={1} display="flex" overflow="auto">
            {edges.map(({ node }) => (
              <Box display="flex" flexDirection="column" key={node.year.toString()}>
                <Box flexGrow={1} display="flex" width={barWidth + barWidth * barPadding} flexDirection="column" justifyContent="flex-end">
                  <Box height={graphHeight} display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center">
                    <Box width={barWidth} height={graphHeight * (node.revenue / max)} bgcolor="primary.main" />
                  </Box>
                </Box>
                <Box flexShrink={0} height={padding.bottom} display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="caption">{node.year}</Typography>
                  <Typography variant="caption">
                    <CategoryLabel category={node.category} />
                  </Typography>
                </Box>
              </Box>
            ))}
            <Box flexShrink={0} width={padding.right} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Chart;
