import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { CRUDList, CRUDListProps } from '../components/crud-list';


export default {
  title: 'Example/List',
  component: CRUDList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<CRUDListProps> = (args) => <CRUDList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Test List',
  type: {name: 'String'},
  data:[{name: 'Ross'}]
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
