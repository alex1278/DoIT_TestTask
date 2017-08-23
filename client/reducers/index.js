import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authorizationReducer from './authorizationReducer';

export default combineReducers({
    routing: routerReducer,
    authorization: authorizationReducer    
})