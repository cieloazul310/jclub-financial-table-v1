import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SummaryTable from "@/components/summary-table";
import SummaryTableRow from "@/components/summary-table-row";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Shortcodes/SummaryTable",
  component: SummaryTableRow,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof SummaryTableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: "当期純利益",
    val: "-4700万円",
    diff: "2200万円",
    emphasizedIfMinus: false,
  },
  render: (args) => (
    <SummaryTable>
      <SummaryTableRow {...args} />
    </SummaryTable>
  ),
};

export const WithoutPrev: Story = {
  args: {
    label: "当期純利益",
    val: "-4700万円",
    emphasizedIfMinus: false,
  },
  render: (args) => (
    <SummaryTable>
      <SummaryTableRow label="営業収入" val="8億4200万円" diff="2400万円" />
      <SummaryTableRow {...args} />
      <SummaryTableRow label="純資産額" val="1億3100万円" diff="-4700万円" />
    </SummaryTable>
  ),
};

export const WithCaption: Story = {
  args: {
    label: "純資産額",
    val: "-2億4700万円",
    diff: "-2200万円",
    emphasizedIfMinus: true,
  },
  render: (args) => (
    <SummaryTable caption="百万円以下を四捨五入">
      <SummaryTableRow {...args} />
    </SummaryTable>
  ),
};
