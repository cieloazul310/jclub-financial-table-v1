import * as React from 'react';
import { AppLinkButton } from '@cieloazul310/gatsby-theme-aoi';
import { useAllYears } from '../../utils/graphql-hooks';

export function YearsLink() {
  const years = useAllYears();
  return (
    <>
      {years.map(({ node }, index) => (
        <AppLinkButton key={node.year ?? index} to={node.href}>
          {node.year}
        </AppLinkButton>
      ))}
    </>
  );
}

export default YearsLink;
