import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
    switch(action.type) {
        case 'ADD_FLASH_MESSAGE':
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type: action.payload.type,
                    text: action.payload.text
                }
            ];
        case 'DELETE_FLASH_MESSAGE':
             return state.filter(message => message.id !== action.payload);
        default: return state;
    }
    return state
}