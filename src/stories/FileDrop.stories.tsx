import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { StyledFileDrop as FileDrop, FileDropProps } from '../components/file-drop';

export default {
  title: 'Example/File Drop',
  component: FileDrop,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<FileDropProps> = (args) => <FileDrop {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onDrop: () => {},
  border: true
};

