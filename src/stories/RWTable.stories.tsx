import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { RWTable, RWTableProps } from '../components/rw-table';


export default {
  title: 'Example/RW Table',
  component: RWTable,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<RWTableProps> = (args) => <RWTable {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  items: [{name: "Test"}, {name: "Model"}],
  value: {"Test": {create: true, update: true}, "Model": {create: true}}
};

