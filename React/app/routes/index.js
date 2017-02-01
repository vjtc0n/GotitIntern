// Import react
import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, IndexRedirect, browserHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

// Import components
import AppMaster from '../views/AppMaster';
import SearchAppContainer from '../redux/containers/SearchAppContainer';
import UploadPictureContainer from '../redux/containers/UploadPictureContainer'
import Login from '../redux/containers/Login'

export default () => {
    return (
        <Route path="/" component={AppMaster}>
            <IndexRedirect to = "/login"/>
            <Route path="/login" component={Login}/>
            <Route path="/search(/:search)" component={SearchAppContainer}/>
            <Route path="/upload" component={UploadPictureContainer}/>
        </Route>
    )
}
