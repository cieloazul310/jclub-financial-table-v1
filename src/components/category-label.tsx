import * as React from "react";
import Typograhy, { type TypographyProps } from "@mui/material/Typography";
import useCategoryColor from "@/utils/useCategoryColor";

type CategoryLabelProps = Omit<
  TypographyProps,
  "bgcolor" | "color" | "px" | "fontSize" | "borderRadius" | "fontWeight"
> & { category: string };

function CategoryLabel({ category, ...props }: CategoryLabelProps) {
  const { color, contrastText } = useCategoryColor(category);
  return (
    <Typograhy
      component="span"
      sx={{
        bgcolor: color,
        color: contrastText,
        px: 1,
        fontSize: "inherit",
        borderRadius: 1,
        fontWeight: "bold",
      }}
      {...props}
    >
      {category}
    </Typograhy>
  );
}

export default CategoryLabel;
