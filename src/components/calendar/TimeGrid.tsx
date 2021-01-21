import clsx from 'clsx'
import * as animationFrame from 'dom-helpers/animationFrame'
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import memoize from 'memoize-one'

import * as dates from 'react-big-calendar/lib/utils/dates'
import DayColumn from 'react-big-calendar/lib/DayColumn'
import TimeGutter from 'react-big-calendar/lib/TimeGutter'

import getWidth from 'dom-helpers/width'
import TimeGridHeader from 'react-big-calendar/lib/TimeGridHeader'
import { notify } from 'react-big-calendar/lib/utils/helpers'
import { inRange, sortEvents } from 'react-big-calendar/lib/utils/eventLevels'
import Resources from 'react-big-calendar/lib/utils/Resources'
import { Moment } from 'moment'

export interface TimeGridProps {
  showTimes: boolean;
  events: Array<any>
  resources?: Array<any>

  step?: number
  timeslots?: number
  range?: Array<Moment>
  min?: Date
  max?: Date
  getNow: Function

  scrollToTime?: Date
  showMultiDayTimes?: boolean

  rtl?: boolean
  resizable?: boolean
  width?: number

  accessors: {start: Function, end: Function, allDay: Function}
  components: object
  getters: object
  localizer: object

  selected?: object
  selectable?: true | false | 'ignoreEvents'
  longPressThreshold?: number

  onNavigate?: Function
  onSelectSlot?: Function
  onSelectEnd?: Function
  onSelectStart?: Function
  onSelectEvent?: Function
  onDoubleClickEvent?: Function
  onKeyPressEvent?: Function
  onDrillDown?: Function
  getDrilldownView: Function

  dayLayoutAlgorithm?: 'overlap' | 'no-overlap'
}

export default class TimeGrid extends Component<TimeGridProps, {gutterWidth: any, isOverflowing: boolean | null}> {

  public static defaultProps: Pick<TimeGridProps, 'step' | 'timeslots' | 'min' | 'max' |'showTimes' | 'scrollToTime'> = {
    step: 30,
    showTimes: false,
    timeslots: 2,
    min: dates.startOf(new Date(), 'day'),
    max: dates.endOf(new Date(), 'day'),
    scrollToTime: dates.startOf(new Date(), 'day')
  }

  private scrollRef = React.createRef<any>();
  private contentRef = React.createRef<any>();
  private _scrollRatio : number | null;
  private _updatingOverflow: boolean

  measureGutterAnimationFrameRequest: any
  rafHandle: number
  gutter: any
  slots: number
  private _selectTimer: number | undefined

  constructor(props) {
    super(props)

    this.state = { gutterWidth: undefined, isOverflowing: null }

    this.scrollRef = React.createRef()
    this.contentRef = React.createRef()
    this._scrollRatio = null
  }

  UNSAFE_componentWillMount() {
    this.calculateScroll()
  }

  componentDidMount() {
    this.checkOverflow()

    if (this.props.width == null) {
      this.measureGutter()
    }

    this.applyScroll()

    window.addEventListener('resize', this.handleResize)
  }

