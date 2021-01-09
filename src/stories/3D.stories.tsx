import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { GLBCard, GLBCardProps } from '../components/3d-card';

export default {
  title: 'Example/3D Viewer',
  component: GLBCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<GLBCardProps> = (args) => <GLBCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  rootUrl: '/static/',
  data: 'container.glb'
};

