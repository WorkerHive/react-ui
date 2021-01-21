import React from 'react';
import { Navigate } from 'react-big-calendar'
import moment, { Moment } from 'moment';
import TimeGrid from './TimeGrid';

export const ScheduleEvent = (props) => {
  return (
    <div style={{paddingTop: 4}}>
      {props.event.title}
      <div>
        Details
      </div>
    </div>
  )
}

export interface ScheduleWeekProps {
  date: Date
  events: any
  getNow: any
  accessors: any
  getters: any
  components: any
  localizer: any
  getDrilldownView: any
}

class ScheduleWeek extends React.Component<ScheduleWeekProps, {}> {
  static title: (date: any) => string;

  range(date){
    let start = moment(date).startOf('week');
    let end = moment(start).add(1, 'week')

    let current = start;
    let range : Array<Moment> = [];

    while(current.isBefore(end, 'day')){
      range.push(current)
      current = current.clone().add(1, 'day')
    }
    return range;
  }

  navigate(date, action){
    switch(action){
      case Navigate.PREVIOUS:
        return date.add(-1, 'week')
      case Navigate.NEXT:
        return date.add(1, 'week')
      default:
        return date;
    }
  }

  render(){
    let range = this.range(this.props.date);
    console.log(this.props)
    return (
       <TimeGrid {...this.props} components={{
         ...this.props.components,
         event: ScheduleEvent
        }} showMultiDayTimes range={range} step={24 * 60}/>
    )
  }

}

ScheduleWeek.title = (date) => {
  return `Schedule for ${date.toLocaleDateString()}`
}

export {
   ScheduleWeek
}
