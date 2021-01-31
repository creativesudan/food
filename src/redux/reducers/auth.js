import {
    LOGIN
} from "../actions/types";

const initialState = {
    isAuthenticated: null,
    user: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true
            }
        default:
            return state;
    }
}