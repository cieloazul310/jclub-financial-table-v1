import { action } from '@storybook/addon-actions';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import theme from '../src/@cieloazul310/gatsby-theme-aoi-top-layout/theme';

const withThemeProvider = (Story, context) => {
  return (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        {/*
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet" />
        */}
        <CssBaseline />
        <Story {...context} />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

export const decorators = [withThemeProvider];

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = '/';
// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook, it makes more sense to log an action than doing an actual navigate. Check out the actions addon docs for more info: https://storybook.js.org/docs/react/essentials/actions
window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
