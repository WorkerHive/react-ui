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
  className?: string;
  data?: Array<object>;
  renderItem?: (args: {item: object}) => React.Component;
  filter?: (args: {item: object, filterText: string}) => boolean;
}

export const SearchTable : React.FC<SearchTableProps> = ({
  className,
  data = [],
  renderItem = (a) => a.toString(),
  filter
}) => {
    const [ search, setSearch ] = React.useState('')

    return (
        <Paper className={className}>
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
                    {data.filter((a) => {
                        if(filter && search.length > 0){
                            return filter({item: a, filterText: search})
                        }
                        return true;
                    }).map((x) => (
                    <ListItem>
                        {renderItem({item: x})}
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
