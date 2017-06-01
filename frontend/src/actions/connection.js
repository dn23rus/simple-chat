import {
    SOCKET_INIT_CONNECTION,
    SOCKET_FAILED_TO_CONNECT,
    SOCKET_CONNECTED,
    SOCKET_DISCONNECT,
    SOCKET_RECEIVE_MESSAGE,
    SOCKET_SEND_MESSAGE,
    SOCKET_ERROR
} from './types';
import {
    C_MESSAGE_TYPE_REGISTER,
    C_MESSAGE_TYPE_MESSAGE,
    C_MESSAGE_TYPE_GET_USER_LIST,
    C_MESSAGE_TYPE_START_TYPING,
    C_MESSAGE_TYPE_STOP_TYPING,
} from '../constants';

let ws;
export const socketConnect = (name, url) => dispatch => {
    try {
        ws = new WebSocket(url);

        dispatch({
            type: SOCKET_INIT_CONNECTION,
            socket: ws
        });

        ws.onopen = () => {
            dispatch({
                type: SOCKET_CONNECTED,
                username: name
            });
        };
        ws.onmessage = (e) => {
            let message = JSON.parse(e.data);
            dispatch({
                type: SOCKET_RECEIVE_MESSAGE,
                message
            })
        };
        ws.onclose = () => {
            dispatch({type: SOCKET_DISCONNECT});
        };
        ws.onerror = (error) => {
            console.log(error);
            dispatch({
                type: SOCKET_ERROR,
                error
            })
        };

    } catch (e) {
        dispatch({
            type: SOCKET_FAILED_TO_CONNECT,
            error: e
        })
    }
};

const sendWithDispatch = (type, data, dispatch) => {
    dispatch({
        type: SOCKET_SEND_MESSAGE,
        message: {type, data}
    });
    ws.send(JSON.stringify({type, data}));
};

export const sendRegister = name => dispatch => {
    sendWithDispatch(C_MESSAGE_TYPE_REGISTER, {name}, dispatch);
};

export const sendText = text => dispatch => {
    sendWithDispatch(C_MESSAGE_TYPE_MESSAGE, {text}, dispatch);
};

export const requestUserList = () => dispatch => {
    sendWithDispatch(C_MESSAGE_TYPE_GET_USER_LIST, {}, dispatch);
};

let timeout = null;
export const sendStopTyping = () => dispatch => {
    sendWithDispatch(C_MESSAGE_TYPE_STOP_TYPING, {}, dispatch);
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
};
export const sendStartTyping = () => dispatch => {
    if (timeout) {
        clearTimeout(timeout);
    } else {
        sendWithDispatch(C_MESSAGE_TYPE_START_TYPING, {}, dispatch);
    }
    timeout = setTimeout(() => dispatch(sendStopTyping()), 800);
};
