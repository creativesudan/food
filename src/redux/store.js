import { createStore, applyMiddleware } from 'redux';
import {
    ASYNC_START,
    ASYNC_END,
    APP_LOADING,
    APP_LOADED,
    LOGOUT,
    LOGIN,
    CART_PRODUCT_UPDATED,
    CART_COUPON_APPLIED,
    CART_TAX_APPLIED,
    CART_PRODUCT_REMOVED,
    CART_CLEARED

} from './actions/types';
import { initAuth, fetchUser } from "../redux/actions/auth";
import { fetchAddressList } from "../redux/actions/address";
import { evaluateCart } from "../redux/actions/cart";
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
                console.log(error.response.body);
                store.dispatch({ type: ASYNC_END, promise: action.payload });
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
                    store.dispatch(fetchAddressList());
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
                store.dispatch(fetchAddressList());
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

const cartMiddleware = store => next => action => {
    if (action.type && !isPromise(action.payload) && (action.type == CART_COUPON_APPLIED ||
        action.type == CART_PRODUCT_REMOVED ||
        action.type == CART_PRODUCT_UPDATED ||
        action.type == CART_TAX_APPLIED ||
        action.type == CART_CLEARED)) {
        next(action);

        const cart = store.getState().cart;
        console.log(cart);

        store.dispatch(evaluateCart(cart));

    }
    else {
        next(action);
    }
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}
const store = createStore(
    rootReducer,
    applyMiddleware(promiseMiddleware, appInitMiddleware, loginMiddleware, cartMiddleware)
);


export default store;