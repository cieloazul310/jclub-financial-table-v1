import * as React from 'react';
import { mdxComponents } from '@cieloazul310/gatsby-theme-aoi';
import Shortcodes from '../Shortcodes';
import DocContainer from './DocContainer';
import Attribution from '../../../content/docs/attribution.mdx';

function AttributionDoc() {
  return (
    <DocContainer title="データについて">
      <Attribution components={{ ...mdxComponents, ...Shortcodes }} />
    </DocContainer>
  );
}

export default AttributionDoc;
