import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';
const tempEvent = 
{
    _id: new Date().getTime(),
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
export const calendarSlice = createSlice({
            name: 'calendar',
            initialState: {
              event: [
                
              ],
              isLoadingEvents: true,
                activeEvent: null
            },
            reducers: {
                onSetActiveEvent:(state, {payload})=>{
                  state.activeEvent=  payload
                },
                onAddNewEvent:(state, {payload})=>{
                  state.event.push(payload)
                  //Limpiando la nota
                  state.activeEvent= null;
                },
                onUpdateEvent: (state, {payload})=>{ 
                  state.event = state.event.map(e=>{
                    if ( e.id === payload.id  ){
                      return payload;
                    }
                    return e;
                  })
                },
                onDeleteEvent: (state)=>{
                  state.event = state.event.filter(e=>e.id !== state.activeEvent.id)
                  state.activeEvent= null;
                },
                onLoadEvents: (state, {payload=[]})=>{
                  state.isLoadingEvents = false
                  // state.event = payload;
                  payload.forEach(ev=>{
                    const exist = state.event.some( dbEvent => dbEvent.id === ev.id)
                    if (!exist) {state.event.push(ev)}
                  })
                },
                onLogoutCalendar: (state)=>{
                  state.isLoadingEvents = true,
                  state.event = [],
                  state.activeEvent= null
                }
            }
        })

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions

