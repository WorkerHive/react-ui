import React from 'react'

import {
  List,
  ListItem,
  Typography,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Button
} from '@material-ui/core'

import styled from 'styled-components'
import { MoreVert } from '@material-ui/icons'

import { MutableDialog } from '../mutable-dialog'


export interface CRUDListProps {
  className?: string;
  data?: Array<any>
  onDelete?: (args: {item: object}) => void;
  onEdit?: (args: {item: object}) => void;
  onSave?: (args: {item: object}) => void;
  title: string
  type?: object
  dialog?: React.Component
}

export const CRUDList: React.FC<CRUDListProps> = ({
  data,
  type,
  dialog,
  title,
  onDelete,
  onEdit,
  className,
  onSave
}) => {
  const [dialogOpen, openDialog] = React.useState(false)
  const [selected, setSelected] = React.useState<any>()
  const [anchorEl, setAnchorEl] = React.useState<any>(null)

  return (
    <div className={className}>
      {type && !dialog && (
        <MutableDialog
          onSave={({item}: any) => {
            if (onSave) onSave({item: item})
            openDialog(false)
            setSelected(null)
          }}
          title={`Add ${title}`}
          structure={type}
          data={selected}
          open={dialogOpen}
          onClose={() => {
            setSelected(null)
            openDialog(false)
          }}
        />
      )}
      <List>
        {(data || []).map((x, ix) => [
          <ListItem key={ix}>
            <Typography style={{ flex: 1 }}>{x.name}</Typography>
            <IconButton
              onClick={(e: React.MouseEvent) => {
                setSelected(x)
                const target = e.currentTarget
                setAnchorEl(target)
              }}
            >
              <MoreVert />
            </IconButton>
          </ListItem>,
          <Divider key={'divider-' + ix} />
        ])}

        {anchorEl != null && selected && (
          <Menu
            onClose={() => setSelected(null)}
            anchorEl={anchorEl}
            open={selected != null && !dialogOpen}
          >
            <MenuItem onClick={() => {
              if(!onEdit){
                openDialog(true)
              }else{
                if(selected) onEdit({item: selected})
              }
            }}>
              <Typography>Edit</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (onDelete) {
                  setSelected(null)
                  onDelete({item: selected})
                }
              }}
            >
              <Typography color='secondary'>Delete</Typography>
            </MenuItem>
          </Menu>
        )}
      </List>
      <div className='crud-list__actions'>
        <Button
          color='primary'
          variant='contained'
          onClick={() => openDialog(true)}
        >
          Add
        </Button>
      </div>
    </div>
  )
}

export const StyledCRUDList = styled(CRUDList)`
  display: flex;
  flex-direction: column;
  flex: 1;

  .crud-list__actions {
    display: flex;
    justify-content: flex-end;
  }
`
