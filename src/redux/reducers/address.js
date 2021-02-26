import {
    ADDRESS_LOADED,
    ADDRESS_SAVED,
    ADDRESS_UPDATED,
    ADDRESS_DELETED
} from "../actions/types";


export default function (state = {}, action) {
    switch (action.type) {
        case ADDRESS_LOADED:
            return {
                ...state,
                addresses: action.payload.response.data,
                addressesSynced: true
            }
        case ADDRESS_SAVED:
        case ADDRESS_UPDATED:
        case ADDRESS_DELETED:
            return {
                ...state,
                addressesSynced: false
            }

        default:
            return state;
    }
}