import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { StyledAccordionList as AccordionList, AccordionListProps } from '../components/accordion-list';


export default {
  title: 'Example/Accordion List',
  component: AccordionList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<AccordionListProps> = (args) => <AccordionList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  items: [
    {
      title: "String",
      body: "String"
    }
  ]
};

