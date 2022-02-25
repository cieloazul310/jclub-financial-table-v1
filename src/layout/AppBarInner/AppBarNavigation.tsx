/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useNeighbors from '../../utils/useNeighbors';
import { YearPageNeighbor, ClubPageNeighbor } from '../../../types';

type AppBarNavigationProps = {
  previous?: YearPageNeighbor | ClubPageNeighbor;
  next?: YearPageNeighbor | ClubPageNeighbor;
};

function AppBarNavigation(props: AppBarNavigationProps) {
  const { previous, next } = useNeighbors(props);
  return (
    <div>
      <Tooltip title={previous?.title ?? ''}>
        <span>
          <IconButton disabled={!previous} color="inherit" component={GatsbyLink} to={previous?.to ?? '#'}>
            <ArrowBackIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={next?.title ?? ''}>
        <span>
          <IconButton disabled={!next} color="inherit" component={GatsbyLink} to={next?.to ?? '#'}>
            <ArrowForwardIcon />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}

AppBarNavigation.defaultProps = {
  previous: undefined,
  next: undefined,
};

export default AppBarNavigation;
