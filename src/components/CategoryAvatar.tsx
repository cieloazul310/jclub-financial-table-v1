import * as React from 'react';
import Typograhy from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { SxProps } from '@mui/material/styles';
import { useCategoryColor } from '../utils/categoryColors';

function CategoryAvatar({ category, sx }: { category: string; sx?: SxProps }) {
  const sxProps = useCategoryColor(category);
  const textSmall = !['J1', 'J2', 'J3', 'JFL'].includes(category);
  return (
    <Avatar
      sx={{
        ...sx,
        ...sxProps,
        fontSize: textSmall ? 'caption.fontSize' : undefined,
        fontWeight: textSmall ? 'bold' : undefined,
      }}
    >
      {category}
    </Avatar>
  );
}

CategoryAvatar.defaultProps = {
  sx: undefined,
};

export default CategoryAvatar;

export function CategoryLabel({ category }: { category: string }) {
  const sx = useCategoryColor(category);
  return (
    <Typograhy
      component="span"
      sx={{
        ...sx,
        px: 1,
        fontSize: 'inherit',
        borderRadius: 1,
        fontWeight: 'bold',
      }}
    >
      {category}
    </Typograhy>
  );
}
