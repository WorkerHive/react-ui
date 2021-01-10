import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { FileBrowser } from '..'
import { FileBrowserProps } from '../components/file-browser';


export default {
  title: 'Example/File Browser',
  component: FileBrowser,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<FileBrowserProps> = (args) => <FileBrowser {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  files: [],
  loading: false
};

