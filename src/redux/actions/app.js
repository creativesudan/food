import { ADDRESS_SELECTED } from "./types";

export const selectDeliveryAddress = (address) => {
    return {
        type: ADDRESS_SELECTED,
        payload: address
    }
}
