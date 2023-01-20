
import { parseISO } from "date-fns"


export const convertsEventsToDateEvents = (events = []) => {
  return events.map(eve=>{
    eve.end = parseISO(eve.end)
    eve.start = parseISO(eve.start)
    return eve;
  })
}
