import * as React from 'react';
import TableMainPL from './TableMainPL';
import TableMainBS from './TableMainBS';
import TableMainRevenue from './TableMainRevenue';
import TableMainExpense from './TableMainExpense';
import TableMainAttd from './TableMainAttd';
import { useAppState } from '../../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import type { Year } from '../../../../types';

type TableMainProps = {
  year: Pick<Year, 'year' | 'stats'>;
  prevYear: Pick<Year, 'stats'> | null;
};

function TableMain({ year, prevYear }: TableMainProps) {
  const { tab } = useAppState();
  if (tab === 'pl') return <TableMainPL year={year} prevYear={prevYear} />;
  if (tab === 'bs') return <TableMainBS year={year} prevYear={prevYear} />;
  if (tab === 'revenue') return <TableMainRevenue year={year} prevYear={prevYear} />;
  if (tab === 'expense') return <TableMainExpense year={year} prevYear={prevYear} />;
  return <TableMainAttd year={year} prevYear={prevYear} />;
}

export default TableMain;
