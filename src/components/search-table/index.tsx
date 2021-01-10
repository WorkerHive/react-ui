import React from 'react';

import {
    Search,
    ViewHeadline,
    ViewModule
} from '@material-ui/icons';

import {
    Paper,
    TextField,
    ButtonGroup,
    Button,
    Divider,
    List,
    ListItem,
    InputAdornment
} from '@material-ui/core';

import styled from 'styled-components'
//import './index.css';

export interface SearchTableProps{
  className: string;
  data: Array<any>;
  renderItem: Function;
  filter?: Function;
}

export const SearchTable : React.FC<SearchTableProps> = (props) => {
    const [ search, setSearch ] = React.useState('')

    return (
        <Paper className={props.className}>
            <div className="options-bar">
                <TextField
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
                    }}
                    label="Search"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                    variant="outlined"
                    size="small" />
                <ButtonGroup>
                    <Button><ViewHeadline /></Button>
                    <Button><ViewModule /></Button>
                </ButtonGroup>
            </div>
            <Divider />
            <div className="grid-list">
                <List>
                    {props.data.filter((a) => {
                        if(props.filter && search.length > 0){
                            return props.filter(a, search)
                        }
                        return true;
                    }).map((x) => (
                    <ListItem>
                        {props.renderItem(x)}
                    </ListItem>
                    ))}
                </List>
            </div>
        </Paper>
    )
}


export const StyledSearchTable = styled(SearchTable)`
  flex: 1 1 auto;
  margin-top: 12px;
  display: flex;
  flex-direction: column;

  .options-bar{
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
