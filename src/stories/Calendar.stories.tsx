import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { StyledCalendar as Calendar, CalendarProps } from '../components/calendar';
import moment from 'moment';

export default {
  title: 'Example/Calendar',
  component: Calendar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<CalendarProps> = (args) => <Calendar {...args} />;

export const Primary = Template.bind({});


Primary.args = {
  events: [{
    start: new Date(),
    end: new Date(),
    allDay: true,
    title: "Test Event"
  }, {
    start: new Date(),
    end: new Date(),
    allDay: true,
    title: "Second Test"
  }, {
    start: new Date(),
    end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    allDay: true,
    title: "Test Event"
  }, {
    start: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    end: new Date(),
    allDay: true,
    title: "Second Test"
  }],
  onSelectSlot: (slotInfo) => console.log(slotInfo),
  onSelectEvent: (event) => console.log(event),
  onDoubleClickEvent: (event) => console.log(event)
};

