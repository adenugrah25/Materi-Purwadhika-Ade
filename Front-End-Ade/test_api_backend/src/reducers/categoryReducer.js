import { GET_CATEGORY } from '../actions'

//TEMPAT MENYIMPAN GLOBAL STATE
const INITIAL_STATE = {
    data : []
}

const categoryReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORY :
            console.log(`action payload category:`, action.payload)
            return { data : action.payload }
        default :
            return state
    }
}

export default categoryReducer