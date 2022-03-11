import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ChartNext from '../components/ChartNext/Container';
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

export const PL = Template.bind({});
PL.args = {
  tab: 'pl',
  edges: data,
};

export const BS = Template.bind({});
BS.args = {
  tab: 'bs',
  edges: data,
};

export const Revenue = Template.bind({});
Revenue.args = {
  tab: 'revenue',
  edges: data,
};

export const Attd = Template.bind({});
Attd.args = {
  tab: 'attd',
  edges: data,
};

export const Fewer = Template.bind({});
Fewer.args = {
  tab: 'pl',
  edges: [...data].slice(0, 4),
};
