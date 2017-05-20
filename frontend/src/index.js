import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import AppWrapper from './containers/AppWrapper'
import './index.css'

const store = createStore(reducer, {}, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <AppWrapper />
    </Provider>,
    document.getElementById('root')
);