  handleScroll = e => {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollLeft = e.target.scrollLeft
    }
  }

  handleResize = () => {
    animationFrame.cancel(this.rafHandle)
    this.rafHandle = animationFrame.request(this.checkOverflow)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)

    animationFrame.cancel(this.rafHandle)

    if (this.measureGutterAnimationFrameRequest) {
      window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest)
    }
  }

  componentDidUpdate() {
    if (this.props.width == null) {
      this.measureGutter()
    }

    this.applyScroll()
    //this.checkOverflow()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { range, scrollToTime } = this.props
    // When paginating, reset scroll
    if (
      !dates.eq(nextProps.range[0], range![0], 'minute') ||
      !dates.eq(nextProps.scrollToTime, scrollToTime, 'minute')
    ) {
      this.calculateScroll(nextProps)
    }
  }

  gutterRef = ref => {
    this.gutter = ref && findDOMNode(ref)
  }

  handleSelectAlldayEvent = (...args) => {
    //cancel any pending selections so only the event click goes through.
    this.clearSelection()
    notify(this.props.onSelectEvent, args)
  }

  handleSelectAllDaySlot = (slots, slotInfo) => {
    const { onSelectSlot } = this.props
    notify(onSelectSlot, {
      slots,
      start: slots[0],
      end: slots[slots.length - 1],
      action: slotInfo.action,
      resourceId: slotInfo.resourceId,
    })
  }

  renderEvents(range, events, now) {
    let {
      min,
      max,
      components,
      accessors,
      localizer,
      dayLayoutAlgorithm,
    } = this.props

    const resources = this.memoizedResources(this.props.resources, accessors)
    const groupedEvents = resources.groupEvents(events)

    return resources.map(([id, resource], i) =>
      range.map((date, jj) => {
        let daysEvents = (groupedEvents.get(id) || []).filter(event =>
          dates.inRange(
            date,
            accessors.start(event),
            accessors.end(event),
            'day'
          )
        )

        return (
          <DayColumn
            {...this.props}
            localizer={localizer}
            min={dates.merge(date, min)}
            max={dates.merge(date, max)}
            resource={resource && id}
            components={components}
            isNow={dates.eq(date, now, 'day')}
            key={i + '-' + jj}
            date={date}
            events={daysEvents}
            dayLayoutAlgorithm={dayLayoutAlgorithm}
          />
        )
      })
    )
  }

  render() {
    let {
      events,
      range,
      width,
      rtl,
      selected,
      getNow,
      resources,
      components,
      accessors,
      getters,
      localizer,
      min,
      max,
      showMultiDayTimes,
      longPressThreshold,
      resizable,
    } = this.props

    width = width || this.state.gutterWidth

    let start = range![0],
      end = range![range!.length - 1]

    this.slots = range!.length

    let allDayEvents : Array<any> = [],
      rangeEvents : Array<any> = []

    events.forEach(event => {
      if (inRange(event, start, end, accessors)) {
        let eStart = accessors.start(event),
          eEnd = accessors.end(event)

        if (
          accessors.allDay(event) ||
          (dates.isJustDate(eStart) && dates.isJustDate(eEnd)) ||
          (!showMultiDayTimes && !dates.eq(eStart, eEnd, 'day'))
        ) {
          allDayEvents.push(event)
        } else {
          rangeEvents.push(event)
        }
      }
    })

    allDayEvents.sort((a, b) => sortEvents(a, b, accessors))

    return (
      <div
        className={clsx(
          'rbc-time-view',
          'rbc-time-schedule',
          resources && 'rbc-time-view-resources'
        )}
      >
        <TimeGridHeader
          range={range}
          events={allDayEvents}
          width={width}
          rtl={rtl}
          getNow={getNow}
          localizer={localizer}
          selected={selected}
          resources={this.memoizedResources(resources, accessors)}
          selectable={this.props.selectable}
          accessors={accessors}
          getters={getters}
          components={components}
          scrollRef={this.scrollRef}
          isOverflowing={this.state.isOverflowing}
          longPressThreshold={longPressThreshold}
          onSelectSlot={this.handleSelectAllDaySlot}
          onSelectEvent={this.handleSelectAlldayEvent}
          onDoubleClickEvent={this.props.onDoubleClickEvent}
          onKeyPressEvent={this.props.onKeyPressEvent}
          onDrillDown={this.props.onDrillDown}
          getDrilldownView={this.props.getDrilldownView}
          resizable={resizable}
        />
        {this.props.showTimes &&
        <div
          ref={this.contentRef}
          className="rbc-time-content"
          onScroll={this.handleScroll}
        >
          <TimeGutter
            date={start}
            ref={this.gutterRef}
            localizer={localizer}
            min={dates.merge(start, min)}
            max={dates.merge(start, max)}
            step={this.props.step}
            getNow={this.props.getNow}
            timeslots={this.props.timeslots}
            components={components}
            className="rbc-time-gutter"
            getters={getters}
          />
          {this.renderEvents(range, rangeEvents, getNow())}
        </div>}
      </div>
    )
  }

  clearSelection() {
    clearTimeout(this._selectTimer)
  }

  measureGutter() {
    if (this.measureGutterAnimationFrameRequest) {
      window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest)
    }
    this.measureGutterAnimationFrameRequest = window.requestAnimationFrame(
      () => {
        const width = getWidth(this.gutter)

        if (width && this.state.gutterWidth !== width) {
          this.setState({ gutterWidth: width })
        }
      }
    )
  }

  applyScroll() {
    if (this.props.showTimes && this._scrollRatio != null) {
      const content = this.contentRef.current
      content.scrollTop = content.scrollHeight * this._scrollRatio
      // Only do this once
      this._scrollRatio = null
    }
  }

  calculateScroll(props = this.props) {
    const { min, max, scrollToTime } = props

    const diffMillis = scrollToTime!.getTime() - dates.startOf(scrollToTime, 'day')
    const totalMillis = dates.diff(max, min)

    this._scrollRatio = diffMillis / totalMillis
  }

  checkOverflow = () => {
    if(this.props.showTimes){
      if (this._updatingOverflow) return

      const content = this.contentRef.current
      let isOverflowing = content.scrollHeight > content.clientHeight

      if (this.state.isOverflowing !== isOverflowing) {
        this._updatingOverflow = true
        this.setState({ isOverflowing }, () => {
          this._updatingOverflow = false
        })
      }
    }
  }

  memoizedResources = memoize((resources, accessors) =>
    Resources(resources, accessors)
  )
}
