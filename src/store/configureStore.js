import configureStore_dev from './configureStore.dev';
import configureStore_prod from './configureStore.prod';

let configureStore;
if (process.env.NODE_ENV !== 'production') {
    configureStore = configureStore_dev;
} else {
    configureStore = configureStore_prod;
}

export default configureStore;