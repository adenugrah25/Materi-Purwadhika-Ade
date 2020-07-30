import { LOGIN, LOG_OUT, SIGN_UP } from '../actions'

const INITIAL_STATE = {
    username        : '',
    email           : '',
    role            : '',
    id              : null,
    register_status : false
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN :
            return {
                ...state,
                username : action.payload.username,
                email    : action.payload.email,
                role     : action.payload.role,
                id       : action.payload.user_id
            }
        case LOG_OUT :
            return INITIAL_STATE
        case SIGN_UP :
            // semua data(state) dicopy, lalu data registernya saja yg diubah
            return { ...state, register_status : true }
        default :
            return state
    }
}

export default userReducer