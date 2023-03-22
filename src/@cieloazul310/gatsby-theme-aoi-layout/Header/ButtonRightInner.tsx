/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type AppBarNavigationProps = {
  left?: { href: string; title: string } | null;
  right?: { href: string; title: string } | null;
};

function AppBarNavigation({ left, right }: AppBarNavigationProps) {
  if (!left && !right) return null;
  return (
    <>
      <Tooltip title={left?.title ?? ''}>
        <span>
          <IconButton disabled={!left} color="inherit" component={GatsbyLink} to={left?.href ?? '#'}>
            <ArrowBackIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={right?.title ?? ''}>
        <span>
          <IconButton disabled={!right} color="inherit" component={GatsbyLink} to={right?.href ?? '#'}>
            <ArrowForwardIcon />
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
}

AppBarNavigation.defaultProps = {
  left: undefined,
  right: undefined,
};

export default AppBarNavigation;
