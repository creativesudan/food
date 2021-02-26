import {
    LOGIN,
    UPDATE_AUTH_FIELD,
    ASYNC_START,
    INIT_AUTH,
    LOGOUT,
    USER_FETCHED,
    USER_UPDATED
} from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    isAuthenticated: false,
    user: null,
    mobile: '',
    inProgress: false,
    userId: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ASYNC_START:
            return {
                ...state,
                inProgress: true
            }
        case INIT_AUTH:
            return {
                ...state,
                ...action.payload
            }
        case USER_FETCHED:
            return {
                ...state,
                user: action.payload.response.data
            }

        case LOGIN:
            if (action.payload["response"]["status"] == 0) {
                return {
                    ...state,
                    error: 'Incorrect OTP.',
                    inProgress: false
                }
            }
            else {
                return {
                    ...state,
                    isAuthenticated: true,
                    inProgress: false,
                    userId: action.payload.response.data.id
                }
            }
        case UPDATE_AUTH_FIELD:
            return { ...state, [action.key]: action.value };
        case LOGOUT:

            return initialState;
        default:
            return state;
    }
}