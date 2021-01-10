import { defineFileAction } from 'chonky';

export const ConvertFiles = defineFileAction({
    id: 'convert_files',
    button: {
        name: 'Convert files',
        toolbar: true,
        contextMenu: true,
        group: 'Actions',
    },
});
