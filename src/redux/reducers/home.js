import {
    CATEGORY_LOADED,
    PRODUCTS_LOADED,
    ALL_PRODUCTS_LOADED,
    SLIDER_IMAGES_LOADED
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
        case ALL_PRODUCTS_LOADED:
            return {
                ...state,
                allProducts: action.payload.response.data
            }
        case SLIDER_IMAGES_LOADED:
            return {
                ...state,
                sliderImages: action.payload.response.data
            }
        default:
            return state;
    }
}