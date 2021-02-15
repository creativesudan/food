import {
    LOGIN,
    UPDATE_AUTH_FIELD,
    ASYNC_START,
    INIT_AUTH,
    LOGOUT
} from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    isAuthenticated: false,
    user: null,
    mobile: '',
    inProgress: false
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
        case LOGIN:
            if (action.payload["response"]["status"] == 0) {
                return {
                    ...state,
                    error: 'Incorrect OTP.',
                    inProgress: false
                }
            }
            else {
                try {
                    AsyncStorage.setItem('token', action.response.data.token)
                } catch (e) {
                    console.log(e);
                }
                return {
                    ...state,
                    isAuthenticated: true,
                    inProgress: false
                }
            }
        case UPDATE_AUTH_FIELD:
            return { ...state, [action.key]: action.value };
        case LOGOUT:
            try {
                AsyncStorage.removeItem('token')
            } catch (e) {
                console.log(e);
            }
            return initialState;
        default:
            return state;
    }
}