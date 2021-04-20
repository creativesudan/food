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

const initialCart = {
    items: [],
    count() { return this.items.reduce((total, obj) => total + obj.qty, 0) },
    countByProduct(id) { return this.items.filter(item => item.id == id).reduce((total, obj) => total + obj.qty, 0) }
}
export default function (state = initialCart, action) {
    switch (action.type) {

        case CART_PRODUCT_REMOVED:
            oldItems = [...state.items];
            newItem = action.payload;
            console.log("OOJJJOOO");
            console.log(newItem);
            console.log(state.items);
            updated = false;
            newItems = [...oldItems];

            if (newItem.qty == 0) {
                console.log(newItem)
                newItems = state.items.filter(item => {
                    if (item.id !== newItem.id && item.variant.weight !== newItem.variant.weight) {
                        return true;
                    }
                    if (item.id === newItem.id && item.variant.weight !== newItem.variant.weight) {
                        return true;
                    }
                    return false;

                });
            }
            else {
                newItems = oldItems.map(item => {
                    if (item.id == newItem.id && item.variant.weight == newItem.variant.weight) {
                        updated = true;
                        return newItem;
                    }
                    return item;
                });


                if (!updated)
                    newItems.unshift(newItem);

            }
            console.log("UPDATED!!!!!!!!!!!!!!!!!");
            console.log(newItems);
            return {
                ...state,
                items: newItems
            }
        case CART_CLEARED:
            return initialCart

        case CART_PRODUCT_ADDED:
            oldItems = [...state.items];
            newItem = action.payload;
            console.log("OOJJJOOO");
            console.log(newItem);
            console.log(state.items);
            updated = false;
            newItems = [...oldItems];

            if (newItem.qty == 0) {
                newItems = state.items.filter(item => (item.id !== newItem.id && item.variant.weight !== newItem.vaiant.weight));
            }
            else {
                newItems = oldItems.map(item => {
                    if (item.id == newItem.id && item.variant.weight == newItem.variant.weight) {
                        item.qty += newItem.qty;
                        updated = true;
                    }
                    return item;
                });


                if (!updated)
                    newItems.unshift(newItem);

            }
            console.log("UPDATED!!!!!!!!!!!!!!!!!");
            console.log(newItems);
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