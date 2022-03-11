import { GatsbyConfig } from 'gatsby';

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
  },
  pathPrefix,
  plugins: [
    {
      resolve: `@cieloazul310/gatsby-theme-aoi`,
      options: {
        siteUrl: pathPrefix,
      },
    },
    `gatsby-plugin-react-helmet`,
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
        path: `./docs`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.md', '.mdx'],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-74683419-3',
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
    `gatsby-plugin-sitemap`,
  ],
};

export default config;
