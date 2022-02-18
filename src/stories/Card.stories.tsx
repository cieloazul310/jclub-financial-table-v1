import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from '../components/Card';
import data from './assets/data';

export default {
  title: 'Card',
  component: Card,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  /*
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  */
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const PL = Template.bind({});
PL.args = {
  edge: data[data.length - 1],
  previous: data[data.length - 2],
  tab: 'pl'
};

export const BS = Template.bind({});
BS.args = {
  edge: data[6],
  previous: data[5],
  tab: 'bs',
};
