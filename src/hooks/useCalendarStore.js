import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { convertsEventsToDateEvents } from "../helpers"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state=> state.auth)
    const { event, activeEvent } = useSelector(state=> state.calendar)
    const setActiveEvent=(calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent))
    }
    const startSavingEvent = async( calendarEvent )=>{
      //TODO Llegar al backend



      //TODO BIEN
      if (calendarEvent._id) {
          //Actualizando
          console.log("Actualizando");
          dispatch(onUpdateEvent({...calendarEvent}))
      }else{
        //Creando

        const {data} = await calendarApi.post('/events', calendarEvent)

        dispatch(onAddNewEvent( {...calendarEvent, id: data.evento.id, user,} ))
      }
      
    }
    const startDeletingEvent=()=>{

      dispatch(onDeleteEvent())
    }
    const startLoadingEvents = async()=>{
      try {
        
        const {data} = await calendarApi.get('/events')
        const events = convertsEventsToDateEvents(data.eventos)
        console.log(events);
      } catch (error) {
        console.log('error cargando eventos');
        console.log(error);
      }
    }
  return {
    //*Propiedades
    activeEvent,
    event,
    hasEventSelected: !!activeEvent, //Si esto es null va a regresar false
    //*Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}
