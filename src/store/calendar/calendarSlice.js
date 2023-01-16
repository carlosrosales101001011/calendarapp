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
                }
            }
        })
export const { onSetActiveEvent } = calendarSlice.actions

