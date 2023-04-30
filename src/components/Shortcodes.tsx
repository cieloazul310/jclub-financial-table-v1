import * as React from 'react';
import Typography from '@mui/material/Typography';
import { AppLink, Blockquote, Alert, SubParagraph, PanelLink } from '@cieloazul310/gatsby-theme-aoi';
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

function WorkInProgress() {
  return (
    <Alert severity="warning" title="更新作業中">
      この記事は現在、更新作業中です。
    </Alert>
  );
}

function Written({ date, written }: { date: string; written: string }) {
  return (
    <Alert severity="warning">
      この記事は{date}の内容を、{written}に編集したものです。
    </Alert>
  );
}

export default {
  Typography,
  Green,
  Red,
  SimpleTable,
  SummaryTable,
  SummaryTableRow,
  Ad,
  Diff,
  Blockquote,
  Alert,
  SubParagraph,
  AppLink,
  PanelLink,
  WorkInProgress,
  Written,
};
