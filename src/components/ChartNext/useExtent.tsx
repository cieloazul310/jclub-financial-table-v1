import { DatumBrowser, Tab } from '../../../types';

function useExtent(edges: { node: Omit<DatumBrowser, 'previousData'> }[], tab: Tab) {
  if (tab === 'bs') {
    const max = edges.reduce((accum, { node }) => Math.max(accum, node.assets ?? 0), 0);
    const min = edges.reduce((accum, { node }) => Math.min(accum, 0, node.net_worth ?? 0), 0);
    return [min, max];
  }
  if (tab === 'expense') {
    const max = edges.reduce((accum, { node }) => Math.max(accum, node.expense), 0);
    return [0, max];
  }
  if (tab === 'attd') {
    const max = edges.reduce((accum, { node }) => Math.max(accum, node.average_attd), 0);
    return [0, max];
  }

  const max = edges.reduce((accum, curr) => Math.max(accum, curr.node.revenue), 0);
  return [0, max];
}

export default useExtent;
