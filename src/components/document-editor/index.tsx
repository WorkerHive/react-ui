import { People } from '@material-ui/icons';
import React from 'react';
import Editor from 'rich-markdown-editor';

export interface DocumentEditorProps {
  data: {id: string, data: string};
  id?: string;
  links?: Array<any>;
  onChange?: (args: {value: string}) => void;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = (props) => {
  const [data, setData] = React.useState<any>({})

  React.useEffect(() => {
    if (props.data && data.id !== props.data.id) {
      setData(props.data)
    }
  }, [props.data])

  return (
    <Editor
      onChange={(valueFn) => {
        let val = valueFn();
        if (props.onChange) props.onChange({value: val})
        console.log("Editor event", val)
      }}
      value={data.content}
      embeds={[
        {
          title: "Contact",
          keywords: "contact",
          icon: () => <People />,
          matcher: href => {
            console.log(href)
            return href.indexOf('contact:') > -1
          },
          component: (props) => {
            console.log("CONTACT", props.attrs, props)
            return <div>{props.attrs.href}</div>
          }
        }
      ]}

    />
  )
}

/*

import { People } from '@material-ui/icons';
import React from 'react';
import Editor from 'rich-markdown-editor';

export default function LinkEditor(props){
    const [ data, setData ] = React.useState({})

    React.useEffect(() => {
        if(props.data && data.id !== props.data.id){
            setData(props.data)
        }
    }, [props.data])

    return (
        <Editor
        readOnly={false}
        onChange={(valueFn) => {
            let val = valueFn();
            if(props.onChange) props.onChange(val)
            console.log("Editor event", val)
        }}
        value={data.content}
        embeds={[
            {
                title: "Contact",
                keywords: "contact",
                icon: () => <People />,
                matcher: href => {
                    console.log(href)
                    return href.indexOf('contact:') > -1

                },
                component: (props) => {
                    console.log("CONTACT", props.attrs, props)
                    return <div>{props.attrs.href}</div>
                }
            }
        ]}
        style={{
            border: '1px solid #dfdfdf',
            flex: 1,
            background: 'white',
            flexDirection: 'column',
            borderRadius: 7,
            display: 'flex',
            justifyContent: 'flex-start',
            minWidth: 'calc(40em + 48px)',
            maxWidth: 'calc(40em + 48px)',
            padding: '12px 24px'
        }}
         onSearchLink={(search) => {
             return props.links.filter((a) => a.title.indexOf(search) > -1).map((x) => ({title: x.title, url: `/dashboard/kb/${x.id}`}))
             return [{title: "Flow programming", subtitle:"Flow spec", url: "[[Flow Spec]]"}]
         }}
         />
    )
}
*/
