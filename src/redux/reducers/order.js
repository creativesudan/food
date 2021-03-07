import {
    ORDER_SUCCESS,
    ORDERS_LOADED
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

        default:
            return state;
    }
}