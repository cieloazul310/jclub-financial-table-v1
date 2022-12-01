import * as React from 'react';
import { ArticleTitle } from '@cieloazul310/gatsby-theme-aoi';
import Stats from './Stats';
import type { YearBrowser } from '../../../types';

type YearInfoProps = {
  year: Omit<YearBrowser, 'data'>;
  prevYear: Pick<YearBrowser, 'stats'> | null;
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
