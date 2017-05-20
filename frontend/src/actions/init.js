import {
    APP_INIT_START,
    APP_INIT_FAIL,
    APP_INIT_OK
} from './types'

export const initApp = (url = '/backend/chat-config') => dispatch => {
    dispatch({
        type: APP_INIT_START
    });
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response;
        })
        .then((response) => response.json())
        .then((conf) => {
            dispatch({
                type: APP_INIT_OK,
                wsUrl: conf.url
            })
        })
        .catch((error) => {
            dispatch({
                type: APP_INIT_FAIL,
                error: error
            })
        });
};
