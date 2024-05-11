import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UpIcon, DownIcon } from "@/icons";
import val from "@/utils/val";

export type CardValueStyleProps = {
  label: React.ReactNode;
  value: number | null;
  prevValue?: number | null;
  selected?: boolean;
  separator?: boolean;
  emphasized?: boolean;
  strong?: boolean;
  inset?: boolean;
  emphasizedIfMinus?: boolean;
};

function diffIcon(diffval: number | null) {
  if (!diffval) return null;
  return diffval > 0 ? (
    <UpIcon color="success" aria-label="plus" fontSize="small" />
  ) : (
    <DownIcon color="error" aria-label="minus" fontSize="small" />
  );
}

function CardValueStyle({
  label,
  value,
  prevValue = null,
  selected = false,
  emphasized = false,
  strong = false,
  separator = false,
  inset = false,
  emphasizedIfMinus = false,
}: CardValueStyleProps) {
  if (typeof value !== "number") return null;
  const diffval = typeof prevValue === "number" ? value - prevValue : null;

  return (
    <Box
      sx={{
        p: 0.5,
        bgcolor: ({ palette }) => {
          if (!emphasized) return undefined;
          return palette.mode === "light" ? "grey.100" : "grey.800";
        },
        borderBottom: ({ palette }) => `1px solid ${palette.divider}`,
        display: "flex",
        alignItems: "center",
        fontSize: "body2.fontSize",
      }}
    >
      <Box
        sx={{
          pl: inset ? 2 : undefined,
          flexGrow: 1,
        }}
      >
        {label}
      </Box>
      <Typography
        sx={{
          fontWeight: emphasized || strong || selected ? "bold" : undefined,
        }}
        component="span"
        color={emphasizedIfMinus && value < 0 ? "error.main" : undefined}
      >
        {val(value, separator)}
      </Typography>
      <Typography
        sx={{
          width: "6em",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        color="text.secondary"
        component="span"
      >
        {diffIcon(diffval)}
        {diffval && val(Math.abs(diffval), separator ?? false)}
      </Typography>
    </Box>
  );
}

CardValueStyle.defaultProps = {
  prevValue: null,
  selected: false,
  separator: false,
  emphasized: false,
  strong: false,
  inset: false,
  emphasizedIfMinus: false,
};

export default CardValueStyle;
