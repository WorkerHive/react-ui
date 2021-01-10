import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { DocumentEditor, DocumentEditorProps } from '../components/document-editor'


export default {
  title: 'Example/Document Editor',
  component: DocumentEditor,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<DocumentEditorProps> = (args) => <DocumentEditor {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: '## Testing'
};

