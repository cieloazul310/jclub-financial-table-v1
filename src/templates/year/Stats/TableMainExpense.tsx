import * as React from 'react';
import TableSet from './TableSet';
import type { Year } from '../../../../types';

type TableMainExpenseProps = {
  year: Pick<Year, 'year' | 'stats'>;
  prevYear: Pick<Year, 'stats'> | null;
};

function TableMainExpense({ year, prevYear }: TableMainExpenseProps) {
  return (
    <>
      <TableSet title="営業費用" statsKey="expense" year={year} prevYear={prevYear} />
      <TableSet title="チーム人件費" statsKey="salary" year={year} prevYear={prevYear} />
    </>
  );
}

export default TableMainExpense;
