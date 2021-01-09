import React from 'react';

import {
    ExpandLess,
    ExpandMore
} from '@material-ui/icons'

import {
    TreeView
} from '@material-ui/lab';

import { Branch } from './branch';


export interface CRUDTreeProps {
  onClick?: Function;
  onEdit?: Function;
  onAdd?: Function;
  value: Array<any>;
}

export const CRUDTree: React.FC<CRUDTreeProps> = (props) => {

    const onAdd = (x : any) => {
        if(props.onAdd) props.onAdd(x)
    }

    const onEdit = (x : any) => {
        if(props.onEdit) props.onEdit(x)
    }

    const onClick = (x : any) => {
        if(props.onClick) props.onClick(x)
    }

    return (
        <TreeView
            defaultCollapseIcon={<ExpandLess />}
            defaultExpandIcon={<ExpandMore />}
            >
            {props.value.filter((a) => !a.parent).map((x) => (
                <Branch
                    onAdd={() => onAdd(x)}
                    onEdit={() => onEdit(x)}
                    onClick={(_e: any) => onClick(x)}
                    id={x.id}
                    label={x.title}>
                        {props.value.filter((a) => a.parent == x.id).map((y) => (
                            <Branch
                                id={y.id}
                                label={y.title}
                                onAdd={() => onAdd(y)}
                                onEdit={() => onEdit(y)}
                                onClick={(_e: any) => onClick(y)}
                             />
                        ))}
                </Branch>
            ))}
        </TreeView>
    )
}
