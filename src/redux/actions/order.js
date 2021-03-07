import { ORDERS_LOADED } from "./types";
import agent from "../../agent";

export const fetchOrders = () => {
    return {
        type: ORDERS_LOADED,
        payload: agent.Order.all()
    }
}
