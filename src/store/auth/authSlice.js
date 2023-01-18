import { createSlice } from '@reduxjs/toolkit'
      export const authSlice = createSlice({
         name: 'ui',
         initialState: {
            status: 'checking', //'aunthenticated', 'not-authenticated'
            user: {},
            errorMessage: undefined
         },
         reducers: {
            onChecking: (state)=>{
                state.status = 'checking',
                state.user = {},
                state.errorMessage = undefined
            },
            onLogin: (state, {payload})=>{
                state.status = 'authenticated',
                state.user = payload,
                state.errorMessage = undefined
            }
         }
         })
export const { increment } = authSlice.actions