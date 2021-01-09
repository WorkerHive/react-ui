import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { GraphKanban, GraphKanbanProps } from '../components/kanban';


export default {
  title: 'Example/Graph Kanban',
  component: GraphKanban,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<GraphKanbanProps> = (args) => <GraphKanban {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  graph: {nodes: [], links: []},
  template: [{name: "Column"}]
};

