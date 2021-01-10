import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { StyledSearchTable as SearchTable, SearchTableProps } from '../components/search-table';


export default {
  title: 'Example/Search Table',
  component: SearchTable,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<SearchTableProps> = (args) => <SearchTable {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: [{name: "Test"}],
  renderItem: (data: any) => data.name
};

