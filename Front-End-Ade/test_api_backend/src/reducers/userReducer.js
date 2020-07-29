import { LOGIN, LOG_OUT } from '../actions'

const INITIAL_STATE = {
    username : '',
    email : '',
    role : '',
    id : null
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN :
            return {
                username : action.payload.username,
                email : action.payload.email,
                role : action.payload.role,
                id : action.payload.user_id
            }
        case LOG_OUT :
            return INITIAL_STATE
        default :
            return state
    }
}

export default userReducer