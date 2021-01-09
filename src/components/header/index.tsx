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

import styles from './styles.module.css';

export interface HeaderProps{
  onTabSelect?: Function;
  title: string;
  tabs: Array<any>;
  connected: string;
  user: any;
  selectedTab: string;
}

export const Header : React.FC<HeaderProps> = (props) => {
    return (
        <Paper className="dashapp-header">
        <Typography variant="h6">{props.title}</Typography>
        <div className="dashapp-header__tabs">
            <Tabs value={props.tabs.map((x) => x.toLowerCase()).indexOf(props.selectedTab.toLowerCase())} onChange={(e, newVal) => {
                if(props.onTabSelect) props.onTabSelect(props.tabs[newVal])
            }}>
            {(props.tabs || []).map((x) => (
                <Tab label={x} />
            ))}
            </Tabs>

        </div>
        <div className="actions-col">
          <Notifications />
          <div className="user-info">
            <Typography variant="subtitle1">{props.user.name}</Typography>
            <div className={status}><div className="bubble" />{props.connected == "connected" ? "Online" : "Offline"}</div>
          </div>
        </div>
        </Paper>
    )
}
