import React from 'react';

import Dayz from 'dayz';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import styled from 'styled-components'


const moment = extendMoment(Moment);
export interface CalendarProps{
  className?: string;
}

export const Calendar : React.FC<CalendarProps> = (props) => {

  const EVENTS = new Dayz.EventsCollection([
    {
      content: 'A test event',
      range: moment.range(moment().subtract(1, 'day'), moment().add(1, 'day'))
    }
  ])

  return (
    <div className={props.className}>
      <Dayz
        display="week"
        date={new Date()}
        events={EVENTS} />
    </div>
  )
}

export const StyledCalendar = styled(Calendar)`
  flex: 1;
  display: flex;

  .dayz {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .dayz .body{
    display: flex;
    flex: 1;
    height: 100%;
    position: relative;
    overflow-y: scroll;
  }

  .dayz .days{
    display: flex;
    flex: 1;
    border-top: 1px solid black;
    border-left: 1px solid black;
    position: relative;
    box-sizing: border-box;
    height: 100%;
  }

  .dayz.week .x-labels{
    padding-left: 60px;
  }

  .dayz.week .days{
    margin-left: 60px;
  }

  .dayz.week .day .label{
    display: none;
  }

  .dayz.week .event{
    height: 20px;
  }
  .dayz.week .day{
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .dayz .x-labels{
    display: flex;
    height: 30px;
    align-items: center;

  }

  .dayz .x-labels .day-label{
    display: flex;
    flex-grow: 1;
    flex-basis: 1px;
    padding-left: 8px;
  }

  .dayz .y-labels{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .dayz .y-labels .hour{
    border-bottom: 1px solid #b6b6b6;
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-indent: 8px;
    text-align: left;
    min-height: 24px;
  }

  .dayz .y-labels .all-day{
    width: 100%;
    flex: 1;
    flex-grow: 1;
    flex-basis: 0%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-indent: 8px;
    text-align: left;
    border-bottom: 1px solid #b6b6b6;
  }
`
