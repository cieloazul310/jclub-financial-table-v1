import * as path from "path";
import type { StorybookConfig } from "@storybook/react-webpack5";

const toPath = (filePath: string) => path.join(process.cwd(), filePath);

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
  webpackFinal: async (baseConfig) => {
    if (baseConfig.resolve) {
      baseConfig.resolve.alias = {
        ...baseConfig.resolve.alias,
        "@": toPath("src"),
        "@appState": toPath(
          "src/@cieloazul310/gatsby-theme-aoi-top-layout/utils",
        ),
        docs: toPath("content/docs"),
        types: toPath("types"),
        "@reach/router": toPath("node_modules/@gatsbyjs/reach-router"),
        "@emotion/core": toPath("node_modules/@emotion/react"),
        "emotion-theming": toPath("node_modules/@emotion/react"),
      };
    }
    return baseConfig;
  },
};
export default config;
