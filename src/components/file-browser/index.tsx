import React from 'react';

import { ChonkyActions, FileBrowser, FileNavbar, FileContextMenu, FileList, FileToolbar } from 'chonky';

import {
  Backup
} from '@material-ui/icons'

import { StyledFileDrop as FileDrop } from '../file-drop';
import { MutableDialog } from '../mutable-dialog'

import uuid from 'uuid'
import styled from 'styled-components'

import { Typography } from '@material-ui/core'

import { ConvertFiles } from './convert-action';

export interface FileBrowserProps {
  className: string;
  loading?: boolean;
  files: Array<any>;
  title?: string;
  onConvertFiles?: (args: {files: Array<any>}) => void;
  onUploadFiles?: () => void;
  onFileOpen?: (args: {target: object}) => void;
  onFileUpload?: (args: {files: File[]}) => void;
  onFileDownload?: (args: {files: Array<any>}) => void;
  onDownloadProgress?: () => void;
  onDownloadEnd?: () => void;
}




export const WorkhubFileBrowser: React.FC<FileBrowserProps> = (props) => {

  const [files, setFiles] = React.useState<Array<any>>([])

  const [folderDialog, dialogFolder] = React.useState(false)
  const [folderChain ] = React.useState([{ id: 'default', name: props.title || 'File Storage', isDir: true }])

  React.useEffect(() => {
    if (props.files && !props.loading) {
      let f = props.files.slice()

      console.log("File Browser", f.length)
      /*const getStat = (x, cb) => {
        props.ipfs.node.files.stat(`/ipfs/${x.cid}`, { timeout: 2 * 1000 }).then((stat) => {
          console.log(stat)
          cb(null, {
            ...x,
            size: stat.size
          })
        }).catch((err) => {
          cb(null)
          console.log(err)
        })

        //  cb(null, {...x, size: stat.size})
      }*/

      setFiles(f)

    }
  }, [props.files, props.loading])

  const onFileAction = (action) => {
    let files = action.state.selectedFiles;
    switch (action.id) {
      case "create_folder":
        dialogFolder(true)
        break;
      case 'upload_files':
        if (props.onUploadFiles) props.onUploadFiles();
        break;
      case "open_files":
        if (action.payload.targetFile.isDir) {
          console.log("DsIR")
        } else {
          console.log(action.payload)
          if (props.onFileOpen) props.onFileOpen({target: action.payload.targetFile})
        }
        break;
      case 'convert_files':
        if (props.onConvertFiles) props.onConvertFiles({files: files})
        break;
      case "download_files":

        if (props.onFileDownload) props.onFileDownload({files: files});
        /*
        let downloadSize = files.map((x) => x.size).reduce((a, b) => a + b)


        let progress = 0;

        async.map(files, (file, cb) => {
          (async () => {
            let buff = Buffer.from('')
            for await (const chunk of props.ipfs.node.cat(file.cid)) {
              console.log("Chunking Crumping")
              buff = Buffer.concat([buff, chunk])
              progress += chunk.length
              props.onDownloadProgress((progress / downloadSize) * 100)
            }
            cb(null, {
              ...file,
              content: buff
            })
          })()
        }, (err, results) => {
          console.log(results)
          props.onDownloadEnd()
          if (results.length == 1) {
            saveAs(new Blob([results[0].content]), results[0].name)
          } else {

            let zip = JSZip()

            for (var i = 0; i < results.length; i++) {
              console.log("Add ", results[i].name, results[i].content.length)
              zip.file(results[i].name, results[i].content, { binary: true })
            }
            zip.generateAsync({ type: 'blob' }).then((content) => {
              console.log(content)
              saveAs(content, "workhub-download.zip")
            })
          }
        })
        */
        break;
      default:
        break;
    }
  }

  const [folders, setFolders] = React.useState<Array<any>>([])

  return (
    <div className={props.className}>
      <MutableDialog
        prefix={"Add"}
        title={"Folder"}
        open={folderDialog}
        structure={{ name: 'String' }}
        onSave={({item}: any) => {
          setFolders(folders.concat([{
            id: uuid.v4(),
            filename: item.name,
            isDir: true
          }])
          )
        }}
        onClose={() => dialogFolder(false)} />

      <FileBrowser
        fileActions={[ConvertFiles, ChonkyActions.CreateFolder, ChonkyActions.UploadFiles, ChonkyActions.DownloadFiles]}
        disableDragAndDropProvider={true}
        instanceId="workhub-fs"
        onFileAction={onFileAction}
        files={(files || []).filter((a: any) => a && (a.filename || a.name)).concat(folders).map((x: any) => ({
          id: x.id,
          cid: x.cid,
          size: x.size,
          ext: x.extension,
          extension: x.extension,
          conversion: x.conversion,
          isDir: x.isDir,
          name: x.id ? x.filename : x.name
        }))}
        folderChain={folderChain} >
        <FileNavbar />
        <FileToolbar />

        <FileContextMenu />
        <FileDrop noClick onDrop={props.onFileUpload} >
          {isDragActive => {
            return [
              <FileList />,
              isDragActive && (
                <div className="ipfs-loader">
                  <Backup style={{ fontSize: 44 }} />
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>Drop files here</Typography>
                </div>
              )]
          }}

        </FileDrop>



      </FileBrowser>
      {props.loading && (
        <div className="ipfs-loader">
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>Loading file network</Typography>
        </div>
      )}
    </div>
  )
}

export const StyledFileBrowser = styled(WorkhubFileBrowser)`
  display: flex;
  flex-direction: column;
  flex: 1;
`
