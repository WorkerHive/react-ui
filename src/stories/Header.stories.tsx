import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { StyledHeader as Header, HeaderProps } from '../components/header';


export default {
  title: 'Example/Header',
  component: Header,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Workhub Test',
  connected: "connected",
  user: {name: "Test User"},
  tabs: ["Test Tab", "Test 2"],
  selected: "Test Tab",
  items: [
    {
      title: "String",
      body: "String"
    }
  ]
};

