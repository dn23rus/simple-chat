import {
    CHAT_RECEIVE_MESSAGE
} from '../actions/types'
import {
    MESSAGE_TYPE_MESSAGE,
    MESSAGE_TYPE_INFO
} from '../constants'

const notification = (state = {message: null}, action) => {
    switch (action.type) {
        case CHAT_RECEIVE_MESSAGE:
            switch (action.message.type) {
                case MESSAGE_TYPE_MESSAGE:
                case MESSAGE_TYPE_INFO:
                    return {
                        message: action.message
                    }
            }

            return state;
        default:
            return state;
    }
};

export default notification;
