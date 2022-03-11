/* eslint @typescript-eslint/no-explicit-any: "off" */
import * as React from 'react';
import Box from '@mui/material/Box';
import { useLocation } from '@reach/router';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdInSectionDividerWrapper({ children }: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <Box px={1} py={2} bgcolor={({ palette }) => (palette.mode === 'light' ? '#fafafa' : '#000')}>
      {children}
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
    <Box overflow="hidden" key={pathname} py={2}>
      {typeof window === 'object' ? (
        <ins
          className="adsbygoogle"
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

export function AdOne() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);

  return (
    <Box overflow="hidden" key={pathname}>
      {typeof window === 'object' ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot="6963353890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : null}
    </Box>
  );
}

export function AdTwo() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);

  return (
    <Box overflow="hidden" key={pathname}>
      {typeof window === 'object' ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot="5693068398"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : null}
    </Box>
  );
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
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <Box py={2} px={1} overflow="hidden" key={pathname}>
      {typeof window === 'object' ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot="3332658358"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : null}
    </Box>
  );
}
