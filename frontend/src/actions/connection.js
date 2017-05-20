import {
    SOCKET_INIT_CONNECTION,
    SOCKET_FAILED_TO_CONNECT,
    SOCKET_CONNECTED,
    SOCKET_DISCONNECT,
    CHAT_SEND_MESSAGE,
    CHAT_RECEIVE_MESSAGE,
    SOCKET_ERROR
} from './types';

const socketConnected = (name) => {
    return {
        type: SOCKET_CONNECTED,
        name
    }
};

const socketError = (error) => {
    return {
        type: SOCKET_ERROR,
        error
    }
};

export const socketDisconnect = () => ({
    type: SOCKET_DISCONNECT
});

export const sendMessage = (text, type = 'MESSAGE') => ({
    type: CHAT_SEND_MESSAGE,
    message: {type, text},
});

export const receiveMessage = (message) => ({
    type: CHAT_RECEIVE_MESSAGE,
    message
});

export const socketConnect = (name, url) => dispatch => {
    try {
        let webSocket = new WebSocket(url);

        dispatch({
            type: SOCKET_INIT_CONNECTION,
            socket: webSocket
        });

        webSocket.onopen = () => {
            dispatch(socketConnected(name));
        };
        webSocket.onmessage = (e) => {
            let msg = JSON.parse(e.data);
            dispatch(receiveMessage(msg))
        };
        webSocket.onclose = () => {
            dispatch(socketDisconnect());
        };
        webSocket.onerror = (e) => {
            console.log(e);
            dispatch(socketError(e))
        };

    } catch (e) {
        dispatch({
            type: SOCKET_FAILED_TO_CONNECT,
            error: e
        })
    }
};
