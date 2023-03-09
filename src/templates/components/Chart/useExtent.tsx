import * as React from 'react';
import { useAppState } from '../../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { useStatistics } from '../../../utils/graphql-hooks';
import type { AllDataFieldsFragment } from '../../../../types';

function useExtentByCategory(categories: string[]) {
  const { tab } = useAppState();
  const { J1, J2, J3 } = useStatistics();

  return React.useMemo(() => {
    const arr = [
      ...(categories.includes('J1') ? J1 : []),
      ...(categories.includes('J2') ? J2 : []),
      ...(categories.includes('J3') ? J3 : []),
    ];

    if (tab === 'pl' || tab === 'revenue') {
      const max = arr.reduce((accum, { revenue }) => Math.max(accum, revenue.average), 0);
      return [0, max];
    }
    if (tab === 'expense') {
      const max = arr.reduce((accum, { salary }) => Math.max(accum, salary.average), 0);
      return [0, max];
    }
    if (tab === 'attd') {
      const max = arr.reduce((accum, { average_attd }) => Math.max(accum, average_attd.average), 0);
      return [0, max];
    }
    return [0, 0];
  }, [tab, categories]);
}

function useExtent(nodes: AllDataFieldsFragment[]) {
  const { tab } = useAppState();
  const categories = Array.from(new Set(nodes.map((node) => node.category)));
  const [, averageMax] = useExtentByCategory(categories);

  return React.useMemo(() => {
    if (tab === 'bs') {
      const max = nodes.reduce((accum, node) => Math.max(accum, node.assets ?? 0), 0);
      const min = nodes.reduce((accum, node) => Math.min(accum, node.net_worth ?? 0), 0);
      return [Math.min(0, min), max];
    }
    if (tab === 'expense') {
      const max = nodes.reduce((accum, node) => Math.max(accum, node.expense), 0);
      return [0, Math.max(max, averageMax)];
    }
    if (tab === 'attd') {
      const max = nodes.reduce((accum, node) => Math.max(accum, node.average_attd), 0);
      return [0, Math.max(max, averageMax)];
    }
    const max = nodes.reduce((accum, curr) => Math.max(accum, curr.revenue), 0);
    return [0, Math.max(max, averageMax)];
  }, [tab, nodes, averageMax]);
}

export default useExtent;
