import { ORDERS_LOADED, ORDER_CANCELLED, ORDER_PLACED_CLEARED } from "./types";
import agent from "../../agent";

export const fetchOrders = () => {
    return {
        type: ORDERS_LOADED,
        payload: agent.Order.all()
    }
}

export const cancelOrder = (orderId, cancelReason = "") => {
    return {
        type: ORDER_CANCELLED,
        payload: agent.Order.cancel(orderId, cancelReason)
    }
}


export const clearOrderPlaced = () => {
    return {
        type: ORDER_PLACED_CLEARED
    }
}

