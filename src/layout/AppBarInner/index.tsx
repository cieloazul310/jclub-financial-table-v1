import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import AppBarNavigation from './AppBarNavigation';
import { YearPageNeighbor, ClubPageNeighbor } from '../../../types';

type AppBarInnerProps = {
  title?: string;
  previous?: YearPageNeighbor | ClubPageNeighbor;
  next?: YearPageNeighbor | ClubPageNeighbor;
  onLeftButtonClick?: () => void;
};

function AppBarInner({
  title,
  previous,
  next,
  onLeftButtonClick = () => {
    // do nothing
  },
}: AppBarInnerProps) {
  return (
    <Toolbar>
      <Tooltip title="メニュー">
        <IconButton edge="start" color="inherit" onClick={onLeftButtonClick}>
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Typography
        sx={{
          display: 'flex',
          flexGrow: 1,
          px: 1,
          py: 0,
          justifyContent: { xs: 'center', sm: 'normal' },
        }}
        variant="h6"
        component="h1"
      >
        {title ?? 'Title'}
      </Typography>
      <Box p={1.5} mr={-1.5} display={{ xs: 'block', sm: 'none' }}>
        <Box
          sx={{
            width: '1em',
            height: '1em',
            fontSize: '1.5rem',
          }}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <AppBarNavigation previous={previous} next={next} />
      </Box>
    </Toolbar>
  );
}

AppBarInner.defaultProps = {
  title: undefined,
  onLeftButtonClick: undefined,
  previous: undefined,
  next: undefined,
};

export default AppBarInner;
