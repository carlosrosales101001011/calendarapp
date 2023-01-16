import { Calendar } from 'react-big-calendar'
import { CalendarEvent, CalendarModal, NavBar } from '../'

import {addHours} from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessageEs, localizer } from '../../helpers';
import { useState } from 'react';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

  const { openDateModal } = useUiStore()
  const { event, setActiveEvent }= useCalendarStore()
  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'agenda')
  const eventPropGetter =( event, start, end, isSelected )=>{
    // console.log({event, start, end, isSelected});
    const style ={
      backgroundColor:"#347CF7",
      borderRadius: '0px',
      opacity: 0.8,
      color: '#FFFFFF'
    }
    return {
      style
    }
  }

  const onDoubleClick = (event)=>{
    openDateModal()
    console.log({doubleClick:event});
  }

  const onSelect = (event)=>{
    console.log({click:event});
    setActiveEvent(event)
  }
  
  const onViewChange = (event)=>{
    localStorage.setItem('lastView', event)
    console.log({viewChange:event});
  }

  return (
    <>
    <NavBar/>

    <Calendar
      culture='es'
      defaultView= { lastView }
      localizer={localizer}
      events={event}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      messages= {getMessageEs()}
      eventPropGetter={eventPropGetter}
      components={
        {
          event: CalendarEvent
        }
      }
      onDoubleClickEvent={ onDoubleClick }
      onSelectEvent={ onSelect }
      onView={ onViewChange }
    />
    <CalendarModal/>
    </>
  )
}
