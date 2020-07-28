import { GET_PRODUCT } from '../actions'

//TEMPAT MENYIMPAN GLOBAL STATE
const INITIAL_STATE = {
    data : []
}

const productReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_PRODUCT :
            console.log(`action payload product:`, action.payload)
            return { data : action.payload }
        default :
            return state
    }
}

//kalo pake default yg diexport cuma satu
export default productReducer