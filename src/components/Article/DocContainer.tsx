import * as React from 'react';
import { H2, SubParagraph } from '@cieloazul310/gatsby-theme-aoi';

type DocContainerProps = {
  title: string;
  lastmod?: string;
  children: React.ReactNode;
};

function DocContainer({ children, title, lastmod }: DocContainerProps) {
  return (
    <>
      <H2>{title}</H2>
      {children}
      {lastmod ? <SubParagraph>最終更新日: {lastmod}</SubParagraph> : null}
    </>
  );
}

DocContainer.defaultProps = {
  lastmod: undefined,
};

export default DocContainer;
