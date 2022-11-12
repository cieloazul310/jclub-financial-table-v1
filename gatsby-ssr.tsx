import * as React from 'react';
import type { RenderBodyArgs } from 'gatsby';
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const HeadComponents = [
  <script
    key="1-http-ads"
    data-ad-client="ca-pub-7323207940463794"
    async
    crossOrigin="anonymous"
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7323207940463794"
  />,
];
// eslint-disable-next-line import/prefer-default-export
export function onRenderBody({ setHeadComponents }: RenderBodyArgs) {
  setHeadComponents(HeadComponents);
}
