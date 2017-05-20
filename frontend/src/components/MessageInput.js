import React from 'react'
import {sendMessage} from '../actions/connection'

const MessageInput = ({dispatch}) => {
    let input;
    return (
        <div className="MessageInput">
            <form onSubmit={e => {
                e.preventDefault();
                if (!input.value.trim()) {
                    return;
                }
                dispatch(sendMessage(input.value));
                input.value = '';
            }}>
                <input className="MessageInput_Input" id="message" type="text" ref={node => {
                    input = node
                }}/>
                <button className="MessageInput_Button" type="submit">
                    <span>Send</span>
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
