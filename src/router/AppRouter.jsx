import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'
import { useAuthStore } from '../hooks'

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore()
  console.log(status);

  // const dfstatus = 'not-authorized'
  
  useEffect(() => {checkAuthToken()}, [])
  if (status === 'checking') {
    return(
      <h3>Cargando...</h3>
      )
    }

  return (
    // Si el stado esta no autenticado entonces llama a la pagina login page y si el user quiere 
    // adentrarse en otra paginas se redirige al 'auth/login', y si el user ya se autentico, se libera calendarApp
    <Routes>
        {
            (status  === 'not-authenticated')
            ?<Route path='/auth/*' element={<LoginPage/>}/>:
            <Route path='/*' element={<CalendarPage/>}/>
        }
        
        <Route path='/*' element={<Navigate to={"auth/login"}/>}/>

        </Routes>
  )
}
