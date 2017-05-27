import {
    CHAT_RECEIVE_MESSAGE,
    TEXT_TYPING_STOP_TIMEOUT
} from '../actions/types'
import {
    MESSAGE_TYPE_MESSAGE,
    MESSAGE_TYPE_USER_DISCONNECTED,
    MESSAGE_TYPE_USER_START_TYPING,
    MESSAGE_TYPE_USER_STOP_TYPING
} from '../constants';

const typing = (state = {users: []}, action) => {
    switch (action.type) {
        case CHAT_RECEIVE_MESSAGE:
            let users = [];
            switch (action.message.type) {
                case MESSAGE_TYPE_USER_START_TYPING:
                    let userOjb = {
                        id: action.message.id,
                        username: action.message.username,
                        createdAt: new Date()
                    };
                    users = [...state.users.filter((item) => item.id !== action.message.id), userOjb];
                    return {...state, users};
                case MESSAGE_TYPE_MESSAGE:
                case MESSAGE_TYPE_USER_DISCONNECTED:
                case MESSAGE_TYPE_USER_STOP_TYPING:
                    users = state.users.filter((item) => item.id !== action.message.id);
                    return {...state, users};
                default:
                    break;
            }
            break;
        case TEXT_TYPING_STOP_TIMEOUT: {
            let users = [...state.users.filter((item) => item.id !== action.user.id)];
            return {...state, users};
        }
        default:
            break;
    }
    return state;
};

export default typing;
