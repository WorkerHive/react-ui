import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { CRUDKV, CRUDKVProps } from '../components/crud-kv';


export default {
  title: 'Example/Key Value',
  component: CRUDKV,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<CRUDKVProps> = (args) => <CRUDKV {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  types: [],
  value: [{name: 'Test Key', type: 'String'}],
  onChange: (val) => {}
};

