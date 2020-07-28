import { combineReducers } from 'redux'

import productReducer from './productReducer'
import categoryReducer from './categoryReducer'

const Reducers = combineReducers({
    productReducer,
    categoryReducer
})

export default Reducers