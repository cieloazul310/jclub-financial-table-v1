import * as React from 'react';
import { AppLinkButton } from '@cieloazul310/gatsby-theme-aoi';
import { useAllYears } from '../../utils/graphql-hooks';

export function YearsLink() {
  const years = useAllYears();
  return (
    <>
      {years.map(({ node }) => (
        <AppLinkButton key={node.year.toString()} to={node.href} color="inherit">
          {node.year}
        </AppLinkButton>
      ))}
    </>
  );
}

export default YearsLink;
