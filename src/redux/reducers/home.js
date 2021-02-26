import {
    CATEGORY_LOADED
} from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function (state = {}, action) {
    switch (action.type) {
        case CATEGORY_LOADED:
            return {
                ...state,
                categories: action.payload.response.data
            }
        default:
            return state;
    }
}