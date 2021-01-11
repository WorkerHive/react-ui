import { Paper, Typography } from '@material-ui/core';
import React from 'react';

import styled from 'styled-components'

export interface ShortcutLink {
  label?: string;
  icon?: string;
  path?: string;
  maxItems?: number;
}

export interface ShortcutLinksProps {
  className?: string;
  links: Array<ShortcutLink>;
}

export function ShortcutLinks(props: ShortcutLinksProps){
  return (
    <Paper className={props.className}>
      {props.links.map((link : ShortcutLink) => (
        <div className={"shortcut-link"}>
          <div className="shortcut-icon">{link.icon}</div>
          <Typography variant="subtitle1">{link.label}</Typography>
        </div>
      ))}
    </Paper>
  )
}

export const StyledShortcutLinks = styled(ShortcutLinks)`
  display: flex;
  max-width: ${props => props.maxItems ? props.maxItems * 113 : 700}px;
  overflow-x: auto;

  .shortcut-icon svg{
    font-size: 42px;
  }

  .shortcut-link:not(:last-child){
    border-right: 1px solid #dfdfdf;
  }

  .shortcut-link:hover{
    background: #efefef;
  }

  .shortcut-link{
    min-width: 100px;
    padding: 6px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
