import * as React from 'react';
import { H2 } from '@cieloazul310/gatsby-theme-aoi';
import Stats from './Stats';
import type { Year } from '../../../../types';

type YearInfoProps = {
  year: Omit<Year, 'data'>;
  prevYear: Pick<Year, 'stats'> | null;
};

function YearInfo({ year, prevYear }: YearInfoProps) {
  return (
    <>
      <H2>{year.year}年</H2>
      <Stats year={year} prevYear={prevYear} />
    </>
  );
}

export default YearInfo;
