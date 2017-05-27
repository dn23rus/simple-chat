import React from 'react';
import {socketConnect} from '../actions/connection'

const ConnectionInput = ({wsUrl, dispatch}) => {
    let input;
    return (
        <div className="connection">
            <form className="connection__form" onSubmit={e => {
                e.preventDefault();
                if (!input.value.trim()) {
                    return;
                }
                dispatch(socketConnect(input.value, wsUrl));
                input.value = '';
            }}>
                <label className="connection__label" htmlFor="name">Enter your name:</label>
                <input className="connection__input" id="name" maxLength="20" type="text" ref={node => {
                    input = node
                }}/>
                <button className="connection__button" type="submit">
                    <span>Connect</span>
                </button>
            </form>
        </div>
    );
};

export default ConnectionInput;
