import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { CRUDTree, CRUDTreeProps } from '../components/crud-tree';


export default {
  title: 'Example/CRUD Tree',
  component: CRUDTree,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<CRUDTreeProps> = (args) => <CRUDTree {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: [{name: 'Test Key', type: 'String'}],
};

