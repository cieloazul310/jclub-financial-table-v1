import * as React from 'react';
import { H3 } from '@cieloazul310/gatsby-theme-aoi';
import Stats from './Summary/Stats';
import { YearBrowser } from '../../types';

type YearInfoProps = {
  year: Omit<YearBrowser, 'data'>;
  prevYear: Pick<YearBrowser, 'stats'> | null;
};

function YearInfo({ year, prevYear }: YearInfoProps) {
  return (
    <>
      <H3>{year.year}年</H3>
      <Stats year={year} prevYear={prevYear} />
    </>
  );
}

export default YearInfo;
