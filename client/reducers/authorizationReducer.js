import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated: false,
    userData: {}
};

export default (state = initialState, action) => {
    if (action.type === 'SET_CURRENT_USER') {
        return state = {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                userData: action.payload            
            }               
    }
    return state;
}