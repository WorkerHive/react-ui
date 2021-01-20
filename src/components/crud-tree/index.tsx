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
  onClick?: (args: {item: object}) => void;
  onEdit?: (args: {item: object}) => void;
  onAdd?: (args: {item: object}) => void;
  value: Array<any>;
}

export const CRUDTree: React.FC<CRUDTreeProps> = ({
  onClick,
  onEdit,
  onAdd,
  value = []
}) => {

    const _onAdd = (x : any) => {
        if(onAdd) onAdd({item: x})
    }

    const _onEdit = (x : any) => {
        if(onEdit) onEdit({item: x})
    }

    const _onClick = (x : any) => {
        if(onClick) onClick({item: x})
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
