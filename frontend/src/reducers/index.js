import {combineReducers} from 'redux'
import connection from './connection'
import init from './init'
import notification from './notification'
import typing from './typing'

const reducer = combineReducers({
    connection,
    init,
    notification,
    typing
});

export default reducer
