import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { j1color, j2color, j3color, othersColor } from './categoryColors';
import type { FilterCategory } from '../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppState';

const categoryColors = {
  J1: j1color,
  J2: j2color,
  J3: j3color,
  others: othersColor,
};

function useCategoryColor(category: FilterCategory) {
  const theme = useTheme();
  return React.useMemo(() => {
    const paletteType = theme.palette.mode;
    const shade = paletteType === 'light' ? 600 : 800;
    const color = categoryColors[category][shade];
    return {
      color,
      contrastText: theme.palette.getContrastText(color),
    };
  }, [theme, category]);
}

export default useCategoryColor;
