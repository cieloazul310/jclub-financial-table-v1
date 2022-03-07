import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { ScaleLinear } from 'd3';
import { DatumBrowser, PL, BS, Tab, AttdBrowser, Revenue } from '../../../types';

type XLegendProps = {
  year: number;
  category: string;
  height: number;
  itemWidth: number;
};

function XLegend({ year, category, height, itemWidth }: XLegendProps) {
  return (
    <g transform={`translate(0, ${height})`}>
      <text x={itemWidth / 2} dy="4px" alignmentBaseline="hanging">
        {year}
      </text>
      <text x={itemWidth / 2} y={14} dy="4px" alignmentBaseline="hanging">
        {category}
      </text>
    </g>
  );
}

type BarProps<T> = {
  node: T;
  scale: ScaleLinear<number, number>;
  itemWidth: number;
  barWidth: number;
  barPadding: number;
};

function PLBar({ node, scale, itemWidth, barWidth, barPadding }: BarProps<PL>) {
  const { palette } = useTheme();
  return (
    <>
      <rect
        x={(itemWidth * barPadding) / 2}
        y={scale(node.revenue)}
        width={barWidth}
        height={scale(0) - scale(node.revenue)}
        fill={palette.grey[400]}
      />
      <text x={itemWidth / 2} y={scale(node.revenue)} dy="4px" alignmentBaseline="hanging">
        {node.revenue}
      </text>
    </>
  );
}

function BSBar({ node, scale, itemWidth, barWidth, barPadding }: BarProps<BS>) {
  const { palette } = useTheme();
  if (!node.assets || !node.liabilities || !node.net_worth) return null;
  return (
    <>
      <rect
        x={(itemWidth * barPadding) / 2}
        y={scale(node.assets)}
        width={barWidth / 2}
        height={scale(0) - scale(node.assets)}
        fill={palette.grey[600]}
      />
      <rect
        x={itemWidth / 2}
        y={scale(node.assets)}
        width={barWidth / 2}
        height={scale(0) - scale(node.liabilities)}
        fill={palette.grey[400]}
      />
      <rect
        x={itemWidth / 2}
        y={node.net_worth < 0 ? scale(0) : scale(node.net_worth)}
        width={barWidth / (node.net_worth < 0 ? 4 : 2)}
        height={(node.net_worth < 0 ? -1 : 1) * (scale(0) - scale(node.net_worth))}
        fill={node.net_worth < 0 ? palette.error.light : palette.success.light}
      />
    </>
  );
}

function RevenueBar({ node, scale, itemWidth, barWidth, barPadding }: BarProps<Revenue>) {
  const { palette } = useTheme();
  const { revenue, sponsor, ticket, broadcast } = node;
  const othersRev = revenue - ((sponsor ?? 0) + (ticket ?? 0) + (broadcast ?? 0));

  return (
    <>
      <rect
        x={(itemWidth * barPadding) / 2}
        y={scale(revenue)}
        width={barWidth}
        height={scale(0) - scale(othersRev) - 1}
        fill={palette.grey[400]}
      />
      {broadcast ? (
        <rect
          x={(itemWidth * barPadding) / 2}
          y={scale(revenue - othersRev)}
          width={barWidth}
          height={scale(0) - scale(broadcast) - 1}
          fill={palette.primary.light}
        />
      ) : null}
      {ticket ? (
        <rect
          x={(itemWidth * barPadding) / 2}
          y={scale(revenue - othersRev - (broadcast ?? 0))}
          width={barWidth}
          height={scale(0) - scale(ticket) - 1}
          fill={palette.primary.main}
        />
      ) : null}
      {sponsor ? (
        <rect
          x={(itemWidth * barPadding) / 2}
          y={scale(revenue - othersRev - (broadcast ?? 0) - (ticket ?? 0))}
          width={barWidth}
          height={scale(0) - scale(sponsor) - 1}
          fill={palette.primary.dark}
        />
      ) : null}
    </>
  );
}

function AttdBar({ node, scale, itemWidth, barWidth, barPadding }: BarProps<AttdBrowser>) {
  const { palette } = useTheme();
  return (
    <rect
      x={(itemWidth * barPadding) / 2}
      y={scale(node.average_attd)}
      width={barWidth}
      height={scale(0) - scale(node.average_attd)}
      fill={palette.grey[400]}
    />
  );
}

type BarsProps = {
  edges: {
    node: Omit<DatumBrowser, 'previousData'>;
  }[];
  scale: ScaleLinear<number, number>;
  height: number;
  itemWidth: number;
  tab: Tab;
};

function Bars({ edges, scale, height, itemWidth, tab }: BarsProps) {
  const barPadding = 0.2;
  const barWidth = itemWidth * (1 - barPadding);

  function barByTab(node: Omit<DatumBrowser, 'previousData'>) {
    if (tab === 'bs')
      return (
        <BSBar key={node.year.toString()} node={node} scale={scale} itemWidth={itemWidth} barWidth={barWidth} barPadding={barPadding} />
      );
    if (tab === 'revenue')
      return (
        <RevenueBar
          key={node.year.toString()}
          node={node}
          scale={scale}
          itemWidth={itemWidth}
          barWidth={barWidth}
          barPadding={barPadding}
        />
      );
    if (tab === 'attd')
      return (
        <AttdBar key={node.year.toString()} node={node} scale={scale} itemWidth={itemWidth} barWidth={barWidth} barPadding={barPadding} />
      );
    return <PLBar key={node.year.toString()} node={node} scale={scale} itemWidth={itemWidth} barWidth={barWidth} barPadding={barPadding} />;
  }

  return (
    <g>
      {edges.map(({ node }, index) => (
        <g key={node.year.toString()} transform={`translate(${itemWidth * index}, 0)`}>
          {barByTab(node)}
          <XLegend year={node.year} category={node.category} height={height} itemWidth={itemWidth} />
        </g>
      ))}
    </g>
  );
}

export default Bars;
