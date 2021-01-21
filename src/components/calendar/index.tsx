import React from 'react';

import {Calendar as BigCalendar, momentLocalizer} from 'react-big-calendar';

import styled from 'styled-components'
import moment, { Moment } from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { ScheduleWeek } from './schedule-week';
import { Paper } from '@material-ui/core';

const localizer = momentLocalizer(moment)

export enum CALENDAR_VIEWS {
  WORK_WEEK = 'work_week',
  WEEK = 'week',
  SCHEDULE = 'schedule_week'
}

export interface CalendarEvent{
  start: Date | Moment ;
  end: Date | Moment;
  title: string;
  allDay?: boolean;
  resource?: any
}

export interface CalendarProps{
  className?: string;
  events?: Array<CalendarEvent>
  viewDate?: Date
  defaultView?: string
  onSelectSlot?: (slotInfo: {
    start: Date,
    end: Date,
    slots: Array<Date>,
    action: "select" | "click" | "doubleClick"
  }) => void
  onSelectEvent?: (event: object, syntheticEvent?: any) => void
  onDoubleClickEvent?: (event: object, syntheticEvent?: any) => void
}

export const WorkhubCalendar : React.FC<CalendarProps> = ({
  className,
  events = [],
  defaultView = CALENDAR_VIEWS.SCHEDULE,
  viewDate = new Date(),
  onSelectSlot,
  onSelectEvent,
  onDoubleClickEvent
}) => {


  return (
    <Paper className={className}>
      <BigCalendar
        views={{
          month: true,
          week: true,
          schedule_week: ScheduleWeek
        }}
        onSelectEvent={onSelectEvent}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectSlot={onSelectSlot}
        messages={{schedule_week: "Schedule"}}
        defaultView={defaultView}
        selectable={true}
        defaultDate={viewDate}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
         />
    </Paper>
  )
}

export const StyledCalendar = styled(WorkhubCalendar)`
  display: flex;
  flex: 1;
  padding: 4px;
  flex-direction: column;
  position: relative;

  .rbc-time-schedule .rbc-time-header{
    flex: 1;
  }

  .rbc-time-schedule .rbc-event {
    margin-top: 4px;
  }

`
