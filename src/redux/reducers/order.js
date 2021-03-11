import {
    ORDER_SUCCESS,
    ORDERS_LOADED,
    ORDER_PLACED_CLEARED
} from "../actions/types";


export default function (state = { orders: [], newOrder: {} }, action) {
    switch (action.type) {
        case ORDER_SUCCESS:
            const newOrder = action.payload.response.data;
            return {
                ...state,
                newOrder: newOrder,
                orders: [newOrder, ...state.orders]
            }
        case ORDERS_LOADED:
            return {
                ...state,
                orders: action.payload.response.data
            }
        case ORDER_PLACED_CLEARED:
            return {
                ...state,
                newOrder: {}
            }

        default:
            return state;
    }
}