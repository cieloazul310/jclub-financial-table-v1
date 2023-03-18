import * as React from 'react';
import Typograhy from '@mui/material/Typography';
import useCategoryColor from '../utils/useCategoryColor';

function CategoryLabel({ category }: { category: string }) {
  const { color, contrastText } = useCategoryColor(category);
  return (
    <Typograhy
      component="span"
      sx={{
        bgcolor: color,
        color: contrastText,
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

export default CategoryLabel;
