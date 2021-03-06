// Import react
import React, {Component} from 'react';
import {Router, Route, IndexRoute, IndexRedirect, Redirect} from 'react-router';
import { UserIsAuthenticated} from './AuthenticationRouter'
import {useTransitions, withTransition} from 'react-router-transitions';

// Import components
import AppMaster from '../views/AppMaster';
import MainContainer from '../redux/containers/MainContainer';
import UploadPictureContainer from '../redux/containers/UploadPictureContainer'
import Login from '../redux/containers/Login'
import NotFoundContainer from '../redux/containers/NotFoundContainer'
import GlobalFeedContainer from '../redux/containers/GlobalFeedContainer'
import DetailPostContainer from '../redux/containers/DetailPostContainer'

// Loading authenticated middleware
const Authenticated = UserIsAuthenticated((props) => props.children);

export default (store) => {
    const connect = (fn) => (nextState, replaceState) => fn(store, nextState, replaceState);

    //This executes the parent onEnter first, going from left to right.
    // `replace` has to be wrapped because we want to stop executing `onEnter` hooks
    // after the first call to `replace`.
    const onEnterChain = (...listOfOnEnters) => (store, nextState, replace) => {
        let redirected = false;
        const wrappedReplace = (...args) => {
            replace(...args);
            redirected = true;
        };
        listOfOnEnters.forEach((onEnter) => {
            if (!redirected) {
                onEnter(store, nextState, wrappedReplace);
            }
        });
    };

    return (
        <Route path="/" component={withTransition(AppMaster)}>
            <IndexRoute component={Login}/>
            <Route path="/login" component={Login}/>
            <Route
                onEnter={connect(onEnterChain(UserIsAuthenticated.onEnter))}
                component={Authenticated}>
                <Route path="/main" component={withTransition(MainContainer)}>
                    <IndexRoute component={GlobalFeedContainer}/>
                    <Route path="post/:postId" component={DetailPostContainer}/>
                    <Route path="/upload" component={UploadPictureContainer}/>
                </Route>
            </Route>
            <Route path='/404' component={NotFoundContainer} />
            <Redirect from='*' to='/404' />
        </Route>
    )
}
