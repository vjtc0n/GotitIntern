import {combineReducers} from 'redux';
import photos from './photos';
import profileReducer from './profile'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    photos,
    'profile': profileReducer,
    'routing': routerReducer
});

export default rootReducer;