import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CategoryLabel from "@/components/category-label";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/CategoryLabel",
  component: CategoryLabel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    category: {
      control: "radio",
      options: ["J1", "J2", "J3", "JFL", "関東1部"],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof CategoryLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    category: "J1",
  },
};

export const WithLabel: Story = {
  args: {
    category: "J2",
  },
  render: (args) => (
    <p>
      <CategoryLabel {...args} /> 水戸ホーリーホック
    </p>
  ),
};
