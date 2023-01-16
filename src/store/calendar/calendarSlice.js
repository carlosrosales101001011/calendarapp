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
                event: [tempEvent],
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
                    if ( e._id === payload._id  ){
                      return payload;
                    }
                    return e;
                  })
                },
                onDeleteEvent: (state)=>{
                  state.event = state.event.filter(e=>e._id !== state.activeEvent._id)
                  state.activeEvent= null;
                }
            }
        })

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions

