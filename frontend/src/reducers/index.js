import {combineReducers} from 'redux'
import connection from './connection'
import init from './init'
import notification from './notification'

const reducer = combineReducers({
    connection,
    init,
    notification
});

export default reducer
