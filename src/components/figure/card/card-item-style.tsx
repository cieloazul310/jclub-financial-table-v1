import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

type CardItemStyleProps = React.PropsWithChildren<{
  header: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
}>;

function CardItemStyle({
  header,
  title,
  subtitle,
  children,
}: CardItemStyleProps) {
  return (
    <MuiCard sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          sx={{ fontSize: 14 }}
          gutterBottom
          display="flex"
          alignItems="center"
        >
          {header}
        </Typography>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle}
        </Typography>
        <Typography
          component="ul"
          p={0}
          sx={{ flexGrow: 1, overflow: "auto", flexShrink: 1, minHeihgt: 0 }}
        >
          {children}
        </Typography>
      </CardContent>
    </MuiCard>
  );
}

export default CardItemStyle;
