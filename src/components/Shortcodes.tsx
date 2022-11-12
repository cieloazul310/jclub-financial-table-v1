import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Blockquote } from '@cieloazul310/gatsby-theme-aoi';
import Diff from './Diff';
import SimpleTable from './SimpleTable';
import SummaryTable from './SummaryTable';
import SummaryTableRow from './SummaryTableRow';
import { AdInArticle as Ad } from './Ads';

function Green({ children }: React.PropsWithChildren<unknown>) {
  return (
    <Typography variant="inherit" fontSize="inherit" color="success.main" component="span">
      {children}
    </Typography>
  );
}

function Red({ children }: React.PropsWithChildren<unknown>) {
  return (
    <Typography variant="inherit" fontSize="inherit" color="error.main" component="span">
      {children}
    </Typography>
  );
}

export default { Typography, Green, Red, SimpleTable, SummaryTable, SummaryTableRow, Ad, Diff, Blockquote };
