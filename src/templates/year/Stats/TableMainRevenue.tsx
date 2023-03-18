import * as React from 'react';
import TableSet from './TableSet';
import type { Year } from '../../../../types';

type TableMainRevenueProps = {
  year: Pick<Year, 'year' | 'stats'>;
  prevYear: Pick<Year, 'stats'> | null;
};

function TableMainRevenue({ year, prevYear }: TableMainRevenueProps) {
  return (
    <>
      <TableSet title="営業収入" statsKey="revenue" year={year} prevYear={prevYear} />
      <TableSet title="スポンサー収入" statsKey="sponsor" year={year} prevYear={prevYear} />
      <TableSet title="入場料収入" statsKey="ticket" year={year} prevYear={prevYear} />
      <TableSet title="Jリーグ配分金" statsKey="broadcast" year={year} prevYear={prevYear} />
    </>
  );
}

export default TableMainRevenue;
