import { CATEGORY_LOADED, PRODUCTS_LOADED, ALL_PRODUCTS_LOADED, SLIDER_IMAGES_LOADED } from "./types";
import agent from "../../agent";

export const fetchCategories = () => {
    return {
        type: CATEGORY_LOADED,
        payload: agent.Category.all()
    }
}

export const fetchProducts = (categoryId) => {
    return {
        type: PRODUCTS_LOADED,
        payload: agent.Category.products(categoryId)
    }
}

export const fetchAllProducts = () => {
    return {
        type: ALL_PRODUCTS_LOADED,
        payload: agent.Product.all()
    }
}

export const fetchSliderImages = () => {
    return {
        type: SLIDER_IMAGES_LOADED,
        payload: agent.SliderImages.all()
    }
}