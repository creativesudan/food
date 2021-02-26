import {
    ADDRESS_LOADED,
    ADDRESS_SAVED,
    ADDRESS_UPDATED,
    ADDRESS_DELETED
} from "./types";
import agent from "../../agent";

export const fetchAddressList = () => {
    return {
        type: ADDRESS_LOADED,
        payload: agent.Address.all()
    }
}

export const saveAddress = (address) => {
    return {
        type: ADDRESS_SAVED,
        payload: agent.Address.save(address)
    }
}

export const updateAddress = (address) => {
    return {
        type: ADDRESS_UPDATED,
        payload: agent.Address.update(address)
    }
}

export const deleteAddress = (address_id) => {
    return {
        type: ADDRESS_DELETED,
        payload: agent.Address.delete(address_id)
    }
}