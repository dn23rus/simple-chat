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
    MESSAGE_TYPE_DENIED,
    MESSAGE_TYPE_USER_CONNECTED,
    MESSAGE_TYPE_USER_DISCONNECTED,
    MESSAGE_TYPE_USERS_LIST
} from '../constants'

const messagesLimit = 500;

const initialState = {
    socket: null,
    messages: [],
    username: null,
    connectedUsers: [],
    identity: null,
    registered: false,
    connectionState: SOCKET_STATE_DISCONNECTED
};

const sendMessage = (webSocket, msg) => {
    webSocket.send(JSON.stringify(msg));
};

const handleMessage = (state, msg) => {
    const appendMessage = (state, msg, checkOwn = false) => {
        let message = {
            ...{type: null, username: null, text: null, datetime: null, isOwn: false},
            ...msg
        };

        if (checkOwn && msg.isOwn) {
            return state;
        }

        return {
            ...state,
            messages: [...state.messages.slice(-1 * messagesLimit), message]
        };
    };

    switch (msg.type) {
        case MESSAGE_TYPE_REGISTER:
            sendMessage(state.socket, {
                from: msg.identity,
                type: 'REGISTER',
                name: state.username,
            });
            return {
                ...state,
                identity: msg.identity,
                registered: true
            };
        case MESSAGE_TYPE_MESSAGE:
        case MESSAGE_TYPE_INFO:
            return appendMessage(state, msg);
        case MESSAGE_TYPE_USER_DISCONNECTED:
            return appendMessage({
                ...state,
                connectedUsers: state.connectedUsers.filter((u) => u.id !== msg.id)
            }, msg);
        case MESSAGE_TYPE_USER_CONNECTED:
            let newState = {...state};
            if (msg.isOwn) {
                newState.username = msg.username;
            } else {
                newState.connectedUsers = [...state.connectedUsers, {id: msg.id, name: msg.username}];
            }
            return appendMessage(newState, msg, true);
        case MESSAGE_TYPE_USERS_LIST:
            return {...state, connectedUsers: msg.items};
        default:
            break;
    }
    return state;
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
