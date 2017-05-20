import {
    SOCKET_INIT_CONNECTION,
    SOCKET_CONNECTED,
    SOCKET_DISCONNECT,
    CHAT_SEND_MESSAGE,
    CHAT_RECEIVE_MESSAGE
} from '../actions/types';
import {
    SOCKET_STATE_CONNECTED,
    SOCKET_STATE_CONNECTING,
    SOCKET_STATE_DISCONNECTED,
    MESSAGE_TYPE_REGISTER,
    MESSAGE_TYPE_MESSAGE,
    MESSAGE_TYPE_INFO,
    MESSAGE_TYPE_DENIED
} from '../constants'

const initialState = {
    socket: null,
    messages: [],
    username: null,
    identity: null,
    registered: false,
    connectionState: SOCKET_STATE_DISCONNECTED
};

const sendMessage = (webSocket, msg) => {
    webSocket.send(JSON.stringify(msg));
};

const handleMessage = (state, msg) => {
    switch (msg.type) {
        case MESSAGE_TYPE_REGISTER:
            sendMessage(state.socket, {
                from: msg.id,
                type: 'REGISTER',
                name: state.username,
            });
            return {
                ...state,
                identity: msg.id,
                registered: true
            };
        case MESSAGE_TYPE_MESSAGE:
        case MESSAGE_TYPE_INFO:
            let message = {
                ...{type: null, username: null, text: null, datetime: null, isOwn: false},
                ...msg
            };
            return {
                ...state,
                messages: [...state.messages.slice(-19), message]
            };
        default:
            return state;
    }
};

const connection = (state = initialState, action) => {
    switch (action.type) {
        case SOCKET_INIT_CONNECTION:
            return {
                ...state,
                connectionState: SOCKET_STATE_CONNECTING,
                socket: action.socket
            };
        case CHAT_SEND_MESSAGE:
            sendMessage(state.socket, {
                from: state.identity,
                ...action.message,
            });
            return state;
        case CHAT_RECEIVE_MESSAGE:
            return handleMessage(state, action.message);
        case SOCKET_CONNECTED:
            return {
                ...state,
                username: action.name,
                isConnected: action.isConnected,
                connectionState: SOCKET_STATE_CONNECTED
            };
        case SOCKET_DISCONNECT:
            return initialState;
        default:
            return state;
    }
};

export default connection;
