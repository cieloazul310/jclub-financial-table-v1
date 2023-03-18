import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { j1color, j2color, j3color, othersColor } from './categoryColors';

const categoryColors = {
  J1: j1color,
  J2: j2color,
  J3: j3color,
  others: othersColor,
};

function isFilterCategory(str: string): str is keyof typeof categoryColors {
  return Object.prototype.hasOwnProperty.call(categoryColors, str);
}

function useCategoryColor(category: string) {
  const theme = useTheme();
  return React.useMemo(() => {
    const paletteType = theme.palette.mode;
    const shade = paletteType === 'light' ? 600 : 800;
    const color = categoryColors[isFilterCategory(category) ? category : 'others'][shade];
    return {
      color,
      contrastText: theme.palette.getContrastText(color),
    };
  }, [theme, category]);
}

export default useCategoryColor;
