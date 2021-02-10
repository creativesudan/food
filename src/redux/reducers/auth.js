import {
    LOGIN,
    UPDATE_AUTH_FIELD,
    ASYNC_START
} from "../actions/types";

const initialState = {
    isAuthenticated: null,
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
                    inProgress: false
                }
            }
        case UPDATE_AUTH_FIELD:
            return { ...state, [action.key]: action.value };
        default:
            return state;
    }
}