import {
    APP_STATE_NOT_INITED,
    APP_STATE_INITIALIZATION,
    APP_STATE_READY,
    APP_STATE_FAILED_INIT
} from '../constants';
import {
    APP_INIT_START,
    APP_INIT_FAIL,
    APP_INIT_OK
} from '../actions/types';

const initialState = {
    appState: APP_STATE_NOT_INITED,
    wsUrl: null
};

const init = (state = initialState, action) => {
    switch (action.type) {
        case APP_INIT_START:
            return {...state, appState:APP_STATE_INITIALIZATION};
        case APP_INIT_OK:
            return {...state, appState: APP_STATE_READY, wsUrl:action.wsUrl};
        case APP_INIT_FAIL:
            return {...state, appState: APP_STATE_FAILED_INIT};
        default:
            break;
    }

    return state;
};

export default init;
