import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ChartNext from '../components/ChartNext';
import data from './assets/data';

export default {
  title: 'Chart/basic',
  component: ChartNext,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ChartNext>;

const Template: ComponentStory<typeof ChartNext> = (args) => <ChartNext {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  edges: data,
};
