import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { event, activeEvent } = useSelector(state=> state.calendar)
    const setActiveEvent=(calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent))
    }
    const startSavingEvent = async( calendarEvent )=>{
      //Llegar al backend

      //TODO BIEN
      if (calendarEvent._id) {
          //Actualizando
          console.log("Actualizando");
          dispatch(onUpdateEvent({...calendarEvent}))
      }else{
        //Creando
        dispatch(onAddNewEvent( {...calendarEvent, _id: new Date().getTime()} ))
      }
      
    }
    const startDeletingEvent=()=>{

      dispatch(onDeleteEvent())
    }
  return {
    //*Propiedades
    activeEvent,
    event,
    hasEventSelected: !!activeEvent, //Si esto es null va a regresar false
    //*Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent
  }
}
