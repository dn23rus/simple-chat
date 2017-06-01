import {
    SOCKET_RECEIVE_MESSAGE,
    TEXT_TYPING_STOP_TIMEOUT
} from '../actions/types'
import {
    S_MESSAGE_TYPE_MESSAGE_BROADCAST,
    S_MESSAGE_TYPE_USER_DISCONNECTED_BROADCAST,
    S_MESSAGE_TYPE_START_TYPING_BROADCAST,
    S_MESSAGE_TYPE_STOP_TYPING_BROADCAST
} from '../constants';

const typing = (state = {users: []}, action) => {
    let message = action.message;
    switch (action.type) {
        case SOCKET_RECEIVE_MESSAGE:
            switch (message.type) {
                case S_MESSAGE_TYPE_START_TYPING_BROADCAST:
                    let users = [];
                    let userOjb = {
                        id: message.data.id,
                        username: message.data.username,
                        createdAt: new Date()
                    };
                    return {...state, users: [...state.users.filter((item) => item.id !== message.data.id), userOjb]};
                case S_MESSAGE_TYPE_MESSAGE_BROADCAST:
                case S_MESSAGE_TYPE_USER_DISCONNECTED_BROADCAST:
                case S_MESSAGE_TYPE_STOP_TYPING_BROADCAST:
                    users = state.users.filter((item) => item.id !== message.data.id);
                    return {...state, users: state.users.filter((item) => item.id !== message.data.id)};
                default:
                    break;
            }
            break;
        case TEXT_TYPING_STOP_TIMEOUT: {
            return {...state, users: state.users.filter((item) => item.id !== action.user.id)};
        }
        default:
            break;
    }
    return state;
};

export default typing;
