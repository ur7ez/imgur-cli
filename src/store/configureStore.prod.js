import { createStore, applyMiddleware } from 'redux';
import imgurReducers from '../reducers/index';
import promiseMiddleware from 'redux-promise';

// Middleware you want to use in production:
const enhancer = applyMiddleware(promiseMiddleware);

export default function configureStore(initialState) {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    return createStore(imgurReducers, initialState, enhancer);
};