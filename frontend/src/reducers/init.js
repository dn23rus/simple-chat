import {
    APP_INIT_START,
    APP_INIT_FAIL,
    APP_INIT_OK
} from '../actions/types'

import {
    APP_STATE_NOT_INITED,
    APP_STATE_INITIALIZATION,
    APP_STATE_READY
} from '../constants';

const initialState = {
    appState: APP_STATE_NOT_INITED,
    wsUrl: null
};

const init = (state = initialState, action) => {
    switch (action.type) {
        case APP_INIT_START:
            return {
                ...state,
                appState: APP_STATE_INITIALIZATION
            };
        case APP_INIT_OK:
            return {
                ...state,
                wsUrl: action.wsUrl,
                appState: APP_STATE_READY
            };
        default:
            return state
    }
};

export default init;
