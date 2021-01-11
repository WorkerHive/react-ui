import React from 'react';

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core';

import {
    ExpandMore
} from "@material-ui/icons";

import styled from 'styled-components'

export interface AccordionListItem{
  title: any;
  body: any;
}

export interface AccordionListProps {
  className?: string;
  items: Array<AccordionListItem>;
}

export const AccordionList : React.FC<AccordionListProps> = (props) => {
    return (
        <div className={props.className}>
            {props.items.map((x) => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}>
                        {x.title}
                    </AccordionSummary>
                    <AccordionDetails>
                        {x.body}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}

export const StyledAccordionList = styled(AccordionList)`
  display: flex;
  flex-direction:column;
  flex: 1;
`
