import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { PDFCard, PDFCardProps } from '../components/pdf-card';


export default {
  title: 'Example/PDF Card',
  component: PDFCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<PDFCardProps> = (args) => <PDFCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: null
};

