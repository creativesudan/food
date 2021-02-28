import {
    CATEGORY_LOADED,
    PRODUCTS_LOADED
} from "../actions/types";


export default function (state = {}, action) {
    switch (action.type) {
        case CATEGORY_LOADED:
            return {
                ...state,
                categories: action.payload.response.data
            }
        case PRODUCTS_LOADED:
            return {
                ...state,
                products: action.payload.response.data
            }
        default:
            return state;
    }
}