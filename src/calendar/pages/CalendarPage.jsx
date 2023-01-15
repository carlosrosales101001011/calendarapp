import { Calendar } from 'react-big-calendar'
import { NavBar } from '../'

import {addHours} from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessageEs, localizer } from '../../helpers';
const events = [
    {
        title: "Cumple del jefe",
        notes: 'Comprar el pastel',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#FFFFFF',

    }
]



export const CalendarPage = () => {

  const eventPropGetter =( event, start, end, isSelected )=>{
    console.log({event, start, end, isSelected});
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
  return (
    <>
    <NavBar/>

    <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      messages= {getMessageEs()}
      eventPropGetter={eventPropGetter}
    />
    </>
  )
}
