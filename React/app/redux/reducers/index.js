import {combineReducers} from 'redux';
import postReducer from './post';
import profileReducer from './profile'
import { routerReducer } from 'react-router-redux'
import * as asyncInitialState from 'redux-async-initial-state';

const rootReducer = asyncInitialState.outerReducer(combineReducers({
    'post': postReducer,
    'profile': profileReducer,
    'routing': routerReducer,
    'asyncInitialState': asyncInitialState.innerReducer
}));

export default rootReducer;