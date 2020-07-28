import { GET_CATEGORY } from './helpers'

export const getCategory = (data) => {
    console.log(`check category-action :`, data)
    return {
        type : GET_CATEGORY,
        payload : data
    }
}