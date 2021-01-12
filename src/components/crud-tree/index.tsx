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

export const CRUDTree: React.FC<CRUDTreeProps> = ({
  onClick,
  onEdit,
  onAdd,
  value = []
}) => {

    const _onAdd = (x : any) => {
        if(onAdd) onAdd(x)
    }

    const _onEdit = (x : any) => {
        if(onEdit) onEdit(x)
    }

    const _onClick = (x : any) => {
        if(onClick) onClick(x)
    }

    return (
        <TreeView
            defaultCollapseIcon={<ExpandLess />}
            defaultExpandIcon={<ExpandMore />}
            >
            {value.filter((a) => !a.parent).map((x) => (
                <Branch
                    onAdd={() => _onAdd(x)}
                    onEdit={() => _onEdit(x)}
                    onClick={(_e: any) => _onClick(x)}
                    id={x.id}
                    label={x.title}>
                        {value.filter((a) => a.parent == x.id).map((y) => (
                            <Branch
                                id={y.id}
                                label={y.title}
                                onAdd={() => _onAdd(y)}
                                onEdit={() => _onEdit(y)}
                                onClick={(_e: any) => _onClick(y)}
                             />
                        ))}
                </Branch>
            ))}
        </TreeView>
    )
}
