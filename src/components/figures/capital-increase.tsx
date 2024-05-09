import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import FigureWrapper from "./wrapper";

type CapitalItemProps = {
  label: string;
  stocks: number;
  all_stocks: number;
  selected?: boolean;
  last?: boolean;
};

function CapitalItem({
  label,
  stocks,
  all_stocks,
  selected = false,
  last = false,
}: CapitalItemProps) {
  return (
    <Typography
      component="div"
      width={stocks / all_stocks}
      py={1}
      sx={{ borderColor: "text.secondary", borderRight: !last ? 1 : 0 }}
      bgcolor={
        selected
          ? ({ palette }) =>
              alpha(palette.success.dark, palette.action.activatedOpacity)
          : undefined
      }
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography>{label}</Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0, sm: 1 }}>
        <Typography variant="caption">{stocks}株</Typography>
        <Typography variant="caption">
          {((100 * stocks) / all_stocks).toFixed(1)}%
        </Typography>
      </Stack>
    </Typography>
  );
}

CapitalItem.defaultProps = {
  selected: false,
  last: false,
};

type CapitalInfoProps = {
  title: string;
  all_stocks: number;
  pricePerStock: number;
  data: {
    label: string;
    stocks: number;
    selected?: boolean;
  }[];
  width?: number;
};

function CapitalInfo({
  title,
  all_stocks,
  pricePerStock,
  data,
  width = 1,
}: CapitalInfoProps) {
  return (
    <Stack direction="column" spacing={1} width={1}>
      <Typography variant="body2" gutterBottom>
        {title} (資本金{(all_stocks * pricePerStock) / 10000}
        万円、発行済株式総数{all_stocks}株)
      </Typography>
      <Box
        display="flex"
        width={width}
        sx={{ borderColor: "text.secondary", border: 1 }}
      >
        {data.map(({ label, stocks, selected }, index) => (
          <CapitalItem
            key={label}
            label={label}
            stocks={stocks}
            all_stocks={all_stocks}
            selected={selected}
            last={index === data.length - 1}
          />
        ))}
      </Box>
    </Stack>
  );
}

CapitalInfo.defaultProps = {
  width: 1,
};

function CapitalIncrease() {
  const stocks = [600, 800];
  const pricePerStock = 50000;
  const beforeRatio = stocks[0] / stocks[1];
  const initialData = [
    { label: "A社", stocks: 240 },
    { label: "B社", stocks: 180 },
    { label: "C社", stocks: 180 },
  ];
  return (
    <FigureWrapper caption="増資による株主構成変化の例">
      <Stack direction="column" spacing={4} py={2} width={1}>
        <CapitalInfo
          title="増資前"
          all_stocks={stocks[0]}
          pricePerStock={pricePerStock}
          width={beforeRatio}
          data={initialData}
        />
        <CapitalInfo
          title="増資後"
          all_stocks={stocks[1]}
          pricePerStock={pricePerStock}
          data={[...initialData, { label: "D社", stocks: 200, selected: true }]}
        />
      </Stack>
    </FigureWrapper>
  );
}

export default CapitalIncrease;
