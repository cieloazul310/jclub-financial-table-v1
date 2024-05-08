import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { ScaleLinear } from "d3";
import { useAppState } from "@appState/AppStateContext";
import type {
  AllDataFieldsFragment,
  General,
  PL,
  BS,
  Attd,
  Expense,
} from "types";
import { useFill } from "./bar-gradient";

type XLegendProps = {
  year: number;
  category: string;
  height: number;
  itemWidth: number;
};

function XLegend({ year, category, height, itemWidth }: XLegendProps) {
  const { palette } = useTheme();
  return (
    <g transform={`translate(0, ${height})`}>
      <text
        x={itemWidth / 2}
        dy="4px"
        alignmentBaseline="hanging"
        fill={palette.text.primary}
      >
        {year}
      </text>
      <text
        x={itemWidth / 2}
        y={14}
        dy="4px"
        alignmentBaseline="hanging"
        fill={palette.text.primary}
      >
        {category}
      </text>
    </g>
  );
}

type BarProps<T> = {
  node: T & General;
  scale: ScaleLinear<number, number>;
  itemWidth: number;
  barWidth: number;
  barPadding: number;
};

function PLBar({ node, scale, itemWidth, barWidth, barPadding }: BarProps<PL>) {
  const fill = useFill(node);

  return (
    <rect
      x={(itemWidth * barPadding) / 2}
      y={scale(node.revenue)}
      width={barWidth}
      height={scale(0) - scale(node.revenue)}
      fill={fill}
    />
  );
}

function BSBar({ node, scale, itemWidth, barWidth, barPadding }: BarProps<BS>) {
  const { palette } = useTheme();
  if (
    typeof node.assets !== "number" ||
    typeof node.liabilities !== "number" ||
    typeof node.net_worth !== "number"
  )
    return null;
  return (
    <>
      <rect
        x={(itemWidth * barPadding) / 2}
        y={scale(node.assets)}
        width={barWidth / 2}
        height={scale(0) - scale(node.assets)}
        fill={palette.grey[palette.mode === "light" ? 400 : 800]}
      />
      <rect
        x={itemWidth / 2}
        y={scale(node.assets)}
        width={barWidth / 2}
        height={scale(0) - scale(node.liabilities) - 1}
        fill={palette.grey[palette.mode === "light" ? 300 : 700]}
      />
      <rect
        x={itemWidth / 2}
        y={node.net_worth < 0 ? scale(0) : scale(node.net_worth)}
        width={barWidth / (node.net_worth < 0 ? 4 : 2)}
        height={
          (node.net_worth < 0 ? -1 : 1) * (scale(0) - scale(node.net_worth))
        }
        fill={
          node.net_worth < 0
            ? palette.error[palette.mode]
            : palette.success[palette.mode]
        }
      />
    </>
  );
}

function ExpenseBar({
  node,
  scale,
  itemWidth,
  barWidth,
  barPadding,
}: BarProps<Expense>) {
  const { palette } = useTheme();
  const fill = useFill(node);
  const { expense, salary } = node;
  const othersExp = expense - (salary ?? 0);

  return (
    <>
      <rect
        x={(itemWidth * barPadding) / 2}
        y={scale(expense)}
        width={barWidth}
        height={scale(0) - scale(othersExp) - 1}
        fill={palette.grey[palette.mode === "light" ? 200 : 900]}
      />
      {salary ? (
        <rect
          x={(itemWidth * barPadding) / 2}
          y={scale(salary)}
          width={barWidth}
          height={scale(0) - scale(salary) - 1}
          fill={fill}
        />
      ) : null}
    </>
  );
}

function AttdBar({
  node,
  scale,
  itemWidth,
  barWidth,
  barPadding,
}: BarProps<Attd>) {
  const fill = useFill(node);
  return (
    <rect
      x={(itemWidth * barPadding) / 2}
      y={scale(node.average_attd)}
      width={barWidth}
      height={scale(0) - scale(node.average_attd)}
      fill={fill}
    />
  );
}

type BarsProps = {
  nodes: AllDataFieldsFragment[];
  scale: ScaleLinear<number, number>;
  height: number;
  itemWidth: number;
};

function Bars({ nodes, scale, height, itemWidth }: BarsProps) {
  const { tab } = useAppState();
  const barPadding = 0.2;
  const barWidth = itemWidth * (1 - barPadding);

  function barByTab(node: AllDataFieldsFragment) {
    if (tab === "bs")
      return (
        <BSBar
          key={node.year.toString()}
          node={node}
          scale={scale}
          itemWidth={itemWidth}
          barWidth={barWidth}
          barPadding={barPadding}
        />
      );
    if (tab === "expense")
      return (
        <ExpenseBar
          key={node.year.toString()}
          node={node}
          scale={scale}
          itemWidth={itemWidth}
          barWidth={barWidth}
          barPadding={barPadding}
        />
      );
    if (tab === "attd")
      return (
        <AttdBar
          key={node.year.toString()}
          node={node}
          scale={scale}
          itemWidth={itemWidth}
          barWidth={barWidth}
          barPadding={barPadding}
        />
      );
    return (
      <PLBar
        key={node.year.toString()}
        node={node}
        scale={scale}
        itemWidth={itemWidth}
        barWidth={barWidth}
        barPadding={barPadding}
      />
    );
  }

  return (
    <g>
      {nodes.map((node, index) => (
        <g
          key={node.year.toString()}
          transform={`translate(${itemWidth * index}, 0)`}
        >
          {barByTab(node)}
          <XLegend
            year={node.year}
            category={node.category}
            height={height}
            itemWidth={itemWidth}
          />
        </g>
      ))}
    </g>
  );
}

export default Bars;
