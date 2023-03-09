import { blue, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
});

theme.typography.body1 = {
  ...theme.typography.body1,
  [theme.breakpoints.only('xs')]: {
    fontSize: '0.875rem',
  },
};
theme.typography.body2 = {
  ...theme.typography.body2,
  [theme.breakpoints.only('xs')]: {
    fontSize: '0.75rem',
  },
};

export default theme;
