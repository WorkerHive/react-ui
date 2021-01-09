import React from 'react';

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core';

import {
    ExpandMore
} from "@material-ui/icons";

export interface AccordionListItem{
  title: any;
  body: any;
}

export interface AccordionListProps {
  items: Array<AccordionListItem>;
}

export const AccordionList : React.FC<AccordionListProps> = (props) => {
    return (
        <div>
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
