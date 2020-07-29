import { combineReducers } from 'redux'

import productReducer from './productReducer'
import categoryReducer from './categoryReducer'
import userReducer from './userReducer'

const Reducers = combineReducers({
    productReducer,
    categoryReducer,
    userReducer
})

export default Reducers