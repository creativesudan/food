import {
    CART_PRODUCT_ADDED,
    CART_PRODUCT_REMOVED,
    CART_PRODUCT_UPDATED,
    CART_COUPONS_LOADED,
    CART_COUPON_APPLIED,
    CART_TAX_APPLIED,
    CART_EVALUATED,
    CART_CLEARED
} from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function (state = { items: [] }, action) {
    switch (action.type) {
        case CART_PRODUCT_ADDED:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case CART_PRODUCT_REMOVED:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            }
        case CART_CLEARED:
            return {
                items: []
            }

        case CART_PRODUCT_UPDATED:
            oldItems = state.items;
            newItem = action.payload;
            updated = false;
            if (newItem.qty == 0) {
                newItems = state.items.filter(item => item.id !== newItem.id);
            }
            else {
                newItems = oldItems.map(item => {
                    if (item.id == newItem.id) {
                        updated = true;
                        return newItem;
                    }
                    return item;
                });


                if (!updated) {
                    newItems = [...newItems, newItem]
                }
            }
            return {
                ...state,
                items: newItems
            }

        case CART_COUPONS_LOADED:
            return {
                ...state,
                coupons: action.payload.response.data
            }

        case CART_COUPON_APPLIED:
            return {
                ...state,
                appliedCoupon: action.payload
            }

        case CART_TAX_APPLIED:
            return {
                ...state,
                tax: action.payload.response.data
            }

        case CART_EVALUATED:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}