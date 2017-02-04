// Import react
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory, applyRouterMiddleware} from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {useTransitions, withTransition} from 'react-router-transitions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Import custom
import configureStore from './store/configureStore';
import Routes from '../routes/index';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router
                    render={applyRouterMiddleware(useTransitions({
                        TransitionGroup: ReactCSSTransitionGroup,
                        defaultTransition: {
                            transitionName: 'fade',
                            transitionEnterTimeout: 500,
                            transitionLeaveTimeout: 300
                        }
                    }))}
                    history={history}>
                    {Routes(store)}
                </Router>
            </Provider>
        )
    }
}