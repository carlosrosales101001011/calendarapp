import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import enUS from 'date-fns/locale/en-US'
import {format, parse, startOfWeek, getDay, addHours} from 'date-fns'
import { NavBar } from '../'

import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
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
  return (
    <>
    <NavBar/>

    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </>
  )
}
