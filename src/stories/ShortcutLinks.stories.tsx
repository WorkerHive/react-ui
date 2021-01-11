import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {StyledShortcutLinks as ShortcutLinks, ShortcutLinksProps} from '../components/shortcut-links';
import { FileCopyTwoTone, History } from '@material-ui/icons';


export default {
  title: 'Example/Shortcut Links',
  component: ShortcutLinks,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ShortcutLinksProps> = (args) => <ShortcutLinks {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  maxItems: 7,
  links: [

    {
      label: 'Projects',
      icon: <History />,
      path: '/projects'
    },
    {
      label: 'Documents',
      icon: <FileCopyTwoTone />,
      path: '/files'
    },
    {
      label: 'Projects',
      icon: <History />,
      path: '/projects'
    },
    {
      label: 'Documents',
      icon: <FileCopyTwoTone />,
      path: '/files'
    },
    {
      label: 'Projects',
      icon: <History />,
      path: '/projects'
    },
    {
      label: 'Documents',
      icon: <FileCopyTwoTone />,
      path: '/files'
    }
  ]
};

