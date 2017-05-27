import {
    CHAT_RECEIVE_MESSAGE
} from '../actions/types'
import {
    MESSAGE_TYPE_MESSAGE,
    MESSAGE_TYPE_INFO,
    MESSAGE_TYPE_USER_CONNECTED,
    MESSAGE_TYPE_USER_DISCONNECTED
} from '../constants'

const notification = (state = {message: null}, action) => {
    switch (action.type) {
        case CHAT_RECEIVE_MESSAGE:
            switch (action.message.type) {
                case MESSAGE_TYPE_MESSAGE:
                case MESSAGE_TYPE_USER_DISCONNECTED:
                case MESSAGE_TYPE_INFO:
                    return {
                        message: action.message
                    };
                case MESSAGE_TYPE_USER_CONNECTED:
                    if (!action.message.isOwn) {
                        return {
                            message: action.message
                        }
                    }
                    break;
                default:
                    break;
            }

            return state;
        default:
            return state;
    }
};

export default notification;
