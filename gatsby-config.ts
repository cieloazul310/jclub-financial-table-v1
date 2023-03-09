/* eslint import/no-extraneous-dependencies: warn */
/* eslint global-require: warn */
import type { GatsbyConfig } from 'gatsby';

const baseUrl = 'https://cieloazul310.github.io';
const pathPrefix = '/jclub-financial-table';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Jクラブ経営情報ポータル`,
    description: `Jリーグが毎年公開している「Jクラブ個別経営情報開示資料」のデータをクラブ別、年度別に表示したページ。損益計算書、貸借対照表、営業収入、営業費用、入場者数の項目別に表と解説を掲載。`,
    baseUrl,
    siteUrl: 'https://cieloazul310.github.io/jclub-financial-table',
    author: `@cieloazul310`,
    keywords: ['Jリーグ', 'Jクラブ経営情報'],
    lang: 'ja',
    social: [
      { name: 'twitter', url: 'https://twitter.com/cieloazul310' },
      { name: 'github', url: 'https://github.com/cieloazul310/rockman' },
    ],
  },
  pathPrefix,
  plugins: [
    {
      resolve: `@cieloazul310/gatsby-theme-aoi`,
      options: {
        siteId: pathPrefix,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'dataset',
        path: `./data/dataset`,
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `./content/docs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content/post`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.md', '.mdx'],
        mdxOptions: {
          remarkPlugins: [require('remark-gfm')],
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-VE0MVTCH7K',
          // 'UA-74683419-3', // Google Analytics / GA
          // 'AW-CONVERSION_ID', // Google Ads / Adwords / AW
          // 'DC-FLOODIGHT_ID', // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          // optimize_id: 'OPT_CONTAINER_ID',
          // anonymize_ip: true,
          // cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          // respectDNT: true,
          // Avoids sending pageview hits from custom paths
          // exclude: ['/preview/**', '/do-not-track/me/too/'],
          // Defaults to https://www.googletagmanager.com
          // origin: 'YOUR_SELF_HOSTED_ORIGIN',
          // Delays processing pageview events on route update (in milliseconds)
          // delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        failOnError: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jクラブ経営情報ポータル`,
        short_name: `Jクラブ経営情報`,
        start_url: `/`,
        background_color: '#1e88e5',
        theme_color: '#1e88e5',
        display: `minimal-ui`,
        icon: `src/images/og_twitter.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-twitter`,
    `gatsby-plugin-sitemap`,
  ],
};
export default config;
