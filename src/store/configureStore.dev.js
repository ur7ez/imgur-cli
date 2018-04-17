import {applyMiddleware, compose, createStore} from 'redux';
import imgurReducers from '../reducers/index';
import promiseMiddleware from 'redux-promise';

// options for Redux DevTools Extension might be set from this info page:
// https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md

export default function configureStore(initialState) {
    const finalCreateStore = compose(
        applyMiddleware(promiseMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )(createStore);

    const store = finalCreateStore(imgurReducers, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
            const nextReducer = require('../reducers/index');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}