/* eslint @typescript-eslint/no-explicit-any: "off" */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useLocation } from '@reach/router';
import InView from './InView';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdInSectionDividerWrapper({ children }: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <Box px={1} py={2} bgcolor={({ palette }) => (palette.mode === 'light' ? '#fafafa' : '#000')} color="text.secondary">
      <InView>{children}</InView>
    </Box>
  );
}

export function AdInArticle() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <Box overflow="hidden" py={2}>
      <Typography variant="caption" color="text.secondary">
        [Advertisement]
      </Typography>
      {typeof window === 'object' ? (
        <ins
          className="adsbygoogle"
          key={pathname}
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot="9174058264"
        />
      ) : null}
    </Box>
  );
}

function Ad({ slot }: { slot: string }) {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname, slot]);

  return (
    <Box overflow="hidden">
      <Typography variant="caption">[Advertisement]</Typography>
      {typeof window === 'object' ? (
        <ins
          key={pathname}
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : null}
    </Box>
  );
}

export function AdOne() {
  return <Ad slot="6963353890" />;
}

export function AdTwo() {
  return <Ad slot="5693068398" />;
}

export function AdInSectionDividerOne() {
  return (
    <AdInSectionDividerWrapper>
      <AdOne />
    </AdInSectionDividerWrapper>
  );
}

export function AdInSectionDividerTwo() {
  return (
    <AdInSectionDividerWrapper>
      <AdTwo />
    </AdInSectionDividerWrapper>
  );
}

export function AdInFooter() {
  return (
    <InView>
      <Ad slot="3332658358" />
    </InView>
  );
}
