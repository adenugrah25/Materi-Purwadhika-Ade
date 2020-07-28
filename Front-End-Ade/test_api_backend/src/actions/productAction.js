import { GET_PRODUCT } from './helpers'

export const getProduct = (data) => {
    console.log(`check product-action :`, data)
    return {
        type : GET_PRODUCT,
        payload : data
        
    }
    
}