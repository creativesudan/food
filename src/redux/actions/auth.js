import {
    INIT_AUTH,
    LOGIN,
    LOGOUT,
    UPDATE_AUTH_FIELD,
    USER_FETCHED,
    USER_UPDATED
} from "./types";
import agent from "../../agent";

export const login = (mobile) => {
    return {
        type: 'REQUEST',
        payload: agent.Auth.login(mobile)
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const verify = (mobile, otp) => {
    return {
        type: LOGIN,
        payload: agent.Auth.verify(mobile, otp)
    }
}

export const updateField = (key, value) => {
    return {
        type: UPDATE_AUTH_FIELD,
        key,
        value
    }
}

export const initAuth = (userId) => {
    return {
        type: INIT_AUTH,
        payload: { userId, isAuthenticated: true }
    }
}

export const fetchUser = (userId) => {
    return {
        type: USER_FETCHED,
        payload: agent.Auth.fetchUser(userId)
    }
}

export const updateUser = (userId, name, email, mobile) => {
    return {
        type: USER_UPDATED,
        payload: agent.Auth.updateUser(userId, name, email, mobile)
    }
}