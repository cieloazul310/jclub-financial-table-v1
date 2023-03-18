import * as React from 'react';
import TableSet from './TableSet';
import type { Year } from '../../../../types';

type TableMainAttdProps = {
  year: Pick<Year, 'year' | 'stats'>;
  prevYear: Pick<Year, 'stats'> | null;
};

function TableMainAttd({ year, prevYear }: TableMainAttdProps) {
  return (
    <>
      <TableSet title="入場料収入" statsKey="ticket" year={year} prevYear={prevYear} />
      <TableSet title="平均入場者数" statsKey="average_attd" year={year} prevYear={prevYear} oku={false} unit="人" />
      <TableSet title="客単価" statsKey="unit_price" year={year} prevYear={prevYear} oku={false} unit="円" />
    </>
  );
}

export default TableMainAttd;
