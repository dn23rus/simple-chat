import {
    SOCKET_RECEIVE_MESSAGE
} from '../actions/types'
import {
    S_MESSAGE_TYPE_USER_CONNECTED_BROADCAST,
    S_MESSAGE_TYPE_USER_DISCONNECTED_BROADCAST,
    S_MESSAGE_TYPE_MESSAGE_BROADCAST
} from '../constants'

const notification = (state = {data: null}, action) => {
    let message = action.message;
    switch (action.type) {
        case SOCKET_RECEIVE_MESSAGE:
            switch (message.type) {
                case S_MESSAGE_TYPE_MESSAGE_BROADCAST:
                case S_MESSAGE_TYPE_USER_DISCONNECTED_BROADCAST:
                    return {
                        data: {
                            type: message.type,
                            isOwn: message.data.isOwn || false,
                            username: message.data.username,
                            text: message.data.text || null
                        }
                    };
                case S_MESSAGE_TYPE_USER_CONNECTED_BROADCAST:
                    if (!action.message.isOwn) {
                        return {
                            data: {
                                type: message.type,
                                isOwn: message.data.isOwn || false,
                                username: message.data.username,
                                text: null
                            }
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
