import { createStore, applyMiddleware } from 'redux';
import {
    ASYNC_START,
    ASYNC_END,
} from './actions/types';
import rootReducer from './reducers/index';

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

function isPromise(v) {
    return v && typeof v.then === 'function';
}
const store = createStore(
    rootReducer,
    applyMiddleware(promiseMiddleware)
);


export default store;