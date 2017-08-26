import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authorizationReducer from './authorizationReducer';
import flashMessagesReducer from './flashMessagesReducer';

export default combineReducers({
    routing: routerReducer,
    authorization: authorizationReducer,
    flashMessages: flashMessagesReducer
})