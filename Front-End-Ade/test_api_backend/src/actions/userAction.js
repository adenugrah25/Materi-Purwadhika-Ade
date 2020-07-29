import Axios from 'axios'
import { URL, LOGIN, LOG_OUT } from '../actions'

export const SignIn = (body) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post(URL + '/login', body)

            // save token into local storage
            localStorage.setItem('id', res.data.user_id)
            localStorage.setItem('token', res.data.token)

            dispatch({ type : LOGIN, payload : res.data })
        } catch(err) {
            console.log(err)
        }
    }
}

export const KeepLogin = () => {
    return async (dispatch) => {
        try {
            // get token from local storage
            const token = localStorage.getItem('token')

            // get user data using url keep login
            const res = await Axios.post(URL + '/users/keeplogin', { token })
            console.log(res.data)

            dispatch({ type : LOGIN, payload : res.data })
        } catch (err) {
            console.log(err)
        }
    }
}

export const LogOut = () => {
    return {
        type : LOG_OUT
    }
}