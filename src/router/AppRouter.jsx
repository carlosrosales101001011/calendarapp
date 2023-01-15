import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'

export const AppRouter = () => {

    const authStatus = 'notauthorized';


  return (
    // Si el stado esta no autenticado entonces llama a la pagina login page y si el user quiere 
    // adentrarse en otra paginas se redirige al 'auth/login', y si el user ya se autentico, se libera calendarApp
    <Routes>
        {
            (authStatus  === 'not-authorized')
            ?<Route path='/auth/*' element={<LoginPage/>}/>:
            <Route path='/calendarApp' element={<CalendarPage/>}/>
        }
        
        <Route path='/*' element={<Navigate to={"auth/login"}/>}/>

        </Routes>
  )
}
