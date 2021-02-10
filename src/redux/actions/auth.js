import { LOGIN, UPDATE_AUTH_FIELD } from "./types";
import agent from "../../agent";

export const login = (mobile) => {
    return {
        type: 'REQUEST',
        payload: agent.Auth.login(mobile)
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