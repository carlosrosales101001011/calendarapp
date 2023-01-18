//Tiene como objetivo realizar cualquier interaccion con la parte del auth en el store

import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { onChecking, onLogin, onLogout } from "../store"


export const useAuthStore = ()=>{


    const {status, user, errorMessage} = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    const startLogin = async({email, password})=>{
        console.log({email, password});
        dispatch(onChecking())
        
        try {
            const {data} = await calendarApi.post('/auth', {email, password})
            
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({name: data.name, uid: data.uid, email: data.email, password: data.password}))

        } catch (error) {
            console.log(error);
            dispatch(onLogout('Credenciales incorrectas'))

            //Muestra el mensaje de error y despues lo quita
            setTimeout(()=>{
                dispatch(clearErrorMessage())
            }, 10)
        }

    }


    return {
        //*Property
        errorMessage,
        status,
        user,


        //*Method
        startLogin
    }
}