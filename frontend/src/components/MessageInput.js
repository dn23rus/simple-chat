import React from 'react'
import {sendText, sendStartTyping, sendStopTyping} from '../actions/connection'

const MessageInput = ({dispatch}) => {
    let input;
    return (
        <div className="message-panel__form">
            <form onSubmit={e => {
                e.preventDefault();
                if (!input.value.trim()) {
                    return;
                }
                dispatch(sendText(input.value));
                input.value = '';
            }}>
                <input className="message-panel__input" id="messageInput" type="text" ref={node => {
                    input = node;
                }} onKeyDown={e => {
                    if (input.value.trim()) {
                        if (e.which === 13) {
                            dispatch(sendStopTyping());
                        } else {
                            dispatch(sendStartTyping());
                        }
                    }
                }} autoComplete="off" autoFocus/>
                <button className="message-panel__submit" type="submit">
                    <span>Send</span>
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
