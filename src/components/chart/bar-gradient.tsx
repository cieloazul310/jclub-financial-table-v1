import * as React from "react";
import { useTheme } from "@mui/material/styles";
import type { Datum } from "types";
import { j1color, j2color, j3color } from "@/utils/categoryColors";

function BarGradient() {
  const { palette } = useTheme();
  const shade = palette.mode === "light" ? 400 : 800;
  const categoryShade = palette.mode === "light" ? 300 : 800;
  return (
    <defs>
      <linearGradient id="j1" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={palette.grey[shade]} />
        <stop offset="70%" stopColor={palette.grey[shade]} />
        <stop offset="100%" stopColor={j1color[categoryShade]} />
      </linearGradient>
      <linearGradient id="j2" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={palette.grey[shade]} />
        <stop offset="70%" stopColor={palette.grey[shade]} />
        <stop offset="100%" stopColor={j2color[categoryShade]} />
      </linearGradient>
      <linearGradient id="j3" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={palette.grey[shade]} />
        <stop offset="70%" stopColor={palette.grey[shade]} />
        <stop offset="100%" stopColor={j3color[categoryShade]} />
      </linearGradient>
    </defs>
  );
}

export default BarGradient;

export function useFill({ category }: Pick<Datum, "category">) {
  const { palette } = useTheme();
  const shade = palette.mode === "light" ? 400 : 700;
  return React.useMemo(() => {
    if (category === "J1") return "url(#j1)";
    if (category === "J2") return "url(#j2)";
    if (category === "J3") return "url(#j3)";
    return palette.grey[shade];
  }, [category]);
}
