import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import calendarApi from "../api/calendarApi"
import { convertsEventsToDateEvents } from "../helpers"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state=> state.auth)
    const { event, activeEvent } = useSelector(state=> state.calendar)
    const setActiveEvent=(calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent))
    }
    const startSavingEvent = async( calendarEvent )=>{
      //TODO Llegar al backend

      try {
        
        //TODO BIEN
        if (calendarEvent.id) {
            //Actualizando
            await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
            // console.log("Actualizando");
            dispatch(onUpdateEvent({...calendarEvent, user}))
            return; 
        }

          //Creando
          const {data} = await calendarApi.post('/events', calendarEvent)
          dispatch(onAddNewEvent( {...calendarEvent, id: data.evento.id, user,} ))
      } catch (error) {
        console.log(error);
        Swal.fire('Error al guardar', error.response.data.msg, 'error')
      }

      
    }
    const startDeletingEvent= async()=>{
      try {
        await calendarApi.delete(`/events/${activeEvent.id}`)
        dispatch(onDeleteEvent())
      } catch (error) {
        // console.log(error);
        Swal.fire('Error al eliminar', error.response.data.msg, 'error')
        
      }
    }
    const startLoadingEvents = async()=>{
      try {
        
        const {data} = await calendarApi.get('/events')
        const events = convertsEventsToDateEvents(data.eventos)
        dispatch(onLoadEvents(events))
        // console.log(events);
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
