import { ADDRESS_SELECTED, DELIVERY_ADDRESS_REMOVED } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const selectDeliveryAddress = (address) => {
    try {
        AsyncStorage.setItem("delivery_address", JSON.stringify(address));
    } catch (e) {
        console.error(e);
    }
    return {
        type: ADDRESS_SELECTED,
        payload: address
    }
}


export const removeDeliveryAddress = () => {
    try {
        AsyncStorage.removeItem("delivery_address");
    } catch (e) {
        console.error(e);
    }
    return {
        type: DELIVERY_ADDRESS_REMOVED
    }
}