import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Stack from "@mui/material/Stack";
import PLFigure from "@/components/figures/pl";
import BSFigure from "@/components/figures/bs";
import CapitalIncrease from "@/components/figures/capital-increase";
import { UnitPrice, UnitPriceTwo } from "@/components/figures/unit-price";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Figures",
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "padded",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PL: Story = {
  render: () => <PLFigure />,
};

export const BS: Story = {
  render: () => <BSFigure />,
};

export const Capital: Story = {
  render: () => <CapitalIncrease />,
};

export const UnitPrices: Story = {
  render: () => (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <UnitPrice />
      <UnitPriceTwo />
    </Stack>
  ),
};
