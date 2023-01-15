import { Calendar } from 'react-big-calendar'
import { CalendarEvent, NavBar } from '../'

import {addHours} from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessageEs, localizer } from '../../helpers';
import { useState } from 'react';
const events = [
    {
        title: "Cumple del jefe",
        notes: 'Comprar el pastel',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#FFFFFF',
      user:{
        _id: '123',
        name: 'John',
      }
    }
]



export const CalendarPage = () => {

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
    console.log({doubleClick:event});
  }

  const onSelect = (event)=>{
    console.log({click:event});
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
      events={events}
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
    </>
  )
}
