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

import { MoreVert } from '@material-ui/icons'

import { MutableDialog } from '../mutable-dialog'

import styles from './styles.module.css';

export interface CRUDListProps {
  data?: Array<any>
  onDelete?: Function
  onSave?: Function
  title: string
  type?: any
  dialog?: React.Component
}

export const CRUDList: React.FC<CRUDListProps> = ({
  data,
  type,
  dialog,
  title,
  onDelete,
  onSave
}) => {
  const [dialogOpen, openDialog] = React.useState(false)
  const [selected, setSelected] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState<any>(null)

  return (
    <div className={styles.crudList}>
      {type && !dialog && (
        <MutableDialog
          onSave={(data: any) => {
            if (onSave) onSave(data)
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
            <MenuItem onClick={() => openDialog(true)}>
              <Typography>Edit</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (onDelete) {
                  onDelete(selected)
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
