import { createStore, applyMiddleware } from 'redux';
import {
    ASYNC_START,
    ASYNC_END,
    APP_LOADING,
    APP_LOADED,
    LOGOUT,
    LOGIN
} from './actions/types';
import { initAuth, fetchUser } from "../redux/actions/auth";
import rootReducer from './reducers/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import agent from "../agent";

const promiseMiddleware = store => next => action => {
    console.log(action)
    if (isPromise(action.payload)) {
        store.dispatch({ type: ASYNC_START, subtype: action.type });

        action.payload.then(
            res => {
                console.log('RESULT', res);
                action.payload = res;
                store.dispatch({ type: ASYNC_END, promise: action.payload });
                store.dispatch(action);
            },
            error => {

                console.log('ERROR', error);
                action.error = true;
                action.payload = error.response.body;
                store.dispatch(action);
            }
        );

        return;
    }

    next(action);
};

const appInitMiddleware = store => next => action => {

    if (action.type == APP_LOADING) {
        console.log('Initializing App');
        AsyncStorage.getItem('user_id')
            .then((userId) => {
                console.log("UserId: " + userId);
                if (userId !== null) {
                    store.dispatch(initAuth(userId));
                    store.dispatch(fetchUser(userId));
                    agent.setUserId(userId);
                    store.dispatch({ type: APP_LOADED });
                } else {
                    store.dispatch({ type: APP_LOADED })
                }
            });
    }

    next(action);
};

const loginMiddleware = store => next => action => {
    if (action.type === LOGIN) {
        if (action.payload.response.status != 0) {
            try {
                AsyncStorage.setItem('user_id', action.payload.response.data.id);
                store.dispatch(fetchUser(action.payload.response.data.id));
                agent.setUserId(action.payload.response.data.id);
            } catch (e) {
                console.log(e);
            }

        }
    } else if (action.type === LOGOUT) {
        try {
            AsyncStorage.removeItem('user_id')
        } catch (e) {
            console.log(e);
        }
    }

    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}
const store = createStore(
    rootReducer,
    applyMiddleware(promiseMiddleware, appInitMiddleware, loginMiddleware)
);


export default store;