import {
    APP_LOADED,
    APP_LOADING,
    ASYNC_END,
    ASYNC_START
} from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function (state = {}, action) {
    switch (action.type) {
        case APP_LOADING:
            return {
                ...state,
                showInitScreen: true
            }
        case APP_LOADED:
            return {
                ...state,
                showInitScreen: false
            }
        case ASYNC_START:
            return {
                ...state,
                inProgress: state.inProgress && state.inProgress > 0 ? state.inProgress + 1 : 1
            }
        case ASYNC_END:
            return {
                ...state,
                inProgress: state.inProgress && state.inProgress > 0 ? state.inProgress - 1 : 0
            }
        default:
            return state;
    }
}