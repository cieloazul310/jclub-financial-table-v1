import { red, green, blue, grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

export const j1color = red;
export const j2color = green;
export const j3color = blue;
export const othersColor = grey;

export function useCategoryColor(category: string) {
  const { palette } = useTheme();
  if (category === 'J1')
    return {
      color: palette.getContrastText(j1color[palette.mode === 'light' ? 600 : 300]),
      bgcolor: j1color[palette.mode === 'light' ? 600 : 300],
    };
  if (category === 'J2')
    return {
      color: palette.getContrastText(j2color[palette.mode === 'light' ? 600 : 300]),
      bgcolor: j2color[palette.mode === 'light' ? 600 : 300],
    };
  if (category === 'J3')
    return {
      color: palette.getContrastText(j3color[palette.mode === 'light' ? 600 : 300]),
      bgcolor: j3color[palette.mode === 'light' ? 600 : 300],
    };
  return {
    color: palette.getContrastText(othersColor[palette.mode === 'light' ? 600 : 300]),
    bgcolor: othersColor[palette.mode === 'light' ? 600 : 300],
  };
}
