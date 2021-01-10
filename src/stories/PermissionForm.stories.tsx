import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { StyledPermissionForm as PermissionForm, PermissionFormProps } from '../components/permission-form';

import { StyledSearchTable as SearchTable, SearchTableProps } from '../components/search-table'

export default {
  title: 'Example/Permission Form',
  component: PermissionForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<PermissionFormProps> = (args) => <div style={{flex: 1, display: 'flex', height: '100vh'}}>
  <PermissionForm {...args}><SearchTable data={[{name: "Ross"}]} renderItem={(a) => a.name} /></PermissionForm>
  </div>;

export const Primary = Template.bind({});
Primary.args = {
  type: {},
  permissions: {}
};

