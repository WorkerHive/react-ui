/* eslint-disable react/jsx-pascal-case */
import React from 'react'

import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  KeyboardDateTimePicker
} from '@material-ui/pickers'

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
  models?: Array<any>;
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

  const onChange = (key, value) => {
    let d = Object.assign({}, data)
    d[key] = value;
    setData(d)

    console.log(d, key, value)
  }

  const renderItem = (key: string, type: any) : any => {
    let typeName = type.type ? type.type : type;
        console.log(key, type)

    if(props.models && props.models.length > 0){
      if(props.models.map((x: any) => x.name).indexOf(typeName) > -1){
        type = {};
        const model = props.models.filter((x: any) => x.name == typeName)[0]
        type.key = 'id'
        type.items = model.data;
        typeName = 'Select'

      }else if(props.models.map((x: any) => `[${x.name}]`).indexOf(typeName) > -1){
        type = {};
        const model = props.models.filter((x: any) => `[${x.name}]` == typeName)[0]
        type.key = 'id',
        type.items = model.data;
        type.multi = true;
        if(data[key]) data[key][type.key] = Array.isArray(data[key]) ? data[key].map((x: any) => x[type.key]) : data[key][type.key]
        typeName = 'Select'
      }
    }

    switch (typeName) {
      case 'KV':
        return (
          <CRUDKV
            key={key}
            value={data[key] ? data[key][type.key] : ''}
            types={type.items}
            onChange={({value}: any) => {
              onChange(key, value)
            }}
          />
        )
      case 'Select':
        console.log("SELECT")
        return (
          <FormControl key={key}>
            <InputLabel>{uppercase(key)}</InputLabel>
            <Select
              multiple={type.multi}
              value={data[key] ? data[key][type.key] : (type.multi) ? [] : ''}
              onChange={(event : any) => {
                console.log("Ch ch ch changes")

                onChange(key, {[type.key]: event.target.value})
              }}
              label={uppercase(key)}
            >
              {(Array.isArray(type.items) ? type.items : []).map((x: any, ix: number) => (
                  <MenuItem key={ix} value={x[type.key]}>
                    {x.name}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      case 'Table':
        return (
          <RWTable
            key={key}
            items={type.items}
            value={data[key] || {}}
            onChange={({value}: any) => {
              onChange(key, value)

            }}
          />
        )
      case 'Hash':
        return (
          <TextField
            key={key}
            label={uppercase(key)}
            type='password'
            value={data[key] || ''}
            onChange={(e) => {
              onChange(key, e.target.value)
            }}
          />
        )
      case 'String':
        return (
          <TextField
            key={key}
            value={data[key] || ''}
            onChange={(e) => {
              onChange(key, e.target.value)
            }}
            margin='dense'
            label={uppercase(key)}
          />
        )
      case 'Password':
        return (
          <TextField
            key={key}
            value={data[key] || ''}
            onChange={(e) => {
              onChange(key, e.target.value)
            }}
            margin="dense"
            type="password"
            label={uppercase(key)} />
        )
      case 'Date':
        return (
          <KeyboardDatePicker
            key={key}
            margin="dense"
            label={uppercase(key)}
            format={"DD/MM/YYYY"}
            value={data[key] || new Date()}
            onChange={(e) => {
              onChange(key, e)
            }} />
        )
      case 'Time':
        return (
          <KeyboardTimePicker
            key={key}
            margin="dense"
            label={uppercase(key)}
            value={data[key] || new Date()}
            onChange={(e) => {
              onChange(key, e)
            }} />
        )
      case 'Datetime':
        return (
          <KeyboardDateTimePicker
            key={key}
            margin="dense"
            format={"DD/MM/YYYY hh:mma"}
            label={uppercase(key)}
            value={data[key] || new Date()}
            onChange={(e) => {
              onChange(key, e)
            }} />
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
