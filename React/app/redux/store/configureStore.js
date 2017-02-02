import {createStore, applyMiddleware, compose} from 'redux';
import devTools from 'remote-redux-devtools';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux'
import {hashHistory} from 'react-router';

const loggerMiddleware = createLogger();
const routingMiddleware = routerMiddleware(hashHistory)
/**
 * ## Reducer
 * The reducers contains the all reducers
 */
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(thunkMiddleware, loggerMiddleware, routingMiddleware),
        devTools(),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );
    const store = createStore(rootReducer, initialState, enhancer);
    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    devTools.updateStore(store);

    return store
}