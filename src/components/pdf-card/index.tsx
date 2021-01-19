import React from 'react';

import { Document, Page } from 'react-pdf';

export interface PDFCardProps{
  data?: Uint8Array;
}

export const PDFCard : React.FC<PDFCardProps> = (props) => {

    const [ numPages, setNumPages ] = React.useState(null)

    const onDocumentLoad = ({numPages}) => {
        setNumPages(numPages)
    }

    return (
        <Document
            file={{data: props.data}}
            onLoadSuccess={onDocumentLoad}>
             {
              Array.from(
                new Array(numPages),
                (_el : any, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ),
              )
            }
        </Document>
    )
}
