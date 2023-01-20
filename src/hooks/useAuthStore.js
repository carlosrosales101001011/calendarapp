//Tiene como objetivo realizar cualquier interaccion con la parte del auth en el store

import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store"


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

    const startRegister = async({name, email, password})=>{
        console.log({email, password});
        dispatch(onChecking())
        
        try {
            const {data} = await calendarApi.post('/auth/register', {name, email, password})
            
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({name: data.name, uid: data.uid}))

        } catch (error) {
            
            console.log(error.response.data, "errores");
            dispatch(onLogout(error.response.data.errors? Object.values( error.response.data.errors )[0].msg: error.response.data.msg  || '--'))

            //Muestra el mensaje de error y despues lo quita
            setTimeout(()=>{
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    const checkAuthToken = async()=>{
        const token = localStorage.getItem('token')
        if (!token) return dispatch(onLogout())
        try {
            const { data } = await calendarApi.get('/auth/renew')
            console.log( data );
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({name: data.name, uid: data.uid}))

        } catch (error) {
            localStorage.clear()
            dispatch(onLogout())
        }
    }
    const startLogout = ()=>{
        localStorage.clear()
        dispatch(onLogout())
    }

    return {
        //*Property
        errorMessage,
        status,
        user,


        //*Method
        
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout
    }
}