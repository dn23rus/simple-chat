import React from 'react';
import {socketConnect} from '../actions/connection'

const ConnectionInput = ({wsUrl, dispatch}) => {
    let input;
    return (
        <div className="ConnectionInput">
            <form onSubmit={e => {
                e.preventDefault();
                if (!input.value.trim()) {
                    return;
                }
                dispatch(socketConnect(input.value, wsUrl));
                input.value = '';
            }}>
                <label className="ConnectionInput_Label" htmlFor="name">Enter your name:</label>
                <input className="ConnectionInput_Input" id="name" type="text" ref={node => {
                    input = node
                }}/>
                <button className="ConnectionInput_Button" type="submit">
                    <span>Connect</span>
                </button>
            </form>
        </div>
    );
};

export default ConnectionInput;
