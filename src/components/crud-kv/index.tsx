import React from 'react';

import {
    TextField,
    Button,
    Select,
    FormControl,
    InputLabel,
    Checkbox,
    MenuItem,
    ListSubheader,
} from "@material-ui/core"

export interface CRUDKVProps {
  types: Array<any>;
  value: Array<any>;
  onChange?: (args: {value: Array<any>}) => void;
}

export const CRUDKV : React.FC<CRUDKVProps> = (props) => {

    const scalar = [
        "ID",
        "String",
        "Boolean",
        "Hash",
        "Date",
        "Int",
        "File",
        "Float"
    ]


    const onChange = (ix : number, mod : string, value : any) => {
        let v = props.value.slice();

        v[ix] = Object.assign({}, v[ix], {[mod]: value});

        if(props.onChange)props.onChange({value: v});
    }

    const getType = (str : string) => {
        return isList(str) ? getList(str) : str;
    }

    const getList = (str: string ) : string => {
      return str.match(/\[(.*?)\]/)![1]
    }

    const isList = (str : string) => {
        return str.match(/\[(.*?)\]/) != null
    }

    return (
        <div style={{marginLeft: 8, marginRight: 8, marginTop: 12}}>
            {(props.value || []).map((x : any, ix : number) => (
                <div style={{display: 'flex', marginBottom: 8}}>
                    <TextField style={{marginRight: 4}} value={x.name} onChange={(e) => {
                        onChange(ix, "name", e.target.value)
                    }} fullWidth label="Key Name"/>
                    <FormControl style={{marginLeft: 4}} fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select onChange={(e) => {
                            onChange(ix, "type", e.target.value)
                        }} value={getType(x.type)}>
                            <ListSubheader>Datatypes</ListSubheader>
                            {scalar.map((x) => (
                                <MenuItem value={x}>{x}</MenuItem>
                            ))}
                            <ListSubheader>Objects</ListSubheader>
                            {props.types.map((x) => (
                                <MenuItem value={x.name}>{x.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Checkbox checked={isList(x.type)} />
                </div>
            ))}
            <Button style={{marginTop: 12}} color="primary" fullWidth onClick={() => props.onChange && props.onChange({value: props.value.concat([{name: '', type: ''}])})} variant="contained">Add Row</Button>
        </div>
    )
}
