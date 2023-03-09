import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { line as d3Line, Line, ScaleLinear } from 'd3';
import { j1color, j2color, j3color } from '../../../utils/categoryColors';
import { useAppState } from '../../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { useStatistics, useAllYears } from '../../../utils/graphql-hooks';
import type { AllDataFieldsFragment, Statistics } from '../../../../types';

function useStatisticsField() {
  const { tab } = useAppState();
  if (tab === 'attd') return 'average_attd';
  if (tab === 'expense') return 'salary';
  return 'revenue';
}

function useAverageLine(scale: ScaleLinear<number, number>, years: number[], itemWidth: number) {
  const field = useStatisticsField();
  const allYears = useAllYears().map((node) => node.year);
  const diff = years[0] - allYears[0];

  return React.useMemo(
    () =>
      d3Line<Statistics>()
        .x((d) => (allYears.indexOf(d.year) - diff) * itemWidth + itemWidth / 2)
        .y((d) => scale(d[field].average)),
    [field, years, scale, itemWidth]
  );
}

type CategoryLineProps = {
  scale: ScaleLinear<number, number>;
  itemWidth: number;
  category: string;
  line: Line<Statistics>;
  nodesLength: number;
};

function CategoryLine({ scale, itemWidth, nodesLength, category, line }: CategoryLineProps) {
  const { palette } = useTheme();
  const statistics = useStatistics();
  const field = useStatisticsField();
  const color = React.useMemo(() => {
    if (category === 'J1') return j1color[600];
    if (category === 'J2') return j2color[600];
    return j3color[600];
  }, [category]);
  const arr = React.useMemo(() => {
    if (category === 'J1') return statistics.J1;
    if (category === 'J2') return statistics.J2;
    if (category === 'J3') return statistics.J3;
    return null;
  }, [category]);

  return arr ? (
    <g>
      <path d={line(arr) ?? undefined} fill="none" stroke={color} />
      <text
        x={itemWidth * nodesLength}
        y={scale(arr[arr.length - 1][field].average)}
        textAnchor="start"
        fill={palette.text.primary}
        alignmentBaseline="middle"
      >
        {category}平均
      </text>
    </g>
  ) : null;
}

type AverageLinesTypes = {
  scale: ScaleLinear<number, number>;
  nodes: AllDataFieldsFragment[];
  itemWidth: number;
};

/**
 * SVG上にカテゴリ別の年度別平均値を表示するコンポーネント
 */
function AverageLines({ scale, nodes, itemWidth }: AverageLinesTypes) {
  const { tab } = useAppState();
  const categories = Array.from(new Set(nodes.map((node) => node.category)));
  const years = nodes.map((node) => node.year);
  const line = useAverageLine(scale, years, itemWidth);

  return tab !== 'bs' ? (
    <g strokeWidth={2} strokeDasharray="4,2">
      {categories.map((category) => (
        <CategoryLine key={category} scale={scale} itemWidth={itemWidth} category={category} line={line} nodesLength={nodes.length} />
      ))}
    </g>
  ) : null;
}

export default AverageLines;
