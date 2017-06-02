import {
    SOCKET_INIT_CONNECTION,
    SOCKET_FAILED_TO_CONNECT,
    SOCKET_CONNECTED,
    SOCKET_DISCONNECT,
    SOCKET_RECEIVE_MESSAGE,
    SOCKET_SEND_MESSAGE,
    SOCKET_ERROR
} from '../actions/types';
import {
    SOCKET_STATE_CONNECTED,
    SOCKET_STATE_CONNECTING,
    SOCKET_STATE_DISCONNECTED
} from '../constants'
import {
    S_MESSAGE_TYPE_REGISTERED,
    S_MESSAGE_TYPE_DENIED,
    S_MESSAGE_TYPE_USER_LIST,
    S_MESSAGE_TYPE_MESSAGE_BROADCAST,
    S_MESSAGE_TYPE_USER_CONNECTED_BROADCAST,
    S_MESSAGE_TYPE_USER_DISCONNECTED_BROADCAST
} from '../constants';

const MESSAGE_LIMIT = 500;

const handleMessage = (state, message) => {
    const appendMessage = (state, message) => {
        return {...state, messages: [...state.messages.slice(-1 * MESSAGE_LIMIT), message]};
    };

    let data = message.data;
    switch (message.type) {
        case S_MESSAGE_TYPE_REGISTERED:
            return {...state, username: data.username, identity: data.id, isRegistered: true};
        case S_MESSAGE_TYPE_MESSAGE_BROADCAST:
            return appendMessage(state, message);
        case S_MESSAGE_TYPE_USER_CONNECTED_BROADCAST:
            return appendMessage(
                {...state, connectedUsers: [...state.connectedUsers, {id: data.id, name: data.username}]},
                message
            );
        case S_MESSAGE_TYPE_USER_DISCONNECTED_BROADCAST:
            return appendMessage(
                {...state, connectedUsers: [...state.connectedUsers.filter(item => item.id !== data.id)]},
                message
            );
        case S_MESSAGE_TYPE_USER_LIST:
            return {...state, connectedUsers: data.items};
        default:
            break;
    }
    return state;
};

const initialState = {
    socket: null,
    messages: [],
    username: null,
    isRegistered: false,
    connectedUsers: [],
    identity: null,
    registered: false,
    connectionState: SOCKET_STATE_DISCONNECTED
};

const connection = (state = initialState, action) => {
    switch (action.type) {
        case SOCKET_INIT_CONNECTION:
            return {...state, socket: action.ws, connectionState: SOCKET_STATE_CONNECTING};
        case SOCKET_FAILED_TO_CONNECT:
            return initialState;
        case SOCKET_CONNECTED:
            return {...state, username: action.username, connectionState: SOCKET_STATE_CONNECTED};
        case SOCKET_DISCONNECT:
            return initialState;
        case SOCKET_RECEIVE_MESSAGE:
            return handleMessage(state, action.message);
            break;
        case SOCKET_SEND_MESSAGE:
            break;
        case SOCKET_ERROR:
            break;
        default:
            break;
    }


    return state;
};

export default connection;
