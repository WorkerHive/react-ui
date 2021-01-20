/* eslint-disable react/jsx-pascal-case */
import React from 'react'

import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core'

/*
    Mutable Dialog

    title: String

    structure: {
        key: type
    }
*/
import { CRUDKV } from '../crud-kv'
import { RWTable } from '../rw-table'

export interface MutableDialogProps {
  data?: Record<string, any> | any
  onClose?: () => void
  onSave?: (args: {item: object}) => void;
  structure: Record<string, any>
  title: string
  prefix?: string;
  open: boolean
}

export const MutableDialog: React.FC<MutableDialogProps> = (props) => {
  const [data, setData] = React.useState({})

  React.useEffect(() => {
    if (props.data && props.data != data) {
      setData(props.data)
    }
  }, [props.data])

  const onClose = () => {
    setData({})
    if (props.onClose) props.onClose()
  }

  const onSave = () => {
    if (props.onSave) props.onSave({item: data})
  }

  const renderItem = (key: string, type: any) : any => {
    switch (type.type ? type.type : type) {
      case 'KV':
        return (
          <CRUDKV
            value={data[key] ? data[key][type.key] : ''}
            types={type.items}
            onChange={(value: any) => {
              const d = Object.assign({}, data)
              d[key] = value
              setData(d)
            }}
          />
        )
      case 'Select':
        return (
          <FormControl>
            <InputLabel>{uppercase(key)}</InputLabel>
            <Select
              value={data[key] ? data[key][type.key] : ''}
              onChange={(event) => {
                let d = Object.assign({}, data)
                d[key] = { [type.key]: event.target.value }
                console.log(d[key])
                setData(d)
              }}
              label={uppercase(key)}
            >
              {(Array.isArray(type.items) ? type.items : []).map((x: any, ix: number) => (
                  <MenuItem key={ix} value={x.id}>
                    {x.name}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      case 'Table':
        return (
          <RWTable
            items={type.items}
            value={data[key] || {}}
            onChange={(permissions: any) => {
              let d = Object.assign({}, data)
              d[key] = permissions
              setData(d)
            }}
          />
        )
      case 'Hash':
        return (
          <TextField
            label={uppercase(key)}
            type='password'
            value={data[key] || ''}
            onChange={(e) => {
              let d = Object.assign({}, data)
              d[key] = e.target.value
              setData(d)
            }}
          />
        )
      case 'String':
        return (
          <TextField
            value={data[key] || ''}
            onChange={(e) => {
              let d = Object.assign({}, data)
              d[key] = e.target.value
              setData(d)
            }}
            margin='dense'
            label={uppercase(key)}
          />
        )
      default:
        return null
    }
  }

  const uppercase = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  const renderStructure = () => {
    let struct : Array<any> = []

    for (var k in props.structure) {
      struct.push(renderItem(k, props.structure[k]))
    }
    return struct
  }

  return (
    <Dialog fullWidth open={props.open} onClose={onClose}>
      <DialogTitle>{props.prefix ? props.prefix + " " : ""}{props.title}</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        {renderStructure()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} color='primary' variant='contained'>
          Enter
        </Button>
      </DialogActions>
    </Dialog>
  )
}
