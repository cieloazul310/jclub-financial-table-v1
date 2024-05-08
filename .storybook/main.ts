import * as path from "path";
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
        "@appState": path.resolve(
          __dirname,
          "../src/@cieloazul310/gatsby-theme-aoi-top-layout/utils",
        ),
        docs: path.resolve(__dirname, "../content/docs"),
        types: path.resolve(__dirname, "../types"),
        "@reach/router": path.resolve(
          __dirname,
          "../node_modules/@gatsbyjs/reach-router",
        ),
      };
    }
    return config;
  },
};
export default config;
