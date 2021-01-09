import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {TeamCircles, TeamCirclesProps} from '../components/team-circles';


export default {
  title: 'Example/Team Circles',
  component: TeamCircles,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<TeamCirclesProps> = (args) => <TeamCircles {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  members: [{name: "Ross Leitch"}]
};

