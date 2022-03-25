import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from '@reach/router';
import { useSiteMetadata } from '@cieloazul310/gatsby-theme-aoi';
import ogImage from '../../images/ogp.png';

type SeoProps = {
  title?: string;
  description?: string;
};

function Seo({ title, description }: SeoProps) {
  const siteMetadata = useSiteMetadata();
  const { href } = useLocation();
  const ogTitle = title ? `${title} | ${siteMetadata.title}` : siteMetadata.title;

  return (
    <Helmet
      htmlAttributes={{ lang: 'ja' }}
      title={title || siteMetadata.title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: description || siteMetadata.description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: `https://cieloazul310.github.io${ogImage}`,
        },
        {
          property: 'og:title',
          content: ogTitle,
        },
        {
          property: 'og:description',
          content: description || siteMetadata.description,
        },
        {
          property: 'og:url',
          content: href,
        },
        { name: 'twitter:card', content: 'summary' },
        {
          name: 'twitter:site',
          content: siteMetadata.title,
        },
        {
          name: 'twitter:title',
          content: ogTitle,
        },
        {
          name: 'twitter:description',
          content: description || siteMetadata.description,
        },
        {
          name: 'twitter:image',
          content: `https://cieloazul310.github.io${ogImage}`,
        },
      ]}
    />
  );
}

Seo.defaultProps = {
  title: undefined,
  description: undefined,
};

export default Seo;
