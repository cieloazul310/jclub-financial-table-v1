import * as React from 'react';
import { ArticleTitle } from '@cieloazul310/gatsby-theme-aoi';
import Stats from './Stats';
import type { Year } from '../../../types';

type YearInfoProps = {
  year: Omit<Year, 'data'>;
  prevYear: Pick<Year, 'stats'> | null;
};

function YearInfo({ year, prevYear }: YearInfoProps) {
  return (
    <>
      <ArticleTitle>{year.year}年</ArticleTitle>
      <Stats year={year} prevYear={prevYear} />
    </>
  );
}

export default YearInfo;
