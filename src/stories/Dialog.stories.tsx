import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { MutableDialog, MutableDialogProps } from '../components/mutable-dialog';


export default {
  title: 'Example/Dialog',
  component: MutableDialog,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<MutableDialogProps> = (args) => <MutableDialog {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Test Dialog',
  structure: {
    name: 'String'
  },
  data: {name: 'Test'},
  open: true
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
