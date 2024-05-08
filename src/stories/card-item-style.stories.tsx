import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardItemStyle from "@/components/figure/card/card-item-style";
import CategoryLabel from "@/components/category-label";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Figure/CardItemStyle",
  component: CardItemStyle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof CardItemStyle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: ({ title, subtitle, ...args }) => (
    <Box width={360} maxWidth="100%">
      <CardItemStyle title={title} subtitle={subtitle} {...args} />
    </Box>
  ),
  args: {
    header: (
      <>
        <CategoryLabel category="J2" />
        <Typography
          component="span"
          flexGrow={1}
          color="text.secondary"
          ml={1}
          display="flex"
          alignItems="center"
        >
          7位
        </Typography>
      </>
    ),
    title: (
      <Typography variant="h6" component="div">
        2022年度決算
      </Typography>
    ),
    subtitle: "損益計算書 (P/L)",
  },
};
