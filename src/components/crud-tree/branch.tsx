import React from 'react';

import {
    IconButton
} from '@material-ui/core'

import {
    TreeItem
} from '@material-ui/lab'

import {
    Edit,
    Add
} from "@material-ui/icons"

export interface BranchProps {
  onEdit?: () => void;
  onAdd?: () => void;
  onClick?: (e: any) => void;
  id: string;
  label: string;
}
export const Branch : React.FC<BranchProps> = (props) => {
    const actions = [
        {
            icon: <Edit />,
            action: (e : React.MouseEvent) => {
                e.stopPropagation();
                if(props.onEdit) props.onEdit();
            }
        },
        {
            icon: <Add />,
            action: (e : React.MouseEvent) => {
                e.stopPropagation()
                if(props.onAdd) props.onAdd();
            }
        }
    ]
    return (
        <TreeItem
            nodeId={props.id}
            label={(
                <div
                    onClick={props.onClick}
                    style={{
                        height: 50,
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                    <div style={{flex: 1}}>{props.label}</div>
                    <div>
                        {actions.map((x) => (
                            <IconButton onClick={(e) => x.action(e)}>
                                {x.icon}
                            </IconButton>
                        ))}
                    </div>
                </div>
            )}>
            {props.children}
        </TreeItem>
    )
}
