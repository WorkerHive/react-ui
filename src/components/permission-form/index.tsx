import React from 'react';

import {
    Add
} from '@material-ui/icons';

import {
    Fab,
    Dialog,
    DialogTitle,
    TextField,
    DialogActions,
    Button,
    Checkbox,
    FormControlLabel,
    DialogContent
} from '@material-ui/core';


import styled from 'styled-components'
//import './index.css';

export interface PermissionFormProps {
  className: string;
  permissions: Array<any>;
  type: Array<any>;
  selected?: object;
  onClose?: () => void;
  onSave?: (args: {data: object, changes: object}) => void;
}

export const PermissionForm : React.FC<PermissionFormProps> = (props) => {
    const [dialogOpen, openDialog] = React.useState(false)

    const [ changes, setChanges ] = React.useState({})
    const [ dataObj, setDataObj ] = React.useState({})

    const permissions = props.permissions && props.permissions[0] || {}
    const type = props.type && props.type[0] || {}

    React.useEffect(() => {
        if(props.selected){
            setDataObj(props.selected)
        }
    }, [props.selected])

    const renderFields = (type) => {
        let fields : Array<any> = [];

        for(var k in type.typeDef){
            const typeKey = k;

            if(type.typeDef[k].kind == "NamedType"){
                switch(type.typeDef[k].type){
                    case "String":
                    fields.push((
                        <TextField value={dataObj[typeKey]} onChange={(e) => {
                            let d = Object.assign({}, dataObj);
                            let changed = Object.assign({}, changes)
                            d[typeKey] = e.target.value;
                            changed[typeKey] = e.target.value;
                            setDataObj(d)
                            setChanges(changed)
                        }} label={typeKey} ></TextField>
                    ))
                    break;
                    case "Boolean":
                        fields.push((
                            <FormControlLabel
                                control={(
                                    <Checkbox checked={dataObj[typeKey]} onChange={(e) => {
                                        let d = Object.assign({}, dataObj)
                                        let changed = Object.assign({}, changes)
                                        d[typeKey] = e.target.checked;
                                        changed[typeKey] = e.target.checked;
                                        setDataObj(d)
                                        setChanges(changed)
                                    }}/>
                                )}
                                label={typeKey} />

                        ))
                }
            }else if(type.typeDef[k].kind == "ListType"){
               /* fields.push((
                    <ForeignInput
                        options={props.organisations.map((x) => ({title: x.name}))}
                        onOptionsChange={(options, newOption) => {
                            console.log(options, newOption)

                            if(type.typeDef[k].type == "ContactOrganisation"){
                                props.addContactOrganisation({name: newOption})
                            }
                        }}
                        value={dataObj[typeKey]}
                        label={typeKey}
                        onChange={(val) => {
                            /*let d = Object.assign({}, dataObj)
                            let changed = Object.assign({}, changes);

                            d[typeKey] = {name: val.title};
                            changed[typeKey] = val;
                            setDataObj(d);
                            setChanges(changed);
                        }}/>
                ))*/
            }
        }
        return fields;
    }

    const onClose = () => {
        if(props.onClose) props.onClose()
        openDialog(false)
        setDataObj({})
    }

    const onSave = () => {
        if(props.onSave) props.onSave({data: dataObj, changes: changes})
        onClose();
    }

    return (
        <div className={props.className}>
            <Dialog fullWidth open={props.selected != null || dialogOpen} onClose={() => {
               onClose()
            }}>
                <DialogTitle>{type.name}</DialogTitle>
                <DialogContent style={{display: 'flex', flexDirection: "column"}}>
                    {renderFields(type)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {onClose()}}>Cancel</Button>
                    <Button onClick={() => onSave()} color="primary" variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
            <div className="permission-form__inner">
                {props.children}
            </div>
            {permissions.create && (
                <Fab onClick={() => openDialog(true)} color="primary" style={{position: 'absolute', bottom: 12, right: 12}}>
                    <Add />
                </Fab>
            )}
        </div>
    )
}

export const StyledPermissionForm = styled(PermissionForm)`
  flex: 1;
  display: flex;
  flex-direction: column;

  .permission-form__inner {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`
