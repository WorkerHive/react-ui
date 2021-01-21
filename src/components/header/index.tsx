import React from 'react';

import {
    Notifications
} from "@material-ui/icons"

import {
    Paper,
    Typography,
    Tabs,
    Tab
} from '@material-ui/core';

import styled from 'styled-components'

export interface HeaderProps{
  className?: string;
  onTabSelect?: (args: {tab: string}) => void;
  title?: string;
  tabs?: Array<any>;
  connected?: string;
  user?: {name: string};
  selected?: string;
}

export const Header : React.FC<HeaderProps> = ({
  onTabSelect,
  title,
  tabs = [],
  connected = 'disconnected',
  user,
  selected,
  className
}) => {
    return (
        <Paper className={className}>
          <div className="header__title">
            <Typography variant="h6">{title}</Typography>
          </div>
        <div className="header__tabs">
            <Tabs value={tabs!.map((x) => x.toLowerCase()).indexOf((selected || '').toLowerCase())} onChange={(_e : any, newVal) => {
                if(onTabSelect) onTabSelect(tabs![newVal])
            }}>
            {(tabs).map((x) => (
                <Tab label={x} />
            ))}
            </Tabs>

        </div>
        <div className="actions-col">
          <Notifications />
          <div className="user-info">
            {user && <Typography variant="subtitle1">{user.name}</Typography>}
            <Typography variant="subtitle2" className={connected}><div className="bubble" />{connected == "connected" ? "Online" : "Offline"}</Typography>
          </div>
        </div>
        </Paper>
    )
}

Header.defaultProps = {
  tabs: [],
  connected: 'disconnected',
} as HeaderProps

export const StyledHeader = styled(Header)`
  display: flex;
  height: 50px;
  justify-content:space-between;
  padding-left: 12px;
  padding-right: 12px;

  .header__title{
    display: flex;
    align-items: center;
  }

  .header__tabs{
    flex: 1;
    display: flex;
    justify-content:center;
  }

  .header__tabs .MuiButtonBase-root{
    font-size: 0.66rem;
    min-width: unset;
  }

  .actions-col{
    display: flex;
  }

  .actions-col svg{
    align-self: center;
  }

  .actions-col .user-info{
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-left: 8px;
    border-left: 1px solid #000;
  }

  .user-info .disconnected{
    color: gray;
  }

  .user-info .connected{
    color: green;
  }
`
