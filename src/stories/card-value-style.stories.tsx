import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Paper } from "@mui/material";
import CardValueStyle from "@/components/figure/card/card-value-style";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Figure/CardValueStyle",
  component: CardValueStyle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "padded",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    selected: false,
    emphasized: false,
    emphasizedIfMinus: false,
    separator: false,
    strong: false,
    inset: false,
  },
} satisfies Meta<typeof CardValueStyle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: "営業収入",
    value: 1241,
    prevValue: 1121,
  },
  render: (args) => (
    <Paper elevation={1} sx={{ width: 360, p: 2 }}>
      <CardValueStyle {...args} />
      <CardValueStyle {...args} />
      <CardValueStyle {...args} />
    </Paper>
  ),
};
