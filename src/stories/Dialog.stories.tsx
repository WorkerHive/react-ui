import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MutableDialog, MutableDialogProps } from '../components/mutable-dialog';
import MomentUtils from '@date-io/moment';

export default {
  title: 'Example/Dialog',
  component: MutableDialog,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<MutableDialogProps> = (args) =>
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <MutableDialog {...args} />
  </MuiPickersUtilsProvider>

export const Primary = Template.bind({});
Primary.args = {
  title: 'Test Dialog',
  structure: {
    name: 'String',
    start: 'Date',
    time: 'Time',
    end: 'Datetime'
  },
  data: {name: 'Test'},
  open: true
};

export const OtherModels = Template.bind({});
OtherModels.args = {
  title: 'Other models',
  structure: {
    name: 'String',
    extern: 'Type',
    external: '[Type]'
  },
  data: {name: "Stuff"},
  models: [{name: "Type", def: [{name: "String"}], data: [{id: "2", name: "Tester 2"}, {id: "1", name: "Tester"}]}],
  open: true
}

export const RWTable = Template.bind({});
RWTable.args = {
  title: "RWTable",
  open: true,
  structure: {
    external: {
      type: 'Table',
      items: [{name: "Stuff"}]
    }
  },
  onSave: ({item} : any) => {
    console.log(item)
  }
}

