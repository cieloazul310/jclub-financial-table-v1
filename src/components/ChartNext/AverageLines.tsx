import * as React from 'react';
import { line as d3Line, Line, ScaleLinear } from 'd3';
import { j1color, j2color, j3color } from '../../utils/categoryColors';
import { DatumBrowser, Tab, Statistics } from '../../../types';

type CategoryLineProps = {
  scale: ScaleLinear<number, number>;
  itemWidth: number;
  yearExtent: number[];
  category: string;
  tab: Tab;
  line: Line<Pick<Statistics, 'revenue'>>;
};

function CategoryLine({ scale, itemWidth, yearExtent, category, tab, line }: CategoryLineProps) {
  const arr = Array.from({ length: yearExtent[1] - yearExtent[0] + 1 }, () => ({
    revenue: { average: Math.random() * 1000, totalCount: 10, values: [] },
  }));
  const color = React.useMemo(() => {
    if (category === 'J1') return j1color[600];
    if (category === 'J2') return j2color[600];
    return j3color[600];
  }, [category]);

  return (
    <g>
      <path d={line(arr) ?? undefined} fill="none" stroke={color} />
      <text x={itemWidth * arr.length} y={scale(arr[arr.length - 1].revenue.average)} textAnchor="start">
        {category}平均
      </text>
    </g>
  );
}

type AverageLinesTypes = {
  scale: ScaleLinear<number, number>;
  edges: {
    node: Omit<DatumBrowser, 'previousData'>;
  }[];
  tab: Tab;
  itemWidth: number;
};

function AverageLines({ scale, edges, tab, itemWidth }: AverageLinesTypes) {
  const categories = Array.from(new Set(edges.map(({ node }) => node.category)));
  const years = edges.map(({ node }) => node.year);
  const yearExtent = [years[0], years[years.length - 1]];
  const line = d3Line<Pick<Statistics, 'revenue'>>()
    .x((_, index) => index * itemWidth + itemWidth / 2)
    .y((d) => scale(d.revenue.average));

  return (
    <g strokeWidth={2} strokeDasharray="4,2">
      {categories.map((category) => (
        <CategoryLine
          key={category}
          scale={scale}
          itemWidth={itemWidth}
          yearExtent={yearExtent}
          category={category}
          tab={tab}
          line={line}
        />
      ))}
    </g>
  );
}

export default AverageLines;
