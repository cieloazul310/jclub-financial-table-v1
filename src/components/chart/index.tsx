import * as React from 'react';
import { BarSeries, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import Chart from '../chart/CustomChart';
import Title from '../chart/CustomTitle';
import YearAxisLabel from '../chart/YearAxisLabel';
import { DatumBrowser } from '../../../types';

type ClubChartProps = {
  edges: {
    node: Pick<DatumBrowser, 'year' | 'revenue'>;
  }[];
};

function ClubChart({ edges }: ClubChartProps) {
  return (
    <Chart height={360} data={edges.map(({ node }) => ({ ...node, year: node.year?.toString() }))}>
      <ArgumentAxis labelComponent={YearAxisLabel} />
      <ValueAxis />
      <BarSeries valueField="revenue" argumentField="year" />
      <Title text="営業収入推移" />
    </Chart>
  );
}

export default ClubChart;
