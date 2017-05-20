import {combineReducers} from 'redux'
import connection from './connection'
import init from './init'

const reducer = combineReducers({
    connection,
    init
});

export default reducer
