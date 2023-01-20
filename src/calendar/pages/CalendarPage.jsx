import { Calendar } from 'react-big-calendar'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from '../'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessageEs, localizer } from '../../helpers';
import { useEffect, useState } from 'react';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

  const {user} = useAuthStore()
  const { openDateModal } = useUiStore()
  const { event, setActiveEvent, startLoadingEvents }= useCalendarStore()
  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'agenda')
  const eventPropGetter =( event, start, end, isSelected )=>{
    // console.log({event, start, end, isSelected});
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)
    const style ={
      backgroundColor: isMyEvent ? "#347CF7": "#465660",
      borderRadius: '0px',
      opacity: 0.8,
      color: '#FFFFFF',
      height: '40px',
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

  useEffect(() => {
    startLoadingEvents()
  }, [])
  

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
    <FabAddNew/>
    <FabDelete/>
    </>
  )
}
