import React from 'react';

import { useDropzone } from 'react-dropzone';
import styled from 'styled-components'

export interface FileDropProps {
  onDrop: (args: {files: File[]}) => void;
  noClick?: boolean;
  children?: any;
  className?: string;
  border?: boolean;
}

export const FileDrop : React.FC<FileDropProps> = (props) => {

    const onDrop = React.useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        if(props.onDrop) props.onDrop({files: acceptedFiles})
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, noClick: props.noClick || false})

    return (
        <div className={props.className} {...getRootProps()}>
            <input {...getInputProps()} />
            {props.children && props.children(isDragActive)}
        </div>
    )
}

export const StyledFileDrop = styled(FileDrop)`
    border-radius: 6px;
    border: ${props => props.border ? '1px dashed gray' : 'none'};
    min-height: 100px;
`
